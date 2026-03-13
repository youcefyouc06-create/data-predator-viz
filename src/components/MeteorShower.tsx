import { useEffect, useState } from "react";

const MeteorShower = () => {
  const [meteors, setMeteors] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const items = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setMeteors(items);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor animate-meteor-fall"
          style={{
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
            top: "-80px",
          }}
        />
      ))}
    </div>
  );
};

export default MeteorShower;
