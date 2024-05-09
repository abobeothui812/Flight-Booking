import NavLinks from "./Nav-Links";
export default function Navbar() {
    return (
      <nav className="flex flex-1 justify-around items-center gap-5 p-3 border-2 border-slate-300">
        <h1 className="text-3xl font-serif font-bold ">Name</h1>
        <div><NavLinks/></div>
        <button className="border-2 rounded-full py-2 px-5 font-serif font-bold border-black text-xl bg-blue-500 text-white hover:bg-blue-700 transition duration-500 ease-in-out">Contact</button>
      </nav>
    );
}