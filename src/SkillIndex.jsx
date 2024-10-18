import { useSelector } from "react-redux";

export default function SkillIndex({}) {
    const skills = useSelector(state => state.user.skills)
    return skills.length ?
          skills.map((skill, key) => {
              return (
                <li key={key}>
                  <a className="text-white font-normal hover:text-white hover:underline capitalize" href={`#${skill.name.replaceAll(" ", "-").toLowerCase()}`}>{skill.name}</a>
                </li>
              )
            })
          : null
}