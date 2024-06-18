import CreateFlightForm from "@/app/ui/component/airlineversion/createFlightForm"
import { fetchLocation } from "@/app/lib/data"
import { fetchairlineID } from "@/app/lib/data";
export default async function CreateFLightPage({params}:{params : {airlinename : string}}) {
    const decodedAirlineName = decodeURIComponent(params.airlinename);
    const [airlineID,locations] = await Promise.all([fetchairlineID({airlinename : decodedAirlineName}),fetchLocation()]); 
    return(
        <main className="flex-center">
            <div className="flex mt-20 w-[1300px] h-[1000px] flex-col items-start  ">
                <h1 className="text-5xl font-bold">Create Flight:</h1>
                <CreateFlightForm airlineid={airlineID} locations={locations}></CreateFlightForm>
            </div>
        </main>
    )
}