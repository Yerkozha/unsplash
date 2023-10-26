<template>

    <div class="pray-times">

       <div class="widget__location" v-if="selectedCurrentUrban">

            <SvgIcon nameId="location" />

            <span>{{ selectedCurrentUrban.title }}</span>

        </div>

        <ul class="pray-times__list" v-if="currentPrayTimeDaily">
            <li class="pray-times__item" 
            v-for="[k, val] of Object.entries(currentPrayTimeDaily)" 
            :key="val"
            :style="{color: (this.currentPrayTime[0] === k ? '#155BF9' : 'auto')}"
            >
                <p>
                    {{val}}
                </p>
                <span>{{k}}</span>
            </li>
            
        </ul>

        <a href="https://zk.kz/namaz/" class="switch__link" target="_parent">
            <span>
                Подробнее
            </span>
            <SvgIcon nameId="arr-dwn" />
        </a>

    </div>

</template>

<script lang="ts" >

import { defineComponent } from "vue";
import { SvgIcon } from "~/components";


export default defineComponent({

    props: {
        selectedCurrentUrban: {
            type: Object,
            default() {
                return {
                    title: 'Алматы'
                }
            }
        },
        currentPrayTimeDaily: Object,
        currentPrayTime: Array
    },

    components: {
        SvgIcon
    }
    
})

</script>

<style lang="scss">

@include b(pray-times) {
    @include e(list) {
        display: flex;
        flex-direction: column;
        background: #F5F8FF;
        border-radius: 8px;
        padding: 16px;
        gap: 8px;
    }
    
    @include e(item) {

        
        display: flex;
        justify-content: space-between;

        &:not(:last-child){
            border-bottom: 1px solid #E3E7EF;
            padding-bottom: 8px;
        }

        & p {
            font-weight: 300;
            font-size: 14px;
            line-height: 17px;
        }

        & span {
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
        }
    }
}
    
</style>