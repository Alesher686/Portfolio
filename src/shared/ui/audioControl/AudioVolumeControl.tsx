import { useState, useEffect } from 'react';

interface IAudioVolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioVolumeControl: React.FC<IAudioVolumeControlProps> = ({ audioRef }) => {
  const [volume, setVolume] = useState(0); // Начальная громкость

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume); // обновляем громкость в стейте
  };

  // Это нужно, чтобы при обновлении громкости стейт синхронизировался с элементом audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Устанавливаем громкость в аудио элементе
    }
  }, [volume, audioRef]); // Обновляем громкость всякий раз, когда volume меняется

  return (
    <div>
      <label htmlFor="volume-control">Volume: </label>
      <input
        id="volume-control"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <span>{Math.round(volume * 100)}%</span>
    </div>
  );
};

export default AudioVolumeControl;
