import React from 'react';
import { inter } from '@/app/ui/component/asset/font';
import Link from 'next/link';
import Mybookingtable from '@/app/ui/component/mybooking/mybookingtable';
import { fetchBookingwithUserid } from '@/app/lib/data';
export default async function myflightpage({params}:{params : {userid : number}}){
  const [booking] = await Promise.all([fetchBookingwithUserid({Userid: params.userid})]);
  return (
    <div className="container  mx-auto flex flex-col gap-3 p-10">
        <h1 className={`${inter.className} font-bold text-5xl`}>My Booking</h1>
        <Mybookingtable booking={booking}></Mybookingtable>

    </div>
  );
};

