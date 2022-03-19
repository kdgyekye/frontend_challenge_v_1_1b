import React, {FC, Fragment} from 'react'
import { useNavigate } from 'react-router';
import { Character, characters } from '../../utils/characters'
import { connect } from 'react-redux';
import { getComputerCharacters, selectCharacterAction } from '../../getStore';

interface ICharacterProps {
    computerCharacters: Character[];
    selectCharacters: (userCharacter: Character, compCharacter: Character) => void;
}

const SelectCharacter:FC<ICharacterProps> = (props:any) => {
    const {computerCharacters, selectCharacters} = props;

    const navigate = useNavigate();

    const selectComputerChoice = () => {
        const computerChoice = computerCharacters[Math.floor(Math.random() * computerCharacters.length)];
        return computerChoice
    }

    const handleSelectCharacter = (character: Character) => {
        selectCharacters(character, selectComputerChoice())
        console.log(character,selectComputerChoice())
        navigate('/fight')
    }

    return (
        <Fragment>
            <div className='mt-10 bg-gray-300 py-5'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold mb-5'>Select Character</h1>
                    <div className='flex justify-center items-center space-x-5'>
                        {
                            characters.map((character,index) => (
                                <div 
                                    className='border bg-white rounded-md shadow-md cursor-pointer hover:shadow-lg' 
                                    key={index} 
                                    onClick={() => handleSelectCharacter(character)}>
                                    <img className='w-40 h-40' src={character.imageUrl} alt={character.name}/>
                                    <label className='flex justify-center'>{character.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state:any) => {
    return {
        computerCharacters: getComputerCharacters(state)
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        selectCharacters: (userCharacter: Character, compCharacter: Character) => {
            dispatch(selectCharacterAction(userCharacter, compCharacter))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SelectCharacter)