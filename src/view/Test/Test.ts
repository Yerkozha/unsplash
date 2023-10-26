import { Navigation, Scrollbar } from "swiper";
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { authAPI, BookType } from "~/api/auth";
import { Hadith, SvgIcon } from "~/components";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { AxiosResponse } from 'axios'

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

export default defineComponent({

    components: {
        Hadith,
        Swiper,
        SwiperSlide,
        SvgIcon
    },

    setup(){
        const route = useRoute();

        const prev = ref(null);
        const next = ref(null);

        const data: Ref<Nullable<BookType>> = ref()

        const counter = ref(1)

        
        return {
            counter,
            modules: [ Navigation, Scrollbar ],
            prev,
            next,
            data
        }
    },


})