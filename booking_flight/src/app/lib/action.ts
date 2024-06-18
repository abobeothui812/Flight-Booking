'use server'
import { z } from "zod";
import pool from "../ultis/pgDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { searchParamInformation,FlightSearchInformation } from "./definition";
import { signIn } from "next-auth/react";



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
    flightnumber: z.string(),
    adults: z.string(),
    children: z.string(),
    infants: z.string(),
    seattype: z.string(),
});

export async function BookFlight(flightNumber: string, searchParam : searchParamInformation) {
    const validatedFields = bookingSchema.safeParse({
      flightnumber : flightNumber || null,
      adults : searchParam.numberOfAdults || null,
      children : searchParam.numberOfChildren || null,
      infants : searchParam.numberOfInfants || null,
      seattype : searchParam.seatClass || null,
    });

    if (!validatedFields.success) {
        return {  errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Book Flight.' };
    }

    const { flightnumber, adults,children,infants,seattype } = validatedFields.data;
    console.log(validatedFields.data);
    try {
      const client = await pool.connect();
      const res = await client.query(
        `select insertbooking($1,$2,$3,$4,$5)`,
        [flightnumber, adults, children, infants, seattype]
      );
      client.release();
      const bookingId = res.rows[0].insertbooking;
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
    Gender : z.enum(['Male','Female','Others']),
    BookingID: z.string(),
    Seatfor: z.string(),
    flightid: z.string(),
});
export type OtherPassengerState = {
    errors?: {
        flightid?: string[];
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
      flightid : formData.get('flightid') || null,
   });
     
      if (!validatedFields.success) {
          return {  errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Save Other Passenger Details.' };
      }
  
      const { FirstName , LastName, Passport, Nationality, DOB , BookingID, Seatfor, Gender, flightid } = validatedFields.data;

      try {
        console.table(validatedFields.data);
        const client = await pool.connect();
        const res = await client.query(
          `insert into bookingpassenger(bookingid,flightid,passportnum,firstname,lastName, seatfor,nationality,birthdate,gender) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
          [BookingID,flightid,Passport,FirstName, LastName,Seatfor, Nationality, DOB, Gender ]
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

export type Paymentstate= {
  errors?: {
      Bookingid?: string[];
      Method?: string[];
      Amount?: string[];
      TransactionDate?: string[];
  };
  message?: string | null;
};
const paymentSchema = z.object({
  BookingID: z.string({
    invalid_type_error: "Please select  which city you are flying to",
  }),
  Method: z.string({
    invalid_type_error: "Please select  which city you are flying to",
  }),
  TransactionDate: z.string({
    invalid_type_error: "Please select  which city you are flying to",
  }),
  Amount : z.string({
    invalid_type_error: "Please select  which city you are flying to",
  }),
});
export async function SavePaymentDetails(prevState : Paymentstate,formData : FormData) {
  const validatedFields = paymentSchema.safeParse({
      BookingID : formData.get('Bookingid') || null,
      Method : formData.get('paymentMethod') || null,
      TransactionDate : formData.get("TransactionDate") || null,
      Amount : formData.get('Amount') || null,
 });
   
    if (!validatedFields.success) {
        return {  errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Save Other Passenger Details.' };
    }

    const { BookingID , Method , TransactionDate,Amount} = validatedFields.data;

    try {
      console.table(validatedFields.data);
      const client = await pool.connect();
      const res = await client.query(
       `call insert_payment_and_update_status($1,$2,$3,$4);`,
        [BookingID,Method,Amount,TransactionDate ]
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

export type Flightstate = {
  errors?: {
      flightid? : string[];
      flightnumber?: string[];
      airlineid ?: string[];
      aircrafttype?: string[];
      departTime?: string[];
      arrivalTime?: string[];
      departAirportCode?: string[];
      arrivalAirportCode?: string[];
      availableSeats_Eco?: string[];
      availableSeats_Business?: string[];
      availableSeats_FirstClass?: string[];
      prices ?: string[];
  };
  message?: string | null;
};

const FlightSchema = z.object({
  flightid: z.string(),
  flightnumber: z.string(),
  airlineid: z.string(),
  aircrafttype: z.string(),
  departTime: z.string(),
  arrivalTime: z.string(),
  departAirportCode: z.string(),
  arrivalAirportCode: z.string(),
  availableSeats_Eco: z.string(),
  availableSeats_Business: z.string(),
  availableSeats_FirstClass: z.string(),
  prices: z.string(),
});

export async function CreateFlight(prevState : Flightstate,formData : FormData) {
  const validatedFields = FlightSchema.safeParse({
    flightid : formData.get('flightid'),
    flightnumber : formData.get('flightnumber'),
    airlineid : formData.get('airlineid'),
    aircrafttype : formData.get('aircrafttype'),
    departTime : formData.get('departuredate'),
    arrivalTime : formData.get('arrivaldate'),
    departAirportCode : formData.get('departcitycode'),
    arrivalAirportCode : formData.get('arrivalcitycode'),
    availableSeats_Eco : formData.get('economy'),
    availableSeats_Business : formData.get('bussiness'),
    availableSeats_FirstClass : formData.get('firsclass'),
    prices : formData.get('price'),
  }); 
  if (!validatedFields.success) {
      return {  errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Save Other Passenger Details.' };
  }
  
  const { flightid, flightnumber, airlineid, aircrafttype, departTime, arrivalTime, departAirportCode, arrivalAirportCode, availableSeats_Eco, availableSeats_Business, availableSeats_FirstClass, prices} = validatedFields.data;

  try {
    console.table(validatedFields.data);
    const client = await pool.connect();
    const
    res = await client.query(
      `insert into flight(flightid, flightnumber, airlineid, aircrafttype, departtime, arrivaltime, departairportid, arrivalairportid, availableseat_economy, availableseat_business, availableseat_firstclass,price) values($1,$2,$3,$4,$5,$6,$7,$8,cast($9 as decimal),cast($10 as decimal),cast($11 as decimal),cast($12 as money))`,
      [flightid, flightnumber, airlineid, aircrafttype, departTime, arrivalTime, departAirportCode, arrivalAirportCode, availableSeats_Eco, availableSeats_Business, availableSeats_FirstClass,prices]
    );
    client.release();
    return {
      message: 'Flight Details Saved Successfully.',
    }}
    catch (error) {
    console.error('Failed to save user details:', error);
    return {
      message: 'Failed to Save User Details due to an error.',
      error: error
    };
    }
}