
--Lưu thông tin người đặt vé(user) -SaveUserDetails()
select insertPassenger($1, $2, $3, $4, $5)

--Lưu thông tin đặt vé(booking) -BookFlight()
select insertbooking($1,$2,$3,$4,$5)

--Lưu thông tin những hành khách khác nhau trong 1 booking -SaveOtherPassengerDetails()
insert into bookingpassenger(bookingid,flightid,passportnum,firstname,lastName, seatfor,nationality,birthdate,gender) values($1,$2,$3,$4,$5,$6,$7,$8,$9)

--Lưu thông tin thanh toán  -SavePaymentDetails()
call insert_payment_and_update_status($1,$2,$3,$4)

--Tạo một chuyến bay mới
insert into flight(flightid, flightnumber, airlineid, aircrafttype, departtime, arrivaltime, departairportid, arrivalairportid, availableseat_economy, availableseat_business, availableseat_firstclass) values($1,$2,$3,$4,$5,$6,$7,$8,cast($9 as decimal),cast($10 as decimal),cast($11 as decimal))
