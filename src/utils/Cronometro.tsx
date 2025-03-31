import { useCronometro } from "@/hooks/useCronometro";
import { ButtonUtils } from "./Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useEstudoContext } from "@/context/estudosContext";
import { motion } from "framer-motion";

interface CronometroProps {
  disciplina: string;
  tema: string;
}

export const Cronometro = ({ disciplina, tema }: CronometroProps) => {
  const { addEstudo } = useEstudoContext();

  const {
    horas,
    minutos,
    segundos,
    milissegundos,
    iniciarCronometro,
    pausarCronometro,
    resetarCronometro,
    salvarTempo,
  } = useCronometro();

  const [modalAberto, setModalAberto] = useState(false);
  const [tempoSalvo, setTempoSalvo] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  const validarIniciarCronometro = () => {
    if (!disciplina || !tema) {
      setErro(
        "Por favor, preencha os campos de disciplina e tema para iniciar o cronômetro."
      );
      setTimeout(() => setErro(""), 3000);
      return;
    }
    setErro("");
    iniciarCronometro();
  };

  const abrirModalSalvar = () => {
    const tempo = salvarTempo();
    pausarCronometro();
    setTempoSalvo(tempo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleSalvarEstudo = () => {
    if (tempoSalvo && disciplina && tema) {
      addEstudo(disciplina, tema, tempoSalvo);
      resetarCronometro();
      setModalAberto(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-purple-400 w-full max-w-xl p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center w-full mb-6">
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl font-bold text-black">
            {String(horas).padStart(2, "0")}
          </span>
          <div className="w-full h-px bg-black my-2"></div>
          <span className="text-sm sm:text-lg font-mono text-black">horas</span>
        </div>

        <span className=" mb-14 text-5xl sm:text-7xl font-bold text-black mx-1">
          :
        </span>

        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl font-bold text-black">
            {String(minutos).padStart(2, "0")}
          </span>
          <div className="w-full h-px bg-black my-2"></div>
          <span className="text-sm sm:text-lg font-mono text-black">
            minutos
          </span>
        </div>

        <span className=" mb-14 text-5xl sm:text-7xl font-bold text-black mx-1">
          :
        </span>

        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <span className="text-5xl sm:text-7xl font-bold text-black">
              {String(segundos).padStart(2, "0")}
            </span>
            <span className="text-2xl sm:text-4xl font-bold text-black mb-1">
              .{String(milissegundos).padStart(2, "0")}
            </span>
          </div>
          <div className="w-full h-px bg-black my-2"></div>
          <div className="flex gap-2">
            <span className="text-sm sm:text-lg font-mono text-black">
              segundos
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        <ButtonUtils value="Iniciar" onClick={validarIniciarCronometro} />
        <ButtonUtils value="Pausar" onClick={pausarCronometro} />
        <ButtonUtils value="Zerar" onClick={resetarCronometro} />
        <ButtonUtils value="Salvar Tempo" onClick={abrirModalSalvar} />
      </div>

      {erro && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-3 bg-red-400 text-white rounded-lg text-center"
        >
          {erro || "O cronômetro está zerado!"}
        </motion.div>
      )}

      <AlertDialog open={modalAberto} onOpenChange={fecharModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja salvar seu estudo?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={fecharModal}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSalvarEstudo}>
              Salvar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
