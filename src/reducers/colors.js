const initialState = {

};

const colors = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return {
                ...state
            };
        default:
            return state
    }
};

export default colors