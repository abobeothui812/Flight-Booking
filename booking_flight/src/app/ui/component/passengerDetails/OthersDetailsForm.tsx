'use client'
import InputText from "./inputText"
import { useFormState } from "react-dom"
import { lusitana,inter } from "../asset/font"
import { SaveOtherPassengerDetails } from "@/app/lib/action"
export default function OthersDetailsForm({PassengerType,order,bookingid}:{PassengerType:string,order:number,bookingid:string}) {
    const initialState = {message: "",errors : {}};
    const [state, dispatch] = useFormState(SaveOtherPassengerDetails,initialState);
    return (
        <div className="flex flex-col gap-5 ">
            <p className={`${inter.className} text-3xl font-semibold capitalize`}>{PassengerType} {order}</p>
            <form className="grid-cols-2 grid gap-x-16 gap-y-8 " action={dispatch} >
                <InputText name="FirstName" labeltext="First Name" type="text" placeholder='First Name'></InputText> 
                <InputText name="LastName" labeltext="Last Name" type="text" placeholder="Last Name"></InputText> 
                <InputText name="Passport" labeltext="Passport Number" type="text" placeholder="XXXXXXXXXXXX"></InputText>
                <InputText name="Nationality" labeltext='Nationality' type='text' placeholder='Nationality'></InputText>
                <InputText name="DOB" labeltext="Date Of Birth" type="date" placeholder="YYYY-MM-DD"></InputText>
                <div className="flex flex-col">
                    <label className={`text-xl ${inter.className} font-semibold`} htmlFor="Gender" >Gender</label>
                    <div id="Gender" className="flex h-[70px] justify-start items-center gap-4">
                    <div className="flex-center gap-3"><input value='Male'  type="radio" name='Gender' /><label className="text-lg">Male</label></div>
                    <div className="flex-center gap-3"><input value='Female' type="radio" name='Gender' /><label className="text-lg">Female</label></div>
                    <div className="flex-center gap-3"><input value='Prefer not to say'  type="radio" name='Gender' /><label className="text-lg">Prefer not to say</label></div>
                    </div>
                </div>
                <input type="hidden" name="bookingid" value={bookingid} />
                <input type="hidden" name="seatfor" value={PassengerType} />
            <button type="submit" className="BlueBtn w-[150px] h-[50px]">Save</button>
            </form>
        </div>
    )
}