import { Middleware } from "redux";

export const logger:Middleware =  store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export const crashReporter:Middleware = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        throw err
    }
}