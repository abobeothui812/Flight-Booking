'use client'
import { useFormState,useFormStatus } from "react-dom"
import { useState } from "react";
import { SearchFlight } from "@/app/lib/action";
import DestinationCard from "./DestinationCard";
import TypeCard from "./TypeCard";
import DateInput from "./dateInput";
import clsx from "clsx";
import Link from "next/link";
import { poppins } from "../asset/font";
import { buttons } from "@/app/lib/place-holder";
import { Location } from "@/app/lib/definition";
export default function FlightSearchForm( {LocationData} : {LocationData : Location[]}) {
    const initialState = {message: "",errors : {}};
    
    const [selectedTicketType, setSelectedTicketType] = useState('One Way');
    const [state, dispatch] = useFormState(SearchFlight,initialState);
    function handleButtonClick(value: string) {
    setSelectedTicketType(value);
    }
    const cilentAction = async (formData : FormData) => {
        const newFlight ={
            fromCity : formData.get('fromCity'),
            toCity : formData.get('toCity'),
            fromCountry : formData.get('fromCountry'),
            toCountry : formData.get('toCountry'),
            departureDate : formData.get('DepartureDate') as string,
            returnDate : formData.get('ReturnDate') as string,
            seatClass : formData.get('seatClass'),
            ticketType : formData.get('ticketType'),
            TotalPassengers : formData.get('TotalPassengers'),
            numberOfAdults : formData.get('Adults'),
            numberOfChildren : formData.get('Children'),
            numberOfInfants : formData.get('Infants'),

        }

        alert(`flight from ${newFlight.fromCity} in ${newFlight.fromCountry} to ${newFlight.toCity} in ${newFlight.toCountry} on ${newFlight.departureDate} and return on ${newFlight.returnDate} with ${newFlight.TotalPassengers}(${newFlight.numberOfChildren} children,${newFlight.numberOfAdults} adults, ${newFlight.numberOfInfants} infants) passengers with ${newFlight.ticketType} and ${newFlight.seatClass}`)
    }
    return(
        <form action={dispatch} className="rounded-3xl  mt-20  border-2 flex-center  flex-col shadow-md  w-[1300px] px-2 h-[400px] " >
            <div className="flex-center"
>            {
                buttons.map((btn) => (
                    <button 
                    type="button"
                    key={btn.name} 
                    className= {clsx(`rounded-[5px] ${poppins.className} w-[200px] h-[50px]  font-semibold border-gray-200 border-2 flex-center  effect px-8 py-4 `
                    ,{'bg-blue-600 text-white' : selectedTicketType === btn.name },)}
                    onClick={() => handleButtonClick(btn.name)}
                    >{btn.name}
                    </button>
                ))
            }
            <input type="hidden" name="ticketType" value={selectedTicketType} />
            </div>
            
            <div   className="w-full rounded-2xl border-2 border-gray-200  h-[150px] flex mt-8 mb-6">
                
                <DestinationCard LocationData2={LocationData} type="Departure" city="Ha Noi" airport="Noi Bai Airport" inputCity="fromCity" inputCountry='fromCountry' ></DestinationCard>
                <DestinationCard LocationData2={LocationData} type="Destination" city="Ho Chi Minh City" airport="Tan Son Nhat Airport" inputCity="toCity" inputCountry='toCountry'></DestinationCard>
                
                <div className="flex flex-row ">
                <DateInput inputname="DepartureDate" type="DepartureDate"></DateInput>
                <DateInput inputname="ReturnDate" type="ReturnDate"></DateInput>
                </div>

                <TypeCard></TypeCard>            
            </div>

            
                <button type="submit" onClick={e => console.log('thisonerun')}  className={`bg-blue-600 text-stone-100 hover:bg-blue-900 effect rounded-full text-xl ${poppins.className} font-bold w-[200px] h-[50px]`}>
                    Search
                </button>
            
        </form>
    )


}