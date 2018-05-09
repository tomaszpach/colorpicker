import React from 'react'

export default class colorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            updatedColors: [],
            selectedColor: '#fff',
            initialItems: [
                "aliceblue",
                "antiquewhite",
                "aqua"
            ],
            items: [
                "aliceblue",
                "antiquewhite",
                "aqua"
            ]
        }
    }

    componentDidMount() {
        console.log('ColorPicker na pokładzie!');
        this.fetchColors();
        console.log('inital state', this.state.initialItems);
    }

    fetchColors() {
        fetch('http://www.mocky.io/v2/5a37a7403200000f10eb6a2d')
            .then(response => response.json())
            .then(results => {
                this.setState({
                    colors: results
                }, () => {
                    // console.log(`Arrr! Znalazłem łącznie: ${results.length} kolory.`);
                    console.log(results);
                })
            })
    }

    filterList(event) {
        let value = event.target.value,
            valueString = value.toString(),
            valueLength = valueString.length;

        console.log(valueLength);

        if (valueLength >= 2) {
            let updatedList = this.state.colors;

            console.log('updatedList 11s1', updatedList);
            console.log('this.state.colors', this.state.colors);
            updatedList = updatedList.filter( item => {
                return item.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });

            this.setState({
                updatedColors: updatedList
            });
            console.log('second updated list', updatedList)
        } else {
            this.setState({
                updatedColors: []
            })
        }
    }

    render() {
        let style = {
            backgroundColor: this.state.selectedColor
        };
        const colorList = (
            <ul>
                {
                    this.state.updatedColors.map(item => {
                        return <li onClick={() => this.setState({ selectedColor: `#${item.hex}` }, () => console.log(this.state.selectedColor))} key={item.name} hex={item.hex}>{item.name}</li>
                        // return console.log(item.name)
                    })
                }
            </ul>
        );
        return (
            <div style={style} className="color-picker">
                <input type="text" placeholder="Search" onChange={(e) => this.filterList(e)}/>
                {colorList}
            </div>
        )
    }
}