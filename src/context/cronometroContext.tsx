"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";

interface CronometroContextType {
  horas: number;
  minutos: number;
  segundos: number;
  milissegundos: number;
  emExecucao: boolean;
  iniciarCronometro: () => void;
  pausarCronometro: () => void;
  resetarCronometro: () => void;
  salvarTempo: () => number;
}

const CronometroContext = createContext<CronometroContextType | null>(null);

export function CronometroProvider({ children }: { children: ReactNode }) {
  const [tempoTotalMs, setTempoTotalMs] = useState(0);
  const [emExecucao, setEmExecucao] = useState(false);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);
  const tempoInicioRef = useRef<number | null>(null);

  useEffect(() => {
    const tempoSalvo = Number(localStorage.getItem("tempoCronometro")) || 0;
    const inicioSalvo = Number(localStorage.getItem("tempoInicio")) || 0;
    const rodando = localStorage.getItem("cronometroRodando") === "true";

    if (rodando && inicioSalvo > 0) {
      const tempoDecorrido = Date.now() - inicioSalvo;
      const tempoCorrigido = tempoSalvo + tempoDecorrido;

      setTempoTotalMs(tempoCorrigido);
      tempoInicioRef.current = Date.now() - tempoCorrigido;
      setEmExecucao(true);

      intervaloRef.current = setInterval(() => {
        setTempoTotalMs(Date.now() - (tempoInicioRef.current || Date.now()));
      }, 100);
    } else {
      setTempoTotalMs(tempoSalvo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tempoCronometro", tempoTotalMs.toString());
  }, [tempoTotalMs]);

  const iniciarCronometro = () => {
    if (emExecucao) return;

    const tempoInicioAtual = Date.now() - tempoTotalMs;
    tempoInicioRef.current = tempoInicioAtual;

    setEmExecucao(true);

    setTimeout(() => {
      localStorage.setItem("cronometroRodando", "true"); // Força a gravação após a atualização do estado
      localStorage.setItem("tempoInicio", tempoInicioAtual.toString());
    }, 10);

    intervaloRef.current = setInterval(() => {
      const novoTempoTotal =
        Date.now() - (tempoInicioRef.current || Date.now());
      setTempoTotalMs(novoTempoTotal);
      localStorage.setItem("tempoCronometro", novoTempoTotal.toString());
    }, 100);
  };

  const pausarCronometro = () => {
    setEmExecucao(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    localStorage.setItem("cronometroRodando", "false");
  };

  const resetarCronometro = () => {
    pausarCronometro();
    setTempoTotalMs(0);
    localStorage.removeItem("tempoCronometro");
    localStorage.removeItem("tempoInicio");
    localStorage.setItem("cronometroRodando", "false");
  };

  const salvarTempo = () => tempoTotalMs;

  useEffect(() => {
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, []);

  const milissegundos = Math.floor((tempoTotalMs % 1000) / 10);
  const segundos = Math.floor((tempoTotalMs / 1000) % 60);
  const minutos = Math.floor((tempoTotalMs / (1000 * 60)) % 60);
  const horas = Math.floor(tempoTotalMs / (1000 * 60 * 60));

  return (
    <CronometroContext.Provider
      value={{
        horas,
        minutos,
        segundos,
        milissegundos,
        emExecucao,
        iniciarCronometro,
        pausarCronometro,
        resetarCronometro,
        salvarTempo,
      }}
    >
      {children}
    </CronometroContext.Provider>
  );
}

export function useCronometro() {
  const context = useContext(CronometroContext);
  if (!context) {
    throw new Error(
      "useCronometro deve ser usado dentro de um CronometroProvider"
    );
  }
  return context;
}
