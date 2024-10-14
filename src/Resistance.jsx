import { ResistanceImage } from "./assets/resistances";
import ZZZ from './assets/zzz.svg';
import NoEntry from './assets/noentry.svg';
import Partial from './assets/partial.svg';

export default function Resistance({ imageName, tooltip }) {
  //const [selectedStatus, setSelectedStatus] = useState(<img src={ResistanceImage[imageName]} title={tooltip} />);
  const statusCheck = {
    ignores: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} className="opacity-90" />
          <img src={ZZZ} className="absolute top-0 right-0" title={tooltip} width="24" />
        </div>
      )
    },
    blocked: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} />
          <img src={NoEntry} className="absolute top-0 right-0 opacity-50" title={tooltip} width="24" />
        </div>
      )
    },
    partially: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} className="opacity-90" />
          <img src={Partial} className="absolute top-0 right-0 w-[10px]" title={tooltip} width="24" />
        </div>
      )
    },
  };
  // hacky handling
  let selectedStatusEl = <img src={ResistanceImage[imageName]} title={tooltip} />
  let selectedStatus = null;
  Object.keys(statusCheck).forEach((status) => {
    if (imageName.indexOf(status) > -1) {
      selectedStatusEl = statusCheck[status].extraClass;
      selectedStatus = status;
    }
  });

  return (
    <div className={`flex flex-col`}>
      {selectedStatusEl}
    </div>
  )
}