const reducer = (state = '', action) => {
    switch(action.type){
        case 'SEARCHBY' : return action.searchBy;
        default: return state;
    }
}

export const setSearchBy = (searchBy)=>{
    return ({
        type : 'SEARCHBY',
        searchBy : searchBy
    })
}

export default reducer