"use client";

import { useSelect } from "@/hooks/useSelect";
import { SelectStudy } from "@/utils/SelectStudy";
import { useEffect } from "react";

export default function Home() {
  const disciplina = useSelect();
  const tema = useSelect();

  useEffect(() => {
    tema.reset();
  }, [disciplina.value]);

  return (
    <div className="bg-gray-700 h-full">
      <div className="flex gap-2">
        <SelectStudy
          label="Disciplina"
          options={[
            "Direito Penal",
            "Direito Administrativo",
            "Direito Constitucional",
          ]}
          {...disciplina}
        />
        <SelectStudy
          label="Tema"
          options={["Teoria 1", "Teoria 2", "Teoria 3"]}
          {...tema}
        />
      </div>
      <div className="mt-6 text-white">
        <p>Disciplina selecionada: {disciplina.value || "Nenhuma"}</p>
        <p>Tema selecionado: {tema.value || "Nenhum"}</p>
      </div>
    </div>
  );
}
