import React from 'react'
import {connect} from 'react-redux'
import { getRgbaFromHex } from '../utils'

export class colorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedColors: [],
            selectedColor: 'rgba(255, 255, 255, 100%)',
            setColor: 'rgba(255, 255, 255, 100%)',
            showAutoSuggest: false
        }
    }

    showAutoSuggest(valueLength) {
        if (valueLength >= 2) {
            this.setState({
                showAutoSuggest: true
            });
        } else {
            this.setState({
                showAutoSuggest: false
            });
        }
    }

    filterListAndUpdateColors(event) {
        let value = event.target.value,
            valueString = value.toString(),
            valueLength = valueString.length;

        this.showAutoSuggest(valueLength);

        if (valueLength >= 2) {
            let updatedList = this.props.data;
            updatedList = updatedList.filter(item => {
                return item.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });

            this.setState({
                updatedColors: updatedList
            }, () => {
                console.log(updatedList);
            });
        } else {
            this.setState({
                updatedColors: []
            })
        }
    }

    setBackgroundColor() {
        this.setState({
            setColor: this.state.selectedColor || 'rgba(255, 255, 255, 100%)'
        })
    }

    render() {
        const colorList = (
            <ul>
                {
                    this.state.updatedColors.map(item => {
                        return <li style={{cursor: 'pointer'}}
                            onClick={() => this.setState({selectedColor: getRgbaFromHex(item.hex)})}
                            key={item.name}>{item.name}</li>
                    })
                }
            </ul>
        );
        const changeColorButton = (
            <button onClick={() => this.setBackgroundColor()}
                    style={{backgroundColor: this.state.selectedColor, cursor: 'pointer'}}>Accept</button>
        );
        return (
            <div style={{backgroundColor: this.state.setColor}} className="color-picker">
                <input type="text" placeholder="Search" onChange={(e) => this.filterListAndUpdateColors(e)}/>
                {changeColorButton}
                {colorList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { data: state.colors.data }
};

export default connect(mapStateToProps)(colorPicker);