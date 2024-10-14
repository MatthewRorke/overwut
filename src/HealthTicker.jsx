export default function HealthTicker({type = ''}) {
    return (
        <div className="flex flex-row">
        <div className={`hp-ticker hp-ticker-${type}`}>
            &nbsp;
        </div>
        <div className={`hp-ticker hp-ticker-${type}`}>
            &nbsp;
        </div>
        <div className={`hp-ticker hp-ticker-${type}`}>
            &nbsp;
        </div>
        </div>
    )
}