import { poppins } from "@/app/ui/component/asset/font"
import PassengerDetailsForm from "@/app/ui/component/passengerDetails/passengerDetailsForm"
import { fetchFlightid } from "@/app/lib/data";
import OtherDetails from "@/app/ui/component/passengerDetails/OtherDetails";
import { fetchBookingid } from "@/app/lib/data";
import ContinueButton from "@/app/ui/component/passengerDetails/continueButton";
import Link from "next/link";
export default async function Page({ params } : {params : {bookingid : string}}) {
    const booking  = await fetchBookingid({params});
    return(
        <main className="flex-center flex-col">
            <div className="w-[1100px]  mt-10 flex flex-col gap-16">
                <h3 className={`${poppins.className} text-5xl font-bold`}>Ha Noi to Ho Chi Minh City</h3>
                <div className="gap-4 flex flex-col mb-16">
                    <h3 className="text-4xl font-bold">Passenger Details
                        <p className="text-2xl text-slate-400 font-normal">Fill in your personal</p>
                    </h3>
                    <PassengerDetailsForm booking={booking} />
                </div>
                <OtherDetails booking={booking} ></OtherDetails>
                <ContinueButton></ContinueButton>
            </div>
        </main>
    )
}