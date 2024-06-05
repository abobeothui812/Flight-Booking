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
export type searchParamInformation ={
    from : string,
    to : string,
    departDate : string,
    returnDate : string,
    seatClass : string,
    ticketType : string,
    TotalPassengers : string,
    numberOfAdults : string,
    numberOfChildren : string,
    numberOfInfants : string,

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
    departdate: string,
    arrivaldate: string,
    departtime1: string,
    arrivaltime1: string,
    timeofflight: string,
    price: number ,
    seatclass: string,
    totalofseat: number,
    tickettype: string,
    airlinename: string,
}

export type Location ={
    airportid : string;
    city : string;
    country : string;
    name : string;
};