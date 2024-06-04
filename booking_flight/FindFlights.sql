CREATE OR REPLACE FUNCTION FindFlights(
    destination_city VARCHAR(50),
	destination_country VARCHAR(50),
	arrival_city VARCHAR(50),
	arrival_country VARCHAR(50),
	depart_date DATE,
    arrival_date DATE,
    type_of_seat VARCHAR(20),
	num_of_adult INT,
	num_of_child INT,
	num_of_infant_is INT,
	num_of_infant_ol INT
) RETURNS TABLE (
    FlightID VARCHAR(10),
    FlightNumber VARCHAR(11),
    DepartTime TIMESTAMP WITH TIME ZONE,
    ArrivalTime TIMESTAMP WITH TIME ZONE,
    DepartAirport VARCHAR(100),
    ArrivalAirport VARCHAR(100),
    DepartCity VARCHAR(100),
    DepartCountry VARCHAR(100),
    ArrivalCity VARCHAR(100),
    ArrivalCountry VARCHAR(100),
	TotalOfSeat INT,
	TotalPrice MONEY
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        f.FlightID, 
        f.FlightNumber, 
        f.DepartTime, 
        f.ArrivalTime,
        Depart.AirportName AS DepartAirport,
        Arrive.AirportName AS ArrivalAirport,
        Depart.City AS DepartCity,
        Depart.Country AS DepartCountry,
        Arrive.City AS ArrivalCity,
        Arrive.Country AS ArrivalCountry,
		num_of_adult + num_of_child + num_of_infant_is + num_of_infant_ol AS TotalOfSeat,
		(
            num_of_adult * 
            CASE 
                WHEN type_of_seat = 'Economy' THEN f.Price
                WHEN type_of_seat = 'Business' THEN f.Price * 2
                WHEN type_of_seat = 'FirstClass' THEN f.Price * 15
            END +
            num_of_child * 
            CASE 
                WHEN type_of_seat = 'Economy' THEN f.Price * 0.4
                WHEN type_of_seat = 'Business' THEN f.Price * 2 * 0.4
                WHEN type_of_seat = 'FirstClass' THEN f.Price * 15 * 0.4
            END +
            num_of_infant_is * 
            CASE 
                WHEN type_of_seat = 'Economy' THEN f.Price * 0.1
                WHEN type_of_seat = 'Business' THEN f.Price * 2 * 0.1
                WHEN type_of_seat = 'FirstClass' THEN f.Price * 15 * 0.1
            END +
            num_of_infant_ol * 
            CASE 
                WHEN type_of_seat = 'Economy' THEN f.Price * 0.05
                WHEN type_of_seat = 'Business' THEN f.Price * 2 * 0.05
                WHEN type_of_seat = 'FirstClass' THEN f.Price * 15 * 0.05
            END
        ) AS TotalPrice
    FROM
        Flight f
    JOIN Airport Depart ON f.DepartAirportID = Depart.AirportID
    JOIN Airport Arrive ON f.ArrivalAirportID = Arrive.AirportID
    WHERE
        Depart.city = destination_city
		AND Depart.country = destination_country
		AND Arrive.city = arrival_city
		AND Arrive.country = arrival_country
        AND DATE(f.ArrivalTime) = arrival_date
		AND DATE(f.DepartTime) = depart_date
        AND CASE 
                WHEN type_of_seat = 'Economy' THEN f.AvailableSeat_Economy 
                WHEN type_of_seat = 'Business' THEN f.AvailableSeat_Business
                WHEN type_of_seat = 'FirstClass' THEN f.AvailableSeat_FirstClass
            END >= (num_of_adult + num_of_child + num_of_infant_is);
END;
$$ LANGUAGE plpgsql;