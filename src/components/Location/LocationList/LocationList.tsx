import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOCATIONS_DATA } from '../../../redux/actions';
import { getListData } from '../../../redux/creators';
import { ILocation } from '../../../redux/types/dataTypes';
import { ILocationsData } from '../../../redux/types/stateTypes';
import { IState } from '../../../redux/types/stateTypes';
import LocationLink from '../LocationLink/LocationLink';

const LocationList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector<IState, boolean>( state => state.loading)
  const locationsData: ILocationsData =
    useSelector<IState, ILocationsData>(state => state.locationsData);
  const locationsInfo = locationsData.info;
  const locationsList = locationsData.results;

  useEffect(() => {
    dispatch(getListData(1, SET_LOCATIONS_DATA));
  }, [dispatch])

  const getOtherPage = (page: number) => {
    dispatch(getListData(page, SET_LOCATIONS_DATA))
  }

  return (
    <div>
      {(!isLoading && locationsData) ?
        <div>
          {
            locationsList.map( (location: ILocation) => {
              return(
                <LocationLink location={location} key={location.id}/>
              )
            })
          }

          {locationsInfo.activePage === 1 ?
            null :
            <button
              onClick={getOtherPage.bind(this, locationsInfo.activePage - 1)}
            >prev</button>
          }
          <h2>{locationsInfo.activePage} - {locationsInfo.pages}</h2>
          {locationsInfo.activePage === locationsInfo.pages ?
            null :
            <button
              onClick={getOtherPage.bind(this, locationsInfo.activePage + 1)}
            >next</button>
          }
        </div>
        :
        <h1>Loading...</h1>

      }
    </div>
  )
}

export default LocationList