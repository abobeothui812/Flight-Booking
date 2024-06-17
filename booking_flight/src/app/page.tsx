import Image from "next/image";
import Link from "next/link";
import { MdFlight } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { MdFlightTakeoff } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { inter,poppins } from "./ui/component/asset/font";
export default function Home() {
  return (
    <main>
      
      <div className=" w-full flex-center flex-col mt-10 h-full relative">
          <div className="flex-center">
            <h2 className={`${poppins.className} font-bold text-8xl`}>Welcome to flywithus</h2>
            <MdFlight className="text-8xl text-blue-600"/>
          </div>
          <h3 className={`${poppins.className} text-gray-600 mt-5 text-3xl`}>Choose the version you want to use</h3>
          <div className=" w-full gap-24 mt-32 flex-center flex-row">
            <div className="flex-center w-1/3 flex-col gap-3">
                <SlPeople className="text-9xl text-blue-600"/>
                <h1 className={`${poppins.className} text-4xl font-semibold`}>User version</h1>
                <h2 className="text-gray-600">Easily Book Your Flights Online with Us</h2>
                <Link href='/dashboard' className="BlueBtn">Choose this version</Link>

            </div>

            <div className="flex-center w-1/3  flex-col gap-3">
                <MdFlightTakeoff className="text-9xl text-blue-600"/>
                <h1 className={`${poppins.className} text-4xl font-semibold`}>Airline version</h1>
                <h2 className="text-gray-600">Your Trusted Partner for Online Flight Bookings</h2>
                <Link href='/airlineversion' className="BlueBtn">Choose this version</Link>

            </div>

            <div className="flex-center w-1/3  flex-col gap-3">
                <GrUserAdmin className="text-9xl text-blue-600"/>
                <h1 className={`${poppins.className} text-4xl font-semibold`}>Admin version</h1>
                <h2 className="text-gray-600">(Still under development)</h2>
                <Link href='/admin' className="BlueBtn">Choose this version</Link>

            </div>

          </div>

      </div>
      
    </main>
  );
}
 