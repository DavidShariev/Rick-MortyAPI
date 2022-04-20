import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CHARACTERS_DATA } from '../../../redux/actions';
import { getListData } from '../../../redux/creators';
import { ICharacter } from '../../../redux/types/dataTypes';
import { ICharactersData, IState } from '../../../redux/types/stateTypes';
import CharacterLink from '../CharacterLink/CharacterLink';


const CharactersList = () => {
  const dispatch = useDispatch();
  
  const charactersData: ICharactersData = 
    useSelector<IState, ICharactersData>(state => state.charactersData);
  const charactersInfo = charactersData.info;
  const charactersList = charactersData.results

  useEffect(() => {
    dispatch(getListData(1, SET_CHARACTERS_DATA))
  }, [dispatch])

  const getOtherPage = (page: number) => {
    dispatch(getListData(page, SET_CHARACTERS_DATA))
  }

  return (
    <div>
      {charactersData ? 
        <div>
          {
            charactersList.map((character: ICharacter) => {
              return(
                <CharacterLink character={character} key={character.id} />
              )
            })
          }

          {charactersInfo.activePage === 1 ?
            null :
            <button
              onClick={getOtherPage.bind(this, charactersInfo.activePage - 1)}
            >prev</button>
          }
          <h2>{charactersInfo.activePage} - {charactersInfo.pages}</h2>
          {charactersInfo.activePage === charactersInfo.pages ?
            null :
            <button
              onClick={getOtherPage.bind(this, charactersInfo.activePage + 1)}
            >next</button>
          }
        </div>
        :
        <h1>Loading...</h1> 
      }
    </div>
  )
}

export default CharactersList