import { useEffect, useState } from 'react'
import './App.css'
import Database from './out';
import Character from './Character';
import CharacterSwitcher from './CharacterSwitcher';
import Tag from './Tag';
import HealthTicker from './HealthTicker';
import Role from './Role';
import Skill from './Skill';
import PatchSelector from './PatchSelector';

export default function({year = null, month = null, day = null}) {
  const [selectedPatch, setSelectedPatch] = useState(!year ? 'default' : `${year}${month}${day}`);
  
  console.log('Loading Application', selectedPatch, Database);
  const [characterList, setCharacterList] = useState(getCharacterListByPatch(selectedPatch));
  console.log('Fetched Characters', characterList);
  const [selectedCharacter, setSelectedCharacter] = useState(Database[selectedPatch].Character[0]);
  console.log('Default Character Set', selectedCharacter);
  const [isAdvanced, setIsAdvanced] = useState(true);
  console.log('Advance Mode', isAdvanced);

  useEffect(() => {
    if(year && month && day) {
      console.log('Patch Modified', year, month, day)
      setSelectedPatch(`${year}${month}${day}`);
    }
  }, [year, month, day])

  useEffect(() => {
    console.log('Patch changed, selecting character', selectedPatch)
    setCharacterList(
      getCharacterListByPatch(selectedPatch)
    );
  }, [selectedPatch])

  function getCharacterListByPatch(patch = '') {
    return Database[patch].Character.map((character) => (
      character.name
    )).filter((_, index) => index != 0).sort()
  }

  function handleChangeCharacter(event) {
    const characterName = event.target.value;
    setSelectedCharacter(
        Database[selectedPatch].Character.find((character) => (
        character.name === characterName
      ))
    );
  }
  
  console.log('Defined two functions', characterList, selectedCharacter.skills);
  return characterList ? (
    <div className="flex justify-center container w-screen mt-4 md:w-[768px] mx-auto">
      <div className="flex flex-row">
        <div>
          <Character character={selectedCharacter} />
        </div>
        <div className="flex flex-col z-10 md:gap-2">
          <div className="flex flex-col md:flex-row justify-between gap-2">
              <div>
                <div className="sticky top-4">
                  <div className="flex flex-col-reverse md:flex-row gap-2 justify-between">
                    <div className="flex flex-col">
                      <CharacterSwitcher characterList={characterList} onChangeCharacter={handleChangeCharacter}/>
                    </div>
                  </div>
                  <div className="menu-dark rounded w-100 text-left p-4">
                    <div className="flex flex-row justify-between">
                      <h6 className="text-lg capitalize font-medium text-white">Jump to </h6>
                    </div>
                    <div className="list-disc mt-2">
                      {
                        selectedCharacter ?
                          selectedCharacter.skills.filter((result) => result).map((skill, key) => {
                            console.log('Skill', skill);
                            return (
                              <li key={key}>
                                <a className="text-white font-normal hover:text-white hover:underline capitalize" href={`#${skill.replaceAll(" ", "-").toLowerCase()}`}>{skill}</a>
                              </li>
                            )
                          })
                        : null
                      }
                    </div>
                    <div class="flex flex-row justify-center mt-4">
                      <PatchSelector />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-100 md:w-7/12">
                <div className="flex flex-row gap-2 justify-between">
                  <div className="hover:cursor-pointer" onClick={() => setIsAdvanced(!isAdvanced)} title={`Change to ${isAdvanced ? 'Simple Mode' : 'Advanced Mode'}`}>
                    <Tag>
                      <h6 className="capitalize p-4 text-center">{ isAdvanced ? 'Advanced Mode' : 'Simple Mode' }</h6>
                    </Tag>
                  </div>
                  <Tag title="Base Health">
                    <div className="size-12">
                      <HealthTicker type="health" />
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
                <div className="flex flex-col gap-2">
                {
                  selectedCharacter.skills.filter((res) => res).map((skill_name, key) => {
                    console.log('s', skill_name, selectedPatch);    
                    return (
                    <Skill
                      key={key}
                      patch={selectedPatch}
                      skill_name={skill_name}
                      showAdvanced={isAdvanced}
                    />
                  )
                })
                }
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  ) : <div>Loading</div>
}
