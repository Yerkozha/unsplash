<template>
  <div class="gallery__main">
    <div class="gallery__title" v-if="$route.path == '/favourite'">
      <h1>Избранное</h1>
    </div>
    <div class="gallery__main-search" v-else>
      <Input
        :notAllowValidation="true"
        :eyeIcon="true"
        :value="search"
        @onChange="onChangeHandler"
        placeholder="Поиск"
      />
    </div>
    <div class="gallery__card-section">
      <ul class="gallery__cards">
        <li
          class="gallery__cards-item"
          v-for="photo of photos"
          :key="photo.id"
          @click="photoSelectHandler(photo)"
        >
          <img :src="photo.urls.raw" />
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { Input } from "~/components";
import { unsplashAPI } from "~/api/unsplash";
import { useRouter } from "vue-router";
import { ActionTypes } from "~/store/modules/action-types";


export default defineComponent({
  data: () => ({
    search: "",
    photos: [],
    timeoutId: null
  }),

  components: {
    Input,
  },

  mounted() {
    this.initialize();
  },

  methods: {
    
    onChangeHandler(val) {
      this.search = val;

      if (this.timeoutId) {
          clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        unsplashAPI.searchPhoto(this.search).then(({data}) => {
          this.photos = data.results
        }).catch(() => {})
      }, 1000);
    }, 

    async initialize() {
      try {
        if (this.$route.path == "/favourite") {
          this.photos = [...this.$store.state.favourites];
        } else {
          const { data } = await unsplashAPI.getPhotos();
          this.photos = [...data];
        }
      } catch (err) {}
    },

    photoSelectHandler(photo) {
      this.$store.dispatch(ActionTypes.SET_CURRENT_IMAGE, photo);

      this.$router.push(photo.id);
    },
  },
});
</script>

<style scoped lang="scss">
@include b(gallery) {
  @include e(main-search) {
    display: flex;
    background: bottom / contain no-repeat
      url("../../assets/img/bg-picture__gallery.png") rgba(0, 0, 0, 0.1);
    height: 200px;
    margin-bottom: 15px;
    justify-content: center;
    align-items: center;

    & .custom-input {
      width: 40%;
    }
  }

  @include e(card-section) {
    background: #fff;
    width: 100%;
    height: 100%;
  }

  @include e(title) {
    background: #fff;
    padding-top: 70px;
    & h1 {
      text-align: center;
      font-weight: bold;
      font-size: 22px;
    }
  }

  @include e(cards) {
    margin: 0 auto;
    padding: 55px 0;
    width: 60%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    grid-gap: 15px;
  }

  @include e(cards-item) {
    width: 300px;
    height: 250px;
    text-align: center;
    cursor: pointer;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5%;
    }
  }
}
</style>

