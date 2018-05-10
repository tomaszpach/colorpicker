const initialState = {
    fetchedColors: [],
    updatedColors: [],
    setBgColor: 'rgba(255, 255, 255, 100%)',
    isAutosuggestionVisible: false
};

const colors = (state = initialState, action) => {
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, fetchedColors: action.payload };
        case 'UPDATED_COLORS':
            return { ...state, updatedColors: action.payload };
        case 'CHANGE_BG_COLOR':
            return {...state, setBgColor: action.payload };
        case 'TOGGLE_SUGGESTION_VISIBILITY':
            return { ...state, isAutosuggestionVisible: action.payload };
        default:
            return state
    }
};

export default colors