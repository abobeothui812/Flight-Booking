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
    
    fromCity: z.string({
      invalid_type_error: "Please select  which city you are flying from",
    }),
    toCity: z.string({
      invalid_type_error: "Please select  which city you are flying to",
    }),
    fromCountry: z.string(),
    toCountry: z.string(),
    departureDate: z.string(),
    returnDate: z.string(),
    seatClass: z.enum(['Economy', 'Business', 'First Class' ],{
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
      fromCity : formData.get('fromCity'),
      toCity : formData.get('toCity'),
      fromCountry : formData.get('fromCountry'),
      toCountry : formData.get('toCountry'),
      departureDate : formData.get('DepartureDate') as string,
      returnDate : formData.get('ReturnDate') as string,
      seatClass : formData.get('seatClass') ,
      ticketType : formData.get('ticketType'),
      TotalPassengers : formData.get('TotalPassengers'),
      numberOfAdults : formData.get('Number'),
      numberOfChildren : formData.get('Children'),
      numberOfInfants : formData.get('Infants'),
    });

    if (!validatedFields.success) {
        return {  errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Search Flights.' };
    }

    const { fromCity , toCity, fromCountry, toCountry , departureDate , returnDate , seatClass , ticketType , TotalPassengers , numberOfAdults , numberOfChildren , numberOfInfants } = validatedFields.data;
    console.log("This one run");
    try {
      const client = await pool.connect();
      console.log('Connected to database 22');
      const res = await client.query(
        `CALL InsertAndReplaceTest($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [fromCity, toCity, returnDate, departureDate, seatClass, ticketType, TotalPassengers, numberOfAdults, numberOfChildren, numberOfInfants]
      );
      client.release();
      return res.rows;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Saeach Flights.',
      };
    } finally {
      revalidatePath('/flight');
       redirect('/flight');
    }
    
}