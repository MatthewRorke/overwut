import { useEffect, useState } from 'react';
import { HeroImages } from './assets/heroes'

export default function Character({character, children}) {
  const [ backgroundModifier, setBackgroundModifier ] = useState(
    !HeroImages[`${character.toLowerCase()}Bg`]
      ?
        {}
      :
        HeroImages[`${character.toLowerCase()}Bg`]
  );

  useEffect(() => {
    if(!HeroImages[`${character.toLowerCase()}Bg`]) {
      return;
    }
    setBackgroundModifier(HeroImages[`${character.toLowerCase()}Bg`])
  }, [character])

  return (
      <div
      >
        <img src={HeroImages[character.toLowerCase()]} {...backgroundModifier}/>
      </div>
  );
}