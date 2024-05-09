import NavLinks from "./Nav-Links";
export default function Navbar() {
    return (
      <nav className="flex flex-1 justify-center items-center gap-5 p-3 border-2 border-slate-300">
        <div><NavLinks/></div>
      </nav>
    );
}