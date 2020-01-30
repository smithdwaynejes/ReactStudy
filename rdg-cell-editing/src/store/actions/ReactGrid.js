import * as actionTypes from './actions';

export const createData = () => {
    return {
        type: actionTypes.CREATE_DATA
    }
}

export const dataLimit = (numberOfRows) => {
    return {
        type: actionTypes.DATA_LIMIT,
        numberOfRows: numberOfRows
    }
}