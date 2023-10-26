<script setup lang="ts">
import { SvgIcon } from "../globals";

</script>

<template>

    <div class="gallery__header ">
        <div class="container">
            <div class="gallery__header-inner">
                <router-link to="/">
                    <SvgIcon :nameId="'logo__gallery'" />
                </router-link>
                
                <router-link to="/favorite" class="gallery__logo-link">
                    <SvgIcon :nameId="'heart'" />
                    <router-link to="/favourite">
                        <span>{{__('Избранное')}}</span>
                    </router-link>
                    
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @include b(gallery){
        @include e(header){
            width: 100%;

            background-color: #000000;
        }

        @include e(header-inner){
            display: flex;
            justify-content: space-between;
        }

        @include e(logo-link) {
            max-width: 150px;
            display: flex;
            align-items: center;
            color: #fff;            
            & span {
                line-height: 21px;
                font-size: 18px;
            }
        }
    }

    @include b(icon){
        @include e(logo__gallery) {
            height: 72px;
        }
        @include e(heart) {
            height: 25px;
        }
    }
    .gallery__logo-link {
        a {
            color: #fff;
        }
    }
</style>