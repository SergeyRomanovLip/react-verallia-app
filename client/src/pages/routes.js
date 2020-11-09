import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import { CreatePage } from "./CreatePage";
import { DetailPage } from "./DetailPage";
import { LinksPage } from "./LinksPage";
import { MapPage } from "./MapPage";

export const useRouts = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path={`/map/:layout`} exact>
          <MapPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/map/subcontractors" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
