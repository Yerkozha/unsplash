import { InjectionKey } from 'vue';
import { createStore, createLogger, Store, useStore as baseUseStore } from 'vuex';

import { ActionTypes } from './modules/action-types';
import { MutationTypes } from './modules/mutations-types';

import authReducer, { AuthState } from './modules/auth-reducer';
import { Photos } from '~/api/unsplash';


//import withOutToken, { withToken } from '~/api';

/*
    computed: mapState( object alias || array ) mix with outer object spread 

    getters: ( state, getters ) => compute  this.$store & ...mapGetters([])
    mutations: [AC] (state) {} & mapMutations

    actions : someAC{ root: true, handler: fn }          dispatch('someAC', { root: true })

    Bind namespace mapState, mapGetters, mapActions, mapMutations   (some/nested/module, [] || {})
*/

export interface RootState {
    
    initialized: boolean;
    currentLayout: string;
    currentImage: Nullable<Photos>;
    favourites: Array<Photos>,
    
    
    authReducer: AuthState;


}

export const key: InjectionKey<Store<RootState>> = Symbol()             // shid.d vuex
    
const debug = process.env.NODE_ENV !== 'production';


export default createStore<RootState>({
    
    state: {

        initialized: false,
        currentLayout: '',
        currentImage: null,
        favourites: JSON.parse(localStorage.getItem('favourites') ?? "[]" ),

    } as RootState,

    getters: {
        getToken: (state) => state.authReducer.authToken || localStorage.getItem('authToken'),
        getCurrentImage: (state) => state.currentImage,
        translate: (state,getters) => (text, parameters) => {
            
            return text
        },
    },

    mutations:{
        
        [MutationTypes.INITIALIZE](state){
            state.initialized = true;
        },

        [MutationTypes.SET_CURRENT_IMAGE](state, photo) {
            state.currentImage = photo
        },
        [MutationTypes.SET_FAVOURITES](state, photo) {
            let foundIdx;
            if(state.favourites.length) {
                foundIdx = state.favourites.findIndex((existingPhoto: Photos) => existingPhoto.id === photo.id)

                if(foundIdx !== -1) {
                    state.favourites.splice(foundIdx, 1)
                } else {
                    state.favourites.push(photo)
                }
            }

        }
        
    },

    actions: {
        
        [ActionTypes.INITIALIZE_APP](context){
            context.commit(MutationTypes.INITIALIZE)
            
        },
        [ActionTypes.SET_CURRENT_IMAGE](context, payload){
            context.commit(MutationTypes.SET_CURRENT_IMAGE, payload)
            
        },
        [ActionTypes.SET_FAVOURITES](context, payload){

            context.commit(MutationTypes.SET_FAVOURITES, payload)
        },
        
    },

    modules: {
        authReducer,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export const useStore = () => baseUseStore(key)

