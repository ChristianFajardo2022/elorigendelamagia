import React from "react";

export const Burger = ({ active, handleClick, showLogo }) => {
  return (
    <span
      onClick={handleClick}
      className={`${
        active ? "active" : ""
      } absolute burger w-6 cursor-pointer items-center h-5/6 flex flex-col justify-between z-[201]`}
    >
      <div className={`line bg-whiteInter lineBurger lineBurger1`}></div>
      <div className={`line bg-whiteInter lineBurger lineBurger2`}></div>
      <div className={`line bg-whiteInter lineBurger lineBurger3`}></div>
    </span>
  );
};
