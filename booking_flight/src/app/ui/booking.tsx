import Image from "next/image";
export default function Booking() {
    return (
      <div className="flex justify-center items-center flex-col gap-14">
        <div className="rounded-2xl border-4 border-black w-[1300px] h-[350px] flex-col flex gap-9  p-8">
            
            <div className="flex justify-start items-center gap-7">
                <select className="select-style" name="typeofflight" id="flight">
                    <option value="round trip">Round trip</option>
                    <option value="one way">One way</option>
                </select>
                <select className="select-style"  name="numofpeople" id="people">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
               
                <select className="select-style" name="typeofticket" id="ticket">
                    <option value="economy">Economy</option>
                    <option value="premium economy">Premium economy</option>
                    <option value="bussiness">Bussiness</option>
                    <option value="first">First</option>
                </select>
            </div>

            <div className="flex gap-3 ">
                <input className="selectdatestype" placeholder="Enter place..." type="text" />
                <input className="selectdatestype" placeholder="Enter place..." type="text" />
                <input className="selectdatestype" type="datetime-local" />
                <input className="selectdatestype" type="datetime-local" />
            </div>
            <div className="flex justify-center items-center">
            <button className="btn ">Search</button>
            </div>
        </div>
      </div>
    );
}