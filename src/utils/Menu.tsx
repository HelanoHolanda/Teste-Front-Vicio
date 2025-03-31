"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Home } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

export default function Menu() {
  const caminhoAtual = usePathname();
  const estaNaPaginaGrafico = caminhoAtual === "/grafico";

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="w-6 h-6 text-white" />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader className="space-y-4">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            {estaNaPaginaGrafico ? (
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gray-600" />
                <span>Início</span>
              </Link>
            ) : (
              <Link href="/grafico" className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-gray-600" />
                <span>Rotina de Estudo</span>
              </Link>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
