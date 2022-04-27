import { Route, Routes } from 'react-router-dom';
import ElementPage from './components/ElementPage/ElementPage';
import Layout from './components/Layout/Layout';
import List, { charactersType, episodesType, locationsType } from './components/List/List';
import StartPage from './components/StartPage/StartPage';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<StartPage />}></Route>
          <Route path="/characters" element={<List type={charactersType} />}></Route>  
          <Route path="/characters/:id" element={<ElementPage type="character"/>}></Route>
          <Route path="/locations" element={<List type={locationsType} />}></Route>
          <Route path="/locations/:id" element={<ElementPage type="location" />}></Route>
          <Route path="/episodes" element={<List type={episodesType} />}></Route>
          <Route path="/episodes/:id" element={<ElementPage type="episode" />}></Route>
        </Route>  
      </Routes>        
    </div>
  );
}

export default App;
