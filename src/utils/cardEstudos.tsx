"use client";

import { useEstudoContext } from "@/context/estudosContext";

export default function EstudosCard() {
  const { estudos } = useEstudoContext();

  // Não renderiza nada se não houver estudos
  if (!estudos || estudos.length === 0) {
    return null;
  }

  return (
    <div className="bg-purple-800 w-full mt-4 max-w-4xl rounded-xl p-2 shadow-lg flex flex-col justify-center items-center gap-2 hover:scale-[1.02]">
      <div className="grid grid-cols-1  gap-6 w-full">
        {estudos.map((estudo, index) => (
          <div
            key={index}
            className="bg-purple-800 w-full rounded-2xl p-1 shadow-lg transition-all "
          >
            <div className="bg-purple-100 p-4 rounded-lg shadow-md w-full h-full flex flex-col min-h-full">
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-purple-800 mb-2">
                  {estudo.disciplina}
                </h3>
                <p className="text-gray-600">{estudo.tema}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
