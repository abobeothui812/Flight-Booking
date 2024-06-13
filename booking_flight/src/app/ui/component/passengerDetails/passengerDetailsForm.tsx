'use client'
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useSearchParams,useRouter } from "next/navigation"
import InputText from "./inputText" // Import the inputText component
import { SaveUserDetails } from "@/app/lib/action"
import { bookingInformation } from "@/app/lib/definition";
export default function PassengerDetailsForm( {booking}:{booking: bookingInformation}){
    const newParam = useSearchParams();
    const router = useRouter();
    const initialState = {message: "",errors : {}};
    const [state, dispatch] = useFormState(SaveUserDetails,initialState); 
    const [showMessage, setShowMessage] = useState(false);
    
    useEffect(() => {
        let timer : NodeJS.Timeout;
        if(showMessage){
            timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    },[showMessage]);
     const handleMessage = () => {
        setShowMessage(true);}
    return(
        <div className="flex justify-start flex-col  gap-8">
            <form className="grid-cols-2 grid gap-x-16 gap-y-8 " action={dispatch}>
                <InputText  name="FirstName" labeltext="First Name" type="text" placeholder='First Name'></InputText> 
                <InputText name="LastName" labeltext="Last Name" type="text" placeholder="Last Name"></InputText> 
                <InputText name="Email" labeltext="Email Adress" type="text" placeholder="your@email.com"></InputText> 
                <InputText name="Phone" labeltext="Phone Number" type="text" placeholder="+(XX) XX XX XX XX"></InputText>
                <input type="hidden" name="bookingid" value={booking.bookingid} />
                <button onClick={handleMessage}   type="submit" className="BlueBtn w-[150px] text-lg h-[50px]">Save</button>
            </form>
            {showMessage && <p className={`text-green-600`}>Your information has been saved</p>}
        </div>
    )
}