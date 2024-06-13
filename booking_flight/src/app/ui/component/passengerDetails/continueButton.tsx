'use client'
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
export default function ContinueButton(){
    const pathName = usePathname();
    console.log(pathName);
    return(
        <div className="w-full flex-center">
            <Link className="BlueBtn flex-center w-[200px] h-[50px]" href={`${pathName}/payment`}>Continue</Link>
        </div>
    )
}