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
    from: string,
    to: string,
    departureDate: string,
    returnDate: string,
    seatClass: string,
    ticketType: string,
    TotalPassengers: number,
    numberOfAdults: number,
    numberOfChildren: number,
    numberOfInfants: number,

}

export type Location ={
    locationid : string;
    city : string;
    country : string;
    name : string;
};