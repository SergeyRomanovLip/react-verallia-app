import React, { useContext, useState } from "react";
import Checkbox from "../../misc/checkbox";
import { IDgenerator } from "../../utilities/IDgenerator";
import { ActualDataContext } from "../../redux/context";
import DatetimeOwn from "../../misc/datetime";
import InputRow from "../../misc/inputRow";
import InputText from "../../misc/inputText";

function AddNewWork({ content, click, remove }) {
  const actualDataContext = useContext(ActualDataContext);
  const [workData, setWorkData] = useState({
    id: content,
    workID: IDgenerator(),
    data: {
      start: "",
      finish: "",
      company: "",
      description: "",
      quantity: "",
      checked: "no",
      fireWorks: false,
      heightWorks: false,
      electricalWorks: false,
      roofWorks: false,
      digging: false,
      limitedSpace: false,
    },
  });

  function addData(type, value) {
    setWorkData({
      ...workData,
      data: { ...workData.data, [type]: value },
    });
  }

  return (
    <div className="infoWindow">
      <div className="infoWindow-header">
        You want to add new work?
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
        <div className="infoWindow-body-form">
          <hr />
          <div className={"infoWindow-body-form-dateTimeContaineer"}>
            <DatetimeOwn text={"Works start"} data={"start"} fun={addData} />
            <DatetimeOwn text={"Works finish"} data={"finish"} fun={addData} />
          </div>
          <hr />
          <InputRow
            text={"Employees quantity"}
            data={"quantity"}
            fun={addData}
            type={"number"}
          />
          <InputText
            text={"Works description"}
            data={"description"}
            fun={addData}
          />
          <InputRow
            text={"Company name"}
            data={"company"}
            fun={addData}
            type={"text"}
          />
          <hr />
          <div className="highlightedCheckbox-container">
            <Checkbox text={"Fire works"} data={"fireWorks"} fun={addData} />
            <Checkbox
              text={"Works on height"}
              data={"heightWorks"}
              fun={addData}
            />
            <Checkbox
              text={"Electrical works"}
              data={"electricalWorks"}
              fun={addData}
            />
            <Checkbox text={"Works on roof"} data={"roofWorks"} fun={addData} />
            <Checkbox text={"Digging"} data={"digging"} fun={addData} />
            <Checkbox
              text={"Limited space"}
              data={"limitedSpace"}
              fun={addData}
            />
          </div>
          <div className="infoWindow-body-form">
            <div
              onClick={() => {
                actualDataContext.actualDataDispatch(["addNewWork", workData]);
                remove();
              }}
              id="submit-add-new-work"
              className="infoWindow-body-form-button"
            >
              Add new work
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewWork;
