import React from "react"

import Logo from '../assets/img/pie_logo_orange.svg';

function MyRecipes() {
  return (
    <div className="react-container">
      <div className="my-recipes-list-title">
        <p className="list-box-info">My recipes</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box">
        <ul>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
        </ul>
      </div>
      <div className="my-recipes-list-title">
        <p className="list-box-info">Tags</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box" id="tag-box">
        <ul>
          <li>#Tag1</li>
          <li>#Tag2</li>
          <li>#Tag3</li>
          <li>#Tag4</li>
          <li>#Tag5</li>
          <li>#Tag6</li>
          <li>#Tag7</li>
          <li>#Tag8</li>
          <li>#Tag9</li>
          <li>#Tag10</li>
          <li>#Tag11</li>
          <li>#Tag12</li>
        </ul>
      </div>
      <button className="general">Add recipe</button>
      <img className="pie-logo" src={ Logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default MyRecipes;