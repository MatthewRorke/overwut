import { useEffect, useState } from 'react'
import './App.css'
import { HeroImages } from './assets/heroes'
import { ResistanceImage } from './assets/resistances'
import ZZZ from './assets/zzz.svg';
import NoEntry from './assets/noentry.svg';

import HanzoWallClimb from './assets/skills/hanzo_wallclimb.webp'
import Characters from './out/character.json'
import Skills from './out/skill.json'
import { RoleImage } from './assets/role'

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

function CharacterSwitcher({characterList, onChangeCharacter}) {
  return (
    <select className="z-10 menu rounded text-4xl text-center capitalize mb-12 mr-4" onChange={onChangeCharacter}>
      {characterList.map((character) => (
        <option className="text-black bg-white capitalize text-2xl">{character}</option>
      ))}
    </select>
  )
}

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(Characters[1]);
  const [isAdvanced, setIsAdvanced] = useState(true);

  const characterList = Characters.map((character) => (
    character.name
  )).filter((_, index) => index != 0).sort();
  function handleChangeCharacter(event) {
    const characterName = event.target.value;
    const character = Characters.find((character) => (
      character.name === characterName
    ));
    setSelectedCharacter(character);
  }
  return (
    <div className="flex flex-row">
      <div>
        <Character character={selectedCharacter} characterList={characterList} onChangeCharacter={handleChangeCharacter}/>
      </div>
      <div className="flex flex-col gap-2 z-10">
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col">
            <CharacterSwitcher characterList={characterList} onChangeCharacter={handleChangeCharacter}/>
          </div>
          <div className="flex flex-row gap-2 justify-end">
            <div className="hover:cursor-pointer" onClick={() => setIsAdvanced(!isAdvanced)}>
              <Tag>
                <h6 className="capitalize">{ isAdvanced ? 'Advanced Mode' : 'Simple Mode' }</h6>
              </Tag>
            </div>
            <Tag>
              <div className="size-12">
                <HealthTicker />
              </div>
              <h6 className="capitalize">{selectedCharacter.health}</h6>
            </Tag>
            <Tag>
              <div className="size-12">
                <HealthTicker type="shield" />
              </div>
              <h6 className="capitalize">{selectedCharacter.shield}</h6>
            </Tag>
            <Role roleName={selectedCharacter.role} />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          {
            selectedCharacter.skills.map((skill, key) => (
              <Skill key={key} skill={skill} showAdvanced={isAdvanced} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

function HealthTicker({type = ''}) {
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

function Role({roleName}) {
  return (
    <Tag image={RoleImage[roleName]}>
      <h6 className="capitalize">{roleName}</h6>
    </Tag>
  )
}

function Tag({image, children}) {
  return (
    <div className="flex flex-col size-24 menu rounded justify-center items-center">
      {
        image &&
          (
            <div className="size-12">
              <img src={image} />
            </div>
          )
      }
      {children}
    </div>
  )
}

function Character({character, characterList, onChangeCharacter}) {
  return (
    <div>
      <div className={`bg-no-repeat fixed left-0 h-[100vh] w-[100vw]`} style={{backgroundImage: `url('${HeroImages[character.name.replaceAll('.', '').replaceAll(' ', '_').toLowerCase()]}')`}}>
      </div>
    </div>
  );
}

function Skill({skill, showAdvanced}) {
  const selectedSkill = Skills.find(skills => skills.name === skill);
  const slugIt = (name) => {
    return name.replaceAll(' ', '-').replaceAll('.', '').toLowerCase();
  }
  if(!selectedSkill) return null;
  return (
  <div className="flex flex-row gap-2 w-100">
    <div className="flex flex-row py-4 w-11/12 menu rounded pr-4">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="size-12">
          <img src={HanzoWallClimb} />
        </div>
        <h6 className="w-24 text-sm capitalize">{selectedSkill.name}</h6>
      </div>
      <div className="flex round-full">
        <div className="flex flex-col justify-center items-start">
            {selectedSkill.meta.filter(object => showAdvanced || simpleFields.includes(object.key.toLowerCase())).map((object, key) => (
                <p className="flex flex-row text-sm gap-2" key={key}>
                  <span className={`font-medium w-[150px] text-right capitalize color-code-${slugIt(object.key)}`}>
                    {object.key}
                  </span> |
                  <span className={`text-left w-[250px]`}>
                    {object.value}
                  </span>
                </p>
            ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col py-4 w-1/12 menu rounded gap-8 justify-between items-center">
        {
          selectedSkill.resistances.filter((resistance) => resistance).map((resistance, key) => (<Resistance key={key} imageName={(resistance.replaceAll(' ', '_').replaceAll('\/', '_')).toLowerCase()} tooltip={resistance} />))
        }
    </div>
  </div>
  )
}

function Resistance({imageName, tooltip}) {
  //const [selectedStatus, setSelectedStatus] = useState(<img src={ResistanceImage[imageName]} title={tooltip} />);
  const statusCheck = {
    ignores: {
      extraClass: (
      <div className="relative">
        <img src={ResistanceImage[imageName]} title={tooltip} className="opacity-90" />
        <img src={ZZZ} className="absolute top-0 right-0" title={tooltip} width="24"/>
      </div>
      )
    },
    partially: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} className="opacity-90" />
          <img src={NoEntry} className="absolute top-0 right-0 opacity-50" title={tooltip}  width="24"/>
        </div>
      )
    },
    blocked: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} />
        </div>
      )
    },
  };
  // hacky handling
  let selectedStatusEl = <img src={ResistanceImage[imageName]} title={tooltip} />
  let selectedStatus = null;
  Object.keys(statusCheck).forEach((status) => {
    if(imageName.indexOf(status) > -1) {
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

export default App
