export default function Obstacle({ left, src }) {
  return (
    <img
      src={src}
      alt="Obstáculo"
      className="absolute bottom-8"
      style={{ left }}
      width={80}
    />
  );
}
