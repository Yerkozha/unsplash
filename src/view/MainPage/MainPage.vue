<template>
    <div ref="mainPage" class="main-page">
            

            <div class="main-page__inner">

                
                <!-- <div class="main-page__tools">
                    <button class="green__btn" @click="structureBotHandler">
                        <SvgIcon nameId="enter" />
                        {{__('Структура бота')}}
                    </button> -->
    
                    <!-- <button class="blue__btn" @click="createBotHandler">
                        <SvgIcon nameId="plus" />
                        {{__('Создать Бота')}}
                    </button> -->
                    <!-- <div>
                        <button class="blue__btn" @click="startBotHandler">
                            {{__('ЗАПУСТИТЬ Бота')}}
                        </button>
        
                        <button class="blue__btn" @click="stopBotHandler">
                            {{__('ОСТАНОВИТЬ Бота')}}
                        </button>
                    </div>

                </div> -->

            </div>
            
    </div>
</template>

<script setup lang="ts">

import { computed, onMounted, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { SvgIcon } from "~/components";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { MutationTypes } from "~/store/modules/mutations-types";

//                  HOOKS
const store = useStore(); 
const router = useRouter();

//                  STATE
const mainPage: Ref<HTMLDivElement | null> = ref(null)

//                  COMPUTED


//                  WACTHERS

//                  METHODS

//                  LIFECYCLE
onMounted(() => {
    



})

// function createBotHandler() {

//     store.commit(MutationTypes.SET_CURRENT_LAYOUT, 'EmptyLayout')

//     router.push({
//         name: 'create-bot'
//     })

// }




</script>

<style lang="scss">



@include b(main-page) {
    
    width: 100vw;
    height: 100vh;

    position: relative;

    background: yellow;

    @include e(inner){
        z-index: 5;
        position: relative;
        width: 100%;
        height: 100%;
    }

    @include e(tools) {
        display: flex;
        gap: 30px;
        justify-content: space-between;
        & button {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
        }
    }
    
}

@include b(icon){
    &__plus {
        width: 20px;
        height: 20px;
    }
    &__enter{
        width: 20px;
        height: 20px;
    }
}
 
.flash-bg {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(241,241,241, 0.96)
}

</style>