import React from "react"

import Logo from '../assets/img/pie_logo_orange.svg';

function Dashboard() {
  return (
    <div className="react-container">
      <div className="intro-text">
        Welcome back <strong>NAMEHERE</strong>!
      </div>
      <div className="line-br"></div>
      <p className="list-box-info">Recent recipes:</p>
      <div className="list-box">
        <ul>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
        </ul>
      </div>
      <p className="list-box-info">Recent tags:</p>
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
      <p className="list-box-info">Favourites:</p>
      <div className="list-box">
        <ul>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
        </ul>
      </div>
      <img className="pie-logo" src={ Logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Dashboard;