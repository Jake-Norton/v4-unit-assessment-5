const initialState = {
    username: {},
    profilePic: {},
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj,
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return {...state, username: action.payload, profilePic: action.payload}
        case LOGOUT:
            return {...state, username: {}, profilePic: {}}
        default:
            return state
    }
}