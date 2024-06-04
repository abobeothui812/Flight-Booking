export default function InputText({name,labeltext,type} : {name : string , labeltext : string , type : string}){
    return(
        <div>
            <label htmlFor={labeltext}>{labeltext}</label>
            <input name={name} id={labeltext} type={type} />
        </div>
    )
}