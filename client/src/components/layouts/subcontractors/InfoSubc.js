import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { AppContext } from "../../../context/AppContext";
import { InfoSubcWork } from "./InfoSubcWork";

function InfoSubc({ content }) {
  const { showModal, removeModal } = useContext(ModalContext);
  const { appState, appDispatch } = useContext(AppContext);

  const [listOfWorks, setListOfWorks] = useState([]);
  const [area, setArea] = useState(null);

  function deleteArea() {
    removeModal();
    appDispatch(["deleteArea", content]);
  }

  useEffect(() => {
    const area = appState.listOfAreas[content];
    setArea(area.name);
    let works = [];
    if (Object.keys(area.listOfWorks).length > 0) {
      for (let work in area.listOfWorks) {
        if (work != "updated") {
          let data = area.listOfWorks[work];
          works.push(
            <InfoSubcWork key={work} data={data} workID={work} area={area.id} />
          );
        }
      }
    }
    setListOfWorks(works);
  }, [appState]);

  return (
    <div className="infoWindow">
      <div className="infoWindow-header">
        {area}
        <span
          onClick={() => {
            removeModal();
          }}
          className="infoWindow-body-form-button-close"
          id="deleteWork"
        >
          ✖
        </span>
      </div>
      <div className="infoWindow-body">
        <div id="listOfWorksContainer" className="infoWindow-listOfWorks">
          <ul className="infoWindow-listOfWorks">
            {listOfWorks.length != 0 ? (
              listOfWorks
            ) : (
              <div>
                There is no works in this area
                <div
                  onClick={deleteArea}
                  className="infoWindow-body-form-button"
                >
                  Delete area?
                </div>
              </div>
            )}
          </ul>
        </div>
        <div className="infoWindow-body-form">
          <div
            id="add-new-work"
            onClick={() => {
              removeModal();
              showModal("AddNewWork", content);
            }}
            className="infoWindow-body-form-button"
          >
            Add new work
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSubc;
