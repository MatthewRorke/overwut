import { HeroImages } from "./assets/heroes";
import CharacterSwitcherIcon from "./CharacterSwitcherIcon";

export default function CharacterSwitcher({isSelected = false, characterList, onChangeCharacter}) {
  const shouldHide = !isSelected ? "hidden " : "";
  return (
    
    <div className={`${shouldHide} flex flex-row flex-wrap justify-left gap-1 z-40 p-4`}>
        {
          characterList.map((character, key) => (
            <div
              key={key}
              className={`flex flex-col justify-center items-center w-[74px] h-[74px] overflow-hidden menu-dark rounded border-2 b-white hover:cursor-pointer`}
              title={character}
              onClick={() => onChangeCharacter(character)}
            >
              <CharacterSwitcherIcon character={character} />
            </div>
          ))
        }
    </div>
  );
}
