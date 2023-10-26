<template>
    <div class="unique-image" >

        <div class="unique-image__bg" ref="bgEl" />
        
        <div class="unique-image__top container">
            <div class="unique-image__user">
                <img :src="currentImage.user.profile_image.small" />
                <div class="unique-image__credentials">
                    <h1 class="unique-image">{{currentImage.user.name}}</h1>
                    <p>@{{currentImage.user.instagram_username}}</p>
                </div>
            </div>
            <div class="unique-image__toolbar">
                <SvgIcon ref="heartFavourite" nameId="heart-b" @click="favouritesHandler"/>
                <a :href="currentImage.links.download" download class="unique-image__toolbar-download" @click="downloadHandler">
                    Download 
                    <!-- Proxy server download -->
                </a>
            </div>
        </div>

        <div class="unique-image__bottom container">
            <img :src="currentImage.urls.raw" alt="Image">
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, Ref, ref, watch } from "vue";
import { Photos } from "~/api/unsplash";
import { SvgIcon } from "~/components";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import LocalStorageService from "~/utils/LocalStorageService";

const bgEl: Ref<Nullable<HTMLDivElement>> = ref()
const downloadImageLink = ref()
const heartFavourite: Ref<Nullable<HTMLDivElement>> = ref()

const store = useStore();
const currentImage = computed(() => store.state['currentImage']);


onMounted(() => {
    
    bgEl.value!.style.setProperty('background', `top / cover no-repeat  url("${currentImage.value?.urls.raw}")`);
    isFavourite()
})
watch(() => store.state.favourites.length,
    () => {
    isFavourite()
})

function isFavourite () {
        if(store.state.favourites.findIndex((e) => e.id == currentImage.value?.id) !== -1){
            // @ts-ignore
            heartFavourite.value!.$el.style.stroke = 'red';
        }else {
            // @ts-ignore
            heartFavourite.value!.$el.style.stroke = 'unset';
        }
}

async function downloadHandler(ev) {
    const image = await fetch(currentImage.value!.links.download)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = <string>currentImage.value!.id
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}



class Storage<T extends Nullable<Photos>> {

    store = ((result) => result ? JSON.parse(result) : Array() )(localStorage.getItem('favourites'))

    togglerFavourite( newFavourite: T ) {
        let favouriteExistsIdx = this.store.findIndex((existingFavourite) => existingFavourite.id === newFavourite?.id)
        if(favouriteExistsIdx !== -1) {
            this.store.splice(favouriteExistsIdx, 1)
        } else {
            this.store.push(newFavourite)
        }
        localStorage.setItem('favourites', JSON.stringify(this.store));
        store.dispatch(ActionTypes.SET_FAVOURITES, newFavourite)
    }
}
const storage = new Storage()

function favouritesHandler() {

    storage.togglerFavourite(currentImage.value)

}

</script>

<style lang="scss">

@include b(unique-image) {

    display: flex;
    flex-direction: column;
    position: relative;

    @include e(top){
        z-index: 2;
        display: flex;
        justify-content: space-between;
    }

    @include e(user){
        display: flex;
        & img {
            width: 50px;
            height: 50px;
            border-radius: 25%;
            margin-right: 5px;
        }
    }


    @include e(bottom){
        
        z-index: 2;
        width: 100%;
        height: 100vh;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
    }
    @include e(credentials) {
        color: #fff;
    }

    @include e(toolbar-download){
        padding: 7px 15px 7px 20px;
        background: #fff200;
        color: #000;
        border-radius: 7%;
    }
    @include e(toolbar){
        display: flex;
        gap: 5px;
        align-items: center;
        cursor: pointer;
    }

    @include e(bg) {
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        filter: grayscale(1) blur(4px);
        position: absolute;
        
    }
}

@include b(icon){
    @include e(heart-b) {
        width: 40px;
        height: 40px;
        background: white;
        padding: 5px;
        border-radius: 25%;
    }
    
}

</style>