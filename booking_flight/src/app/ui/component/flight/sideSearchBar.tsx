import { poppins,lusitana,inter } from "../asset/font";

export default function SideSearchBar() {
    return(
        <div className="flex justify-center flex-col py-2 px-3 gap-4  items-start">
            <h2 className={`${poppins.className} font-semibold text-xl mb-1`}>Your Search</h2>
            <div className="flex-col flex justify-center items-start gap-1">
                <label className={`${inter.className} text-md font-bold`}>From</label>
                <input type="text"  className="w-[230px]  rounded-md border-2 h-[40px]"/>
            </div>

            <div className="flex-col flex justify-center items-start gap-1">
                <label className={`${inter.className} text-md font-bold`}>To</label>
                <input type="text"  className="w-[230px] rounded-md border-2 h-[40px]"/>
            </div>

            <div className="flex-col flex justify-center items-start gap-1">
                <label className={`${inter.className} text-md font-bold`}>Departure</label>
                <input type="date"  className="w-[230px] rounded-md border-2 h-[40px]"/>
            </div>

            <div className="flex-col flex justify-center items-start gap-1">
                <label className={`${inter.className} text-md font-bold`}>Return</label>
                <input type="date"  className="w-[230px] rounded-md border-2 h-[40px]"/>
            </div>

            <button className="w-[230px] effect font-semibold hover:bg-blue-800  mt-2 rounded-md bg-blue-600 text-white h-[40px]">Change Search</button>
            
            
        </div>
    )
}