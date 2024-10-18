import { HeroImages } from "./assets/heroes";
import Database from "./out";

export default function SelectHero({year = null, month = null, day = null}) {
  console.log('d', Database['default']);
  return (
    <div className="flex justify-center container w-screen mt-4 md:w-[768px] mx-auto">
      <div className="flex">
        {
          Database['default'].Character.map((character) => {
            console.log('c', character);
            return (
              HeroImages[`${character}Icon}`] ? 
              (
                  HeroImages[`${character}Icon`]
              )
              :
              (
                //<img src={HeroImages[character]} />
              )
            )
          })
        }
      </div>
    </div>
  )
}
