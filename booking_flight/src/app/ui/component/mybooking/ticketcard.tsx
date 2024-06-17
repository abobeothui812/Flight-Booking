import { poppins,inter } from "../asset/font";
import { MdFlight } from "react-icons/md";
import { RiFlightTakeoffLine } from "react-icons/ri";
import Image from "next/image";
export default function Ticketcard({passenger}: {passenger : any[]}){
    passenger.departdate = new Date(passenger.departdate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      passenger.arrivaldate = new Date(passenger.arrivaldate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    function generateRandomString() {
        // Tạo số ngẫu nhiên từ 0 đến 9
        const randomNumber = Math.floor(Math.random() * 10);
        
        // Tạo một mảng chứa các chữ từ A đến E
        const letters = ['A', 'B', 'C', 'D', 'E'];
        
        // Chọn ngẫu nhiên một chữ từ mảng letters
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        
        // Kết hợp số và chữ để tạo chuỗi
        return `${randomNumber}${randomLetter}`;
      }
      function randomizeNumber() {
        return Math.floor(Math.random() * 20) + 1;
      }
    return (
        <div className="container  rounded-3xl w-5/6 h-[320px] w-ful  flex ">
                <div className="w-9/12 h-full bg-gray-100 flex flex-col rounded-r-3xl border-black  border-2 ">
                    <div  className="w-10/12  border-b-2 border-r-2 border-black flex flex-row items-center gap-3  px-2 py-1 rounded-bl-2xl rounded-br-full bg-sky-400 h-[60px]">
                        <RiFlightTakeoffLine className="text-5xl text-white" />
                        <p className={`${inter.className} text-white font-semibold text-4xl`}>Boarding Pass</p>
                    </div>
                        <div className="flex flex-col px-6 mt-3">
                            <div className="flex flex-row justify-between items-center mb-1 w-11/12">
                                <div className="flex flex-col ">
                                    <p className="font-mono text-xl text-gray-500 ">From</p>
                                    <h2 className={`${poppins.className} text-6xl font-bold`}>{passenger.departairportid}</h2>
                                    <p className={`${inter.className} font-semibold text-blue-500 text-3xl`}>{passenger.departcity}</p>
                                    <p className="font-semibold">{passenger.departdate}</p>
                                    <p className="font-semibold">10:30 AM</p>
                                </div>
                                    <MdFlight className="text-9xl rotate-90" />

                                <div className="flex flex-col ">
                                    <p className="font-mono text-gray-500 text-xl ">From</p>
                                    <h2 className={`${poppins.className} text-6xl font-bold`}>{passenger.arrivalairportid}</h2>
                                    <p className={`${inter.className} font-semibold text-blue-500 text-3xl`}>{passenger.arrivalcity}</p>
                                    <p className="font-semibold">{passenger.arrivaldate}</p>
                                    <p className="font-semibold">10:30 AM</p>
                                </div>
                            </div>
                           
                            <div className="flex flex-row justify-between   items-center w-5/6  ">
                                <div>
                                    <p className="text-sm">Passenger Name</p>
                                    <p className="font-semibold">{passenger.firstname} {passenger.lastname}</p>
                                </div>
                                <div>
                                    <p className="text-sm">Flight</p>
                                    <p className="font-semibold">{passenger.flightnumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm">Seat</p>
                                    <p className="font-semibold">{generateRandomString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm">Gate</p>
                                    <p className="font-semibold">{randomizeNumber()}</p>
                                </div>
                            </div>
                        
                    </div>
            </div>    
                
            <div className="w-3/12 flex flex-col items-end h-full bg-blue-900 rounded-l-3xl border-l-2 border-b-2 border-black">
                <div  className="w-11/12 rounded-tr-3xl flex border-2 border-black flex-row justify-end items-center gap-3  px-2 py-1 rounded-bl-full bg-sky-400 h-[60px]">
                    <p className={`${inter.className} text-white font-semibold text-2xl`}>Boarding Pass</p>
                </div>

                <div  className="w-full flex flex-col gap-1 p-3">
                    <p className={`${inter.className} text-white font-semibold text-3xl`}>{passenger.seattype}</p>
                    <div>
                    <p className={`${inter.className} text-gray-300 font-semibold text-sm`}>Passenger Name:</p>
                    <p className={`${inter.className} text-white font-semibold text-xl`}>{passenger.firstname} {passenger.lastname}</p>
                    </div>
                    <div>
                    <p className={`${inter.className} text-gray-300 font-semibold text-sm`}>From:</p>
                    <p className={`${inter.className} text-white font-semibold text-lg`}>{passenger.departcity} ({passenger.departairportid})</p>
                    </div>
                    <div>
                    <p className={`${inter.className} text-gray-300 font-semibold text-sm`}>To:</p>
                    <p className={`${inter.className} text-white font-semibold text-lg`}>{passenger.arrivalcity} ({passenger.arrivalairportid})</p>
                    </div>
                </div>

                <div  className=" rounded-tr-3xl flex justify-center w-full  mb-1 items-end  gap-3 rounded-bl-full  h-[40px]">
                    <p className={`${inter.className} text-white font-semibold text-2xl`}>Viet Nam Airlines</p>
                </div>
            
            </div>

            
            
        </div>
    );
}