import Image from "next/image";
import React from "react";
import logoVicio from "../../public/logo_branca_vicio_marca-1.png";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className="flex justify-around items-center w-full h-[60px] p-4 bg-purple-800">
      <Menu />
      <Image src={logoVicio} alt="" height={70} width={70} />
    </div>
  );
};

export default Header;
