/**
 * Created by jyothi on 16/6/17.
 */
export const DEFAULT_CELL_COLOR = "#F5F5F5";
export const DEFAULT_KEY_CELL_COLOR = "#EEE";
export const DEFAULT_HEADER_CELL_COLOR = "#DDD";

export const DEFAULT_BORDER = "1px solid #CCC";

export const TableStyles = {
    display: 'table',
    width: "100%",
    borderCollapse: 'collapse',
    textAlign: 'center',
    borderLeft: DEFAULT_BORDER
};

export const TableRowStyles = {
    display: 'table-row'
};

export const TableHeaderStyles = {
    display: 'table-header-group',
    backgroundColor: DEFAULT_HEADER_CELL_COLOR,
    fontWeight: 'bold',
    padding: '5px 10px',
    borderBottom: DEFAULT_BORDER,
    borderTop: DEFAULT_BORDER
};

export const TableBodyStyles = {
    display: 'table-row-group'
};

export const TableCellStyles = {
    display: 'table-cell',
    backgroundColor: DEFAULT_HEADER_CELL_COLOR,
    padding: '5px 10px',
    borderBottom: '1px solid #DDD',
    borderRight: DEFAULT_BORDER
};

export const HeaderValueStyles = {
    fontSize: '12px'
};

export const HeaderLabelStyles = {
    fontSize: '16px',
    padding: '0',
    margin: '0'
};