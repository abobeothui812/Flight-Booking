import Image from "next/image";
import Link from "next/link";
import flight from "../../public/assets/flight.jpg"
export default function Home() {
  return (
    <main>
      
      <div className=" w-full h-full relative">

          <Link className=" BlueBtn  w-[120px] h-[120px]"  href='/login'>
              Login
          </Link>

      </div>
      
    </main>
  );
}
 