'use client'
import { poppins } from "../ui/component/asset/font"
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export default function AirlineverisonHome() {
    const [airlinename,setAirlinename] = useState("");
    const router = useRouter();
    const handleSubmit = (e : any) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của việc gửi biểu mẫu
        if (!airlinename.trim()) {
            // Kiểm tra xem airlinename có rỗng không
            alert("Please enter an airline name."); // Thông báo cho người dùng nếu không có tên hãng hàng không
            return; // Dừng hàm nếu không có giá trị
        }
        console.log(airlinename);
        // Sử dụng router để chuyển hướng người dùng
        router.push(`/airlineversion/${airlinename}`);
    };
    return(
        <main className="flex-center " >
            <div className="w-3/4   mt-20">
            <h2 className={`${poppins.className} font-bold text-6xl`}>Welcome to Airline version</h2>
            <div className="flex-center mt-10 gap-5  flex-col">
            <Image src='/assets/airplan.jpg' alt='plane ' className="rounded-md" width={1000} height={300}></Image>
            <label className={`${poppins.className}  font-semibold text-3xl`} htmlFor="airlinename">Enter Your Airline:</label>
            <form onSubmit={handleSubmit} className="flex-center w-[1300px]">
                <input required type="text" id="airlinename" value={airlinename} onChange={e => setAirlinename(e.target.value)} className="w-1/4 h-[50px] font-mono value text-3xl border-2 rounded-lg border-black"/>
                <button type="submit">
                <FaSearch className="h-[50px] w-[70px] p-3 rounded-xl border-2 border-black mouse bg-blue-600 text-white"/>
                </button>
            </form>
            </div>


            </div>
        </main>
    )
}
    