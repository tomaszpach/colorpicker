export const fetchData = payload => ({
    type: 'FETCH_DATA',
    payload
});

export const updateColors = payload => ({
    type: 'UPDATED_COLORS',
    payload
});

export const setBgColor = payload => ({
    type: 'CHANGE_BG_COLOR',
    payload
});

export const toggleSuggestionVisibility = payload => ({
    type: 'TOGGLE_SUGGESTION_VISIBILITY',
    payload
});