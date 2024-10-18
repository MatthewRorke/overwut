import Database from './out';

export default function PatchSelector({year = null, month = null, day = null, onChange}) {
    function handleOnChange(event) {
        onChange(event.target.value);
    }
    return (
        <div>
            <select
                className="z-10 bg-slate-300 text-black p-1 rounded text-xl text-center capitalize"
                onChange={handleOnChange}
                value={`${year}/${month}/${day}`}
            >
                {
                    Object.keys(Database).filter((name) => name.length && name.length == 8).map((date, key) => {
                        const inYear = date.substr(0,4);
                        const inMonth = date.substr(4,2);
                        const inDay = date.substr(6,2);
                        return (
                            <option key={`patch-selector-${key}`} value={`${inYear}/${inMonth}/${inDay}`}>{inYear}-{inMonth}-{inDay}</option>
                        )
                    })
                }
            </select>
            {/* <p className="text-xs text-center m-none mt-1 p-none">(Current Patch)</p> */}
        </div>
    )    
}