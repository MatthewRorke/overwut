import { useEffect, useState } from 'react'
import './App.css'
import { HeroImages } from './assets/heroes'
import { ResistanceImage } from './assets/resistances'
import ZZZ from './assets/zzz.svg';
import NoEntry from './assets/noentry.svg';
import Partial from './assets/partial.svg';

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
    <div className="container">
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
              <div className="hover:cursor-pointer" onClick={() => setIsAdvanced(!isAdvanced)} title={`Change to ${isAdvanced ? 'Simple Mode' : 'Advanced Mode'}`}>
                <Tag>
                  <h6 className="capitalize p-4">{ isAdvanced ? 'Advanced Mode' : 'Simple Mode' }</h6>
                </Tag>
              </div>
              <Tag title="Base Health">
                <div className="size-12">
                  <HealthTicker />
                </div>
                <h6 className="capitalize">{selectedCharacter.health}</h6>
              </Tag>
              <Tag title="Base Shield">
                <div className="size-12">
                  <HealthTicker type="shield" />
                </div>
                <h6 className="capitalize">{selectedCharacter.shield}</h6>
              </Tag>
              <Role roleName={selectedCharacter.role} />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-col grow">
                <div className="menu-dark sticky top-2 rounded w-100 text-left p-4">
                  <h6 className="text-lg capitalize font-medium text-white">Jump to</h6>
                  <div className="list-disc mt-2">
                    {
                      selectedCharacter.skills.filter((result) => result).map((skill) => {
                        return (
                          <li>
                            <a className="text-white font-normal hover:text-white hover:underline capitalize" href={`#${skill.replaceAll(" ", "-").toLowerCase()}`}>{skill}</a>
                          </li>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-7/12">
              {
                selectedCharacter.skills.map((skill, key) => (
                  <Skill key={key} skill={skill} showAdvanced={isAdvanced} />
                ))
              }
              </div>
          </div>
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
    <Tag image={RoleImage[roleName]} title={"Character Role"}>
      <h6 className="capitalize">{roleName}</h6>
    </Tag>
  )
}

function Tag({image, title = null, children}) {
  return (
    <div className="flex flex-col size-24 menu rounded justify-center items-center" title={title}>
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
  <div className="flex flex-col w-100">
    <div className="flex flex-col gap-4 py-4 w-100 menu rounded-t px-4">
      <div className="flex flex-row justify-center w-100 items-center" id={selectedSkill.name.replaceAll(" ", "-").toLowerCase()}>
        <img src={HanzoWallClimb} />
        <h4 className="w-24 text-lg capitalize font-light">{selectedSkill.name}</h4>
      </div>
      <div className="flex flex-col grow gap-1">
        {selectedSkill.meta.filter(object => showAdvanced || simpleFields.includes(object.key.toLowerCase())).map((object, key) => (
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
    blocked: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} />
          <img src={NoEntry} className="absolute top-0 right-0 opacity-50" title={tooltip}  width="24"/>
        </div>
      )
    },
    partially: {
      extraClass: (
        <div className="relative">
          <img src={ResistanceImage[imageName]} title={tooltip} className="opacity-90" />
          <img src={Partial} className="absolute top-0 right-0 w-[10px]" title={tooltip}  width="24"/>
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
