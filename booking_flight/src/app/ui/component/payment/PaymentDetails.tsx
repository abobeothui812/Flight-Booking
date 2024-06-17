'use client'
import { useState } from "react";
import { lusitana,inter } from "../asset/font"
import Image from "next/image";
import { useFormState } from "react-dom";
import { bookingInformation } from "@/app/lib/definition";
import { SavePaymentDetails } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import path from "path";
export default function PaymentDetails({Booking}:{Booking : bookingInformation}) {
    const [Paymentmethodchoosed, setPaymentMethod] = useState('Bank Transfer');
    const initialState = {message: "",errors : {}};
    const currentTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19); // Chia cho 1000 để chuyển từ ms sang s
    console.log(currentTimestamp)
    const [state,dispatch] = useFormState(SavePaymentDetails,initialState)
    const router = useRouter();    
    const pathName = usePathname();
    const handleclick = () =>{
        router.push(`${pathName}/paymentsucess`)
    }
    return (
        <form action={dispatch}>
            <input type="hidden" name='Bookingid' value={Booking.bookingid} />
            <input type='hidden' name='TransactionDate' value={currentTimestamp}></input>
            <div className="w-full px-3 mt-3 ">
                <p className={`${lusitana.className} text-3xl font-bold mb-7`}>How you would like to pay?</p>
                <div  className="flex gap-4 justify-between items-center h-[70px] border-t-2 border-b-2 ">
                        <div className="flex flex-row gap-7">
                            <input onClick={() => setPaymentMethod('Credit Card')} type="radio" name="paymentMethod" className="scale-150" id='CreditCard' value='Credit Card' />
                            <label htmlFor='CreditCard' className={`${inter.className} text-xl font-semibold`}>Credit Card</label>
                        </div>
                        <div className="flex flex-row gap-4">
                        <Image alt='VisaCard' width={50} height={50} src='/assets/card.png'></Image>
                        <Image alt='JCBCard' width={50} height={50} src='/assets/jcb.png'></Image>
                        <Image alt='Card' width={50} height={50} src='/assets/mastercard.png'></Image>
                        </div>  
                </div>
                <div  className="flex gap-4 justify-between items-center h-[70px] border-t-2 border-b-2 ">
                        <div className="flex flex-row gap-7">
                            <input onClick={() => setPaymentMethod('Paypal')} type="radio" name="paymentMethod" className="scale-150" id='Paypal' value='Paypal' />
                            <label htmlFor='Paypal' className={`${inter.className} text-xl font-semibold`}>Paypal</label>
                        </div>
                        <div className="flex flex-row gap-4">
                        <Image alt='paypal' width={50} height={50} src='/assets/paypal.png'></Image>
                        </div>  
                </div>
                <div  className="flex gap-4 justify-between items-center h-[70px] border-t-2 border-b-2 ">
                        <div className="flex flex-row gap-7">
                            <input onClick={() => setPaymentMethod('Debit Card')} type="radio" name="paymentMethod" className="scale-150" id='Debitcard' value='Debit card' />
                            <label htmlFor='Debitcard' className={`${inter.className} text-xl font-semibold`}>Debit Card</label>
                        </div>
                        <div className="flex flex-row gap-4">
                        <Image alt='Debit Card' width={50} height={50} src='/assets/credit-card_1.png'></Image>
                        <Image alt='Debit Card' width={50} height={50} src='/assets/credit-card_2.png'></Image>
                        </div>  
                </div>
                <div  className="flex gap-4 justify-between items-center h-[70px] border-t-2 border-b-2 ">
                        <div className="flex flex-row gap-7">
                            <input onClick={() => setPaymentMethod('Bank Transfer')} type="radio" name="paymentMethod" className="scale-150" id='Banktransfer' value='Bank transfer' />
                            <label htmlFor='Banktransfer' className={`${inter.className} text-xl font-semibold`}>Bank Transfer</label>
                        </div>
                        <div className="flex flex-row gap-4">
                        <Image alt='Banktransfer' width={50} height={50} src='/assets/BIDV-1.jpg.webp'></Image>
                        <Image alt='Banktransfer' width={50} height={50} src='/assets/images.png'></Image>
                        </div>  
                </div>
            </div>
            <div className="w-full flex flex-col gap-3 h-[130px] mt-10 border-2 p-3">
                <div className="flex justify-between">
                <p className={`${lusitana.className} text-2xl font-bold`}>Total Price</p>
                <p className={`${lusitana.className} text-2xl font-bold`}>{Booking.totalprice}$</p>
                <input type="hidden" name='Amount' value={Booking.totalprice} />
                
                </div>
                <button type="submit" onClick={handleclick} className="w-full h-[60px] bg-orange-600 rounded-xl text-xl font-bold text-white">Pay with {Paymentmethodchoosed}</button>
            </div>
        </form>
    )
}