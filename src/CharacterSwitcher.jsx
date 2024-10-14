
export default function CharacterSwitcher({selectedCharacterName, characterList, onChangeCharacter}) {
  return (
    <select 
      className="z-10 menu rounded text-4xl text-center capitalize mb-4"
      onChange={onChangeCharacter}
    >
      {characterList.map((character, key) => (
        <option
          key={key}
          className="text-black bg-white capitalize text-2xl"
          value={character}
          selected={selectedCharacterName == character}
        >
          {character}
        </option>
      ))}
    </select>
  )
}