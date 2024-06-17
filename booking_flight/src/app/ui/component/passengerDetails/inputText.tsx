import { lusitana,inter } from "../asset/font"
export default function InputText({name,labeltext,type,placeholder} : {name : string , labeltext : string , type : string, placeholder : string}){
    return(
        <div className="flex gap-2 flex-col">
            <label  className={`text-xl ${inter.className} font-semibold`} htmlFor={labeltext}>{labeltext}:</label>
            <input required className={`border-2 rounded-lg w-[500px] px-2 ${lusitana.className} text-lg h-[60px]`} name={name} id={labeltext} type={type} placeholder={placeholder} />
        </div>
    )
}