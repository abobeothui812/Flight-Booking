import { lusitana } from "@/app/ui/component/asset/font";
import SideSearchBar from "@/app/ui/component/flight/sideSearchBar";
import FlightsCard from "@/app/ui/component/flight/flightsCard";
import { fetchDepartFlight } from "@/app/lib/data";
import { FlightSearchInformation } from "@/app/lib/definition";
import { searchParamInformation } from "@/app/lib/definition";
import FlightConfirmModal from "@/app/ui/component/bookingFlight/FlightConfirmModal";
export default async function Page(
    { searchParams } :
    { searchParams : searchParamInformation }
) {
    const SearchedFlights = await fetchDepartFlight({ searchParams });
    
    
    return (
        <main className="flex-center flex-col">
            <div className="w-[1300px]  flex flex-col">
                <div className="flex justify-end items-baseline w-full px-2 py-7">
                    <p className={`${lusitana} text-lg  text-gray-600`}>Sort By:</p>
                    <select className={`${lusitana} text-lg  text-gray-600 bg-white`} name="SortType" id="">
                        <option className={`${lusitana} text-lg  text-gray-600 bg-white`} value="Lowest Price">Lowest Price</option>
                        <option className={`${lusitana} text-lg  text-gray-600 bg-white`} value="Highest Price">Highest Price</option>
                    </select>
                </div>

                <div className="w-full  h-full justify-between px-2 flex items-start flex-row">
                    <SideSearchBar></SideSearchBar>
                
                    <div className="flex flex-col justify-center items-end py-2 px-3 gap-8   w-full">
                        {
                            SearchedFlights.map((flight : FlightSearchInformation) => (
                                <FlightsCard key={flight.flightid} searchParams={searchParams} flight={flight}></FlightsCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}