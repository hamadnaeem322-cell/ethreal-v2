import { useState, useRef } from "react";

export const Navigation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-8 right-8 lg:right-12 z-50 mix-blend-difference">
      <button
        onClick={toggleAudio}
        className="font-body tracking-widest text-[10px] md:text-xs text-[#f2ebe5]/50 hover:text-[#f2ebe5] transition-all duration-700 uppercase"
      >
        [ Sound : {isPlaying ? "On" : "Off"} ]
      </button>
      <audio ref={audioRef} loop src="/media/theme.mp3" preload="auto" />
    </div>
  );
};
