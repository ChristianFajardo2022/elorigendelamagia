import React, { useState, useEffect, useRef } from "react";
import Character from "./Character";
import Obstacle from "./Obstacle";
import QuizModal from "./QuizModal";

const OBSTACLES_BY_LEVEL = [
  ["/game/arbusto.png", "/game/arbusto.png", "/game/arbusto.png"],
  ["/game/obs4.png", "/game/obs5.png", "/game/obs6.png"],
  ["/game/obs7.png", "/game/obs8.png", "/game/obs9.png"],
  ["/game/obs10.png", "/game/obs11.png", "/game/obs12.png"],
];

const QUESTIONS = [
  {
    q: "Cuando tenías un problema, tu papá...",
    options: [
      "Hacía que desapareciera de la nada (El Ilusionista)",
      "Te daba la solución perfecta (El Hechicero Sabio)",
      "Te mostraba el truco para resolverlo tú mismo (Encantador Maestro)",
    ],
  },
  {
    q: "Pregunta 2: (modifícala como gustes)",
    options: ["A", "B", "C"],
  },
  {
    q: "Pregunta 3: (modifícala como gustes)",
    options: ["A", "B", "C"],
  }
];

const LEVEL_TIME = 30;

const INITIAL_STATE = {
  isStarted: false,
  level: 0,
  levelStart: null,
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
  const gameStateRef = useRef(gameState);
  useEffect(() => { gameStateRef.current = gameState }, [gameState]);

  const CHARACTER_LEFT = 80, CHARACTER_WIDTH = 40, OBSTACLE_WIDTH = 20;

  const startGame = () => {
    setGameState({
      ...INITIAL_STATE,
      isStarted: true,
      levelStart: Date.now(),
    });
    setObstacles([{ left: 1200, type: 0 }]);
    setTimer(LEVEL_TIME);
  };

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

  // --- AQUÍ EL GAME LOOP AJUSTADO ---
  useEffect(() => {
    if (
      !gameState.isStarted ||
      gameState.isGameOver ||
      gameState.showQuiz ||
      gameState.isCompleted
    ) return;

    const timerInterval = setInterval(() => {
      setTimer(() =>
        Math.max(
          0,
          LEVEL_TIME - Math.floor((Date.now() - gameStateRef.current.levelStart) / 1000)
        )
      );
    }, 200);

    const gameInterval = setInterval(() => {
      let esquivados = 0;
      let nuevosObstaculos = obstacles
        .map(o => ({ ...o, left: o.left - 12 }))
        .filter(o => {
          if (o.left <= -70) {
            esquivados++;
            return false;
          }
          return true;
        });

      if (esquivados > 0) {
        setGameState(s => ({ ...s, score: s.score + 100 * esquivados }));
      }

      // Generar obstáculo con espacio mínimo
      const MIN_OBSTACLE_GAP = 320;
      if (
        nuevosObstaculos.length === 0 ||
        (nuevosObstaculos[nuevosObstaculos.length - 1].left <
          1200 - MIN_OBSTACLE_GAP &&
          Math.random() < 0.03)
      ) {
        nuevosObstaculos = [
          ...nuevosObstaculos,
          { left: 1200, type: Math.floor(Math.random() * 3) },
        ];
      }

      // 💥 DETECCIÓN DE COLISIÓN usando los obstáculos ya actualizados
      const hayColision = nuevosObstaculos.some(o => {
        const obstacleLeft = o.left;
        const obstacleRight = o.left + OBSTACLE_WIDTH;
        const charLeft = CHARACTER_LEFT;
        const charRight = CHARACTER_LEFT + CHARACTER_WIDTH;
        const overlapX = charRight > obstacleLeft && charLeft < obstacleRight;
        return overlapX && !gameStateRef.current.isJumping;
      });

      if (hayColision) {
        setGameState(s => ({ ...s, isGameOver: true }));
      }

      setObstacles(nuevosObstaculos);

      // Mostrar preguntas después de cada nivel, nunca después del último
      const timePassed = (Date.now() - gameStateRef.current.levelStart) / 1000;
      if (
        timePassed >= LEVEL_TIME &&
        gameStateRef.current.level < 3 &&
        !gameStateRef.current.showQuiz
      ) {
        setGameState(s => ({ ...s, showQuiz: true }));
      }
      if (
        timePassed >= LEVEL_TIME &&
        gameStateRef.current.level === 3 &&
        !gameStateRef.current.isCompleted
      ) {
        setTimeout(() => {
          setGameState(s => ({ ...s, isCompleted: true }));
        }, 400);
      }
    }, 50);

    return () => {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
    };
    // eslint-disable-next-line
  }, [
    gameState.isStarted,
    gameState.isGameOver,
    gameState.showQuiz,
    gameState.isCompleted,
    obstacles
  ]);

  const handleAnswer = (option) => {
    setGameState((s) => ({
      ...s,
      showQuiz: false,
      answers: [
        ...s.answers,
        {
          nivel: s.level + 1,
          pregunta: QUESTIONS[s.level].q,
          respuesta: option,
        },
      ],
      quizIndex: s.quizIndex + 1
    }));

    setTimeout(() => {
      setGameState(s => {
        if (s.level < 3) {
          setObstacles([{ left: 1200, type: 0 }]);
          setTimer(LEVEL_TIME);
          return {
            ...s,
            level: s.level + 1,
            levelStart: Date.now(),
            isJumping: false,
            isGameOver: false,
            showQuiz: false,
          };
        }
        return s;
      });
    }, 500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center">
      <div className="mt-5">
        <p className="text-white z-50 text-5xl mb-5">Juego Nueva Venecia</p>
      </div>
      <div className="relative w-[70%] h-[70%] flex items-center justify-center">
        <img className="rounded-3xl absolute w-full h-full object-cover" src="/game/fondoGame.jpg" alt="" />

        {!gameState.isStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-20 text-white rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">¡Bienvenido!</h2>
            <p className="mb-6 max-w-xl text-center text-lg">
              Supera los obstáculos saltando con la barra espaciadora. Después de cada nivel tendrás una pregunta. ¡Responde y sigue avanzando! Todas las respuestas serán guardadas.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 text-white rounded-xl text-xl shadow-lg hover:bg-green-700 transition"
            >
              Iniciar juego
            </button>
          </div>
        )}

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

        {gameState.isStarted && <Character isJumping={gameState.isJumping} />}
        {gameState.isStarted &&
          obstacles.map((o, i) => (
            <Obstacle
              key={i}
              left={o.left}
              src={OBSTACLES_BY_LEVEL[gameState.level][o.type]}
            />
          ))}

        {gameState.showQuiz && (
          <QuizModal
            question={QUESTIONS[gameState.level]}
            onAnswer={handleAnswer}
          />
        )}

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
                    <b>Nivel {ans.nivel}:</b> {ans.pregunta}
                    <br /> <span className="text-blue-600">{ans.respuesta}</span>
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
