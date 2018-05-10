import React from 'react'

export default class colorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            updatedColors: [],
            selectedColor: 'rgba(255, 255, 255, 100%)',
            setColor: 'rgba(255, 255, 255, 100%)',
            showAutoSuggest: false
        }
    }

    componentDidMount() {
        this.fetchColors();
    }

    fetchColors() {
        fetch('http://www.mocky.io/v2/5a37a7403200000f10eb6a2d')
            .then(response => response.json())
            .then(results => {
                this.setState({
                    colors: results
                })
            })
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
            let updatedList = this.state.colors;
            updatedList = updatedList.filter(item => {
                return item.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });

            this.setState({
                updatedColors: updatedList
            });
        } else {
            this.setState({
                updatedColors: []
            })
        }
    }

    hexToRgb(hex) {
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    getRgbaFromHex(hex, alpha = '50%') {
        let rgbObj = this.hexToRgb(hex);
        return `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, ${alpha})`;
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
                            onClick={() => this.setState({selectedColor: this.getRgbaFromHex(item.hex)})}
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