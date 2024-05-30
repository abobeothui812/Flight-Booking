import { inter, lusitana, poppins } from "../../ui/component/asset/font";
import FlightDetail from "@/app/ui/component/bookingFlight/FlightDetail";
export default function Page() {
    return (
        <main className="flex-center  ">
            <div className="flex justify-center mt-24 flex-col items-start min-w-[1300px]">
                <p>Flight Details</p>
                <div className="border-2">
                    <FlightDetail></FlightDetail>
                    <FlightDetail></FlightDetail>
                </div>
            </div>


            
        </main>
    );
}