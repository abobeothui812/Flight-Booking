'use server'
import { z } from "zod";
import pool from "../ultis/pgDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { searchParamInformation,FlightSearchInformation } from "./definition";
import { signIn } from "next-auth/react";
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
    seatClass: z.enum(['Economy','Business','First Class'],{
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
    
    try {
      const client = await pool.connect();
      const res = await client.query(
        `CALL InsertAndReplaceTest($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [fromCity, toCity, returnDate, departureDate, seatClass, ticketType, TotalPassengers, numberOfAdults, numberOfChildren, numberOfInfants]
      );
      client.release();
      return {
        message: 'Flight Search Successful.',
      };
    } catch (error) {
      return {
        message: 'Database Error: Failed to Saeach Flights.',
      };
    } finally {
      revalidatePath('/flight');
       redirect('/flight');
    }
    
}

const UserDetailsSchema = z.object({
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string(),
    Phone: z.string(),
    BookingID: z.string(),
});
export type UserState = {
    errors?: {
        FirstName?: string[];
        LastName?: string[];
        Email?: string[];
        Phone?: string[];
        BookingID?: string[];
    };
    message?: string | null;
  };

export async function SaveUserDetails(prevState: UserState, formData : FormData) {
    const validatedFields = UserDetailsSchema.safeParse({
      FirstName : formData.get('FirstName') || null,
      LastName : formData.get('LastName') || null,
      Email : formData.get('Email') || null,
      Phone : formData.get('Phone') || null,
      BookingID : formData.get('bookingid') || null,
    });

    if (!validatedFields.success) {
        return {  errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Save User Details.' };
    }

    const { FirstName , LastName, Email, Phone, BookingID } = validatedFields.data;
    console.log(validatedFields.data);
    try {
      console.table(validatedFields.data);
      const client = await pool.connect();
      const res = await client.query(
        `select insertPassenger($1, $2, $3, $4, $5)`,
        [FirstName, LastName, Email, Phone, BookingID]
      );
      client.release();
      return {
        message: 'User Details Saved Successfully.',
      };
    } catch (error) {
      console.error('Failed to save user details:', error);
      return {
        message: 'Failed to Save User Details due to an error.',
        error: error
      };
    } finally {
      revalidatePath('/flight');
    }
    
}

const bookingSchema = z.object({
    flightid: z.string(),
    adults: z.string(),
    children: z.string(),
    infants: z.string(),
    seattype: z.string(),
});

export async function BookFlight(flightid1: string, searchParam : searchParamInformation) {
    const validatedFields = bookingSchema.safeParse({
      flightid : flightid1 || null,
      adults : searchParam.numberOfAdults || null,
      children : searchParam.numberOfChildren || null,
      infants : searchParam.numberOfInfants || null,
      seattype : searchParam.seatClass || null,
    });

    if (!validatedFields.success) {
        return {  errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Book Flight.' };
    }

    const { flightid, adults,children,infants,seattype } = validatedFields.data;
    console.log(validatedFields.data);
    try {
      const client = await pool.connect();
      const res = await client.query(
        `select insert_booking($1,null,$2,$3,$4,$5)`,
        [flightid, adults, children, infants, seattype]
      );
      client.release();
      const bookingId = res.rows[0].insert_booking;
      console.log('Booking ID:', bookingId);
      return  bookingId ;
    } catch (error) {
      console.error('Failed to save user details:', error);
      return {
        message: 'Failed to Save User Details due to an error.',
        error: error
      };
    } 
    
}


const OtherPassengerSchema = z.object({
    FirstName: z.string(),
    LastName: z.string(),
    Passport: z.string(),
    Nationality: z.string(),
    DOB: z.string(),
    Gender : z.enum(['Male','Female','Prefer not to say']),
    BookingID: z.string(),
    Seatfor: z.string(),
});
export type OtherPassengerState = {
    errors?: {
        FirstName?: string[];
        LastName?: string[];
        Passport?: string[];
        Nationality?: string[];
        DOB?: string[];
        Gender?: string[];
        BookingID?: string[];
        Seatfor?: string[];
    };
    message?: string | null;
  };
export async function SaveOtherPassengerDetails(prevState : OtherPassengerState,formData : FormData) {
    const validatedFields = OtherPassengerSchema.safeParse({
      FirstName : formData.get('FirstName') || null,
      LastName : formData.get('LastName') || null,
      Passport : formData.get('Passport') || null,
      Nationality : formData.get('Nationality') || null,
      DOB : formData.get('DOB') || null,
      BookingID : formData.get('bookingid') || null,
      Seatfor : formData.get('seatfor') || null,
      Gender : formData.get('Gender') || null,
   });
     
      if (!validatedFields.success) {
          return {  errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Save Other Passenger Details.' };
      }
  
      const { FirstName , LastName, Passport, Nationality, DOB , BookingID, Seatfor, Gender } = validatedFields.data;

      try {
        console.table(validatedFields.data);
        const client = await pool.connect();
        const res = await client.query(
          `insert into bookingpassenger(bookingid,passportnum,firstname,lastName, seatfor,nationality,birthdate,gender) values($1,$2,$3,$4,$5,$6,$7,$8)`,
          [BookingID,Passport,FirstName, LastName,Seatfor, Nationality, DOB, Gender ]
        );
        client.release();
        return {
          message: 'Other Passenger Details Saved Successfully.',
        }}catch (error) {
          console.error('Failed to save user details:', error);
          return {
            message: 'Failed to Save User Details due to an error.',
            error: error
          };
  }
}