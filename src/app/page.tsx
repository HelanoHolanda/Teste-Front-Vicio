"use client";

import { useSelect } from "@/hooks/useSelect";
import { Cronometro } from "@/utils/Cronometro";
import Header from "@/utils/Header";
import { SelectStudy } from "@/utils/SelectStudy";

import EstudosCard from "./cardEstudo/page";
import Descricao from "@/utils/Descricao";
import { useEffect } from "react";

export default function Home() {
  const disciplina = useSelect();
  const tema = useSelect();

  useEffect(() => {
    if (disciplina.value) {
      localStorage.setItem("disciplina", disciplina.value);
    }
    if (tema.value) {
      localStorage.setItem("tema", tema.value);
    }
  }, [disciplina.value, tema.value]);

  useEffect(() => {
    const pegardadosDisciplina = localStorage.getItem("disciplina");
    const pegardadosTemas = localStorage.getItem("tema");

    if (pegardadosDisciplina) {
      disciplina.setValue(pegardadosDisciplina);
    }
    if (pegardadosTemas) {
      tema.setValue(pegardadosTemas);
    }
  }, []);

  return (
    <>
      <Header />
      <Descricao label="Maratona de Estudos" />
      <div className="bg-[url(/novo-bg.png)] w-full flex justify-center items-center flex-col gap-8 px-4">
        <div className="bg-purple-800 w-full mt-16 max-w-4xl rounded-2xl p-6 shadow-lg flex flex-col justify-center md:flex-row items-center gap-4">
          <div className="flex flex-col gap-4">
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
          <Cronometro disciplina={disciplina.value} tema={tema.value} />
        </div>
        <EstudosCard />
      </div>
    </>
  );
}
