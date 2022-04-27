import { NavLink } from "react-router-dom";
import "./StartPage.scss";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const startpageImage = require("../../images/startpage_image.png");

const StartPage = () => {
  return (
    <div className="startPage">
      <div className="startPage__text">
        <h3 className="startPage__text-subtitle">Rick&Morty API by David</h3>
        <h1 className="startPage__text-title">Front-end Developer</h1>
        <p className="startPage__text-technologies">React - Redux - TypeScript - Thunk - SCSS</p>
        <p className="startPage__text-quote">Hey, check bhhhout it, Morty. This guy can do website for us.</p>
        <NavLink className="startPage__text-continue" to="/characters">
          Get Schwifty
          <ArrowCircleRightOutlinedIcon style={{marginBottom: "-10px", marginLeft: "10px"}} fontSize="large"></ArrowCircleRightOutlinedIcon>
        </NavLink>
      </div>

      <img className="startPage__image" src={startpageImage} alt="">
      </img>
      
     
    </div>
  )
}

export default StartPage