import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Confetti from "react-confetti";
import useSound from "use-sound";
import splashSound from "../assets/holi-sound.mp3";
import holiSong from "../assets/holi-song.mp3";

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD700", "#FF1493", "#00FFFF"];

const ColorSplash = () => {
  const [splashes, setSplashes] = useState([]);
  const [playSplash] = useSound(splashSound, { volume: 0.8 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const newAudio = new Audio(holiSong);
    newAudio.loop = true;
    newAudio.volume = 0.6;
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, []);

  const handleClick = (e) => {
    const newSplash = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setSplashes((prev) => [...prev, newSplash]);
    playSplash();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);

    setTimeout(() => {
      setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id));
    }, 1200);
  };

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => console.log("User interaction required"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="color-splash-container" onClick={handleClick}>
      {/* Background Particle Effect */}
      <Particles
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 120 },
            color: { value: colors },
            shape: { type: "circle" },
            opacity: { value: 0.7 },
            size: { value: 8 },
            move: { enable: true, speed: 3 },
          },
        }}
        className="particles"
      />

      {/* Confetti Animation */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Holi Title */}
      <motion.h1 className="holi-title" animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 2 }}>
        🌸 Happy Holi! Click to Splash Colors! 🎊
      </motion.h1>

      {/* Music Toggle Button */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
        className="music-button"
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? "Pause Music 🎵" : "Play Music 🎶"}
      </motion.button>

      {/* Color Splash Effects */}
      {splashes.map((splash) => (
        <motion.div
          key={splash.id}
          className="splash"
          style={{ left: splash.x, top: splash.y, backgroundColor: splash.color }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      ))}
    </div>
  );
};

export default ColorSplash;
