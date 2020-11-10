import React, { useState, useContext } from 'react'
import InputRow from '../../misc/inputRow'
import { ModalContext } from '../../../context/ModalContext'
import DatetimeOwn from '../../misc/datetime'

export const AcceptIncident = ({ content }) => {
  const { removeModal } = useContext(ModalContext)
  const [dataOfIncident, setDataOfIncident] = useState({
    name: '',
    type: '',
    description: '',
  })

  function getData(e, r) {
    setDataOfIncident({ ...dataOfIncident, [e]: r })
  }

  return (
    // <div className="infoWindow">
    //   <div className="infoWindow-header">
    //     <b>Add new incident?</b>
    //   </div>
    //   <div className="infoWindow-body">
    //     <hr />
    //     <InputRow
    //       text={"Short name"}
    //       data={"name"}
    //       fun={(e, r) => {
    //         getData(e, r);
    //       }}
    //       type={"text"}
    //     ></InputRow>
    //     <InputRow
    //       text={"Type"}
    //       data={"type"}
    //       fun={(e, r) => {
    //         getData(e, r);
    //       }}
    //       type={"text"}
    //     ></InputRow>
    //     <InputRow
    //       text={"Description"}
    //       data={"description"}
    //       fun={(e, r) => {
    //         getData(e, r);
    //       }}
    //       type={"text"}
    //     ></InputRow>
    //     <div className="infoWindow-body-form">
    //       <div
    //         onClick={() => {
    //           content(dataOfIncident);
    //           removeModal();
    //         }}
    //         className="infoWindow-body-form-button"
    //       >
    //         Add
    //       </div>
    //       <div
    //         onClick={() => {
    //           removeModal();
    //         }}
    //         className="infoWindow-body-form-button"
    //       >
    //         Cancel
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='infoWindow'>
      <div className='infoWindow-header'>
        <b>Add new incident?</b>
      </div>
      <div className='infoWindow-body'>
        <hr />
        <InputRow
          text={'Название инцидента'}
          data={'name'}
          fun={(e, r) => {
            getData(e, r)
          }}
          type={'text'}
        ></InputRow>
        <InputRow
          text={'ФИО сотрудника'}
          data={'victimName'}
          fun={(e, r) => {
            getData(e, r)
          }}
          type={'text'}
        ></InputRow>
        <InputRow
          text={'Служба'}
          data={'department'}
          fun={(e, r) => {
            getData(e, r)
          }}
          type={'text'}
        ></InputRow>
        <InputRow
          text={'Статус'}
          data={'status'}
          fun={(e, r) => {
            getData(e, r)
          }}
          type={'text'}
        ></InputRow>
        <div className={'infoWindow-body-form-dateTimeContaineer'}>
          <DatetimeOwn
            text={'Дата начала'}
            data={'startDate'}
            fun={(e, r) => {
              getData(e, r)
            }}
          ></DatetimeOwn>
          <DatetimeOwn
            text={'Дата оконачания'}
            data={'finishDate'}
            fun={(e, r) => {
              getData(e, r)
            }}
          ></DatetimeOwn>
        </div>
        <hr />
        <div className='infoWindow-body-form'>
          <div
            onClick={() => {
              content(dataOfIncident)
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Add
          </div>
          <div
            onClick={() => {
              removeModal()
            }}
            className='infoWindow-body-form-button'
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  )
}
