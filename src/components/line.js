import React from 'react';
import './line.css';

export class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }


    setValue(val){
        this.setState({
            value: Math.round(parseFloat(val))
        })
    }

    handleValueChanging = (e) => {
        if (this.props.cahngingCallback)
            this.props.cahngingCallback.forEach((callBack) => callBack.call(this, e));
    };

    render() {
        return (
            <input type="range"
                   key={new Date().getTime()}
                   onInput={this.handleValueChanging}
                   id={this.props.id}
                   defaultValue={this.state.value}/>
        );
    }
}