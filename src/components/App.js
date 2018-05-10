import React from 'react'
import {connect} from "react-redux";
import ColorPicker from './ColorPicker';
import FetchColors from './fetchColors';

export class app extends React.Component {
    render() {
        return (
            <div id="app" style={{backgroundColor: this.props.setBgColor}}>
                <FetchColors/>
                <ColorPicker/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        setBgColor: state.colors.setBgColor
    }
};

export default connect(mapStateToProps)(app);