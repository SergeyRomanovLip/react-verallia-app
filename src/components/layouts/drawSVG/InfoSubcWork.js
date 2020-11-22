import React, { useContext } from "react";
import Checkbox from "components/misc/checkbox";
import { AppContext } from "context/AppContext";

export const InfoSubcWork = ({ data, workID, area }) => {
  const { appDispatch } = useContext(AppContext);

  let dangerousWorks = [];
  let checkState = data.checked === "yes" ? true : false;
  let textForCheckbox = checkState
    ? "Works was checked by responsible"
    : "Did you check that all safety measures is done?";

  for (let dangWork in data) {
    if (data[dangWork] === true) {
      dangerousWorks.push(dangWork);
    }
  }

  function checkWorks() {
    appDispatch(["checkStateOfWork", area, workID]);
  }
  function deleteWorks() {
    appDispatch(["deleteWork", area, workID]);
  }

  return (
    <li className="infoWindow-listOfWorks-workContaineer">
      <div className="infoWindow-listOfWorks-work">
        <div className="infoWindow-listOfWorks-work-header">
          {data.company}
          <span
            onClick={deleteWorks}
            className="infoWindow-body-form-button"
            id="deleteWork"
          >
            Finish work
          </span>
        </div>
      </div>
      <ul className="infoWindow-listOfWorks-work-ul">
        <li>
          <b>Start: </b>
          {new Date(data.start).getDate() +
            "." +
            (new Date(data.start).getMonth() + 1) +
            "." +
            new Date(data.start).getFullYear()}{" "}
        </li>
        <li>
          <b>Finish: </b>
          {new Date(data.finish).getDate() +
            "." +
            (new Date(data.finish).getMonth() + 1) +
            "." +
            new Date(data.finish).getFullYear()}{" "}
        </li>
        <li className="infoWindow-listOfWorks-work-li">
          <b>Description: </b>
          {data.description}
        </li>
        <li>
          <b>Employees: </b>
          {data.quantityOfWorkers}
        </li>
        <li>
          <b>Dangerous: </b>
          <ul>
            {dangerousWorks.map((el, i) => {
              return <li key={i}>{el}</li>;
            })}
          </ul>
        </li>
        <br></br>
        <li>
          <Checkbox
            fun={checkWorks}
            data={"checked"}
            text={textForCheckbox}
            checkState={checkState}
          />
        </li>
      </ul>
    </li>
  );
};
