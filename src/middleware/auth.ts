    export default function auth ({ next, store, authToken }) {
        
        if( !authToken ){
            return next({
                name: 'test',
                query: { redirect: location.pathname }
            })
        }
        return next()
    }