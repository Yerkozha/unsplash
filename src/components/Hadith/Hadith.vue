<template>
    <div class="content-area">
        <h1 class="content-area__title"
        :class="{
            'content-area__title--long': record?.hadithEnglish.length > 5000
        }"
        >
            {{record?.hadithEnglish}}
        </h1>
    </div>
</template>

<script setup lang="ts">

import { BookType } from "~/api/auth"

interface PropsType  {
    record?: unknown
}

const {record} = withDefaults(defineProps<PropsType>(), {})


</script>

<style lang="scss">


@include b(content-area) {
    width: 100%;
    height: 100vh;
    
    display: flex;
    
    justify-content: center;
    align-items: center;

    
    @include e(title) {

        width: 50%;

        font-family: Montserrat;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;

        color: #000000;

        user-select: none;

        @include m(long) {
            position: absolute;
            top: 10%;
            overflow-y: auto;
            height: 100%;
        }
    }
}
    
</style>