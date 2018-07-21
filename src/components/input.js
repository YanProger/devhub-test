import React from 'react';
import './input.css';

export class Input extends React.Component {
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
            value: val
        })
    }

    handleValueChanging = (e) => {
        e.target.value = e.target.value.replace(/,/g,'.').replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

        if (this.props.cahngingCallback && e.target.value !== "")
            this.props.cahngingCallback.forEach((callBack) => callBack.call(this, e));
    };

    render() {
        return (<input type={"text"}
                       key={new Date().getTime()}
                       onInput={this.handleValueChanging}
                       id={this.props.id}
                       defaultValue={this.state.value} />);
    }
}