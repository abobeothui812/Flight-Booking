import { inter } from "@/app/ui/component/asset/font";
import { fetchTicket } from "@/app/lib/data";
import Ticketcard from "@/app/ui/component/mybooking/ticketcard";
export default async function ticketpage({params}:{params : {bookingid : string}}){
  const ticket = await fetchTicket({Bookingid: params.bookingid});
  return (
    <div className="container  mx-auto flex-center flex-col gap-3 p-10">
        <h1 className={`${inter.className} font-bold text-6xl`}>My Ticket:</h1>
        <h2 className={`${inter.className} font-bold text-4xl`}></h2>
        <div className="container mt-10 w-full gap-5 flex-center p-1  flex flex-col" >
            {
                ticket.map((ticket : any) => (
                    <Ticketcard passenger={ticket}></Ticketcard>
                ))
            }

        </div>
        

    </div>
  );
}