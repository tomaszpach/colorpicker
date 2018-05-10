import React from 'react'
import {connect} from 'react-redux'
import {fetchData} from '../actions'

export class fetchColors extends React.Component {
    componentDidMount() {
        this.fetchColors();
    }

    fetchColors() {
        fetch('http://www.mocky.io/v2/5a37a7403200000f10eb6a2d')
            .then(response => response.json())
            .then(results => {
                this.props.fetchData(results);
            })
    }

    render() {
        return (
            <div>{this.props.data ? (<span>Ready to use</span>) : (<span>Downloading data</span>)}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {data: state.colors.data}
};

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (params) => dispatch(fetchData(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(fetchColors);