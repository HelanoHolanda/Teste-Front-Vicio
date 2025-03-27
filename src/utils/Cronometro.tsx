import { useCronometro } from "@/hooks/useCronometro";
import { ButtonUtils } from "./Button";

export const Cronometro = () => {
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

  return (
    <div className="flex flex-col  items-center bg-purple-400 w-[550px] p-6 rounded-lg">
      <div className="flex justify-around w-full mb-6">
        <div className="flex flex-col items-center">
          <span className="text-7xl font-bold text-gray-700">
            {String(horas).padStart(2, "0")}
          </span>
          <div className="w-full h-px bg-gray-600 my-2"></div>
          <span className="text-lg font-mono text-gray-700">horas</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-7xl font-bold text-gray-700">
            {String(minutos).padStart(2, "0")}
          </span>
          <div className="w-full h-px bg-gray-600 my-2"></div>
          <span className="text-lg font-mono text-gray-700">minutos</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-7xl font-bold text-gray-700">
            {String(segundos).padStart(2, "0")}
          </span>
          <div className="w-full h-px bg-gray-600 my-2"></div>
          <span className="text-lg font-mono text-gray-700">segundos</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-7xl font-bold text-gray-700">
            {String(milissegundos).padStart(2, "0")}
          </span>
          <div className="w-full h-px bg-gray-600 my-2"></div>
          <span className="text-lg font-mono text-gray-700">milissegundos</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 w-full">
        <ButtonUtils value="Iniciar" onClick={iniciarCronometro} />
        <ButtonUtils value="Pausar" onClick={pausarCronometro} />
        <ButtonUtils value="Resetar" onClick={resetarCronometro} />
        <ButtonUtils value="Salvar Tempo" onClick={salvarTempo} />
      </div>
    </div>
  );
};
