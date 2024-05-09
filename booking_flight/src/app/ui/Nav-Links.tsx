import Link from "next/link";
const Links =[
    {href:"/",name:"Home"},
    {href:"/",name:"About Us"},
    {href:"/",name:"Contact"},
    {href:"/",name:"Your Flight"},
    
]
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