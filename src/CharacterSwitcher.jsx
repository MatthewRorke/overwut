import { HeroImages } from "./assets/heroes";

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
              <div className="w-[250px] h-[250px] relative opacity-80">
                {
                      HeroImages[`${character}Icon`] ? 
                      (
                          HeroImages[`${character}Icon`]
                      )
                      :
                      (
                        <img src={HeroImages[character]}  width="100%" className="absolute top-0 left-0"/>
                      )
                }
              </div>
            </div>
          ))
        }
    </div>
  );
}
