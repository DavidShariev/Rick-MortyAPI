import { Route, Routes } from 'react-router-dom';
import CharacterPage from './components/Character/CharacterPage/CharacterPage';
import CharactersList from './components/Character/CharactersList/CharactersList';
import EpisodeList from './components/Episode/EpiosodeList/EpisodeList';
import EpisodePage from './components/Episode/EpisodePage/EpisodePage';
import Layout from './components/Layout/Layout';
import LocationList from './components/Location/LocationList/LocationList';
import LocationPage from './components/Location/LocationPage/LocationPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/characters" element={<CharactersList />}></Route>  
          <Route path="/characters/:character_id" element={<CharacterPage />}></Route>
          <Route path="/locations" element={<LocationList />}></Route>
          <Route path="/locations/:location_id" element={<LocationPage />}></Route>
          <Route path="/episodes" element={<EpisodeList />}></Route>
          <Route path="/episodes/:episode_id" element={<EpisodePage />}></Route>
        </Route>  
      </Routes>        
    </div>
  );
}

export default App;
