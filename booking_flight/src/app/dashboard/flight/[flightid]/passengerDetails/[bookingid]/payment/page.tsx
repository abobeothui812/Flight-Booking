import PaymentDetails from "@/app/ui/component/payment/PaymentDetails"
import FlightSummary from "@/app/ui/component/payment/flightsummary"
import { lusitana } from "@/app/ui/component/asset/font"
import { fetchBookedFlight,fetchBooking,fetchBookingPassenger } from "@/app/lib/data";
export default async function Page({ params } : {params : {bookingid : string,flightid : string}}){
    const BookedFlight = await fetchBookedFlight({flightid : params.flightid});
    const Booking = await fetchBooking({Bookingid : params.bookingid});
    const Bookingpassenger = await fetchBookingPassenger({Bookingid : params.bookingid});
    
    return(
        <main className="flex-center">
            <div className="w-[1200px] flex justify-center gap-5 items-start flex-row mt-20  ">
                <div className="w-4/6 h-full shadow-md rounded-lg "> 
                <div className="w-full h-[80px] flex items-center bg-sky-300 rounded-t-lg px-5 py-7">
                <p className={`${lusitana.className} text-4xl font-bold`}>Payment Details</p>
                </div>
                <div className="px-5 py-7">
                    <PaymentDetails></PaymentDetails>
                </div>
                </div>
                <div className="w-2/6 shadow-md rounded-b-lg">
                    <FlightSummary flight={BookedFlight} booking={Booking} Bookingpassenger ={Bookingpassenger}></FlightSummary>
                </div>
            </div>
        </main>
    )
}