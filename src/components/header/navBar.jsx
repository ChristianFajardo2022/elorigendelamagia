import { useEffect, useState } from "react";

import { Burger } from "./Burger";

import gsap from "gsap";

export const NavBar = ({ activeMenu, setActiveMenu }) => {
  const handleClick = () => {
    setActiveMenu((prevActive) => !prevActive);
  };

  return (
    <nav className="relative top-0 left-0 z-[200] w-6 h-6">
      <Burger handleClick={handleClick} active={activeMenu} />
    </nav>
  );
};
