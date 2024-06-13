CREATE TABLE Airport (
    AirportID VARCHAR(5) PRIMARY KEY, --ICAO Code
    AirportName VARCHAR(100) NOT NULL,
    City VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL
);

CREATE TABLE Airline (
    AirlineID VARCHAR(9) PRIMARY KEY, --AL XXX XXXX
    AirlineName VARCHAR(100) NOT NULL
);
CREATE TABLE Flight (
    FlightID VARCHAR(10) PRIMARY KEY, --FID XXX XXXX
    FlightNumber VARCHAR(11) NOT NULL, --Số hiệu chuyến bay FNUM XXXX
    AircraftType VARCHAR(30), --Loại máy bay AT XXX XXXX
    AirlineID VARCHAR(9) NOT NULL,
    DepartTime TIMESTAMP WITH TIME ZONE NOT NULL, 
    ArrivalTime TIMESTAMP WITH TIME ZONE NOT NULL ,
    Check(ArrivalTime > DepartTime)
    DepartAirportID VARCHAR(5) NOT NULL,
    ArrivalAirportID VARCHAR(5) NOT NULL,
    AvailableSeat_Economy INT DEFAULT 400,
    AvailableSeat_Business INT DEFAULT 200,
    AvailableSeat_FirstClass INT DEFAULT 10,
    Price MONEY NOT NULL,
    FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID),
    FOREIGN KEY (DepartAirportID) REFERENCES Airport(AirportID),
    FOREIGN KEY (ArrivalAirportID) REFERENCES Airport(AirportID)
);

CREATE TABLE Users (
    UserID serial PRIMARY KEY, --PID XXX XXXX 
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Mail VARCHAR(100) NOT NULL
    Phone Varchar(100)
);

CREATE TABLE Booking (
    BookingID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    FlightID VARCHAR(10),
    UserID serial --Người đặt chuyến bay
    PaymentStatus VARCHAR(20) DEFAULT 'Pending',
    TotalPrice MONEY,
    num_of_adult INT,
	num_of_child INT,
	num_of_infant INT,
    SeatType VARCHAR(20), --Eco/Busi/First
    FOREIGN KEY (FlightID) REFERENCES Flight(FlightID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE BookingPassenger(
    BookingID UUID,
    PassportNum VARCHAR(50),
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Nationality VARCHAR(100),
    BirthDate DATE,
    Gender VARCHAR(10),
    SeatFor VARCHAR(20), --Adult/Child/Baby
    PRIMARY KEY(BookingID, PassportNum),
    FOREIGN KEY(BookingID) REFERENCES Booking(BookingID),
    FOREIGN KEY(FlightID) REFERENCES Flight(FlightID),
    CONSTRAINT uniquePassenger UNIQUE (FlightID, PassportNum)
);

CREATE TABLE Payment (
    PaymentID VARCHAR(10) PRIMARY KEY, --PmID XXX XXXX
    BookingID uuid,
    Method VARCHAR(50),
    Amount MONEY,
    TransactionDate TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID)
);
--Mỗi khi tạo insert booking thì sẽ có tương ứng số bảng bookingpassenger được tạo bằng với số lượng từng loại ghế
CREATE OR REPLACE FUNCTION create_booking_passenger_entries()
RETURNS TRIGGER AS $$
DECLARE
    i INT;
BEGIN
    -- Insert into BookingPassenger for each adult
    FOR i IN 1..NEW.num_of_adult LOOP
        INSERT INTO BookingPassenger (BookingID, SeatFor)
        VALUES (NEW.BookingID, 'Adult');
    END LOOP;

    -- Insert into BookingPassenger for each child
    FOR i IN 1..NEW.num_of_child LOOP
        INSERT INTO BookingPassenger (BookingID, SeatFor)
        VALUES (NEW.BookingID, 'Child');
    END LOOP;

    -- Insert into BookingPassenger for each infant is
    FOR i IN 1..NEW.num_of_infant_is LOOP
        INSERT INTO BookingPassenger (BookingID, SeatFor)
        VALUES (NEW.BookingID, 'Infant_IS');
    END LOOP;

    -- Insert into BookingPassenger for each infant ol
    FOR i IN 1..NEW.num_of_infant_ol LOOP
        INSERT INTO BookingPassenger (BookingID, SeatFor)
        VALUES (NEW.BookingID, 'Infant_OL');
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_booking_insert
AFTER INSERT ON Booking
FOR EACH ROW
EXECUTE FUNCTION create_booking_passenger_entries();


CREATE TABLE Payment (
    PaymentID VARCHAR(11) PRIMARY KEY, --PmID XXX XXXX
    BookingID UUID,
    Method VARCHAR(50),
    Amount MONEY,
    TransactionDate TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID)
);



