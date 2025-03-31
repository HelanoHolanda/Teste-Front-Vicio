"use client";
import { BookText } from "lucide-react";
interface DescricaoProps {
  label: string;
}

const Descricao = ({ label }: DescricaoProps) => {
  return (
    <div className="w-full max-w-2x lg:max-w-5xl flex mt-4 h-[40px]">
      <div className="bg-purple-800 rounded-r-full px-8 lg:px-16 py-4 shadow-xl flex items-center gap-4 lg:w-full">
        <BookText className="h-8 w-9 text-white" />
        <h1 className="text-white font-mono text-md tracking-widest lg:text-2xl">
          {label}
        </h1>
      </div>
    </div>
  );
};

export default Descricao;
