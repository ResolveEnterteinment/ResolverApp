import style from './checkboxStyle.css'

interface Params{
    name:string;
    label:string;
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultState:boolean;
    info?:string;
}

export default function CheckboxInput({name, label, onChange, defaultState, info}: Params)
{
    console.log("Info: " + info)

    return (
        <div className="checkbox-parent">
            <h3 className="text">{label}</h3>
            <div className="checkbox-wrapper-5">
                <div className="check">
                    <input name={name} id={name} type="checkbox" checked={defaultState} onChange={onChange}/>
                    <label htmlFor={name}></label>
                </div>
            </div>
        </div>
    );
}

export function links() {
    return [
        { rel: 'stylesheet', href: style }
    ];
  }