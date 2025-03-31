"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEstudoContext } from "@/context/estudosContext";

export default function EstudosCard({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  const { estudos } = useEstudoContext();

  // Exibir skeleton enquanto carrega
  if (isLoading || !estudos || estudos.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-4">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:flex md:flex-wrap md:justify-center md:gap-6">
      {estudos.map((estudo, index) => (
        <div
          key={index}
          className="bg-purple-800 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] rounded-2xl p-1 shadow-lg transition-all hover:scale-[1.02]"
        >
          <div className="bg-purple-100 p-4 rounded-lg shadow-md w-full h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-purple-800 mb-2">
                  {estudo.disciplina}
                </h3>
                <p className="text-gray-600">{estudo.tema}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
