import { poppins,inter } from "./component/asset/font";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { IoHappyOutline } from "react-icons/io5";

export default function Whybookwithus() {
    
    return(
        <div className="w-[1300px] h-[600px] flex flex-col gap-14 justify-center items-start">
            <h2 className={`${poppins.className} font-bold text-5xl`}>Why book with flywitus?</h2>
            <div className="flex justify-center mt-10 items-center w-full gap-12">
                <div className="flex-center flex-col w-1/3 gap-4">
                    <CiCreditCard1 className='text-8xl text-blue-600' />
                    <h3 className={`${inter.className} font-bold text-3xl`}>Best Price Guarantee</h3>
                    <p className={`${inter.className} text-gray-500 text-center text-lg`}>Book with confidence knowing you're getting the best deal. If you find a lower fare elsewhere, we'll match it.
                         Travel smart with our unbeatable price guarantee!</p>
                </div>
                <div className="flex-center flex-col w-1/3 gap-4">
                    <FaRegClock className='text-7xl text-blue-600' />
                    <h3 className={`${inter.className} mt-5 font-bold text-3xl`}>24/7 Customer Service</h3>
                    <p className={`${inter.className} text-gray-500 text-center text-lg`}>Our dedicated support team is available around the clock to assist you. Whether you need help booking a flight or have a question, we're here for you 24/7.</p>
                </div>
                <div className="flex-center flex-col w-1/3 gap-4">
                    <IoHappyOutline className='text-8xl text-blue-600'  />
                    <h3 className={`${inter.className} font-bold text-3xl`}>Easy Booking</h3>
                    <p className={`${inter.className} text-gray-500 mb-8 text-center text-lg`}>Experience a hassle-free booking process with our user-friendly platform. Find and book your flights in just a few clicks!</p>
                </div>
        </div>
        </div>
    )
}