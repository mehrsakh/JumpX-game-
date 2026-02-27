"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Home() {
  const W = 800;
  const H = 300;

  const playerWidth = 40;
  const playerHeight = 60;
  const playerX = 100;

  const obstacleWidth = 30;
  const obstacleHeight = 50;

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState("idle"); 
  // idle | running | paused | gameover

  const [playerY, setPlayerY] = useState(0);
  const [obstacles, setObstacles] = useState([
    { x: W },
    { x: W + 400 },
  ]);

  const gameStateRef = useRef(gameState);
  const playerYRef = useRef(0);
  const velRef = useRef(0);
  const obstaclesRef = useRef([
    { x: W },
    { x: W + 400 },
  ]);
  const scoreRef = useRef(0);
  const speedRef = useRef(360);

  const rafRef = useRef(null);
  const lastTRef = useRef(0);

  const gravity = 2500;
  const jumpVelocity = 900;

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const stopLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTRef.current = 0;
  }, []);

  const startLoop = useCallback(() => {
    stopLoop();

    const step = (t) => {
      if (gameStateRef.current !== "running") return;

      if (!lastTRef.current) lastTRef.current = t;
      const dt = Math.min(0.033, (t - lastTRef.current) / 1000);
      lastTRef.current = t;

      // Physics
      velRef.current -= gravity * dt;
      playerYRef.current += velRef.current * dt;

      if (playerYRef.current < 0) {
        playerYRef.current = 0;
        velRef.current = 0;
      }

      // Obstacles
      obstaclesRef.current = obstaclesRef.current.map((obs) => {
        let newX = obs.x - speedRef.current * dt;

        if (newX <= -obstacleWidth) {
          newX = W + Math.random() * 200;
          scoreRef.current += 1;
          setScore(scoreRef.current);

          // Increase speed every 5 points
          if (scoreRef.current % 5 === 0) {
            speedRef.current += 40;
          }
        }

        return { x: newX };
      });

      // Collision
      for (let obs of obstaclesRef.current) {
        const pLeft = playerX;
        const pRight = playerX + playerWidth;
        const pBottom = playerYRef.current;
        const pTop = playerYRef.current + playerHeight;

        const oLeft = obs.x;
        const oRight = obs.x + obstacleWidth;
        const oBottom = 0;
        const oTop = obstacleHeight;

        const overlapX = pLeft < oRight && pRight > oLeft;
        const overlapY = pBottom < oTop && pTop > oBottom;

        if (overlapX && overlapY) {
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
          }
          setGameState("gameover");
          stopLoop();
          return;
        }
      }

      setPlayerY(playerYRef.current);
      setObstacles([...obstaclesRef.current]);

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [highScore, stopLoop]);

  const startGame = () => {
    scoreRef.current = 0;
    speedRef.current = 360;
    setScore(0);

    playerYRef.current = 0;
    velRef.current = 0;
    setPlayerY(0);

    obstaclesRef.current = [{ x: W }, { x: W + 400 }];
    setObstacles([...obstaclesRef.current]);

    setGameState("running");
  };

  const togglePause = () => {
    if (gameState === "running") {
      setGameState("paused");
      stopLoop();
    } else if (gameState === "paused") {
      setGameState("running");
      startLoop();
    }
  };

  const handleJump = () => {
    if (gameStateRef.current !== "running") return;
    if (playerYRef.current <= 0.5) {
      velRef.current = jumpVelocity;
    }
  };

  useEffect(() => {
    if (gameState === "running") startLoop();
    return () => stopLoop();
  }, [gameState, startLoop, stopLoop]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        color: "white",
      }}
    >
      <div
        style={{
          width: `${W}px`,
          height: `${H}px`,
          background: "#222",
          position: "relative",
          overflow: "hidden",
          border: "2px solid white",
        }}
      >
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          Score: {score}
          <br />
          High Score: {highScore}
        </div>

        {gameState === "idle" && (
          <CenterScreen title="Jump Game" buttonText="Start" onClick={startGame} />
        )}

        {gameState === "gameover" && (
          <CenterScreen
            title="Game Over"
            buttonText="Restart"
            onClick={startGame}
            extra={<p>Final Score: {score}</p>}
          />
        )}

        {gameState === "paused" && (
          <CenterScreen
            title="Paused"
            buttonText="Resume"
            onClick={togglePause}
          />
        )}

        {/* Player */}
        <div
          style={{
            width: playerWidth,
            height: playerHeight,
            background: "lime",
            position: "absolute",
            bottom: playerY,
            left: playerX,
          }}
        />

        {/* Obstacles */}
        {obstacles.map((obs, i) => (
          <div
            key={i}
            style={{
              width: obstacleWidth,
              height: obstacleHeight,
              background: "red",
              position: "absolute",
              bottom: 0,
              left: obs.x,
            }}
          />
        ))}

        {/* Controls */}
        {gameState === "running" && (
          <>
            <button
              onClick={handleJump}
              style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "10px 20px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              JUMP
            </button>

            <button
              onClick={togglePause}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Pause
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CenterScreen({ title, buttonText, onClick, extra }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "rgba(0,0,0,0.7)",
        gap: "10px",
      }}
    >
      <h2>{title}</h2>
      {extra}
      <button
        onClick={onClick}
        style={{
          height: "35px",
          width: "100px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}