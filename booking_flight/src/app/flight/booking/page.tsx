import { inter, lusitana, poppins } from "../../ui/component/asset/font";
import FlightConfirmModal from "@/app/ui/component/bookingFlight/FlightConfirmModal";
export default function Page() {
    return (
        <main className="flex-center  ">
            <div className="flex justify-center mt-20 gap-5    flex-col items-start min-w-[1300px]">
                <p className={`${poppins.className} text-4xl font-bold`}>Flight Details</p>
                <div className="border-2 w-full">
                    <FlightConfirmModal></FlightConfirmModal>
                    
                </div>
            </div>


            
        </main>
    );
}