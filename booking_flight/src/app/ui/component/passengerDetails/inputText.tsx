export default function InputText({name,labeltext,type} : {name : string , labeltext : string , type : string}){
    return(
        <div className="flex flex-col">
            <label htmlFor={labeltext}>{labeltext}</label>
            <input className="border-2" name={name} id={labeltext} type={type} />
        </div>
    )
}