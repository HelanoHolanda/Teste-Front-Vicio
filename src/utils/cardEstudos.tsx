"use client";

import { useEstudoContext } from "@/context/estudosContext";

export default function EstudosCard() {
  const { estudos } = useEstudoContext();

  if (!estudos || estudos.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      {estudos.map((estudo, index) => (
        <div
          key={index}
          className="w-full max-w-2xl bg-white border-2 border-purple-800 rounded-xl p-6 shadow-lg transition-all hover:scale-[1.02]"
        >
          <h3 className="font-bold text-lg text-purple-800 mb-2">
            {estudo.disciplina}
          </h3>
          <p className="text-gray-600">{estudo.tema}</p>
        </div>
      ))}
    </div>
  );
}
