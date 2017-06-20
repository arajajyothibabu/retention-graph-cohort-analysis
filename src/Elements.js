/**
 * Created by jyothi on 16/6/17.
 */
import { TableStyles, TableRowStyles, TableHeaderStyles, TableBodyStyles, TableCellStyles, HeaderValueStyles, HeaderLabelStyles } from './styles';
import { VALUE_KEYS } from './constants';

const { VALUE, PERCENT } = VALUE_KEYS;

const renderValue = (props, valueType) => {
    const {isTotal, isLabel, valueType} = props;
    return (isTotal || isLabel) ? props[VALUE] : (valueType === PERCENT ? `${props[PERCENT]} %` : props[VALUE]);
};

export const Th = (props, valueType) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let span = document.createElement("span");
    p.style = {...p.style, ...HeaderLabelStyles};
    p.innerHTML = props.label;
    span.style = {...span.style, ...HeaderValueStyles};
    span.innerHTML = renderValue(props, valueType);
    div.style = {...div.style, ...TableCellStyles, backgroundColor: props.color};
    div.appendChild(p);
    div.appendChild(span);
    return div;
};

export const Td = (props, valueType) => {
    let div = document.createElement("div");
    div.style = {...div.style, ...TableCellStyles, backgroundColor: props.color};
    div.setAttribute("title", `Out of ${props.total} on ${props.valueFor}`);
    div.innerHTML = renderValue(props, valueType);
    return div;
};

export const Tr = (props, valueType) => {
    let tr = document.createElement("div");
    tr.style = {...tr.style, ...TableRowStyles};
    props.forEach(rowData => {
        tr.appendChild(Td(props, valueType));
    });
    return Tr;
};

export const Header = (props, valueType) => {
    let header = document.createElement("div");
    header.style = {...header.style, ...TableHeaderStyles};
    props.forEach(headerCellData => {
        header.appendChild(Th(headerCellData, valueType));
    });
    return header;
};

export const Body = (props, valueType) => {
    let body = document.createElement("div");
    body.style = {...body.style, ...TableBodyStyles};
    props.forEach(rowData => {
        body.appendChild(Tr(rowData, valueType));
    });
    return body;
};

export const Table = (props, valueType) => {
    let table = document.createElement("div");
    table.style = {...table.style, ...TableStyles};
    table.appendChild(Header(props.header, valueType));
    table.appendChild(Body(props.body, valueType));
    return table;
};

export const Container = (props, valueType) => { //TODO: wrapper container with controls
    const {  } = props;

    let container = document.createElement("div");
    container.setAttribute('style', null);

    let header = document.createElement("div");
    header.setAttribute('style', null);
    header.appendChild(title);

    let title = document.createElement("p");
    title.setAttribute('style', null);
    title.setAttribute('title', props.title);

    let controls = document.createElement("div");
    header.setAttribute('style', null);
    header.appendChild(title);

    if(props.enableDateRange) {
        let dateRange = document.createElement("a");
        dateRange.setAttribute('type', "text");
        dateRange.setAttribute('id', "retention-date-range");
        dateRange.setAttribute('style', null);

        let anchorWrapper = document.createElement("a");
        anchorWrapper.setAttribute('style', null);
        anchorWrapper.appendChild(dateRange);
    }

};