import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const githubLogo = require('../../images/github.png')

const Sidebar = () => {
  const location = useLocation().pathname;
  console.log(location);
  
  let sidebar: JSX.Element;
  if(location === "/"){
    sidebar = (
      <div className="sidebar">
        
        <h3 className="sidebar__title">Rick&MortyAPI</h3>
        <img className="sidebar__github" src={githubLogo} alt=""></img>
      </div> 
    );
  }else{
    sidebar = (
      <div className="sidebar sidebar--full">
        <NavLink className="sidebar__title" to="">
          <h3 >Rick&MortyAPI</h3>
        </NavLink>
        
        <div className="sidebar__links">
          <NavLink to="/characters" 
            className={"sidebar__links-link"+(location === "/characters" ? " sidebar__links-link--active" : "")}
          >
            <h2>Characters</h2>
          </NavLink>
          <NavLink to="/episodes" 
            className={"sidebar__links-link" + (location === "/episodes" ? " sidebar__links-link--active" : "")}
          >
            <h2>Episode</h2>
          </NavLink>
          <NavLink to="/locations" 
            className={"sidebar__links-link" + (location === "/locations" ? " sidebar__links-link--active" : "")}
          >
            <h2>Locations</h2>
          </NavLink>

        </div>
        <div className="sidebar__github_link">
          <img className="sidebar__github" src={githubLogo} alt=""></img>
          My GitHub
        </div>
      </div>
    )
  }
 
    
  
  return sidebar
}

export default Sidebar