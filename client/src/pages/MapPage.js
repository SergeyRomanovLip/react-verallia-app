import React from "react";
import { ModalNew } from "../components/ModalNew";
import { FirebaseState } from "../components/redux/FirebaseState";
import DataBaseLoading from "../DataBaseLoading";

export const MapPage = () => {
  return (
    <>
      <FirebaseState>
        <DataBaseLoading />
      </FirebaseState>
    </>
  );
};
