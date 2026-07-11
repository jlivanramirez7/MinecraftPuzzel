import React, { useState } from 'react';
import { soundEngine } from '../utils/sound';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
  isMuted: boolean;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
  isMuted,
}) => {
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setPin('');
      setErrorMsg(null);
      soundEngine.playChime(isMuted);
      onConfirmReset();
      onClose();
    } else {
      soundEngine.playOofBuzzer(isMuted);
      setErrorMsg('Incorrect PIN! Only the party host can reset the puzzle.');
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in font-minecraft">
      <div className="bg-mc-stoneDark border-8 border-mc-gold rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative text-white">
        {/* Lock Icon Header */}
        <div className="w-14 h-14 bg-mc-dark border-4 border-mc-gold rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow">
          🔒
        </div>

        <h2 className="text-sm sm:text-base text-mc-gold uppercase tracking-wider font-bold mb-2">
          PARTY HOST RESET
        </h2>
        <p className="text-xs text-mc-panel leading-relaxed mb-5">
          Enter the 4-digit host PIN (<span className="text-mc-gold">1234</span>) to reset the puzzle, timers, and hints:
        </p>

        {/* Form Input */}
        <form onSubmit={handleSumbit} className="space-y-4">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="PIN"
            autoFocus
            className="w-40 mx-auto text-center bg-mc-dark border-4 border-mc-stone focus:border-mc-gold text-mc-gold text-lg sm:text-xl p-3 rounded tracking-widest outline-none shadow-inner"
          />

          {errorMsg && (
            <div className="text-mc-redstone text-[10px] sm:text-xs font-bold animate-pulse">
              ❌ {errorMsg}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-mc-stone hover:bg-mc-panelDark text-white border-2 border-mc-panel px-5 py-2.5 rounded text-xs font-bold transition-all"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="bg-mc-gold hover:bg-white text-black border-4 border-mc-stoneDark px-6 py-2.5 rounded text-xs font-bold shadow-mc-button hover:scale-105 active:scale-95 transition-all"
            >
              CONFIRM RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
