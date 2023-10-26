<template>

    <div class="entry-point">

        <div class="entry-point__left">
            <h1>{{__('Welcome to a better cryptosystem where privacy and freedom come first')}}</h1>
        </div>

        <div class="entry-point__inner">

            <div class="entry-point__top">
                <h2>
                    <SvgIcon nameId="earth" />
                    <span>
                        EN
                    </span>
                </h2>
                
            </div>


            <div class="entry-point__bottom">
                
            </div>

        </div>

    </div>

</template>

<script lang="ts" setup>

import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { SvgIcon } from "~/components";

onMounted(() => {
    const router = useRouter()
    router.push({
        name: 'test'
    })
})

</script>

<style lang="scss">
    
    @include b(entry-point) {

        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100vw;
        height: 100vh;
        

        @include e(left) {

            width: 100%;
            height: 100%;
            position: relative;
            background: rgba(95, 50, 170, 0.85);
            border-top-right-radius: 5%;
            border-bottom-right-radius: 5%;

                & h1 {
                    position: absolute;
                    
                    width: 80%;
                    left: 10%;
                    
                    font-weight: 400;
                    font-size: 64px;
                    line-height: 77px;
                    text-align: center;
                    color: #ffffff;
                    
                    z-index: 22;
                }
                

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                width:100%;
                height: 100%;
                background:  bottom / contain no-repeat  url('../../assets/img/enrty-point__bottom.png');
            }

            @include e(top) {
                display: flex;
                justify-items: end;
            }

            @include e(bottom) {

            }

        }

        @include e(inner) {

        }


    }

</style>