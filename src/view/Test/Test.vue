<template>
    <div class="content-wrapper">

        <swiper
            :modules="modules"

            :navigation="{
                prevEl: prev,
                nextEl: next,
            }"

            :slides-per-view="1"
            :space-between="50"
        >
            <swiper-slide v-for="record of data?.hadiths?.data" :key="record.id">
                <Hadith :record="record" />
            </swiper-slide>
            
        </swiper>

        <div ref="next" class='swiper-button-next team_swiper_next'><SvgIcon nameId="arrow-next" /></div>
        <div ref="prev" class='swiper-button-prev team_swiper_prev'><SvgIcon nameId="arrow-prev" /></div>

    </div>
</template>
<script lang="ts" src="./Test.ts">

</script>
<style lang="scss">
    
</style>