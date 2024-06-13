'use client'
import { useState } from "react";
import { lusitana,inter } from "../asset/font"
const PaymentMethod =[,
    {name: "Bank Tranfer", value: "BankTranfer"},
    {name: "Paypal", value: "Paypal"},
    {name: "Credit Card", value: "CreditCard"},
    {name: "Debit Card", value: "DebitCard"}
]
export default function PaymentDetails() {
    const [Paymentmethodchoosed, setPaymentMethod] = useState('Bank Transfer');
    return (
        <div>
            <div className="w-full px-3 mt-3 ">
                <p className={`${lusitana.className} text-2xl font-bold mb-7`}>How you would like to pay?</p>
                {
                    PaymentMethod.map((method : any) => (
                        <div key={method.value} className="flex gap-4 items-center h-[70px] border-t-2 border-b-2 ">
                            <input onClick={() => setPaymentMethod(method.value)} type="radio" name="paymentMethod" className="scale-150" id={method.value} value={method.value} />
                            <label htmlFor={method.value} className={`${inter.className} text-xl font-semibold`}>{method.name}</label>
                        </div>
                    ))
                }
            </div>
            <div className="w-full flex flex-col gap-3 h-[130px] mt-10 border-2 p-3">
                <div className="flex justify-between">
                <p className={`${lusitana.className} text-2xl font-bold`}>Total Price</p>
                <p className={`${lusitana.className} text-2xl font-bold`}>500$</p>
                </div>
                <button className="w-full h-[60px] bg-orange-600 rounded-xl text-xl font-bold text-white">Pay with {Paymentmethodchoosed}</button>
            </div>
        </div>
    )
}