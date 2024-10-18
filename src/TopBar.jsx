import { useDispatch, useSelector } from "react-redux";
import HealthTicker from "./HealthTicker";
import Tag from "./Tag";
import Role from "./Role";
import { setIsAdvanced } from "./Store/userSlice";

export default function TopBar() {
  const isAdvanced = useSelector(state => state.user.isAdvanced)
  const dispatch = useDispatch();
  const { health, shield, role } = useSelector((state) => state.user.selectedCharacterObject) 
  return (
    <div className="flex flex-row gap-2 justify-between">
      <div className="hover:cursor-pointer" onClick={() => {dispatch(setIsAdvanced(!isAdvanced))}} title={`Change to ${isAdvanced ? 'Simple Mode' : 'Advanced Mode'}`}>
        <Tag>
          <h6 className="capitalize p-4 text-center">{ isAdvanced ? 'Advanced Mode' : 'Simple Mode' }</h6>
        </Tag>
      </div>
      <Tag title="Base Health">
        <div className="size-12">
            <HealthTicker type="health" />
        </div>
        <h6 className="capitalize">{health}</h6>
      </Tag>
      <Tag title="Base Shield">
        <div className="size-12">
            <HealthTicker type="shield" />
        </div>
        <h6 className="capitalize">{shield}</h6>
      </Tag>
      <Role roleName={role} />
    </div>
  )
}