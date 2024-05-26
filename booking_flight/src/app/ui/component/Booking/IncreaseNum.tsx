import { poppins } from "../asset/font";

export default function IncreaseNum({type,numberOfpeople,subscript,setNumberOfpeople} : {type : string ,numberOfpeople : number,subscript: string ,setNumberOfpeople : (value: number) => void}) {
    const Increase = () =>{
        setNumberOfpeople(numberOfpeople + 1);
    }

    const Decrease = () => {
        if(numberOfpeople > 0){
            setNumberOfpeople(numberOfpeople - 1);
        }
    }
    
    return(
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
            <h3 className={` ${poppins.className}`}>{type}</h3>
            <p className="text-xs text-slate-400">{subscript}</p>
            </div>
            <div className="border-2  flex-center flex-row text-slate-400 rounded-lg w-[100px] h-[40px]">
                <button type="button" onClick={Increase}  className="w-[30px] h-[40px] border-r-2">+</button>
                <div className="w-[35px] h-full bg-slate-100 flex-center">{numberOfpeople}</div>
                <button type="button"  onClick={Decrease} className="w-[30px] h-[40px] border-l-2">-</button>
            </div>
        </div>
    )

}