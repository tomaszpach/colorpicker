import React from 'react'
import {connect} from 'react-redux'
import {getRgbaFromHex} from '../utils'
import {updateColors, toggleSuggestionVisibility, setBgColor} from "../actions";

export class colorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: 'rgba(255, 255, 255, 100%)',
            setColor: 'rgba(255, 255, 255, 100%)'
        }
    }

    isSuggestionVisible(valueLength) {
        if (valueLength >= 2) {
            this.props.toggleSuggestionVisibility(true);
        } else {
            this.props.toggleSuggestionVisibility(false);
        }
    }

    filterListAndUpdateColors(event) {
        let value = event.target.value,
            valueString = value.toString(),
            valueLength = valueString.length;

        this.isSuggestionVisible(valueLength);

        if (valueLength >= 2) {
            let updatedList = this.props.fetchedColors;
            updatedList = updatedList.filter(item => {
                return item.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            this.props.updateColors(updatedList);
        } else {
            this.props.updateColors([]);
        }
    }

    setBackgroundColor() {
        this.props.setBgColor(this.state.selectedColor || 'rgba(255, 255, 255, 100%');
    }

    render() {
        const {autoSuggestionVisibility, updatedColors} = this.props;

        const colorList = (
            <ul>
                {
                    this.props.updatedColors.map(item => {
                        return <li style={{backgroundColor: `#${item.hex}` ,cursor: 'pointer'}}
                                   onClick={() => this.setState({selectedColor: getRgbaFromHex(item.hex)})}
                                   key={item.name}>{item.name}</li>
                    })
                }
            </ul>
        );
        const changeColorButton = (
            autoSuggestionVisibility && updatedColors.length > 0 ? (
                <div>
                    <button onClick={() => this.setBackgroundColor()}
                            style={{backgroundColor: this.state.selectedColor, cursor: 'pointer'}}>Accept</button>
                </div>
            ) : null

        );
        return (
            <div className="color-picker">
                <input type="text" placeholder="Search colors" onChange={(e) => this.filterListAndUpdateColors(e)}/>
                {changeColorButton}
                {colorList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetchedColors: state.colors.fetchedColors,
        updatedColors: state.colors.updatedColors,
        autoSuggestionVisibility: state.colors.isAutosuggestionVisible
    }
};

function mapDispatchToProps(dispatch) {
    return {
        updateColors: (params) => dispatch(updateColors(params)),
        setBgColor: (params) => dispatch(setBgColor(params)),
        toggleSuggestionVisibility: (params) => dispatch(toggleSuggestionVisibility(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(colorPicker);