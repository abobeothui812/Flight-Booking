import OthersDetailsForm from "./OthersDetailsForm";
import { PassengerArray } from "@/app/lib/definition";
import { bookingInformation } from "@/app/lib/definition";
export default function OtherDetails({booking}:{booking: bookingInformation}) {
    const adults   : PassengerArray = { numberOfpeole: booking?.num_of_adult, name: 'adults' };
    const children : PassengerArray = { numberOfpeole: booking?.num_of_child, name: 'children' };
    const infants :  PassengerArray =  { numberOfpeole: booking?.num_of_infant, name: 'infants' };
    const renderForms = (passenger : PassengerArray) => {
        let forms = [];
        for (let i = 1; i <= passenger.numberOfpeole; i++) {
            forms.push(<OthersDetailsForm bookingid={booking.bookingid} flightid={booking.flightid} PassengerType={passenger.name} order={i} key={i} />);
        }
        return forms;
    };
    return (
       <div className="flex flex-col gap-16">
       <div className="flex flex-col gap-16">
       {renderForms(adults)}
       </div>

       <div className="flex flex-col gap-16">
       {renderForms(children)}
       </div>

       <div className="flex flex-col gap-16">
       {renderForms(infants)}
       </div>
       </div>
    )
}