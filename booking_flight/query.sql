CREATE TABLE Airport (
    AirportID VARCHAR(5) PRIMARY KEY --ICAO Code, 
    AirportName VARCHAR(100),
    City VARCHAR(100),
    Country VARCHAR(100)
);

CREATE TABLE Airline (
    AirlineID VARCHAR(9) PRIMARY KEY, --AL XXX XXXX
    AirlineName VARCHAR(100),
    
);

CREATE TABLE Flight (
    FlightID VARCHAR(10) PRIMARY KEY, --FID XXX XXXX
    FlightNumber VARCHAR(11), --Số hiệu chuyến bay FNUM XXXX
    AircraftType VARCHAR(9), --Loại máy bay AT XXX XXXX
    AirlineID VARCHAR(9),
    DepartTime TIMESTAMP WITH TIME ZONE, 
    ArrivalTime TIMESTAMP WITH TIME ZONE,
    DepartAirportID VARCHAR(5),
    ArrivalAirportID VARCHAR(5),
    AvailableSeat_Economy INT,
    AvailableSeat_Business INT,
    AvailableSeat_FirstClass INT,
    Price MONEY,
    FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID),
    FOREIGN KEY (DepartAirportID) REFERENCES Airport(AirportID),
    FOREIGN KEY (ArrivalAirportID) REFERENCES Airport(AirportID)
);

CREATE TABLE Passenger (
    PassengerID VARCHAR(10) PRIMARY KEY, --PID XXX XXXX 
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Mail VARCHAR(100),
    PassportNum VARCHAR(50)
);

CREATE TABLE Booking (
    BookingID VARCHAR(10) PRIMARY KEY, --BID XXX XXXX
    FlightID VARCHAR(10),
    PassengerID VARCHAR(10),
    PaymentStatus VARCHAR(20) DEFAULT 'Pending',
    SeatType VARCHAR(20),
    FOREIGN KEY (FlightID) REFERENCES Flight(FlightID),
    FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID)
);

CREATE TABLE Payment (
    PaymentID VARCHAR(10) PRIMARY KEY, --PmID XXX XXXX
    BookingID VARCHAR(10),
    Method VARCHAR(50),
    Amount DECIMAL(10, 2),
    TransactionDate TIMESTAMP,
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID)
);

-- Trigger for INSERT on Payment table
CREATE TRIGGER UpdatePaymentStatusAfterInsert
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    IF NEW.TransactionDate IS NOT NULL THEN
        UPDATE Booking
        SET PaymentStatus = 'Completed'
        WHERE BookingID = NEW.BookingID;
    ELSE
        UPDATE Booking
        SET PaymentStatus = 'Pending'
        WHERE BookingID = NEW.BookingID;
    END IF;
END;

-- Trigger for UPDATE on Payment table
CREATE TRIGGER UpdatePaymentStatusAfterUpdate
AFTER UPDATE ON Payment
FOR EACH ROW
BEGIN
    IF NEW.TransactionDate IS NOT NULL THEN
        UPDATE Booking
        SET PaymentStatus = 'Completed'
        WHERE BookingID = NEW.BookingID;
    ELSE
        UPDATE Booking
        SET PaymentStatus = 'Pending'
        WHERE BookingID = NEW.BookingID;
    END IF;
END;

CREATE TRIGGER UpdateAvailableSeatsAfterBookingInsert
AFTER INSERT ON Booking
FOR EACH ROW
BEGIN
    DECLARE available_seats INT;

    -- Check and update for Economy seats
    IF NEW.SeatType = 'Economy' THEN
        SELECT AvailableSeat_Eco INTO available_seats
        FROM Flight
        WHERE FlightID = NEW.FlightID;
        IF available_seats <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No available economy seats';
        ELSE
            UPDATE Flight
            SET AvailableSeat_Eco = AvailableSeat_Eco - 1
            WHERE FlightID = NEW.FlightID;
        END IF;

    -- Check and update for Business seats
    ELSIF NEW.SeatType = 'Business' THEN
        SELECT AvailableSeat_Business INTO available_seats
        FROM Flight
        WHERE FlightID = NEW.FlightID;
        IF available_seats <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No available business seats';
        ELSE
            UPDATE Flight
            SET AvailableSeat_Business = AvailableSeat_Business - 1
            WHERE FlightID = NEW.FlightID;
        END IF;

    -- Check and update for FirstClass seats
    ELSIF NEW.SeatType = 'FirstClass' THEN
        SELECT AvailableSeat_FirstClass INTO available_seats
        FROM Flight
        WHERE FlightID = NEW.FlightID;
        IF available_seats <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No available first class seats';
        ELSE
            UPDATE Flight
            SET AvailableSeat_FirstClass = AvailableSeat_FirstClass - 1
            WHERE FlightID = NEW.FlightID;
        END IF;
    END IF;
END;

--Query Them Chuyen bay (INPUT ALL)

--Query Tim chuyen bay mot chieu (INPUT DES - ARR - DATE, TYPE OF SEAT,  NUMBER)

--Query Tim chuyen bay hai chieu (2 x)

--Query Chi tiet chuyen bay (INPUT FLIGHT ID)

--