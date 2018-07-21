import React from 'react';
import './selector.css';
import {Input} from "./input";
import {Line} from "./line";

export class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };

        this.input = React.createRef();
        this.line = React.createRef();
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    handleValueChanging = (e) => {
        let returnID;
        if (e.target.type === "text"){
            this.line.setValue(e.target.value);
            returnID = "input"+this.props.id;
        } else {
            this.input.setValue(e.target.value);
            returnID = "line"+this.props.id;
        }

        if(this.props.percentageRatioChangecallback)
            this.props.percentageRatioChangecallback.call(this, {
                index: this.props.id,
                value: this.getPercentage(returnID)
            });
    };

    getPercentage(id){
        return document.getElementById(id || ("input"+this.props.id)).value
    }

    setPercentage(val){
        this.input.setValue(val);
        this.line.setValue(val);
    }

    render() {
        return (
            <div className={"selectorContainer"}>
                <label>{this.props.name}</label>
                <Line onRef={ref => (this.line = ref)}
                      id={"line"+this.props.id}
                      value={this.state.value}
                      cahngingCallback={[this.handleValueChanging]}/>

                <Input onRef={ref => (this.input = ref)}
                       value={this.state.value}
                       id={"input"+this.props.id}
                       cahngingCallback={[this.handleValueChanging]}/>
            </div>
        );
    }
}