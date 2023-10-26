<template>

    <div class="wrapper">
        
        <GalleryHeader />

        <main>

            <slot />

        </main>

    </div>
    
</template>

<script setup lang="ts">
import { GalleryHeader } from "~/components";



</script>

<style lang="scss">



</style>