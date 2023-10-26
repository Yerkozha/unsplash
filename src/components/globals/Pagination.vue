<template>
    <ul class="g-pagination">
        <li v-for="(i, idx) in totalPortionCount" :key="i"
            @click="$emit('getCurrentPage', idx + 1)"
            :tabindex="i"
        >{{ i }}</li>
    </ul>
</template>

<script setup lang="ts">
import { computed, Ref, ref, toRef, watch } from "vue";

interface InComeProps {
    items: Array<unknown>;
    previous: string | null;
    next: string | null;
    requestCurrentPage: string | null;
}

const props = withDefaults(defineProps<InComeProps>(), {});

const perPageItems = 10;
const totalPortionCount = Math.ceil( props.items?.length / perPageItems );
const overallNumbers: Ref<Array<Number>> = ref([1,2,3]);


watch(function () { return props.requestCurrentPage }, function () {
    
    switch(props.requestCurrentPage){
        case 'page=2': 
            overallNumbers.value = [4,5,6];
            break;
        case 'page=3': 
            overallNumbers.value = [7,8,9];
            break;
        case 'page=4':
            overallNumbers.value = [10,11,12];
            break;
        case 'page=5':
            overallNumbers.value = [13,14,15];
            break;
        default:
            overallNumbers.value = [1,2,3];
    }

})


</script>

<style lang="scss">
    .g-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        user-select: none;
        flex-wrap: wrap;
        & li {
            cursor: pointer;
        }
        & li:focus {    
            color: var(--grey-blue);
            
        }
    }
</style>