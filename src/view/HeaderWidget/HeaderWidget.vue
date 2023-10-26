<template>

    <div class="widget">

        <ul class="widget__tabs">
            <li>
                <SvgIcon @click="componentId = 'Timer'" :nameId=" componentId === 'Timer' ? 'colored-timer' : 'plain-timer' " />
            </li>
            <li>
                <SvgIcon @click="componentId = 'PrayTimes'" :nameId=" componentId === 'PrayTimes' ? 'colored-praytime' : 'plain-praytime' " />
            </li>
            <li>
                <SvgIcon @click="componentId = 'MapSection'" :nameId=" componentId === 'MapSection' ? 'colored-map' : 'plain-map' " />
            </li>
            <li>
                <SvgIcon @click="componentId = 'SearchUrban'" :nameId=" componentId === 'SearchUrban' ? 'colored-settings' : 'plain-settings' " />
            </li>
        </ul>
        <keep-alive>
            <component :is="componentId"
            class="comp"
                :selectedCurrentUrban="currentUrban"
                :currentPrayTimeDaily="currentPrayTimeDaily"
                :currentPrayTime="currentPrayTime"

                @getDailyPrayTimes="getDailyPrayTimes"
                @selectUrbanHandler="selectUrbanHandler"
                ></component>
        </keep-alive>

    </div>
    
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { SvgIcon } from "~/components";
import { PrayTimes, Timer, MapSection, SearchUrban } from "../TabMenu";

// Times change color, reset prev one
// Url 
// SEO

export default defineComponent({
    
    components: {
        PrayTimes,
        Timer,
        MapSection,
        SearchUrban,
        SvgIcon
    },

    data: function () {
        return {
            componentId: 'Timer',
            currentUrban: undefined,
            currentPrayTimeDaily: null,
            currentPrayTime: null            
        }
    },

    methods: {
        selectUrbanHandler( city ) {
            this.currentUrban = city
        },
        getDailyPrayTimes( dailyPrayTimes ) {
            this.currentPrayTime = {
                ...dailyPrayTimes.currentPrayTime
            }
            this.currentPrayTimeDaily = {
                ...dailyPrayTimes.currentPrayTimeDaily
            }
        }
    }


})

</script>

<style lang="scss">
.comp {
    padding: 12px;
}
@include b( widget ) {

    max-height: 380px;
    width: 100%;
    
    max-width: 200px;
    height: 100%;

    background: #FFFFFF;
    
    overflow: hidden;

    @include e(tabs) {
        display: flex;
        gap: 10px;
        justify-content: center;
        & svg {
            cursor: pointer;
            width: 36px;
            height: 36px;
        }
    }


}
    
    
</style>