import Link from "next/link";
import { Links } from "@/app/lib/place-holder";
export default function NavLinks() {
    return (
      <ul className="flex gap-6 ">
        {
            Links.map((link) =>(
                <li className="nav-style"><Link className="" href={link.href}>{link.name}</Link></li>
            ) )
        }
      </ul>
    );
}