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
    get(arg0: string): unknown;
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
    aircrafttype : string,
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
    totalofseat: number,
    airlinename: string,
}

export type Location ={
    airportid : string;
    city : string;
    country : string;
    airportname : string;
};

export type PassengerArray ={
    numberOfpeole : number,
    name : string,
}
    
export type bookingInformation ={
    bookingid: string,
    flightid : string,
    num_of_adult : number,
    num_of_child : number,
    num_of_infant : number,
    seattype : string,
    passenger_book : string,
    paymentstatus : string,
    totalprice : number,
}

export type PassengerInformation ={
    bookingid : string,
    papposrtnum : string,
    firstname : string,
    lastname : string,
    nationality : string,
    birthdate : string,
    gender : string,
    seatfor : string,
}