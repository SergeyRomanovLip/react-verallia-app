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
      case 'addNewNote':
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].layout]: {
              ...state.layouts[action[1].layout],
              listOfAreas: {
                ...state.layouts[action[1].layout].listOfAreas,
                [action[1].area]: {
                  ...state.layouts[action[1].layout].listOfAreas[action[1].area],
                  listOfNotes: [
                    ...state.layouts[action[1].layout].listOfAreas[action[1].area].listOfNotes,
                    {
                      ...[action[1].data]
                    }
                  ]
                }
              }
            }
          }
        }
      case 'updateNote':
        state.layouts[action[1].layout].listOfAreas[action[1].area].listOfNotes.forEach((e) => {
          if (e[0].id === action[1].data.id) {
            e[0] = action[1].data
          }
        })
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].layout]: {
              ...state.layouts[action[1].layout],
              updated: Math.random()
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
      case 'deleteNote':
        let res = state.layouts[action[1].layout].listOfAreas[action[1].id].listOfNotes.filter((note) => {
          return note[0].id !== action[2].id
        })
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].layout]: {
              ...state.layouts[action[1].layout],
              listOfAreas: {
                ...state.layouts[action[1].layout].listOfAreas,
                [action[1].id]: {
                  ...state.layouts[action[1].layout].listOfAreas[action[1].id],
                  listOfNotes: res
                }
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
        delete state.layouts[action[1].layout].listOfAreas[action[1].id]
        return {
          ...state,
          layouts: {
            ...state.layouts,
            [action[1].layout]: {
              ...state.layouts[action[1].layout],
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
