import { useEffect, useState } from "react";
import { RoleImage } from "./assets/role";
import Database from './out';
import CharacterSwitcher from "./CharacterSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRole } from "./Store/userSlice";

export default function CharacterSelector({onClose, onCharacterChange}) {  
  const selectedCharacter = useSelector(state => state.user.selectedCharacter);
  const characterList = useSelector(state => state.user.characterList);
  const selectedRole = useSelector(state => state.user.selectedRole);
  const [ tankList, setTankList ] = useState(populateList('tank'));
  const [ dpsList, setDpsList ] = useState(populateList('damage'));
  const [ supportList, setSupportList ] = useState(populateList('support'));
  const dispatch = useDispatch();
  
  function populateList(role) {
    return characterList?.filter((character) => character.role == role).map((char) => char.name);
  }

  useEffect(() => {
    setTankList(
      populateList('tank')
    );
    setDpsList(
      populateList('damage')
    );
    setSupportList(
      populateList('support')
    );
  }, [characterList])

  function handleChangeRole(role) {
    dispatch(setSelectedRole(role));
  }

  function handleChangeCharacter(name) {
    onCharacterChange(name);
  }
  return (
    <div className="flex items-center justify-center w-[768px] mx-auto z-10 fixed left-0 right-0 bottom-5">
      <div className="bg-white opacity-10 fixed top-0 left-0 w-screen h-screen z-40" onClick={() => onClose()}>
        &nbsp;
      </div>
      <div className="flex gap-0 flex-col md:flex-col justify-center z-40 rounded-t-lg">
        <div className="flex flex-wrap text-sm font-medium text-center z-40 gap-1">
        {
          ['tank', 'damage', 'support'].map((role, key) => (
            <div key={`${role}-${key}`} onClick={() => handleChangeRole(role)} className={`${role == selectedRole ? 'menu' : 'menu-dark'} hover:cursor-pointer inline-block p-4 rounded-none rounded-t-lg`} id="tank" data-tabs-target="#tank" type="button" role="tab" aria-controls="Tank" aria-selected="false">
              <img src={RoleImage[role]} />
              {role == selectedRole && (<span className="capitalize">{role}</span>)}
            </div>
          ))
        }
        </div>
        {characterList.length && (       
          <div className="z-40 menu rounded-b-lg rounded-tr-lg">    
            <CharacterSwitcher
              isSelected={selectedRole == 'tank'}
              selectedCharacterName={selectedCharacter}
              characterList={tankList}
              onChangeCharacter={handleChangeCharacter}
            />
            <CharacterSwitcher
              isSelected={selectedRole == 'damage'}
              selectedCharacterName={selectedCharacter}
              characterList={dpsList}
              onChangeCharacter={handleChangeCharacter}
            />
            <CharacterSwitcher
              isSelected={selectedRole == 'support'}
              selectedCharacterName={selectedCharacter}
              characterList={supportList}
              onChangeCharacter={handleChangeCharacter}
            />
          </div>
        )}
      </div>
    </div>
  );
}