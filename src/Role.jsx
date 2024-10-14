import { RoleImage } from "./assets/role";
import Tag from "./Tag";

export default function Role({roleName}) {
  return (
    <Tag image={RoleImage[roleName]} title={"Character Role"}>
      <h6 className="capitalize">{roleName}</h6>
    </Tag>
  )
}