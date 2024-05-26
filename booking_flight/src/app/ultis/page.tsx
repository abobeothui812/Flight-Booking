import pool from './pgDB'
import { fetchDatafromDB } from '../lib/data'
import FlightSearchForm from '../ui/component/Booking/flightSearchForm'
import { fetchLocation } from '../lib/data'
export default async function Page() {
    const Locations = await fetchLocation()
    const data = await fetchDatafromDB()
    return (
        <div>
            <FlightSearchForm LocationData={Locations}></FlightSearchForm>
        </div>
    )
}

