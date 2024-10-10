import React, { useState } from 'react';
import './GameSpinner.css';
import Confetti from 'react-confetti';
import { ArrowDown } from 'lucide-react';

interface GameSpinnerProps {
  onSpinComplete?: (prize: string) => void;
}

const GameSpinner: React.FC<GameSpinnerProps> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [prize, setPrize] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const prizes = ['1000', '0', '50', '5', '30', '10'];
  const segmentAngle = 360 / prizes.length; // 60 degrees per segment

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setPrize('');

      // Generate a random spin rotation (2-5 full rotations + random angle)
      const newRotation = 720 + Math.floor(Math.random() * 1080) + Math.floor(Math.random() * 360);
      setRotationDegree(newRotation);

      setTimeout(() => {
        setIsSpinning(false);

        // Calculate the final angle after the spin
        const finalAngle = newRotation % 360;

        // Determine which prize is at the pointer (at 0 degrees)
        const prizeIndex = Math.floor((360 - finalAngle) / segmentAngle) % prizes.length;
        const wonPrize = prizes[prizeIndex];
        setPrize(wonPrize);

        if (wonPrize !== '0') {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }

        if (onSpinComplete) {
          onSpinComplete(wonPrize);
        }
      }, 3000);
    }
  };

  return (
    <div className="spinner-container">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="pointer-indicator">
        <ArrowDown size={48} color="#FF6B6B" strokeWidth={3} />
      </div>

      <div 
        className="spinner" 
        style={{ 
          transform: `rotate(${rotationDegree}deg)`,
          transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
        }}
      >
        <div className="spinner-segments">
          {prizes.map((prizeValue, index) => (
            <div key={index} className={`segment segment-${index}`}>{prizeValue}</div>
          ))}
        </div>
      </div>

      <button 
        className={`spin-button ${isSpinning ? 'spinning' : ''}`} 
        onClick={spinWheel} 
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      {prize && !isSpinning && (
        <div className="prize-result animate-fade-in">
          You won: {prize} points!
        </div>
      )}
    </div>
  );
};

export default GameSpinner;
