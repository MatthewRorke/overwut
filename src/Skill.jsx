import { useEffect, useState } from 'react';
import StockImage from './assets/skills/hanzo_wallclimb.webp';
import Resistance from './Resistance';
import Database from './out';
import { useSelector } from 'react-redux';

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

export default function Skill({skill = null}) {
    const showAdvanced = useSelector(state => state.user.isAdvanced);
    function slugIt(name) {
      return name ? name.replaceAll(' ', '-').replaceAll('.', '').toLowerCase() : name;
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
          {skill.meta.filter(object => showAdvanced != null || simpleFields.includes(object.key.toLowerCase())).map((object, key) => (
            <div className="flex flex-row justify-between gap-2 menu-dark rounded border-1 text-sm p-2 w-100" key={`skill-container-${object.key}-${key}`}>
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
            skill.resistances.map((resistance) => (<Resistance key={`resistance-${skill.name}-${resistance.name}`} imageName={(resistance.name.replaceAll(' ', '_').replaceAll('\/', '_')).toLowerCase()} tooltip={resistance.name} />))
          }
      </div>
    </div>
    )
  }