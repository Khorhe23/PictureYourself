const clearObject = (state) => {
    for(let key of Object.keys(state)) {
        delete state[key]
    }
}

export default clearObject;