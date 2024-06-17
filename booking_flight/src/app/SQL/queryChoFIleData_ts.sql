Trong file Data.ts

--chọn các dữ liệu về địa điểm của sân bay(thành phố, quốc gia, tên sân bay) -fetchLocation()
select airport.airportid,airport.city,airport.country,airport.airportname from  airport


--Chọn các chuyến bay có điểm đến và điểm đi và thời gian khởi hành biết trước -fetchDepartFlight( {searchParams}:{searchParams :searchParamInformation})
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
        AND DATE(f.DepartTime) = $6


--Chọn flightid từ bảng flight -fetchFlightid({params} : {params : {flightid : string}})
select flightid from flight where flightid = $1


--Chọn thông tin từ bảng booking biết bookingid -fetchBookingid({params} : {params : {bookingid : string}})
select * from booking where bookingid = $1


--Chọn thông tin về chuyến bay biết trước số hiệu chuyến bay(flightnumber) -fetchBookedFlight({flightnumber}:{flightnumber: string})
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
        f.flightnumber =$1


--Chọn ra những thông tin những hành khách đã đặt vé biết trước bookingid -fetchBookingPassenger({Bookingid}:{Bookingid: string})
SELECT * from bookingpassenger where bookingid = $1


--Chọn ra id của người đã đặt vé biết trước bookingid -fetchUserID(Bookingid : string)
SELECT userid from booking where bookingid = $1


--Chọn ra thông tin chuyuến bay và thông tin đặt vé biết trước userid -fetchBookingwithUserid({Userid}:{Userid: number})
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
    b.userid = $1


--Chọn ra thông tin vé  biết trước bookingid -fetchTicket({Bookingid}:{Bookingid: string})
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
    b.bookingid = $1


--Chọn ra các chuyến bay biết trước tên hãng hàng không -fetchFlightwithAirline( {AirlineName}:{AirlineName : string})
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


--Chọn ra thông tin chuyến bay biết trước số hiệu chuyến bay -fetchFlightwithFlightNumber( {flightnumber}:{flightnumber : string})
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
        f.FlightNumber = $1


--Chọn ra thông tin các hành khách trong 1 chuyến bay biết trước flightid -fetchPassengerInformation( {flightid}:{flightid : string})
SELECT passportnum,TO_CHAR(birthdate, 'YYYY-MM-DD') as dob,firstname,lastname,gender,nationality,seatfor  from bookingpassenger where flightid = $1


--Chọn ra id của hãng hàng không biết trước tên hãng -fetchairlineID( {airlinename}:{airlinename : string})   
SELECT airlineid  from airline where airlinename = $1