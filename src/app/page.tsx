"use client";

import { Cronometro } from "@/utils/Cronometro";
import Header from "@/utils/Header";
import Descricao from "@/utils/Descricao";
import { useEffect } from "react";
import SelecioneMateria from "@/utils/SelecaoMateria";
import EstudosCard from "@/utils/cardEstudos";
import useSelecao from "@/hooks/useSelecao";

export default function Home() {
  const temasDisciplina: Record<string, string[]> = {
    "Direito Penal": ["Crime Doloso", "Crime Culposo", "Pena Privativa"],
    "Direito Administrativo": [
      "Atos Administrativos",
      "Serviço Público",
      "Licitação e Contratos",
    ],
    "Direito Constitucional": [
      "Direitos Fundamentais",
      "Poder Executivo",
      "Organização do Estado",
    ],
  };

  const disciplina = useSelecao();
  const tema = useSelecao();

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
            <SelecioneMateria
              label="Disciplina"
              options={Object.keys(temasDisciplina)}
              {...disciplina}
              onChange={disciplina.handleChange}
            />

            <SelecioneMateria
              label="Tema"
              options={temasDisciplina[disciplina.value] ?? []}
              {...tema}
              onChange={tema.handleChange}
            />
          </div>
          <Cronometro disciplina={disciplina.value} tema={tema.value} />
        </div>
        <EstudosCard />
      </div>
    </>
  );
}
