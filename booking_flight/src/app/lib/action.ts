'use server'
import { z } from "zod";
import pool from "../ultis/pgDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export type State = {
    errors?: {
        from?: string[];
        to?: string[];
        departureDate?: string[];
        returnDate?: string[];
        seatClass?: string[];
        ticketType?: string[];
        TotalPassengers?: string[];
        numberOfAdults?: string[];
        numberOfChildren?: string[];
        numberOfInfants?: string[];

    };
    message?: string | null;
  };
const FlightSearchFormSchema = z.object({
    
    from: z.string({
      invalid_type_error: "Please select  which city you are flying from",
    }),
    to: z.string({
      invalid_type_error: "Please select  which city you are flying to",
    }),
    departureDate: z.string(),
    returnDate: z.string(),
    seatClass: z.enum(['Economy', 'Business', 'FirstClass' ],{
      invalid_type_error: "Please select a valid seat class",
    }),
    ticketType: z.enum(['One Way','Rounded Trip'],{
      invalid_type_error: "Please select a valid ticket type",
    
    }),
    TotalPassengers: z.coerce.number(),
    numberOfAdults: z.coerce.number(),
    numberOfChildren: z.coerce.number(),
    numberOfInfants: z.coerce.number(),

});
export async function SearchFlight(prevState: State, formData : FormData) {
    const validatedFields = FlightSearchFormSchema.safeParse({
      from : formData.get('from'),
      to : formData.get('to'),
      departureDate : formData.get('DepartureDate'),
      returnDate : formData.get('ReturnDate'),
      seatClass : formData.get('seatClass'),
      ticketType : formData.get('ticketType'),
      TotalPassengers : formData.get('TotalPassengers'),
      numberOfAdults : formData.get('Adults'),
      numberOfChildren : formData.get('Children'),
      numberOfInfants : formData.get('Infants'),
    });

    if (!validatedFields.success) {
        return {  errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Search Flights.' };
    }

    const { from , to , departureDate , returnDate , seatClass , ticketType , TotalPassengers , numberOfAdults , numberOfChildren , numberOfInfants } = validatedFields.data;
    console.log(validatedFields);

    try {
      alert("Searching for Flights from " + from + " to " + to + " on " + departureDate + " and returning on " + returnDate + " with " + TotalPassengers + " passengers." + " Seat Class: " + seatClass + " Ticket Type: " + ticketType);
    } catch (error) {
      return {
        message: 'Database Error: Failed to Saeach Flights.',
      };
    }
        

    revalidatePath('/booking/flight');
    redirect('/booking/flight');
}