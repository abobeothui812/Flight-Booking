
import { fetchLocation } from '../lib/data'
import FlightSearchForm from "./component/Booking/flightSearchForm";
export default async function Booking() {
    
    const Locations = await fetchLocation();
    return (
      <div >
        <FlightSearchForm LocationData={Locations} />
      </div>
    );
}