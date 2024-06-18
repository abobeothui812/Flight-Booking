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
    AircraftType VARCHAR(20), --Loại máy bay AT XXX XXXX
    AirlineID VARCHAR(9) NOT NULL,
    DepartTime TIMESTAMP WITH TIME ZONE NOT NULL, 
    ArrivalTime TIMESTAMP WITH TIME ZONE NOT NULL ,
    Check(ArrivalTime > DepartTime)
    DepartAirportID VARCHAR(6) NOT NULL,
    ArrivalAirportID VARCHAR(6) NOT NULL,
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
    FlightID VARCHAR(10),
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
    PaymentID PRIMARY KEY DEFAULT uuid_generate_v4(), --PmID XXX XXXX
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
BEFORe INSERT ON Booking
FOR EACH ROW
EXECUTE FUNCTION CalculateTotalPrice();


--Các index nhằm tối ưu hóa việc truy vấn dữ liệu
CREATE INDEX idx_flight_depart_arrival ON Flight(DepartAirportID, ArrivalAirportID, DepartTime, ArrivalTime);
CREATE INDEX idx_booking_user ON Booking(UserID);
CREATE INDEX idx_booking_status_user ON Booking(PaymentStatus, UserID);
CREATE INDEX idx_booking_passenger_booking ON BookingPassenger(BookingID);
CREATE INDEX idx_flight_airline ON Flight(AirlineID);


--Lưu thông tin đặt vé(booking) -BookFlight()
CREATE OR REPLACE FUNCTION insertbooking(
    pflightnumber VARCHAR(20),
    padults VARCHAR(20),
    pchildren VARCHAR(20),
    pinfants VARCHAR(20),
    pseattype VARCHAR(20)
)
RETURNS UUID AS $$
DECLARE
    newid UUID;
    pflightid VARCHAR(20);
BEGIN
    -- Select flightid based on flightnumber
    SELECT flightid 
    INTO pflightid
    FROM flight 
    WHERE flightnumber = pflightnumber;

    -- Insert into Booking
    INSERT INTO Booking (
        flightid,
        userid,
        num_of_adult,
        num_of_child,
        num_of_infant,
        SeatType
    ) VALUES (
        pflightid,
        null, 
        cast(padults as decimal),
        cast(pchildren as decimal),
        cast(pinfants as decimal),
        pseattype
    )
    RETURNING bookingid INTO newid;

    -- Return the new booking id
    RETURN newid;
END;
$$ LANGUAGE plpgsql;

--Lưu thông tin người đặt vé(user) -SaveUserDetails()
CREATE OR REPLACE FUNCTION insertpassenger(
    p_first_name VARCHAR(30),
    p_last_name VARCHAR(30),
    p_mail VARCHAR(50),
    p_phone VARCHAR(30),
    p_bookingid UUID
)
RETURNS VOID AS $$
DECLARE
    new_user_id INT;
BEGIN
    -- Insert into users table
    INSERT INTO users (FirstName, LastName, Mail, Phone)
    VALUES (p_first_name, p_last_name, p_mail, p_phone)
    RETURNING users.userid INTO new_user_id;
    
    -- Update booking table with the new user ID
    UPDATE booking 
    SET UserID = new_user_id
    WHERE bookingid = p_bookingid;
END;
$$ LANGUAGE plpgsql;

--Lưu thông tin thanh toán  -SavePaymentDetails()
CREATE OR REPLACE PROCEDURE insert_payment_and_update_status(
    p_bookingid UUID,
    p_method VARCHAR(20),
    p_amount VARCHAR(20),
    p_transactiondate timestamp without timezone
)
BEGIN
    -- Insert into payment table
    INSERT INTO payment (bookingid, method, amount, transactiondate) 
    VALUES (p_bookingid, p_method, cast(p_amount as money), p_transactiondate);

    -- Update payment status in booking table
    UPDATE booking
    SET paymentstatus = 'completed'
    WHERE bookingid = p_bookingid;
END;
$$ LANGUAGE plpgsql;