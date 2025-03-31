"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEstudoContext } from "@/context/estudosContext";
import Header from "@/utils/Header";
import Descricao from "@/utils/Descricao";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

function formatarTempo(tempo: number): string {
  const horas = (tempo / 3600).toFixed(1);
  return `${horas}h`;
}

export default function GraficoEstudos() {
  const { estudos } = useEstudoContext();

  // Agrupa por disciplina e soma os tempos
  const chartData = estudos.reduce((acc, estudo) => {
    const disciplinaExistente = acc.find(
      (item) => item.disciplina === estudo.disciplina
    );

    if (disciplinaExistente) {
      disciplinaExistente.tempo += estudo.tempo;
    } else {
      acc.push({
        disciplina: estudo.disciplina,
        tempo: estudo.tempo,
        fill: COLORS[acc.length % COLORS.length],
      });
    }
    return acc;
  }, [] as { disciplina: string; tempo: number; fill: string }[]);

  return (
    <div className="flex flex-col w-full">
      <Header />

      <div className="w-full ">
        <div className="w-full flex justify-start">
          <Descricao label="Rotina de Estudos" />
        </div>

        <div className="flex justify-center items-center w-full mt-8 lg:mt-16 px-6">
          <Card className="bg-purple-800 text-white rounded-xl  w-full max-w-4xl">
            <CardHeader className="px-6 pt-4 pb-2">
              <CardTitle className="text-lg font-semibold">
                Tempo por Disciplina
              </CardTitle>
              <CardDescription className="text-violet-100 text-sm">
                Seu tempo total de estudo
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-2 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 2, bottom: 10 }}
                  barSize={20}
                >
                  <XAxis
                    type="number"
                    tick={{ fill: "#e9d5ff", fontSize: 12 }}
                    axisLine={{ stroke: "#c084fc" }}
                    tickFormatter={formatarTempo}
                  />
                  <YAxis
                    dataKey="disciplina"
                    type="category"
                    tick={{ fill: "#f3e8ff", fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(109, 40, 217, 0.9)",
                      borderColor: "#8b5cf6",
                      borderRadius: "0.5rem",
                      color: "white",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [
                      formatarTempo(Number(value)),
                      "Tempo",
                    ]}
                    labelFormatter={(label) => `Disciplina: ${label}`}
                  />
                  <Bar
                    dataKey="tempo"
                    name="Tempo"
                    radius={[0, 6, 6, 0]}
                    fill="#ffffff"
                    opacity={0.9}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>

            <CardFooter className="px-6 pb-3 pt-2 flex items-center justify-between">
              <div className="flex gap-2 items-center text-sm">
                <TrendingUp className="h-4 w-4 text-white" />
                <span className="text-violet-50">Evolução </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
