import { useEffect, useState } from 'react'
import Character from './Character';
import PatchSelector from './PatchSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';
import CharacterSelector from './CharacterSelector';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCharacter, setSelectedPatch } from './Store/userSlice';
import SkillList from './SkillList';
import TopBar from './TopBar';
import SkillIndex from './SkillIndex';
import Database from './out';

export default function() {
  const databaseDefaultDate = Object.keys(Database)[
      Object.keys(Database).length - 1
  ];

  const {
    year = databaseDefaultDate.substring(0, 4),
    month = databaseDefaultDate.substring(4, 6),
    day = databaseDefaultDate.substring(6, 8),
    selectedCharacterName = 'juno'
  } = useParams();
  const selectedPatch = useSelector(state => state.user.selectedPatch);
  const characterList = useSelector(state => state.user.characterList)
  const selectedCharacter = useSelector(state => state.user.selectedCharacter);
  // const isAdvanced = useSelector(state => state.user.isAdvanced)

  const [isSelectingCharacter, setIsSelectingCharacter] = useState(false);
  const [foundCharacterCreate, setFoundCharacterCreate] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if(year && month && day) {
      dispatch(setSelectedPatch(`${year}${month}${day}`));
    }
  }, [year, month, day])

  useEffect(() => {
    if(selectedCharacterName != selectedCharacter) {
      document.title = `${(selectedCharacterName.toUpperCase())[0] + selectedCharacterName.slice(1)} | Overwatch Patch ${year}-${month}-${day}`;
      const descMeta = document.querySelector("meta[name='description']");
      descMeta.setAttribute("content",  `View all the abilities and stats for ${selectedCharacterName} across Overwatch Patches`);
      dispatch(setSelectedCharacter(selectedCharacterName.replaceAll("+", " ").replaceAll("%20", " ")))
    }
  }, [selectedCharacterName]);

  useEffect(() => {
    console.log('Patch changed');
    dispatch(setSelectedCharacter(
      selectedCharacterName.replaceAll("+", " ").replaceAll("%20", " ")
    ))
  }, [selectedPatch]);

  function handleChangeCharacter(characterName) {
    navigate(`/${characterName}/patch/${year}/${month}/${day}`);
    setIsSelectingCharacter(false)
  }
  
  return characterList.length ? (
    <>
      {
        isSelectingCharacter && (
          <CharacterSelector
            onCharacterChange={handleChangeCharacter}
            onClose={() => setIsSelectingCharacter(false)}
          />
        )
      }
      {
        selectedCharacter &&
        (
          <div className={`grow flex flex-col justify-center container w-screen mt-4 md:w-[768px] mx-auto z-10 fade-in ${isSelectingCharacter && 'blur-sm'}`}>
            <div className="flex flex-col z-20 md:gap-2">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div>
                    <div className="sticky top-4">
                      <div className="flex flex-row justify-center items-center my-4">
                        <h4 className="text-3xl capitalize font-medium text-gray-800">{selectedCharacter}</h4>
                      </div>
                      <div className="menu-dark rounded w-100 text-left p-4">
                        <div className="flex flex-row justify-between">
                          <h6 className="text-lg capitalize font-medium text-white">Jump to </h6>
                        </div>
                        <div className="list-disc mt-2">
                          <SkillIndex />
                        </div>
                        <div className="flex flex-row justify-center mt-4">
                          <PatchSelector year={year} month={month} day={day} onChange={(newPath) => {
                            navigate(`/${selectedCharacterName}/patch/${newPath}`);
                          }}/>
                        </div>
                      </div>
                      <div className={`flex m-auto drop-shadow-sm justify-center items-center ${!foundCharacterCreate && 'animate-[bounce_2s_ease-in-out_8]'} bg-slate-600 rounded-full size-8 mt-6 `}>
                        <div className={`text-xl text-green-300'}`}>
                          <FaArrowDown />
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-center mt-2 mx-auto menu-dark z-40 rounded p-4 hover:cursor-pointer opacity-80 hover:opacity-100`}
                        onMouseEnter={(() => {
                          setFoundCharacterCreate(true);
                        })}
                        onClick={() => setIsSelectingCharacter(true)}
                      >
                        Change Character
                      </div>
                      <Character character={selectedCharacter} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-100 md:w-7/12">
                    <TopBar />
                    <SkillList />
                  </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  ) : <div>Loading</div>
}
