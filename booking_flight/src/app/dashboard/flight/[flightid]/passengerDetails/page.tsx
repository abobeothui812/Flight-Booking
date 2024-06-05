import { poppins } from "@/app/ui/component/asset/font"
import PassengerDetailsForm from "@/app/ui/component/passengerDetails/passengerDetailsForm"
export default async function Page(){
    return(
        <main className="flex-center flex-col">
            <div className="w-3/4 border-2 mt-20 flex flex-col gap-7">
                <h3 className={`${poppins.className} text-4xl font-bold`}>Ha Noi to Ho Chi Minh City</h3>
                <h3 className="text-3xl font-bold">Passenger Details
                    <p className="text-xl text-slate-300 font-normal">Fill in your personal</p>
                </h3>

                <PassengerDetailsForm/>
            </div>
        </main>
    )
}