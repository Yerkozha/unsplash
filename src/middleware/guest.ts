

export default function guest({ next, store, authToken }) {
    if( authToken ){
        return next({
            name: 'test'
        })
    }
    return next()
}