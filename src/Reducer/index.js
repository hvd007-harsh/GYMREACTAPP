const reducer = (state= false, action)=>{
        if(action.type === "AUTH"){
            return state = action.payload;
        }
        return state;
}

export default reducer;