import React from "react";

const Square = ({
  value,
  onClick,
  index,
  isWinning = false,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && !value) {
      onClick(index);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className={`square ${isWinning ? "winning" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      disabled={disabled || !!value}
      tabIndex={disabled || value ? -1 : 0}
      aria-label={`Quadrado ${index + 1}${
        value ? `, ocupado por ${value}` : ", vazio"
      }`}
    >
      {value && (
        <span className={`mark mark-${value.toLowerCase()}`}>{value}</span>
      )}

      <style jsx>{`
        .square {
          aspect-ratio: 1;
          background: var(--color-boardBg, #ffffff);
          border: 2px solid var(--color-primary, #1e40af);
          border-radius: 12px;
          cursor: pointer;
          font-size: 2rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: relative;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .square:hover:not(.disabled):not([disabled]) {
          transform: scale(1.05);
          border-color: var(--color-secondary, #10b981);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .square:active:not(.disabled):not([disabled]) {
          transform: scale(0.95);
        }

        .square:focus {
          outline: 3px solid var(--color-secondary, #10b981);
          outline-offset: 2px;
        }

        .square.winning {
          background: linear-gradient(
            135deg,
            var(--color-secondary, #10b981),
            var(--color-primary, #1e40af)
          );
          animation: pulse 0.6s ease-in-out;
        }

        .square.disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .mark {
          display: block;
          animation: mark-scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .mark-x {
          color: var(--color-xColor, #ef4444);
        }

        .mark-o {
          color: var(--color-oColor, #3b82f6);
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes mark-scale-in {
          from {
            transform: scale(0) rotate(-180deg);
          }
          to {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .square {
            font-size: 1.5rem;
            border-radius: 8px;
          }
        }
      `}</style>
    </button>
  );
};

export default Square;
