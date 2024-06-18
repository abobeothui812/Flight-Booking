'use client'
import InputText from "../passengerDetails/inputText"
import { lusitana } from "../asset/font"
import { Location } from "@/app/lib/definition"
import { useFormState } from "react-dom"
import { useEffect,useState } from "react"
import { CreateFlight } from "@/app/lib/action"
export default function CreateFlightForm({locations,airlineid}:{locations : Location[],airlineid : string}) {
    const initialState = {message: "",errors : {}};
    const [state, dispatch] = useFormState(CreateFlight,initialState);
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
        <form action={dispatch} className="flex mt-10 flex-col">
            <div className="grid grid-cols-2 gap-x-44 gap-y-5 mt-10 flex-col">
            <InputText labeltext="Flight ID" type="text" name="flightid" placeholder="XXXXX"></InputText>
            <InputText labeltext="Flight Number" type="text" name="flightnumber" placeholder="XXXXX"></InputText>
            <InputText labeltext="Departure date" type="datetime-local" name="departuredate" placeholder="Departure Date"></InputText>
            <InputText labeltext="Available Seats (Economy)" type="number" name="economy" placeholder="50.."></InputText>
            <InputText labeltext="Arrival date" type="datetime-local" name="arrivaldate" placeholder="Arrival Date"></InputText>
            <InputText labeltext="Available Seats (Bussiness)" type="number" name="bussiness" placeholder="100.."></InputText>

            <div className="flex gap-2 flex-col">
            <label  className={`text-xl  font-semibold`} htmlFor='departcity'>Departure City:</label>
                <select id="departcity" name="departcitycode" className="border-2 rounded-lg w-[500px] px-2 text-lg h-[60px]">
                    {locations.map((location)=>(
                        <option value={location.airportid} key={location.airportid}>{location.city}</option>
                    ))}
                </select>            
            </div>
            <InputText labeltext="Available Seats (First Class)" type="number" name="firsclass" placeholder="20.."></InputText>
           
            <div className="flex gap-2 flex-col">
            <label  className={`text-xl  font-semibold`} htmlFor='arrivalcity'>Arrival City:</label>
                <select id="arrivalcity" name="arrivalcitycode" className="border-2 rounded-lg w-[500px] px-2 text-lg h-[60px]">
                    {locations.map((location)=>(
                        <option value={location.airportid} key={location.airportid}>{location.city}</option>
                    ))}
                </select>            
            </div>
            <InputText labeltext="Aircraft Type" type="text" name="aircrafttype" placeholder="Boeing 747"></InputText>
            <input type="hidden" value={airlineid} name='airlineid' />
            <InputText labeltext="Price" type="number" name="price" placeholder="100..$"></InputText>

            </div>
            <div className="w-full mt-16 flex-center">
                <button onClick={handleMessage} className="BlueBtn w-1/4 h-[50px] text-2xl font-bold" type="submit">Create Flight</button>
            </div>
            {showMessage && <p className={`text-green-600`}>Your information has been saved</p>}
        </form>
    )
}
