import defaultState from '../config/defaultState'; 

const listReducer = (state=[], action) => {
    
    switch(action.type) {
        case 'ADD':
            return [...state, action.payload];

        case 'REMOVE':
            let ind = Number(action.payload);
            return state.filter( (item,index) => index !== ind );

        case 'UPDATE':
            let  {id} = action.payload;
            for (let key in state[Number(id)] ) {
                state[Number(id)][key] = action.payload[key];
            }

            return state;
        
        case 'ADDMYLIST':
            
            let stateNotToAddIndex = [];
            defaultState.forEach( (item,index) => {
                state.forEach( (stateItem) => {
                    const nameCheck = item.name === stateItem.name;
                    const formCheck = item.form === stateItem.form;
                    const artistCheck = item.artist === stateItem.artist;
                    const yearCheck = item.year === stateItem.year;
                    const imageCheck = item.image === stateItem.image;
                    if (nameCheck && formCheck && artistCheck && yearCheck && imageCheck) {
                        stateNotToAddIndex.push(index);
                    }
                })
            })
            let stateToAdd = defaultState.filter((item, index) => !stateNotToAddIndex.includes(index));
            let result = [...state,...stateToAdd];
            return result;
            
        default:
            return state;
    }
    
}
export default listReducer;