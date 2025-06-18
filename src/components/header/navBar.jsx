import { useEffect, useState } from "react";

import { Burger } from "./Burger";

import gsap from "gsap";

export const NavBar = ({ logo }) => {
  const [showLogo, setShowLogo] = useState(true);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prevActive) => !prevActive);
  };
  useEffect(() => {
    if (active) {
      gsap.to(".menuLink", {
        opacity: 1,
        display: "flex",
        paddingTop: "3rem",
        ease: "power1.inOut",
        duration: 0.5,
      });
    } else {
      gsap.to(".menuLink", {
        opacity: 0,
        display: "none",
        paddingTop: "0rem",
        ease: "power1.inOut",
        duration: 0.5,
      });
    }
  }, [active]);

  return (
    <nav className="relative top-0 left-0 z-[200] w-6 h-6">
      <Burger handleClick={handleClick} showLogo={showLogo} active={active} />
    </nav>
  );
};
