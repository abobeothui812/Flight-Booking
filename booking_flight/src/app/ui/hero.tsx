import Image from "next/image";
import header from "../../../public/assets/header.jpg"
import { poppins } from "./component/asset/font";
export default function Hero() {
    return (
      <div className="flex justify-center items-center flex-col gap-2">
        <h2 className={` ${poppins.className}  flex-center text-center leading-tight  font-bold text-5xl mt-24 capitalize`}>
            Find and book <br /> a great experience
        </h2>
        <Image
        src={header}
        alt = "picture of a flight"
        width={1200}
        height={300}>
        </Image>
      </div>
    );
}