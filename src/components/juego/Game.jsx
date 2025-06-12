// Game.jsx

import React, { useState, useEffect, useRef } from "react";
import Character from "./Character";
import Obstacle from "./Obstacle";
import QuizModal from "./QuizModal";

// Obstáculos por nivel (imágenes)
const OBSTACLES_BY_LEVEL = [
  ["/game/arbusto.png", "/game/arbusto.png", "/game/arbusto.png"], // Nivel 1
  ["/game/obs4.png", "/game/obs5.png", "/game/obs6.png"], // Nivel 2
  ["/game/obs7.png", "/game/obs8.png", "/game/obs9.png"], // Nivel 3
  ["/game/obs10.png", "/game/obs11.png", "/game/obs12.png"], // Nivel 4
];

// Preguntas por nivel
const QUESTIONS_BY_LEVEL = [
  [
    {
      q: "Cuando tenías un problema, tu papá...",
      options: [
        "Hacía que desapareciera de la nada (El Ilusionista)",
        "Te daba la solución perfecta (El Hechicero Sabio)",
        "Te mostraba el truco para resolverlo tú mismo (Encantador Maestro)",
      ],
    },
    {
      q: "Pregunta 2 nivel 1",
      options: ["A", "B", "C"],
    },
    {
      q: "Pregunta 3 nivel 1",
      options: ["A", "B", "C"],
    },
  
  ],
  // ...resto de los niveles igual que lo tienes
];
const LEVEL_TIME = 30;

const INITIAL_STATE = {
  isStarted: false,
  level: 0,
  levelStart: null,
  obstacleCount: 0,
  isJumping: false,
  isGameOver: false,
  showQuiz: false,
  quizIndex: 0,
  answers: [],
  isCompleted: false,
  score: 0,
};

