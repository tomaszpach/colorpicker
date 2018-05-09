import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
import App from './components/App'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = createStore(rootReducer);

const muiTheme = getMuiTheme({
    fontFamily: '\'Comfortaa\', cursive',
    palette: {
        primary1Color: '#85bb65'
    }
});

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);