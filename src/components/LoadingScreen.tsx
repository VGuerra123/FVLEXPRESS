'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
  logoSrc?: string;
  durationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  logoSrc = '/avatar.png',
  durationMs = 500,
}) => {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const intRef = useRef<number | null>(null);
  const toRef = useRef<number | null>(null);

  const phases = useMemo(
    () => [
      'Verificando credenciales y seguridad de datos…',
      'Sincronizando pedidos con Envíame y couriers…',
      'Optimizando rutas de última milla (ETA dinámico)…',
      'Sistema listo para operar ✅',
    ],
    []
  );

  useEffect(() => {
    const steps = Math.max(40, Math.floor(durationMs / 35));
    const inc = 100 / steps;
    intRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + inc);
        const idx = Math.min(
          phases.length - 1,
          Math.floor((next / 100) * phases.length)
        );
        if (idx !== phaseIdx) setPhaseIdx(idx);
        if (next >= 100 && intRef.current) {
          window.clearInterval(intRef.current);
          toRef.current = window.setTimeout(() => onComplete?.(), 500);
        }
        return next;
      });
    }, 35);

    return () => {
      if (intRef.current) window.clearInterval(intRef.current);
      if (toRef.current) window.clearTimeout(toRef.current);
    };
  }, [durationMs, phases.length, onComplete]);

  const ringDash = 472;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center 
      bg-gradient-to-b from-[#0b1220] to-[#1e293b] text-white overflow-hidden">
      
      {/* Contenido principal */}
      <div className="relative text-center">
        {/* Avatar flotando + aureola animada */}
        <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-visible">
          {!reduce && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  'inset 0 0 40px rgba(56,189,248,.55), 0 0 90px rgba(56,189,248,.45)',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2], 
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Avatar con parpadeo + flotación */}
          <motion.img
            src={logoSrc}
            alt="F&V Logistics Express"
            className="relative z-10 h-24 w-24 object-contain rounded-full"
            animate={{
              y: [0, -8, 0], // flotación suave
              opacity: [1, 0.8, 1], // parpadeo sutil
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Nombre empresa */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          FVL <span className="text-sky-400">Express</span>
        </h1>
        <p className="mt-1 mb-8 text-sm text-slate-300/85">
          Logística Inteligente
        </p>

        {/* Progreso circular */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full">
          <svg className="absolute inset-0 h-full w-full -rotate-90 rounded-full">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <circle
              cx="50%"
              cy="50%"
              r="75"
              stroke="rgba(148,163,184,.25)"
              strokeWidth="10"
              fill="transparent"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="75"
              stroke="url(#g1)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={ringDash}
              animate={{
                strokeDashoffset: ringDash - (progress / 100) * ringDash,
              }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="drop-shadow-[0_0_22px_rgba(56,189,248,.6)]"
            />
          </svg>
          <div className="text-center">
            <div className="text-4xl font-black tabular-nums">
              {Math.round(progress)}%
            </div>
            <div className="text-[12px] uppercase tracking-[0.25em] text-slate-400">
              Cargando
            </div>
          </div>
        </div>

        {/* Frase dinámica */}
        <motion.p
          key={phaseIdx}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 text-sm text-slate-200"
        >
          {phases[phaseIdx]}
        </motion.p>
      </div>
    </div>
  );
};
