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
                <li className="text-2xl font-thin leading-normal hover:scale-125 transition duration-500 ease-in-out"><Link className="" href={link.href}>{link.name}</Link></li>
            ) )
        }
      </ul>
    );
}