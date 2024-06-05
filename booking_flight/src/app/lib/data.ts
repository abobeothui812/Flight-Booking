import { useSearchParams } from 'next/navigation';
import pool from "../ultis/pgDB";
import { searchParamInformation } from './definition';
export async function fetchLocation(){
    try{
        const client = await pool.connect();
        console.log('Connected to database');
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
        console.log('Connected to database in here');
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

export async function fetchReturnFlight(){
    try{
        const client = await pool.connect();
        console.log('Connected to database in here');
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
            test.tickettype,
            test.seatClass,
            Depart.AirportName AS DepartAirport,
            Arrive.AirportName AS ArrivalAirport,
            Depart.City AS DepartCity,
            Depart.Country AS DepartCountry,
            Arrive.City AS ArrivalCity,
            Arrive.Country AS ArrivalCountry,
            (test.numberOfAdults + test.numberOfChildren + test.numberOfInfants)  AS TotalOfSeat
        FROM 
            Flight f
        JOIN 
            Airport Depart ON f.DepartAirportID = Depart.AirportID
        JOIN 
            Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
        JOIN 
            Airline A ON f.AirlineID = A.AirlineID
        JOIN 
            TEST ON Depart.city = test.to1
                AND Arrive.city = test.from1
                AND DATE(f.DepartTime) = test.returnDate;
                `);
        client.release();
        return res.rows;
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}