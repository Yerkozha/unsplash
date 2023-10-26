<template>

    <div class="city-modal">
        <div class="city-modal__inner">

            <div class="city-modal__top">
                <p class="city-modal__title">
                    Выберите свой город
                </p>
                <SvgIcon nameId='city-close' @click="$emit('closeModal')"/>
            </div>

            <input v-model="searchText" placeholder="Введите название города" />
            
            <ul class="city-modal__list" v-if="cities?.results?.length">
            
                <li 
                    v-for="city of filteredCities" 
                    class="city-modal__item" 
                    :key="city.lng"
                    @click="selectCityHandler(city)"
                    :tabindex="city.lng"
                    >
                    <a :href="'https://zk.kz/namaz/' + city.slug">
                    {{ city.title }}
                    </a>
                </li>
                
            </ul>

            <div class="city-modal__navitagion">
                
                <SvgIcon nameId="city-nav__left" @click="previousPageHandler" />
                <Pagination 
                    v-if="cities?.results?.length"
                    :next="cities.next"
                    :previous="cities.previous"
                    @getCurrentPage="getCurrentPage"
                    :items="cities.results"
                    :currentPage="currentPage"
                    :requestCurrentPage="this.requestCurrentPage"
                />
                <SvgIcon nameId="city-nav__right" @click="nextPageHandler" />
                
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Pagination, SvgIcon } from "../globals";
import { prayTime } from '~/api/prayTime';

class Cities {
    
    public async getCities( page? ) {

        const { data } = await prayTime.getCities( page );

        return data
    }

}

/*
* Search city, download all cities
    Location design fix
    
*/

export default defineComponent({

    // props: {
    //     cities: Object as PropType<Cities>
    // },

    data() {
        return {
        filteredCities: [],
        currentPage: 1,
        cities: {},
        requestCurrentPage: '',

        searchText: '',
        searchUrban: null
    }},

    watch: {
        searchText() {  

            this.searchUrban();

        }
    },

    components: {
        SvgIcon,
        Pagination
    },

    methods: {
        selectCityHandler(city) {
            this.$emit('selectUrbanHandler', city)
            this.$emit('closeModal')
        },

        getPreviousCitiesHandler() {

            this.parseResponceHandler( this.cities.previous ? this.trimExtra(this.cities.previous) : null);

        },
        getNextCitiesHandler() {

            this.parseResponceHandler( this.cities.next ? this.trimExtra(this.cities.next) : null);

        },

        trimExtra: ( uri ) => uri.replace(/.*(?=page)/, ''),

        getCurrentPage(i) {
            this.currentPage = i;
            this.calculateCurrentPageItems();
        },
        
        previousPageHandler() {
            if( this.currentPage > 1 ) {
                this.currentPage--;
                this.calculateCurrentPageItems();
            }
        },
        nextPageHandler() {
            if ( this.currentPage < Math.ceil(this.cities?.results?.length / 10) ) {
                this.currentPage++;
                this.calculateCurrentPageItems();
            }  
        },

        calculateCurrentPageItems() {
            const totalPortionCount = this.cities?.results?.length;
            const perPageCount = 10;

            const rightIndexBorder = this.currentPage * perPageCount;
            const leftIndexBorder  = rightIndexBorder - perPageCount;
            
            this.filteredCities = this.cities.results.slice( leftIndexBorder , rightIndexBorder );
        },

        async getCities( page? ) {

            const { data } = await prayTime.getCities( page );

            return data.reduce( function ( acc, next ) {

                return {
                    ...next,
                    results: acc.results?.concat( !!next ? next.results as any : [])
                }
            }, { results: [] })
        },

        parseResponceHandler( page? ) {

            this.getCities(page).then((function(res) {
                this.requestCurrentPage = page;
                this.cities = res;
                this.calculateCurrentPageItems();
            }).bind(this))

        },

        debounce(func , delay = 1000) {
            let timer;

            return ( function (...args) {
                clearTimeout(timer);

                timer = setTimeout((function() {
                    func.apply(this , args)
                }).bind(this), delay);

            }).bind(this)
        }

    },

    mounted() {
        this.searchUrban =  this.debounce((function (){
            this.filteredCities = this.cities?.results.sort((function(a , b) {
                const doFind = new RegExp(this.searchText.toLowerCase(),'g').test(a.title.toLowerCase());
                if ( doFind ) return -1;
                return 0
            }).bind(this)).slice(0, 10);
        }).bind(this), 1000)

        this.parseResponceHandler();
        
    }

})

</script>

<style lang="scss" scoped>

.city-modal {
    position: fixed;
    top: 0;
    left: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.5);
    z-index: 1111;

    &__top {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
    }

    &__title {
        
    }

    &__item {
        cursor: pointer;
        
        border-bottom: 1px solid #E3E7EF;
        text-align: center;
        transition: all ease 0.2s;
        & a {
            color: #000000;
            padding: 12px 0;
            display: block;
        }
        &:hover,:focus {
            background: rgba(0,0,0,0.1);
        }     
        &:last-child {
            margin-bottom: 12px;
        }
    }

    &__navitagion{ 
        display: flex;
        justify-content: center;
         gap: 20px;
    }
    
    &__inner {
        max-width: 400px;
        width: 100%;
        background: #F5F8FF;
        border-radius: 12px;
        padding: 24px 0;
        user-select: none;
        & input {
            width: 100%;
            border: none;
            
            border-radius: 6px;
            padding: 6px 12px;

            &:focus{
                outline: none;
            }
        }
    }

    & svg {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
}

@media screen and (max-width: 600px) {
    .city-modal__inner {
        max-width: 319px;
    }
    .city-modal__title {
        font-size: 16px;
    }
    .city-modal__item {
        padding: 8px 0;
        font-size: 14px;
    }
    .g-pagination {
        font-size: 14px;
    }
    .city-modal__inner{
        font-size: 14px;
    }
    .city-modal__navitagion {
        padding: 0 16px;
    }
}
    
</style>