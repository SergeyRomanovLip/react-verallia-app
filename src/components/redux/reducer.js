export const reducer = (state, action) => {
  try {
    switch (action[0]) {
      case 'CreateOwnLayout':
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].name]: {
              ...action[1]
            }
          }
        }

      case 'initialize':
        return {
          ...state,
          layouts: action[1].layouts
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

      case 'addNewArea':
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].layout]: {
              ...state.layouts[action[1].layout],
              listOfAreas: {
                ...state.layouts[action[1].layout].listOfAreas,
                [action[1].id]: {
                  ...action[1]
                }
              }
            }
          }
        }
      case 'deleteArea':
        delete state.layouts[action[1].name].listOfAreas[action[1].id]
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].name]: {
              ...state.layouts[action[1].name],
              updated: Math.random()
            }
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