export default function Game() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [obstacles, setObstacles] = useState([]);
  const [timer, setTimer] = useState(LEVEL_TIME);

  // Para evitar cierres desfasados
  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Características de colisión
  const CHARACTER_LEFT = 80, CHARACTER_WIDTH = 80, OBSTACLE_WIDTH = 10;

  // Start/restart game
  const startGame = () => {
    setGameState({
      ...INITIAL_STATE,
      isStarted: true,
      levelStart: Date.now(),
    });
    setObstacles([{ left: 1200, type: 0 }]);
    setTimer(LEVEL_TIME);
  };

  // Jump logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.code === "Space" || e.keyCode === 32) &&
        gameStateRef.current.isStarted &&
        !gameStateRef.current.isJumping &&
        !gameStateRef.current.isGameOver &&
        !gameStateRef.current.showQuiz &&
        !gameStateRef.current.isCompleted
      ) {
        e.preventDefault();
        setGameState(s => ({ ...s, isJumping: true }));
        setTimeout(() => setGameState(s => ({ ...s, isJumping: false })), 600);
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Timer Efectivo y game loop
  useEffect(() => {
    if (
      !gameState.isStarted ||
      gameState.isGameOver ||
      gameState.showQuiz ||
      gameState.isCompleted
    ) return;

    // Timer DESCENDENTE real
    const timerInterval = setInterval(() => {
      setTimer(() => {
        const tiempoRestante = Math.max(
          0,
          LEVEL_TIME - Math.floor((Date.now() - gameStateRef.current.levelStart) / 1000)
        );
        return tiempoRestante;
      });
    }, 200);

    // Game loop
    const gameInterval = setInterval(() => {
      // Obstáculos: movimiento y score
      setObstacles(prev => {
        let esquivados = 0;
        const nuevos = prev
          .map((o) => ({ ...o, left: o.left - 12 }))
          .filter((o) => {
            if (o.left <= -70) {
              esquivados++;
              return false;
            }
            return true;
          });

        // Score aumenta aquí
        if (esquivados > 0) {
          setGameState(s => ({ ...s, score: s.score + 100 * esquivados }));
        }
        return nuevos;
      });

      // Generar obstáculos con espacio mínimo
      setObstacles(prev => {
        const MIN_OBSTACLE_GAP = 320;
        if (prev.length === 0) {
          return [
            { left: 1200, type: Math.floor(Math.random() * 3) }
          ];
        }
        const last = prev[prev.length - 1];
        if (last.left < 1200 - MIN_OBSTACLE_GAP && Math.random() < 0.03) {
          return [
            ...prev,
            { left: 1200, type: Math.floor(Math.random() * 3) }
          ];
        }
        return prev;
      });

      // Colisión precisa
      setGameState(s => {
        if (obstacles.some(o => {
          const obstacleLeft = o.left;
          const obstacleRight = o.left + OBSTACLE_WIDTH;
          const charLeft = CHARACTER_LEFT;
          const charRight = CHARACTER_LEFT + CHARACTER_WIDTH;
          const overlapX = charRight > obstacleLeft && charLeft < obstacleRight;
          return overlapX && !s.isJumping;
        })) {
          return { ...s, isGameOver: true };
        }
        return s;
      });

      // Muestra preguntas cuando acaba tiempo
      const timePassed = (Date.now() - gameStateRef.current.levelStart) / 1000;
      if (timePassed >= LEVEL_TIME && gameStateRef.current.quizIndex < 3) {
        setGameState(s => ({ ...s, showQuiz: true }));
      }
    }, 50);

    return () => {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
    };
    // eslint-disable-next-line
  }, [gameState.isStarted, gameState.isGameOver, gameState.showQuiz, gameState.isCompleted]);

  // Quiz handling
  const handleAnswer = (option) => {
    setGameState((s) => ({
      ...s,
      showQuiz: false,
      quizIndex: s.quizIndex + 1,
      answers: [
        ...s.answers,
        {
          level: s.level + 1,
          q: QUESTIONS_BY_LEVEL[s.level][s.quizIndex].q,
          a: option,
        },
      ],
    }));

    // Cambio de nivel o fin
    setTimeout(() => {
      setGameState(s => {
        if (s.quizIndex === 2) {
          if (s.level < 3) {
            setObstacles([{ left: 1200, type: 0 }]);
            setTimer(LEVEL_TIME);
            return {
              ...s,
              level: s.level + 1,
              levelStart: Date.now(),
              quizIndex: 0,
              obstacleCount: 0,
              isJumping: false,
              isGameOver: false,
              showQuiz: false,
              isCompleted: false,
            };
          } else {
            return { ...s, isCompleted: true, showQuiz: false };
          }
        }
        return s;
      });
    }, 500);
  };

  // Render
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center">
      <div className="mt-5">
        <p className="text-white z-50 text-5xl mb-5">Juego Nueva Venecia</p>
      </div>
      <div className="relative w-[70%] h-[70%] flex items-center justify-center">
        <img className="rounded-3xl absolute w-full h-full object-cover" src="/game/fondoGame.jpg" alt="" />

        {/* Pantalla de inicio */}
        {!gameState.isStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-20 text-white rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">¡Bienvenido!</h2>
            <p className="mb-6 max-w-xl text-center text-lg">
              Supera los obstáculos saltando con la barra espaciadora. Cada nivel tiene 3 preguntas reflexivas. Todas las respuestas son válidas y serán guardadas para reflexionar después. ¿Listo para empezar?
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 text-white rounded-xl text-xl shadow-lg hover:bg-green-700 transition"
            >
              Iniciar juego
            </button>
          </div>
        )}

        {/* Info de nivel, timer y score */}
        {gameState.isStarted &&
          !gameState.isGameOver &&
          !gameState.isCompleted && (
            <>
              <div className="absolute top-4 left-4 z-10">
                <div className="text-lg font-bold text-white mb-2">
                  Nivel {gameState.level + 1} / 4
                </div>
                <div className="text-base text-white">
                  Tiempo restante: {timer}s
                </div>
              </div>
              <div className="absolute top-4 right-8 z-20 text-xl font-bold text-white shadow-lg">
                Score: {gameState.score}
              </div>
            </>
          )}

        {/* Personaje */}
        {gameState.isStarted && <Character isJumping={gameState.isJumping} />}
        {/* Obstáculos */}
        {gameState.isStarted &&
          obstacles.map((o, i) => (
            <Obstacle
              key={i}
              left={o.left}
              src={OBSTACLES_BY_LEVEL[gameState.level][o.type]}
            />
          ))}

        {/* Quiz */}
        {gameState.showQuiz && (
          <QuizModal
            question={QUESTIONS_BY_LEVEL[gameState.level][gameState.quizIndex]}
            onAnswer={handleAnswer}
          />
        )}

        {/* Fin del juego por choque */}
        {gameState.isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 text-3xl font-bold z-20 rounded-3xl">
            ¡Game Over!
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
              onClick={startGame}
            >
              Reiniciar
            </button>
          </div>
        )}

        {/* Juego completado */}
        {gameState.isCompleted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-700/80 text-3xl font-bold z-30 rounded-3xl text-white">
            <div>🎉 ¡Felicidades, terminaste el reto! 🎉</div>
            <div className="text-lg mt-4 mb-4 max-w-lg text-center">
              Eres un verdadero maestro de los desafíos. Guarda este mensaje, ¡y comparte tus respuestas con quien más quieras!
            </div>
            <div className="bg-white text-black p-4 rounded-xl w-[90%] max-w-md text-base font-normal mb-4">
              <h3 className="font-bold mb-2 text-center">Tus respuestas:</h3>
              <ol className="list-decimal pl-4">
                {gameState.answers.map((ans, i) => (
                  <li key={i}>
                    <b>Nivel {ans.level}:</b> {ans.q}
                    <br /> <span className="text-blue-600">{ans.a}</span>
                  </li>
                ))}
              </ol>
            </div>
            <button
              className="px-6 py-3 bg-white text-green-700 rounded-xl text-xl shadow-lg hover:bg-green-100 transition"
              onClick={startGame}
            >
              Volver a jugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
