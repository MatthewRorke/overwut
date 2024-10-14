import { useEffect, useState } from 'react';
import StockImage from './assets/skills/hanzo_wallclimb.webp';
import Resistance from './Resistance';
import Database from './out';

const simpleFields = [
  'damage',
  'health',
  'headshot',
  'rate of fire',
  'cast time',
  'duration',
  'area of effect',
  'max range',
  'ammo',
  'movement speed',
  'reload time',
  'healing',
  'healing modification',
  'dmg. amplification',
  'projectile speed'
]

export default function Skill({patch, skill_name, showAdvanced}) {
    console.log('Skill', skill_name, patch);
    const [skill, setSkill] = useState(
      Database[patch].Skill.find((skill) => {
        console.log('Generating skill ' + skill_name);
        return skill.name == skill_name
      })
    ) // Yes this is a useState

    useEffect(() => {
      console.log('Skill changed', skill_name);
      setSkill(Database[patch].Skill.find((skill) => {
        console.log('Generating skill ' + skill_name);
        return skill.name == skill_name
      })) // Yes I duplicated it
    }, [skill_name])

    function slugIt(name) {
      return name.replaceAll(' ', '-').replaceAll('.', '').toLowerCase();
    }
    if(!skill) return null;
    return (
    <div className="flex flex-col w-100">
      <div className="flex flex-col gap-4 py-4 w-100 menu rounded-t px-4">
        <div className="flex flex-row justify-center w-100 items-center" id={skill.name.replaceAll(" ", "-").toLowerCase()}>
          <img src={StockImage} />
          <h4 className="w-24 text-lg capitalize font-light">{skill.name}</h4>
        </div>
        <div className="flex flex-col grow gap-1">
          {skill.meta.filter(object => showAdvanced || simpleFields.includes(object.key.toLowerCase())).map((object, key) => (
            <div className="flex flex-row justify-between gap-2 menu-dark rounded border-1 text-sm p-2 w-100" key={key}>
              <p className={`font-medium text-left capitalize color-code-${slugIt(object.key)}`}>
                {object.key}
              </p>
              <p className={`text-right`}>
                {object.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row px-4 py-2 w-100 menu-dark rounded-b gap-8 justify-end items-end">
          {
            skill.resistances.filter((resistance) => resistance).map((resistance, key) => (<Resistance key={key} imageName={(resistance.replaceAll(' ', '_').replaceAll('\/', '_')).toLowerCase()} tooltip={resistance} />))
          }
      </div>
    </div>
    )
  }