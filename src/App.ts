import { computed, defineComponent, onBeforeMount, onMounted, onUnmounted, Ref, ref } from "vue";

import { AppComponentProps, AppComponentData } from '@t/types'

import { Hadith, SvgIcon } from "./components";

import AppDefaultLayout from './layouts/MainLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

import withOutToken, { withToken } from "./api";
import attachInterceptors from "./interceptors/attachInterceptors";

import { MutationTypes } from "./store/modules/mutations-types";
import { ActionTypes } from "./store/modules/action-types";
import { useStore } from "./store";
import { mapState } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper';


import { HeaderWidget} from "./view";


export default defineComponent<AppComponentProps, AppComponentData>({

    data: () => ({
        currentLayout: 'MainLayout'
    }),

    components: {
        HeaderWidget,
        MainLayout
    },

})