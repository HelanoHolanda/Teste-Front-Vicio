import { useState, useRef, useEffect } from "react";

export const useCronometro = () => {
  const [tempoTotalMs, setTempoTotalMs] = useState<number>(0);
  const [emExecucao, setEmExecucao] = useState<boolean>(false);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tempoSalvo = Number(localStorage.getItem("tempoCronometro")) || 0;
    const rodando = localStorage.getItem("cronometroRodando") === "true";
    const inicioSalvo = Number(localStorage.getItem("tempoInicio")) || null;

    if (rodando && inicioSalvo) {
      const tempoDecorrido = Date.now() - inicioSalvo;
      setTempoTotalMs(tempoSalvo + tempoDecorrido);
      iniciarCronometro(true, tempoSalvo + tempoDecorrido);
    } else {
      setTempoTotalMs(tempoSalvo);
    }
  }, []);

  const iniciarCronometro = (
    restaurando = false,
    tempoInicial = tempoTotalMs
  ) => {
    if (emExecucao) return;
    setEmExecucao(true);

    const inicio = restaurando
      ? Date.now() - tempoInicial
      : Date.now() - tempoTotalMs;
    localStorage.setItem("cronometroRodando", "true");
    localStorage.setItem("tempoInicio", inicio.toString());

    intervaloRef.current = setInterval(() => {
      setTempoTotalMs(Date.now() - inicio);
    }, 10);
  };

  const pausarCronometro = () => {
    setEmExecucao(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    localStorage.setItem("cronometroRodando", "false");
    localStorage.setItem("tempoCronometro", tempoTotalMs.toString());
  };

  const resetarCronometro = () => {
    pausarCronometro();
    setTempoTotalMs(0);
    localStorage.removeItem("tempoCronometro");
    localStorage.removeItem("tempoInicio");
  };

  const salvarTempo = () => {
    localStorage.setItem("tempoCronometro", tempoTotalMs.toString());
    return tempoTotalMs;
  };

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

  return {
    horas,
    minutos,
    segundos,
    milissegundos,
    emExecucao,
    iniciarCronometro,
    pausarCronometro,
    resetarCronometro,
    salvarTempo,
  };
};
