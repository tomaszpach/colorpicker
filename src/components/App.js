import React from 'react'
import Header from './Header';
import ColorPicker from './ColorPicker';
import FetchColors from './fetchColors';

const App = () => (
    <div id="app">
        <Header/>
        <FetchColors/>
        <ColorPicker/>
    </div>
);

export default App