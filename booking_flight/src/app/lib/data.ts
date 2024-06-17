import { useSearchParams } from 'next/navigation';
import pool from "../ultis/pgDB";
import { searchParamInformation } from './definition';
export async function fetchLocation(){
    try{
        const client = await pool.connect();
        const res = await client.query('select airport.airportid,airport.city,airport.country,airport.airportname from  airport ');
        client.release();
        return res.rows
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchDepartFlight( {
    searchParams
}:{
    searchParams :searchParamInformation
}
){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT
            f.FlightID, 
            f.FlightNumber, 
            TO_CHAR(departtime, 'YYYY-MM-DD') as DepartDate, 
            TO_CHAR(arrivaltime, 'YYYY-MM-DD') as ArrivalDate,
            TO_CHAR(departtime, 'HH24:MI') as DepartTime1, 
            TO_CHAR(arrivaltime, 'HH24:MI') as ArrivalTime1,
            TO_CHAR(arrivaltime-departtime,'HH24:MI') as timeofflight,
            f.DepartAirportID,
            f.ArrivalAirportID,
            f.price,
            a.airlinename,
            Depart.AirportName AS DepartAirport,
            Arrive.AirportName AS ArrivalAirport,
            Depart.City AS DepartCity,
            Depart.Country AS DepartCountry,
            Arrive.City AS ArrivalCity,
            Arrive.Country AS ArrivalCountry,
            (CAST($1 AS DECIMAL) + CAST($2 AS DECIMAL)+ CAST($3 AS DECIMAL))  AS TotalOfSeat
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
        WHERE 
                Depart.city = $4
                AND Arrive.city = $5
                AND DATE(f.DepartTime) = $6;
                `, [searchParams.numberOfAdults,searchParams.numberOfChildren,searchParams.numberOfInfants ,searchParams.from, searchParams.to, searchParams.departDate]);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchFlightid({params} : {params : {flightid : string}}){
    try{
        const client = await pool.connect();
        const res = await client.query('select flightid from flight where flightid = $1', [params.flightid]);
        client.release();
        return res.rows
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchBookingid({params} : {params : {bookingid : string}}){
    try{
        const client = await pool.connect();
        const res = await client.query('select * from booking where bookingid = $1', [params.bookingid]);
        client.release();
        return res.rows[0];
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchBookedFlight({flightnumber}:{flightnumber: string}){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT
            f.FlightNumber,
            TO_CHAR(departtime, 'YYYY-MM-DD') as DepartDate, 
            TO_CHAR(arrivaltime, 'YYYY-MM-DD') as ArrivalDate,
            TO_CHAR(departtime, 'HH24:MI') as DepartTime1, 
            TO_CHAR(arrivaltime, 'HH24:MI') as ArrivalTime1,
            TO_CHAR(arrivaltime-departtime,'HH24:MI') as timeofflight,
            f.DepartAirportID,
            f.ArrivalAirportID,
            a.airlinename,
            Depart.City AS DepartCity,
            Arrive.City AS ArrivalCity
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
        WHERE 
                f.flightnumber =$1`, [flightnumber]);
        client.release();
        return res.rows[0];
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchBooking({Bookingid}:{Bookingid: string}){
    try{
        const client = await pool.connect();
        const res = await client.query(`
            SELECT * from booking where bookingid = $1`, [Bookingid]);
        client.release();
        return res.rows[0];
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchBookingPassenger({Bookingid}:{Bookingid: string}){
    try{
        const client = await pool.connect();
        const res = await client.query(`
            SELECT * from bookingpassenger where bookingid = $1`, [Bookingid]);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchUserID(Bookingid : string){
    try{
        const client = await pool.connect();
        const res = await client.query(`
            SELECT userid from booking where bookingid = $1`, [Bookingid]);
        client.release();
        return res.rows[0].userid;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchBookingwithUserid({Userid}:{Userid: number}){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT
            f.FlightNumber,
            a.airlinename,
            Depart.City AS DepartCity,
            Arrive.City AS ArrivalCity,
		  	(b.num_of_adult + b.num_of_child + b.num_of_infant ) as TotalPassenger,
		  	 b.seattype,
		  	 b.paymentStatus,
             b.bookingid,
             u.firstname,
             u.lastname
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
	 	JOIN 
	 		Booking b on b.flightid = f.flightid
        JOIN 
		  	users u on b.userid = u.userid
	 	Where
			b.userid = $1`, [Userid]);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchTicket({Bookingid}:{Bookingid: string}){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT
            f.FlightNumber,
            TO_CHAR(departtime, 'YYYY-MM-DD') as DepartDate, 
            TO_CHAR(arrivaltime, 'YYYY-MM-DD') as ArrivalDate,
            TO_CHAR(departtime, 'HH24:MI') as DepartTime1, 
            TO_CHAR(arrivaltime, 'HH24:MI') as ArrivalTime1,
            f.DepartAirportID,
            f.ArrivalAirportID,
            a.airlinename,
            Depart.City AS DepartCity,
            Arrive.City AS ArrivalCity,
		  	(b.num_of_adult + b.num_of_child + b.num_of_infant ) as TotalPassenger,
		  	 b.seattype,
		  	 b.paymentStatus,
             b.bookingid,
		  	 bp.firstname,
		  	 bp.lastname
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
	 	JOIN 
	 		Booking b on b.flightid = f.flightid
		JOIN 
		  	BookingPassenger bp on b.bookingid = bp.bookingid
	 	Where
			b.bookingid = $1`, [Bookingid]);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchFlightwithAirline( {
    AirlineName
}:{
    AirlineName : string
}
){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT
            f.FlightNumber, 
            f.aircrafttype,
            a.airlinename,
            TO_CHAR(departtime, 'YYYY-MM-DD') as DepartDate, 
            TO_CHAR(arrivaltime, 'YYYY-MM-DD') as ArrivalDate,
            TO_CHAR(departtime, 'HH24:MI') as DepartTime1, 
            TO_CHAR(arrivaltime, 'HH24:MI') as ArrivalTime1,
            f.DepartAirportID,
            f.ArrivalAirportID,
            f.price,
            Depart.AirportName AS DepartAirport,
            Arrive.AirportName AS ArrivalAirport,
            Depart.City AS DepartCity,
            Depart.Country AS DepartCountry,
            Arrive.City AS ArrivalCity,
            Arrive.Country AS ArrivalCountry
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
        WHERE 
                a.airlinename = $1;
                `, [AirlineName]);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}
export async function fetchFlightwithFlightNumber( {
    flightnumber
}:{
    flightnumber : string
}
){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT
            f.flightid,
            f.FlightNumber, 
            f.aircrafttype,
            a.airlinename,
            TO_CHAR(departtime, 'YYYY-MM-DD') as DepartDate, 
            TO_CHAR(arrivaltime, 'YYYY-MM-DD') as ArrivalDate,
            TO_CHAR(departtime, 'HH24:MI') as DepartTime1, 
            TO_CHAR(arrivaltime, 'HH24:MI') as ArrivalTime1,
            f.DepartAirportID,
            f.ArrivalAirportID,
            f.price,
            Depart.AirportName AS DepartAirport,
            Arrive.AirportName AS ArrivalAirport,
            Depart.City AS DepartCity,
            Depart.Country AS DepartCountry,
            Arrive.City AS ArrivalCity,
            Arrive.Country AS ArrivalCountry,
            (f.availableseat_economy + f.availableseat_business + f.availableseat_firstclass) as TotalOfSeat
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
        WHERE 
                f.FlightNumber = $1;
                `, [flightnumber]);
        client.release();
        return res.rows[0];
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchPassengerInformation( {
    flightid
}:{
    flightid : string
}
){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT passportnum,TO_CHAR(birthdate, 'YYYY-MM-DD') as dob,firstname,lastname,gender,nationality,seatfor  from bookingpassenger where flightid = $1`, [flightid]);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchairlineID( {
    airlinename
}:{
    airlinename : string
}
){
    try{
        const client = await pool.connect();
        const res = await client.query(`
        SELECT airlineid  from airline where airlinename = $1`, [airlinename]);
        client.release();
        return res.rows[0].airlineid;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

