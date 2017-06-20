/**
 * Created by jyothi on 16/6/17.
 */
import { TableStyles, TableRowStyles, TableHeaderStyles, TableBodyStyles } from './styles';
import DataStore from './DataStore';
import { HeaderCell, BodyCell } from './Elements';
import { VALUE_KEYS } from './constants';

class CohortGraph {

    constructor(options){
        this.dataStore = new DataStore({});
        this.currentType = "";
        this.valueType = VALUE_KEYS.PERCENT;
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            this.currentType = Object.keys(data)[0]; //taking first key as type by default TODO: give it as option
            this.dataStore = new DataStore(data || {});
        }
    }

    render(){
        const { dataStore, currentType, valueType } = this;
        const headerData = dataStore.getHeader(currentType);
        const rowsData = dataStore.getRows(currentType);


        
    }

}

export default CohortGraph;