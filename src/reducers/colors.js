const initialState = {
    counter: 0,
    data: []
};

const colors = (state = initialState, action) => {
    // console.log('reducer state', state);
    // console.log('reducer action', action);
    // console.log('reducer action.payload', action.payload);
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, data: action.payload };
        case 'INCREMENT':
            return { ...state, counter: state.counter + 1};
        default:
            return state
    }
};

export default colors