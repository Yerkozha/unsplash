<template>
    <div class="urban">

        <h1 class="urban__title">Список городов</h1>

        <div class="urban__search-box">
            
            <div class="urban__inner-field">

                <SvgIcon nameId="urban-search" />

                <input v-model="searchText" placeholder="Название города" />
    
                <ul class="urban__list" v-if="cities?.results?.length">
    
                    <li 
                        v-for="city of filteredCities" 
                        class="urban__list-item" 
                        :key="city.lng"
                        @click="selectCityHandler(city)"
                        :tabindex="city.lng"
                        >
                        {{city.title}}
                    </li>
                        
                </ul>

            </div>

        </div>

        <!-- <div class="city-modal__navitagion">
                
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
            
        </div> -->

    </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import { prayTime } from "~/api/prayTime";
import { Pagination, SvgIcon } from "~/components";

export default defineComponent({

    // props: {
    //     cities: Object as PropType<Cities>
    // },
    components: {
        SvgIcon
    },

    data() {
        return {
        filteredCities: [],
        currentPage: 1,
        cities: {},
        requestCurrentPage: '',
        selectedUrban: 'Алматы',

        searchText: '',
        searchUrban: null
    }},

    watch: {
        searchText() {

            this.searchUrban();

        }
    },


    methods: {
        selectCityHandler(city) {
            this.$emit('selectUrbanHandler', city)
            this.$emit('closeModal')
            this.searchText = city.title
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
            
            this.filteredCities = this.cities.results
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

            this.filteredCities = this.cities?.results?.sort((function(a , b) {
                const doFind = new RegExp(this.searchText.toLowerCase(),'g').test(a.title.toLowerCase());
                if ( doFind ) return -1;
                return 0
            }).bind(this))

        }).bind(this), 1000)

        this.parseResponceHandler();
        
    }

})

</script>

<style lang="scss">

@include b(urban) {
    
    @include e(title) {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        margin: 12px 0;
    }

    @include e(search-box) {
        
    }

    @include e(inner-field) {

        position: relative;
        display: flex;
        flex-direction: column;
        
        & input {
            border: 1px solid #155BF9;
            border-radius: 32px;
            padding: 5px 14px 5px 25px;
            font-weight: 300;
            font-size: 14px;

            &:focus {
                outline: none;
            }

            &::placeholder {
                color: #A7A7A7;
                font-weight: 300;
                font-size: 12px;
                line-height: 14px;
            }
        }

        & svg {
            position: absolute;
            top: 8px;
            left: 7px;
           
        }

    }

    @include e(list) {
        max-height: 160px;
        overflow-y: auto;

        &-item {
            cursor: pointer;
            padding: 0;
            border-bottom: 1px solid #E3E7EF;
            text-align: center;
            transition: all ease 0.2s;
            
            font-size: 16px;
            &:hover,:focus {
                background: rgba(0,0,0,0.1);
            } 
        }
           
    }

}

@include b(icon) {

    @include e(urban-search) {
        width: 16px;
        height: 16px;               
    }

}
    
</style>