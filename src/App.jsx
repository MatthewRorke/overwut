import { useEffect, useState } from 'react'
import './App.css'
import { HeroImages } from './assets/heroes'
import { ResistanceImage } from './assets/resistances'

import HanzoWallClimb from './assets/skills/hanzo_wallclimb.webp'
import Characters from './out/character.json'
import Skills from './out/skill.json'
import { RoleImage } from './assets/role'

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
        <div className="flex flex-row gap-2 justify-between mr-1">
          <div className="flex flex-col">
            <CharacterSwitcher characterList={characterList} onChangeCharacter={handleChangeCharacter}/>
          </div>
          <div className="flex flex-row gap-2 justify-end">
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
          {
            selectedCharacter.skills.map((skill, key) => (
              <Skill key={key} skill={skill} />
            ))
          }
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

function Skill({skill}) {
  const selectedSkill = Skills.find(skills => skills.name === skill);
  const slugIt = (name) => {
    return name.replaceAll(' ', '-').replaceAll('.', '').toLowerCase();
  }
  if(!selectedSkill) return <></>
  return (
  <div className="flex flex-row gap-2 w-100">
    <div className="flex flex-row py-4 w-10/12 menu rounded pr-4">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="size-12">
          <img src={HanzoWallClimb} />
        </div>
        <h6 className="w-24 text-sm capitalize">{selectedSkill.name}</h6>
      </div>
      <div className="flex round-full">
        <div className="flex flex-col justify-center items-start">
            {selectedSkill.meta.map((object, key) => (
                <p className="flex flex-row text-sm gap-2" key={key}>
                  <span className={`font-medium w-[125px] text-right capitalize color-code-${slugIt(object.key)}`}>
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
    <div className="flex flex-col py-4 w-24 menu rounded gap-8 justify-between items-center">
        {
          selectedSkill.resistances.filter((resistance) => resistance).map((resistance, key) => (<Resistance key={key} imageName={(resistance.replaceAll(' ', '_').replaceAll('\/', '_')).toLowerCase()} tooltip={resistance} />))
        }
    </div>
  </div>
  )
}

function Resistance({imageName, tooltip}) {
  const statusCheck = [
    "ignores",
    "partially",
    "blocked"
  ]
  if(statusCheck.includes(tooltip)) {
    return (
      <div className="flex flex-col">
        <img src={ResistanceImage[imageName]} title={tooltip}/>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <img src={ResistanceImage[imageName]} title={tooltip}/>
    </div>
  )
}

export default App
