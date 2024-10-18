import { useSelector } from "react-redux"
import Skill from "./Skill"

export default function SkillList({showAdvance = false}) {
  const currSkills = useSelector(state => state.user.skills)
  return (
    <div className="flex flex-col gap-2">
      {
        currSkills.length ?
          currSkills.map((skill, key) => {
            return (
              <Skill
                key={'skill-'+key}
                skill={skill}
              />
            )
          })
          : null
      }
    </div>
  )
}