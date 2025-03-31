"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Estudo } from "@/context/estudosContext";

export function EstudosCard({
  estudo,
  isLoading = false,
}: {
  estudo?: Estudo;
  isLoading?: boolean;
}) {
  if (isLoading || !estudo) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-bl from-violet-500 to-fuchsia-500 w-full max-w-4xl rounded-2xl p-6 shadow-lg">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-purple-800">
              {estudo.disciplina}
            </h3>
            <p className="text-gray-600">{estudo.tema}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-800">{estudo.tempo}</p>
        </div>
      </div>
    </div>
  );
}
