import { useState, useRef, useEffect } from "react";

export const useCronometro = () => {
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [milissegundos, setMilissegundos] = useState(0);
  const [emExecucao, setEmExecucao] = useState(false);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  const iniciarCronometro = () => {
    if (emExecucao) return;
    setEmExecucao(true);
    intervaloRef.current = setInterval(() => {
      setMilissegundos((msAnterior) => {
        if (msAnterior === 99) {
          // Ajustado para 2 dígitos
          setSegundos((segAnterior) => {
            if (segAnterior === 59) {
              setMinutos((minAnterior) => {
                if (minAnterior === 59) {
                  setHoras((horaAnterior) => horaAnterior + 1);
                  return 0;
                }
                return minAnterior + 1;
              });
              return 0;
            }
            return segAnterior + 1;
          });
          return 0;
        }
        return msAnterior + 1;
      });
    }, 10);
  };

  const pausarCronometro = () => {
    setEmExecucao(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  const resetarCronometro = () => {
    pausarCronometro();
    setHoras(0);
    setMinutos(0);
    setSegundos(0);
    setMilissegundos(0);
  };

  const salvarTempo = () => {
    const tempo = `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
      2,
      "0"
    )}:${String(segundos).padStart(2, "0")}.${String(milissegundos).padStart(
      2,
      "0"
    )}`;
    console.log("Tempo salvo:", tempo);
    resetarCronometro();
    return tempo;
  };

  useEffect(() => {
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, []);

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
