
export default function CharacterSwitcher({characterList, onChangeCharacter}) {
  console.log('characterList', characterList);
  return (
    <select className="z-10 menu rounded text-4xl text-center capitalize mb-4" onChange={onChangeCharacter}>
      {characterList.map((character, key) => (
        <option key={key} className="text-black bg-white capitalize text-2xl">{character}</option>
      ))}
    </select>
  )
}