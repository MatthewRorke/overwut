import { useEffect, useState } from 'react';
import { HeroImages } from './assets/heroes'

export default function Character({character}) {
  console.log('receive character', character.name.replaceAll('.', '').replaceAll(' ', '_').toLowerCase());
  return (
    <div className="fixed top-0 left-0 z-1">
      <img src={HeroImages[character.name.replaceAll('.', '').replaceAll(' ', '_').toLowerCase()]} />
    </div>
  );
}