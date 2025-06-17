import { Logo } from "./logo";
import { NavBar } from "./navBar";
import "./header.css";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center z-50 pt-4 px-20">
      <Logo />
      <NavBar />
    </header>
  );
};
