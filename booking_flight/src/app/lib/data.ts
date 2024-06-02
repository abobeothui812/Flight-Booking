import pool from "../ultis/pgDB";

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

export async function fetchSearchFlight(){
    try{
        const client = await pool.connect();
        console.log('Connected to database');
        const res = await client.query(`
        SELECT
            f.FlightID, 
            f.FlightNumber, 
            f.DepartAirportID,
	        f.ArrivalAirportID,
            Date(f.DepartTime) as DepartTime, 
            Date(f.ArrivalTime) as ArrivalTime,
            f.price,
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
            TEST ON Depart.city = test.from1
                AND Arrive.city = test.to1
                AND DATE(f.DepartTime) = test.departDate;
                `);
        client.release();
        console.log('connected to database here')
        console.log(res.rows);
        return res.rows
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}