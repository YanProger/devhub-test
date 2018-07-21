import React from 'react';
import './percentageRatio.css';
import {Selector} from "./selector";
import {DataHelper} from "../helpers/dataHelper";

export class PercentageRatio extends React.Component {
    constructor(props) {
        super(props);

        let dh = new DataHelper();
        this._data = dh.getData();
        this._items = dh.getData().map((item) => {
            return item.Percent
        });
    };


    handlePercentageRatioChange = (changedValue) => {
        let diff = parseFloat( (parseFloat(changedValue.value) - parseFloat(this._items[changedValue.index])).toFixed(2));
        this._items[changedValue.index] = parseFloat(changedValue.value);
        if (this._items.length > 1)
            this._alignPercent(this._getSelectorToEditIndex(changedValue.index, diff > 0), diff);
    };

    _getSelectorToEditIndex(curIndex, needMax){
        let oldVal = this._items[curIndex];
        let toEditIndex;

        //если значение увеличивается, то ищем максимальный элемент, за исключением изменяемого
        if (needMax){
            this._items[curIndex] = -10000;
            toEditIndex = this._items.indexOf( Math.max.apply(Math, this._items));
            this._items[curIndex] = oldVal;
            return toEditIndex;
        }

        this._items[curIndex] = 10000;
        toEditIndex = this._items.indexOf( Math.min.apply(Math, this._items));
        this._items[curIndex] = oldVal;
        return toEditIndex;
    }

    _alignPercent(itemID, diff){
        try {
            let oldPers = parseFloat(this._selectors[itemID].getPercentage());
            let newPers = parseFloat((oldPers - diff).toFixed(2));
            this._selectors[itemID].setPercentage(newPers);
            this._items[itemID] = newPers;
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        this._selectors = [];
        this._items.forEach(() => {
            this._selectors.push(React.createRef());
        });
        return (
            <div className={"percentageRatioContainer"}>
                <label className={"percent"}>%</label>
                {this._data.map(
                    (item, index) =>
                        <Selector key={index}
                                  onRef={ref => (this._selectors[index] = ref)}
                                  id={index}
                                  name={item.Name}
                                  value={item.Percent}
                                  percentageRatioChangecallback={this.handlePercentageRatioChange}/>
                )}
            </div>
        );
    }
}