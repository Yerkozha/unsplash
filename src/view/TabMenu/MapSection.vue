<template>
    <div class="map-section">

        <div class="widget__location" v-if="selectedCurrentUrban">

            <SvgIcon nameId="location" />

            <span>{{ selectedCurrentUrban.title }}</span>

        </div>

        <div>
            <iframe src="https://qibla.namaztimes.kz?&lat=43.21666666666667&lon=76.85&cord=2&language=ru" width="100%" height="200px" frameborder="0"></iframe>
        </div>

        <a href="https://zk.kz/namaz/" class="switch__link" target="_parent">
            <span>
                Подробнее
            </span>
            <SvgIcon nameId="arr-dwn" />
        </a>
    </div>
</template>

<script lang="ts">
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
        }
    },

    components: {
        SvgIcon
    }
    
})
</script>

<style lang="scss">
    .map-section {
        & > div {
            
        }
    }
</style>