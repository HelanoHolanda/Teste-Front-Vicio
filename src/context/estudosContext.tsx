"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Estudo {
  disciplina: string;
  tema: string;
  tempo: number;
}

interface EstudoContextType {
  estudos: Estudo[];
  addEstudo: (disciplina: string, tema: string, tempo: number) => void;
}

export const estudosContext = createContext<EstudoContextType | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [estudos, setEstudos] = useState<Estudo[]>([]);

  useEffect(() => {
    const estudosSalvos = window.localStorage.getItem("meus_estudos");
    if (estudosSalvos) {
      setEstudos(JSON.parse(estudosSalvos));
    }
  }, []);

  const addEstudo = (disciplina: string, tema: string, tempo: number) => {
    const novoEstudo: Estudo = {
      disciplina,
      tema,
      tempo,
    };
    setEstudos((prev) => {
      const novosEstudos = [...prev, novoEstudo];

      // Atualiza o localStorage com todos os estudos
      window.localStorage.setItem("meus_estudos", JSON.stringify(novosEstudos));

      return novosEstudos;
    });
  };

  return (
    <estudosContext.Provider value={{ estudos, addEstudo }}>
      {children}
    </estudosContext.Provider>
  );
}

export function useEstudoContext() {
  const context = useContext(estudosContext);
  if (!context) {
    throw new Error("useStudyContext must be used within a StudyProvider");
  }
  return context;
}
