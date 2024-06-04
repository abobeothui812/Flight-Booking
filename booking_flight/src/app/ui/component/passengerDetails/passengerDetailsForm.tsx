'use client'
import { useFormState } from "react-dom"
import InputText from "./inputText" // Import the inputText component

export default function PassengerDetailsForm(){
    return(
        <form action="">
            <InputText name="Email" labeltext="Email Adress" type="text"></InputText> 
            <InputText name="PhoneNumber" labeltext="Phone Number" type="text"></InputText> 
            <InputText name="PassengerName" labeltext="Passenger Name" type="text"></InputText> 
            <InputText name="DOB" labeltext="Date of Bitrh" type="date"></InputText> 
            <InputText name="Email" labeltext="Email Adress" type="text"></InputText> 
        </form>
    )
}