import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";

/*  Typescript
*       
    interface Obj<T> { => aslo with Class<Generic>
        (a: T):T
    }
*   <Obj,Key extends keyof Obj>(obj: Obj, key: Key) => obj[key]
*                                                                 { c: new(): GenericClassType } || new () => GenericClassType
    keyof => key of obj, typeof + ReturnType<typeof function>, value and types not the same
    index access number | 'someString'

    Conditional:
        type NameOrId<T extends number | string > = {
            T extends number ? INumber 
                             : IString
        }
        <T extends number | string>(param: T): NameOrId<T> => {throw 'noimplemented}
        type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
            ? Return
            : never;
*/

type AuthCredentials = {
    username: string;
    password: string;
}

export type UserInfoType = {
    email: string;
    id: number;
    username: string;
}

export interface AuthState {
    authToken: string;
    currentUser: UserInfoType | null;
}

const state = (): AuthState => ({
    authToken: '',
    currentUser: null,
})

const getters = {
    
    
}

const mutations = {  // rootState 3
    
}

const actions = {
    

}


const authReducer = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}


export default authReducer