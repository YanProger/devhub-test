export class DataHelper {
    constructor(){
        this._data = [
            {
                "Name": "Item 1",
                "Percent": 12
            },
            {
                "Name": "Item 2",
                "Percent": 34.11
            },
            {
                "Name": "Item 4",
                "Percent": 45.54
            },
            {
                "Name": "Item 5",
                "Percent": 56.2
            }
        ];

        this.normalizeData();
    }

    //корректировка. добиваемся суммы в 100
    normalizeData(){
        let sumPers = 0;
        this._data.forEach((item, index) => {
            sumPers += item.Percent;
        });

        let diff = parseFloat((100 - sumPers).toFixed(2));

        this._data.forEach((item, index) => {
            item.Percent = parseFloat((item.Percent += diff).toFixed(2));
            if (item.Percent < 0){
                diff = item.Percent;
                item.Percent = 0;
            } else {
                diff = 0;
            }
        });
    }

    getData(){
        return this._data;
    }

}