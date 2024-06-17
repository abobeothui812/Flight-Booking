import React from 'react';
import Link from 'next/link';
import { fetchUserID } from '@/app/lib/data';
import { FaRegCheckCircle } from "react-icons/fa";
export default async function  PaymentSuccessPage({params}:{params : {bookingid: string}}){
  const userID = await fetchUserID(params.bookingid)
  console.log(userID);
  return (
    <div className="container h-[600px] flex-center flex-col mx-auto  text-center p-10">
      <FaRegCheckCircle className="text-9xl text-blue-500" />
      <h1 className="text-6xl font-bold mb-5 mt-10">Payment Success!</h1>
      <p className="mb-10 text-3xl">Thanks for using our services.</p>
      <div className="flex justify-center gap-5">
        <Link href="/dashboard" className="px-6 py-2 border rounded-md text-lg font-medium hover:bg-gray-100">Back To Home</Link>
        <Link href={`/dashboard/${userID}/my-booking`} className="px-6 py-2 border rounded-md text-lg font-medium hover:bg-gray-100">My Booking</Link>
      </div>
    </div>
  );
};