-- Nếu có thời gian giao dịch, cập nhật bảng booking thành completed
CREATE OR REPLACE FUNCTION UpdatePaymentStatusAfterInsert()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.TransactionDate IS NOT NULL THEN
        UPDATE Booking
        SET PaymentStatus = 'Completed',
            TotalPrice = NEW.Amount
        WHERE BookingID = NEW.BookingID;
    ELSE
        UPDATE Booking
        SET PaymentStatus = 'Pending'
        WHERE BookingID = NEW.BookingID;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payment_status_after_insert_trigger
AFTER INSERT ON Payment
FOR EACH ROW
EXECUTE FUNCTION UpdatePaymentStatusAfterInsert();


-- Kiểm tra khi booking insert có đủ ghế không
CREATE OR REPLACE FUNCTION UpdateAvailableSeatsAfterBookingInsert()
RETURNS TRIGGER AS $$
DECLARE
    available_seats INT;
    total_seats INT;
BEGIN
    -- Calculate total seats booked
    total_seats := NEW.num_of_adult + NEW.num_of_child + NEW.num_of_infant_is + NEW.num_of_infant_ol;

    -- Check and update for Economy seats
    IF NEW.SeatType = 'Economy' THEN
        SELECT AvailableSeat_Economy INTO available_seats
        FROM Flight
        WHERE FlightID = NEW.FlightID;
        IF available_seats < total_seats THEN
            RAISE EXCEPTION 'Not enough available economy seats';
        ELSE
            UPDATE Flight
            SET AvailableSeat_Economy = AvailableSeat_Economy - total_seats
            WHERE FlightID = NEW.FlightID;
        END IF;

    -- Check and update for Business seats
    ELSIF NEW.SeatType = 'Business' THEN
        SELECT AvailableSeat_Business INTO available_seats
        FROM Flight
        WHERE FlightID = NEW.FlightID;
        IF available_seats < total_seats THEN
            RAISE EXCEPTION 'Not enough available business seats';
        ELSE
            UPDATE Flight
            SET AvailableSeat_Business = AvailableSeat_Business - total_seats
            WHERE FlightID = NEW.FlightID;
        END IF;

    -- Check and update for FirstClass seats
    ELSIF NEW.SeatType = 'FirstClass' THEN
        SELECT AvailableSeat_FirstClass INTO available_seats
        FROM Flight
        WHERE FlightID = NEW.FlightID;
        IF available_seats < total_seats THEN
            RAISE EXCEPTION 'Not enough available first class seats';
        ELSE
            UPDATE Flight
            SET AvailableSeat_FirstClass = AvailableSeat_FirstClass - total_seats
            WHERE FlightID = NEW.FlightID;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER update_available_seats_after_booking_insert_trigger
AFTER INSERT ON Booking
FOR EACH ROW
EXECUTE FUNCTION UpdateAvailableSeatsAfterBookingInsert();


-- Tính total money khi booking insert
CREATE OR REPLACE FUNCTION CalculateTotalPrice()
RETURNS TRIGGER AS $$
DECLARE
    total_price MONEY;
BEGIN
    -- Calculate the total price
    total_price = 
        NEW.num_of_adult * 
        CASE 
            WHEN NEW.SeatType = 'Economy' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID)
            WHEN NEW.SeatType = 'Business' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 2
            WHEN NEW.SeatType = 'First Class' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 15
        END +
        NEW.num_of_child * 
        CASE 
            WHEN NEW.SeatType = 'Economy' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 0.4
            WHEN NEW.SeatType = 'Business' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 2 * 0.4
            WHEN NEW.SeatType = 'First Class' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 15 * 0.4
        END +
        NEW.num_of_infant * 
        CASE 
            WHEN NEW.SeatType = 'Economy' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 0.1
            WHEN NEW.SeatType = 'Business' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 2 * 0.1
            WHEN NEW.SeatType = 'First Class' THEN (SELECT Price FROM Flight WHERE FlightID = NEW.FlightID) * 15 * 0.1
        END +

    -- Update the TotalPrice column
    NEW.TotalPrice = total_price;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_total_price_after_booking_insert_trigger
after INSERT ON Booking
FOR EACH ROW
EXECUTE FUNCTION CalculateTotalPrice();
