import { useEffect, useState } from 'react';
import { HeroImages } from './assets/heroes'

export default function Character({character}) {
  return (
    <div className="fixed top-0 left-0 z-0">
      <img src={HeroImages[character.toLowerCase()]} />
    </div>
  );
}