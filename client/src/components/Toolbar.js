import React, { useContext } from "react";
import "../sass/toolbar.sass";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Toolbar = () => {
  // const { appState, appDispatch } = useContext(AppContext);

  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav id="toolbar" className="toolbar">
      <img className="toolbar-img" src="/logoVerallia.jpg" alt="logo" />
      <ul className="toolbar-list">
        <li>
          <NavLink className={"toolbar-item"} to="/map/subcontractors">
            Подрядчики
          </NavLink>
        </li>
        <div className={"toolbar-item-border"}></div>
        <li>
          <NavLink className={"toolbar-item"} to="/map/incidents">
            Инциденты
          </NavLink>
        </li>
        <div className={"toolbar-item-border"}></div>
        {/* <li>
          <NavLink className={"toolbar-item"} to="/create">
            Создать
          </NavLink>
        </li>
        <div className={"toolbar-item-border"}></div>
        <li>
          <NavLink className={"toolbar-item"} to="/links">
            Ссылки
          </NavLink>
        </li> */}
        <li>
          <a className={"toolbar-item"} href="/" onClick={logoutHandler}>
            Выйти
          </a>
        </li>
      </ul>
      {/* <div className="toolbar-status">
        <div id="toolbar-status-text" calss="toolbar-status-text">
          {appState.layout} layout
        </div>
      </div> */}
    </nav>
  );
};
