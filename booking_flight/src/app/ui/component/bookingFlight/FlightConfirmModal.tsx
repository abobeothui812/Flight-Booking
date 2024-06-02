'use client'
import { useRef } from "react"
import { FaRegCalendarCheck } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { RiFlightTakeoffFill } from "react-icons/ri"
export default function FlightConfirmModal(){
    const dialogRef = useRef<HTMLDialogElement>(null)
    const openDialog = () => {
        dialogRef.current.showModal();
      };
    
      const closeDialog = () => {
        dialogRef.current.close();
      };
    return(
        <>
            <dialog ref={dialogRef}> 
                hello
                <button className="border-2" onClick={closeDialog}></button>
            </dialog>
            <button  className="border-2 w-[50px] h-[50px]" onClick={openDialog}></button>
           
        </>
    )
}