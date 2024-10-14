import Database from './out';

export default function PatchSelector({year = null, month = null, day = null, onChange}) {
    return (
        <div>
            <select
                className="z-10 bg-slate-300 text-black p-1 rounded text-xl text-center capitalize"
                onChange={onChange}>
                {
                    Object.keys(Database).filter((name) => name.length && name.length == 8).map((date, key) => {
                        const year = date.substr(0,4);
                        const month = date.substr(4,2);
                        const day = date.substr(6,2);
                        const selected = (year == year && month == month && day == day) ? 'selected' : '';
                        return (
                            <option key={key} value={`${year}${month}${day}`} {...selected}>{year}-{month}-{day}</option>
                        )
                    })
                }
            </select>
            <p className="text-xs text-center m-none mt-1 p-none">(Current Patch)</p>
        </div>
    )    
}