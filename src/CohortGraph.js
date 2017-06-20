/**
 * Created by jyothi on 16/6/17.
 */
import { TableStyles, TableRowStyles, TableHeaderStyles, TableBodyStyles } from './styles';
import DataStore from './DataStore';
import { Table } from './Elements';
import { VALUE_KEYS } from './constants';

class CohortGraph {

    constructor(element, data, options){
        this.root = element;
        this.options = options; //TODO: handle default options
        this.dataStore = new DataStore({});
        this.currentType = "";
        this.valueType = VALUE_KEYS.PERCENT;
        this.init(data);
    }

    init(data) {
        const keys = Object.keys(data);
        if(keys.length > 0) {
            this.currentType = Object.keys(data)[0]; //taking first key as type by default TODO: give it as option
            this.dataStore = new DataStore(data || {});
            this.render();
        }
    }

    render(){
        const { root, options, dataStore, currentType, valueType } = this;
        const headerData = dataStore.getHeader(currentType);
        const rowsData = dataStore.getRows(currentType);
        root.appendChild(Table({header: headerData, body: rowsData}, valueType));
    }

}

export default CohortGraph;