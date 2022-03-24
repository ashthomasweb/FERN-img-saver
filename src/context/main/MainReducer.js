export const mainReducer = (state, action) => {
    switch (action.type) {
        case "TOG_NAME":
            let user = state.user === 'Ash' ? 'Dave' : 'Ash'
            return {
                ...state,
                user: user
            }
        case "SET_ALL_ITEMS":
            // log server status message
            return {
                ...state,
                items: action.payload
            }
        case "SET_EDITED_ITEM":
            // log server status message
            console.log(action.payload.message)
            let item = action.payload.item
            let editItem = {
                description: item.description,
                comment: item.comment,
                rating: item.rating,
                imageURL: item.imageURL,
                photographer: item.photographer,
                }
            return {
                ...state,
                tempItem: editItem
            }
        case "CLEAR_ITEM":
            let tempItem = {
                description: '',
                comment: '',
                rating: '',
                imageURL: '',
                photographer: '',
                }
            return {
                ...state,
                tempItem: tempItem
            }
        case "ONCHANGE_DESC":
            return {
                ...state,
                tempItem: action.payload
        }    
        case "ONCHANGE_COMMENT":
            return {
                ...state,
                tempItem: action.payload
        }    
        case "ONCHANGE_RATING":
            return {
                ...state,
                tempItem: action.payload
        }
        case "SET_RANDOM_IMAGE":
            let data = action.payload
            console.log(data.message)
            let tempItem2 = state.tempItem
            tempItem2.imageURL = data.url
            tempItem2.photographer = data.name
            return {
                ...state,
                tempItem: tempItem2
        }
        default:
            return state
    }
}

// END of document
