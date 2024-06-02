{/*This file contain the type of our data */}

export type Flight ={
    flightid: string,
    flightnumber: string,  
    airlineID: string,
    departTime: string,
    arrivalTime: string,
    departAirportCode: string,
    arrivalAirportCode: string,
    availableSeats_Eco: number,
    availableSeats_Business: number,
    availableSeats_FirstClass: number,
}

export type FlightSearchInformation ={
    flightid: string,
    flightnumber : string, 
    departairport : string,
    arrivalairport : string,
    departairportid: string,
    departcity: string,
    departcountry: string,
    arrivalcity: string,
    arrivalcountry: string,
    arrivalairportid: string,
    departime: Date,
    arrivaltime: Date,
    price: number ,
    seatClass: string,
    totalofseat: number,
    
}

export type Location ={
    locationid : string;
    city : string;
    country : string;
    name : string;
};