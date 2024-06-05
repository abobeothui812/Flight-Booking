'use client'
import { useFormState } from "react-dom"
import InputText from "./inputText" // Import the inputText component

export default function PassengerDetailsForm(){
    return(
        <form className="grid-cols-2 grid grid-flow-row" action="">
            <InputText name="FirstName" labeltext="First Name" type="text"></InputText> 
            <InputText name="LastName" labeltext="Last Name" type="text"></InputText> 
            <InputText name="Email" labeltext="Email Adress" type="text"></InputText> 
            <InputText name="Phone" labeltext="Phone Number" type="text"></InputText>
        </form>
    )
}