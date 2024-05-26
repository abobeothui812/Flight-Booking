
import clsx from "clsx";
import { fetchLocation } from '../lib/data'
import Link from "next/link";
import FlightSearchForm from "./component/Booking/flightSearchForm";
export default async function Booking() {
    
    const Locations = await fetchLocation();
    return (
      <div >
        <FlightSearchForm LocationData={Locations} />
      </div>
    );
}