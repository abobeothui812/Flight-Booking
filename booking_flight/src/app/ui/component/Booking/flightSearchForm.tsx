'use client'
import { useState } from "react";
import DestinationCard from "./DestinationCard";
import TypeCard from "./TypeCard";
import DateInput from "./dateInput";
import clsx from "clsx";
import { useSearchParams,useRouter,usePathname } from "next/navigation";
import { poppins } from "../asset/font";
import { buttons } from "@/app/lib/place-holder";
import { Location } from "@/app/lib/definition";
export default function FlightSearchForm( {LocationData} : {LocationData : Location[]}) {
    const initialState = {message: "",errors : {}};
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTicketType, setSelectedTicketType] = useState('One Way');
    
    function handleButtonClick(value: string) {
    setSelectedTicketType(value);
    }
    const insertIntoUrl = async (event : React.FormEvent<HTMLFormElement>  ) => {

        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const newFlight ={
            fromCity : formData.get('fromCity') as string,
            toCity : formData.get('toCity') as string,
            fromCountry : formData.get('fromCountry') as string,
            toCountry : formData.get('toCountry') as string,
            departureDate : formData.get('DepartureDate') as string,
            returnDate : formData.get('ReturnDate') as string,
            seatClass : formData.get('seatClass') as string,
            ticketType : formData.get('ticketType') as string,
            TotalPassengers : formData.get('TotalPassengers') as string,
            numberOfAdults : formData.get('Adults') as string, 
            numberOfChildren : formData.get('Children') as  string,
            numberOfInfants : formData.get('Infants') as string,

        }

        const newParam = new URLSearchParams(searchParams.toString());

        if(newFlight.fromCity && newFlight.toCity && newFlight.departureDate && newFlight.returnDate && newFlight.seatClass && newFlight.ticketType && newFlight.TotalPassengers && newFlight.numberOfAdults && newFlight.numberOfChildren && newFlight.numberOfInfants){
            newParam.set('from',newFlight.fromCity);
            newParam.set('to',newFlight.toCity);
            newParam.set('departDate',newFlight.departureDate);
            newParam.set('returnDate',newFlight.returnDate);
            newParam.set('seatClass',newFlight.seatClass);
            newParam.set('ticketType',newFlight.ticketType);
            newParam.set('TotalPassengers',newFlight.TotalPassengers);
            newParam.set('numberOfAdults',newFlight.numberOfAdults);
            newParam.set('numberOfChildren',newFlight.numberOfChildren);
            newParam.set('numberOfInfants',newFlight.numberOfInfants);
        }else{
            newParam.delete('from');
            newParam.delete('to');
            newParam.delete('departDate');
            newParam.delete('returnDate');
            newParam.delete('seatClass');
            newParam.delete('ticketType');
            newParam.delete('TotalPassengers');
            newParam.delete('numberOfAdults');
            newParam.delete('numberOfChildren');
            newParam.delete('numberOfInfants');

        }
        
        console.log(newParam.toString());

        router.push(`dashboard/flight?${newParam.toString()}`);
    }
    return(
        <form onSubmit={insertIntoUrl} className="rounded-3xl  mt-20  border-2 flex-center  flex-col shadow-md  w-[1300px] px-2 h-[400px] " >
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

