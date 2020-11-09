export const reducer = (state, action) => {
  try {
    switch (action[0]) {
      case 'initialize':
        return {
          ...state,
          _id: action[1]._id,
          layout: action[1].layout,
          listOfAreas: action[1].listOfAreas,
          listOfIncidents: action[1].listOfIncidents
        }
      case 'addNewWork':
        let id = action[1].id
        let content = action[1].data
        let workID = action[1].workID
        return {
          ...state,
          listOfAreas: {
            ...state.listOfAreas,
            [id]: {
              ...state.listOfAreas[id],
              listOfWorks: {
                ...state.listOfAreas[id].listOfWorks,
                [workID]: content
              }
            }
          }
        }
      case 'updateWrapperPosition':
        let wrapper = action[1]
        return { ...state, wrapper: wrapper }
      case 'setLayout':
        let layout = action[1]
        return {
          ...state,
          layout: layout
        }
      case 'deleteWork':
        delete state.listOfAreas[action[1]].listOfWorks[action[2]]
        return {
          ...state,
          listOfAreas: {
            ...state.listOfAreas,
            [action[1]]: {
              ...state.listOfAreas[action[1]],
              listOfWorks: {
                ...state.listOfAreas[action[1]].listOfWorks,
                updated: Math.random()
              }
            }
          }
        }
      // return { ...state };
      case 'addNewArea':
        let id1 = action[1]
        let content1 = action[2]
        return {
          ...state,
          listOfAreas: {
            ...state.listOfAreas,
            [id1]: content1
          }
        }
      case 'deleteArea':
        let id4 = action[1]
        delete state.listOfAreas[id4]
        return {
          ...state,
          listOfAreas: { ...state.listOfAreas, updated: Math.random() }
        }
      case 'addNewIncident':
        let id6 = action[1]
        return {
          ...state,
          listOfIncidents: {
            ...state.listOfIncidents,
            [id6]: action[2]
          }
        }
      case 'checkStateOfWork':
        let id2 = action[1]
        let workID2 = action[2]
        return {
          ...state,
          listOfAreas: {
            ...state.listOfAreas,
            [id2]: {
              ...state.listOfAreas[id2],
              listOfWorks: {
                ...state.listOfAreas[id2].listOfWorks,
                [workID2]: {
                  ...state.listOfAreas[id2].listOfWorks[workID2],
                  checked:
                    state.listOfAreas[id2].listOfWorks[workID2].checked === 'no'
                      ? (state.listOfAreas[id2].listOfWorks[workID2].checked = 'yes')
                      : (state.listOfAreas[id2].listOfWorks[workID2].checked = 'no')
                }
              }
            }
          }
        }
      default:
        return state
    }
  } finally {
  }
}
