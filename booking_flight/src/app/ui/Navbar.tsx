import NavLinks from "./component/nav/Nav-Links";
import { MdFlight } from "react-icons/md";
import { inter,lusitana } from "./component/asset/font";
import Link from "next/link";
export default function Navbar() {
    return (
      <nav className="flex flex-1 justify-around items-center gap-5 p-3  bg-blue-600">
        <div className="flex-center">
          <MdFlight className="text-4xl text-white" />
          <h1 className={`${lusitana.className} text-3xl font-serif font-bold text-white `}>FLYWITUS</h1>
          
        </div>
        
        <div><NavLinks/></div>
        <Link href='/dashboard/8/my-booking' className="border-2 rounded-full py-2 px-5 font-serif font-bold border-black text-xl bg-white text-blue-600 hover:text-white hover:bg-gray-500 transition duration-500 ease-in-out">Your Flight</Link>
      </nav>
    );
}