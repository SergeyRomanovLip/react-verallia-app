import React, { useContext } from "react";
import { ActualDataContext } from "../../redux/context";
import { InfoSubcWork } from "./InfoSubcWork";

function InfoSubc({ content, click, remove }) {
  const actualDataContext = useContext(ActualDataContext);
  const actualDataDispatch = useContext(ActualDataContext).actualDataDispatch;
  const area = actualDataContext.actualDataState.listOfAreas[content];

  function deleteArea() {
    remove();
    actualDataDispatch(["deleteArea", content]);
  }

  const emptyArea = (
    <div>
      There is no works in this area
      <div onClick={deleteArea} className="infoWindow-body-form-button">
        Delete area?
      </div>
    </div>
  );

  let listOfWorks = [];
  if (Object.keys(area.listOfWorks).length > 0) {
    for (let work in area.listOfWorks) {
      let data = area.listOfWorks[work];
      listOfWorks.push(
        <InfoSubcWork key={work} data={data} workID={work} area={area.id} />
      );
    }
  }

  return (
    <div className="infoWindow">
      <div className="infoWindow-header">
        {area.name}
        <span
          onClick={() => {
            remove();
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
            {listOfWorks.length != 0 ? listOfWorks : emptyArea}
          </ul>
        </div>
        <div className="infoWindow-body-form">
          <div
            id="add-new-work"
            onClick={() => {
              remove();
              click("AddNewWork", content, remove);
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
