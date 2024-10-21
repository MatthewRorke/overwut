import { useEffect, useState } from 'react';
import { HeroImages } from './assets/heroes'

export default function Character({character, children}) {
  const [ backgroundModifier, setBackgroundModifier ] = useState(
    !HeroImages[`${character.toLowerCase()}Bg`]
      ?
        {
          'background-size': '25%',
          'background-position': 'bottom left',
          'background-attachment': 'fixed',
        }
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
        className="bg-no-repeat"
        style={{'background-image': `url('${HeroImages[character.toLowerCase()]}')`, ...backgroundModifier}}
      >
        {children}
      </div>
  );
}