import { createSlice } from '@reduxjs/toolkit';
import Database from '../out';

const defaultPatch = '20241015';
const defaultChar = 'ana';
const defaultRole = 'tank';

const initialState = {
    selectedPatch: defaultPatch,
    characterList: Database[defaultPatch].Character,
    selectedCharacter: defaultChar,
    selectedCharacterObject: Database[defaultPatch].Character.find(({name}) => name == defaultChar),
    selectedRole: defaultRole,
    skills: [],
    isAdvanced: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedPatch: (state, action) => {
            console.log('a', action);
            state.selectedPatch = action.payload;
            state.characterList = Database[state.selectedPatch].Character;
        },
        setSelectedCharacter: (state, action) => {
            const character = action.payload;
            state.selectedCharacter = character;
            state.selectedCharacterObject = Database[state.selectedPatch].Character.find(({name}) => name == character);
            state.characterList = Database[state.selectedPatch].Character;
            const basicSkills = state.selectedCharacterObject.skills.filter((skill) => {
                return skill != null
            });
            console.log('b', character, basicSkills);
            state.skills = basicSkills.map((skill) => {
                const selectedSkillObj = Database[state.selectedPatch].Skill.find(({name}) => {
                    return name == skill
                });
                console.log('s', skill, selectedSkillObj);
                const resistancesObj = selectedSkillObj.resistances.filter(resistance => resistance != null).map((resistanceName) => {
                    return Database[state.selectedPatch].Resistance.find(resistanceObj => {
                        return resistanceObj.name == resistanceName
                    });
                })
                return {
                    ...selectedSkillObj,
                    resistances: resistancesObj
                };
            });
            console.log('res', state.skills);
        },
        setIsAdvanced: (state, {payload = false}) => {
            state.isAdvanced = payload;
        },
        setSelectedRole: (state, {payload}) => {
            state.selectedRole = payload;
        }
    }
})

export const {
    setSelectedPatch,
    setSelectedCharacter,
    setSelectedRole,
    setIsAdvanced
} = userSlice.actions;

export default userSlice.reducer;