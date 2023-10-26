import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import guest from '~/middleware/guest';
import auth from '~/middleware/auth';

import { ActionTypes } from "~/store/modules/action-types";

import middlewarePipeline from "~/middleware/middlewarePipeline";

import store from '~/store';

import LocalStorageService from "~/utils/LocalStorageService";
import { EntryPoint, Login, MainPage, Registration, Test, NamazWidgetPage, Gallery, UniqueImagePage } from "~/view";


const routes: Array<RouteRecordRaw> = [

    {
        name: 'gallery', path: '/', component: Gallery
    },
    {
        name: 'favourite', path: '/favourite', component: Gallery
    },
    { 
        name: 'uniqueImage', path: '/:imageId',component: UniqueImagePage, meta: { middleware: [ guest ], layout: 'MainLayout' }
    },       // sensitive: true

    // {
    //     name: 'additionals', path: '/additionals', component: NamazWidgetPage
    // },

    // { 
    //     name: 'entry', path: '', 
    //     component: EntryPoint, 
    //     redirect: '/login',
    //     children: [
    //         { name: 'registration', path: 'registration', component: Registration, 
                
    //         },
    //         { name: 'login', path: 'login', component: Login, 
                
    //         }
    //     ]
    // },

    // {
    //     name: 'entry', path: '/entry', component: EntryPoint
    // },

    // { 
    //     name: 'test', path: '/test', component: Test, 
    // }
    //     children: [

    //         { 
    //             name: 'bot', path: 'bot', component: BotPage, 
    //             meta: { middleware: [ auth ] } 
    //         },

    //         { 
    //             name: 'create-bot', path: 'create-bot',  component: CreateBotPage,   
    //             meta: { 
    //                 middleware: [ auth ], title: 'Создать Бота', layout: 'MainLayout' 
    //             }
    //         },

    //         {
    //             name: 'error-page', path: 'error-page', component: ErrorPage
    //         }
    //     ]
    // },
    
]
  
  
const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true,
})

router.beforeEach(function (to, from, next) {

    if(!to.meta.middleware) {
        return next()
    }
    
    const middleware: any = to.meta.middleware ;
    
    if(!store.state.initialized){
        store.dispatch(ActionTypes.INITIALIZE_APP)
    }
    const authToken = LocalStorageService.getToken();

    const context = {
        to,
        from,
        next,
        store,
        authToken
    }
    
    return middleware[0]({
        ...context,
        next: middlewarePipeline( context, middleware, 1 )
    })
})

export default router