
<template>

    <div class="container">
        
        <div class="namaz-base">
            
            <div class="namaz-base__top">

                <div class="namaz-base__top-info">
                    <SvgIcon nameId="teleg" />
                      
                    <span>Время намаза зависит от вашего местоположения</span>
                </div>

                <div class="namaz-base__top-widget" @click="revertModal">
                    <h3>
                        {{this.currentUrban ? this.currentUrban.title : "Алматы"}}
                    </h3>
                    <SvgIcon nameId="arrow-down-location" />

                </div>

            </div>

            <section class="namaz-base__cards">

                <div class="namaz-base__time">

                    <img class="fix-bg" src="https://zk.kz/images/26ec6b93654b51c34b3b.png" alt="Quran">

                    <div class="namaz-base__time-top">

                        <div class="namaz-base__time-current" v-if="this.currentPrayTime">
                            <h5 class="namaz-base__time-current-time" >
                               {{ this.currentPrayTime[1]}}
                            </h5>
                            <span>{{this.currentPrayTime[0]}}</span>
                        </div>

                        <div class="namaz-base__time-counter" v-if="this.computedLastTime.hours || this.computedLastTime.minutes || computedLastTime.seconds">
                            до намаза осталось: <span>{{this.computedLastTime.hours + ':' + this.computedLastTime.minutes + ':' + this.computedLastTime.seconds}}</span>
                        </div>
                        
                    </div>
                    
                    
                    <ul class="namaz-base__time-pray" v-if="this.currentPrayTimeDaily">
                        <li class="namaz-base__time-pray-item" 
                        v-for="[k, val] of Object.entries(this.currentPrayTimeDaily)" 
                        :key="val"
                        :style="{color: (this.currentPrayTime[0] === k ? '#155BF9' : 'auto')}"
                        >
                            <p>
                                {{val}}
                            </p>
                            <span>{{k}}</span>
                        </li>
                        
                    </ul>
                    <ul class="namaz-base__time-pray" v-else>
                        <li class="namaz-base__time-pray-item">
                            <p>
                                00:00                                
                            </p>
                            <span>Fajr</span>
                        </li>
                        <li class="namaz-base__time-pray-item">
                            <p>
                                00:00                                
                            </p>
                            <span>Sunrise</span>
                        </li>
                        <li class="namaz-base__time-pray-item">
                            <p>
                                00:00                                
                            </p>
                            <span>Dhuhr</span>
                        </li>
                        <li class="namaz-base__time-pray-item">
                            <p>
                                00:00                                
                            </p>
                            <span>Asr</span>
                        </li>
                        <li class="namaz-base__time-pray-item">
                            <p>
                                00:00                                
                            </p>
                            <span>Maghrib</span>
                        </li>
                        <li class="namaz-base__time-pray-item">
                            <p>
                                00:00                                
                            </p>
                            <span>Isha</span>
                        </li>
                    </ul>

                </div>

                <div class="namaz-base__panel">
                    <img src="https://zk.kz/images/53ddb244edaa2abf1d70.png" alt="Islam date" />
                    <div class="namaz-base__panel-info">
                        <h2>
                            Рамадан 2023 - начало и конец поста
                        </h2>
                        <p>Мусульманский календарь основан на лунном календаре, поэтому каждый год сроки начала и конца Рамадана меняются. В 2023 году священный месяц начинается с заходом солнца 23 марта и заканчивается 21 апреля. На закате в ночь на 21 апреля верующие отмечают праздник разговения — Ураза-байрам.</p>
                    </div>
                </div>

                <div class="namaz-base__table">

                    <h4>Расписание намаза на {{ monthList[dateNow.getMonth()] }} {{ dateNow.getFullYear() }} </h4>
                    
                    <ul class="namaz-base__table-itself">
                        <img class="bg-pattern" src="https://zk.kz/images/45dc98cc9dff4a7306b8.png" alt="Pattern">

                        <li class="namaz-base__table-row namaz-base__table-row--head">
                            <p>Дата</p>
                            <p>Таң Фаджр</p>
                            <p>Күн Восход</p>
                            <p>Бесін Зухр</p>
                            <p>Екінті Аср</p>
                            <p>Ақшам Магриб</p>
                            <p>Құптан Иша</p>
                        </li>
                        <template v-if="shortedPrayTimesTable.length">
                            <li class="namaz-base__table-row"
                                v-for="t of shortedPrayTimesTable" 
                                :key="t.Fajr">
                                <p>{{t.date}}</p>
                                <p>{{t.Fajr}}</p>
                                <p>{{t.Sunrise}}</p>
                                <p>{{t.Dhuhr}}</p>
                                <p>{{t.Asr}}</p>
                                <p>{{t.Maghrib}}</p>
                                <p>{{t.Isha}}</p>
                            </li>
                        </template>
                    </ul>

                </div>
                
            </section>

        </div>

    </div>
    <keep-alive>
        <CitySelector v-if="isModalOpen"
            @selectUrbanHandler="selectUrbanHandler"
            @closeModal="revertModal"
        />
    </keep-alive>


</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from "vue";
import { Cities, prayTime } from "../../api/prayTime";
import { CitySelector, SvgIcon } from "../../components";


/*
    Identify current Pray date
    
*/

export default defineComponent({
    
    components: {
        SvgIcon,
        CitySelector,
    },

    data() {
        return ({
            isModalOpen: false,
            currentUrban: null,
            currentPrayTimeDaily: null,
            currentPrayTime: null,
            prayTimes: null,
            intervalId: null,

            allCities: [],

            shortedPrayTimesTable: [],

            computedLastTime: {},
            monthList: {
                0: 'Январь',
                1: 'Февраль',
                2: 'Март',
                3: 'Апрель',
                4: 'Май',
                5: 'Июнь',
                6: 'Июль',
                7: 'Август',
                8: 'Сентябрь',
                9: 'Октябрь',
                10: 'Ноябрь',
                11: 'Декабрь',
            },
            dateNow: new Date()
    })},

    mounted() {
        
        prayTime.getCities().then(function ( res ) {

            this.allCities = res.data.reduce( function ( acc, next ) {

                return {
                    ...next,
                    results: acc.results?.concat( !!next ? next.results as any : [])
                }
            }, { results: [] })

            const foundUrbanId = this.allCities.results.findIndex(function ( el ) {
                return el?.slug === window.location.pathname.replace(/(\/[a-z]+\/|\/)/g, "");
            })
            if( foundUrbanId !== -1 ) {
                this.currentUrban = this.allCities.results[foundUrbanId]
            }
            console.log(this.allCities.results[foundUrbanId])
            
            console.log(this.allCities.results, 'ALL')
            console.log(foundUrbanId, 'RESULT')
            console.log(window.location.pathname)
            console.log(window.location.pathname.replace(/[\/].+\//, ""))
            prayTime.getPrayTime({
                    lng: (foundUrbanId !== -1 ? this.allCities.results[foundUrbanId]['lng'] : 76.945465),
                    lat: (foundUrbanId !== -1 ? this.allCities.results[foundUrbanId]['lat'] : 43.238293), 
                }).then((function (res) {
                    if(res.status === 200) {
                        this.prayTimes = res.data[0];
                        this.computeWholeProcess();
                    }
                }).bind(this));
                
        }.bind(this))
        
    },

    methods: {

        selectUrbanHandler (city ) {
            this.currentUrban = city;
        },

        revertModal() {
            this.isModalOpen = !this.isModalOpen;
        },

        getPrayTime() {
            prayTime.getPrayTime({
                lng: this.currentUrban.lng,
                lat: this.currentUrban.lat
            }).then((function (res) {
                if(res.status === 200) {
                    this.prayTimes = res.data[0];
                    this.computeWholeProcess();
                }
            }).bind(this))
        },

        computeWholeProcess() {
            this.clearColor();
            clearTimeout(this.intervalId);
            this.computedLastTime = {};
            this.findCurrentPrayTime();
            this.cutLengthOfPrayTime();
        },

        findCurrentPrayTime() {
            const today = new Date();
            const todayDate = today.toLocaleDateString('fr-CH').replace(/\.+/g, '-');
            const currentTime = today.toLocaleTimeString('en-GB').replace(/:([0-9]+$|[0-9]+ .+)/,'');
            console.log(todayDate, 'todayDate');
            console.log(this.prayTimes.result, 'this.prayTimes.result');
            console.log(this.prayTimes, 'this.prayTimes');
            console.log(currentTime, 'currentTime');

            const tempSortedArr = Object.entries(this.prayTimes.result.filter(function (time) {
                 return time.date == todayDate})[0])
                .sort(function ( [,a]: any,[,b]: any) {
                    a = a.trim();
                    b = b.trim();
                    if( a < b ) return -1;
                    else if( a > b) return 1;
                    else return 0;
                });
            const foundDateIdx = tempSortedArr.findIndex(function (i) { return i[0] == 'date'});
            tempSortedArr.splice(foundDateIdx, 1);
            
            this.currentPrayTimeDaily = tempSortedArr.reduce(function (r,[k,v]) { return ({...r, [k]: v})}, {});
            
            const foundTimeIdx = tempSortedArr.findIndex(function([key, val]) {
                return currentTime < (val as string)
            });

            this.currentPrayTime = tempSortedArr[foundTimeIdx - 1];
            
            let nextPrayTimeTemp = tempSortedArr[foundTimeIdx];
            const nextPrayTime = new Date();
            
            if( foundTimeIdx === -1 ) {
                this.currentPrayTime = tempSortedArr[tempSortedArr.length - 1];
                nextPrayTimeTemp = tempSortedArr[0]
                nextPrayTime.setDate(nextPrayTime.getDate() + 1)
            }

            
            //                  TIMER
            nextPrayTime.setHours( parseInt((nextPrayTimeTemp[1] as string).replace( /:\d+/g , '')) );
            nextPrayTime.setMinutes( parseInt((nextPrayTimeTemp[1] as string).replace( /^\d+:/g , '')) );
            
            

            this.intervalId = setInterval((function () { this.calculateCountDown(  nextPrayTime ) }).bind(this), 1000);
        },

        calculateCountDown(  nextPrayTime ) {
            
            const now = new Date();
            const distance = nextPrayTime.getTime() - now.getTime();
            
            this.computedLastTime.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.computedLastTime.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.computedLastTime.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            if( distance < 0 ) {
                clearInterval(this.intervalId);
                this.computeWholeProcess();
            }
        },

        cutLengthOfPrayTime() {
            let tillDate;
            let counter = 0; 
            // get here current date
            console.log(this.prayTimes.result)
            
            this.prayTimes.result.forEach(function (times) {
                const now = new Date()
                tillDate = new Date();
                
                tillDate.setDate(times.date.replace(/-.*/g, ''));
                tillDate.setMonth(times.date[3] + times.date[4]);
                tillDate.setFullYear(times.date.replace(/\d*-/g, ''));
                
                if( counter < 10 && (now.getMonth() + 1) === tillDate.getMonth() && ( now.getDate() + 10 ) > tillDate.getDate() && now.getDate() < tillDate.getDate())
                {
                    counter++;
                    this.shortedPrayTimesTable.push(times)
                }else if( counter < 10 && (now.getMonth() + 2) === tillDate.getMonth() && ( now.getDate() + 10 ) > tillDate.getDate()) {
                    counter++;
                    this.shortedPrayTimesTable.push(times)
                }
                return times
            }.bind(this));
        },

        clearColor() {
            document.querySelectorAll('.namaz-base__time-pray-item').forEach(function (el) {
                return (el as HTMLLIElement).style.color = '#000000';
            })
        }

    },

    watch: {
        currentUrban() {
            this.getPrayTime();
        }
    }

})

//              METHODS 




</script>

<style lang="scss">

@include b(namaz-base){

    @include e(top) {
        padding: 8px 16px;

        font-family: Montserrat;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background: var(--bright-bg);
        border-radius: 12px;

    }

    @include e(top-info) {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    @include e(top-widget) {
        position: relative;

        border: 1px solid #155BF9;
        border-radius: 32px;
        padding: 0px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        

        cursor: pointer;

    }

    @include e(cards) {
        margin-top: 16px;
        grid-gap: 16px;

        user-select: none;

        display: grid;
        

        grid-template-areas: 
            "time p"
            "tab tab";

    }

    @include e(time) {

        grid-area: time;
        position: relative;
        padding: 24px;
        border-radius: 12px;
        background: var(--bright-bg);

        display: flex;
        flex-direction: column;
        gap: 50px;
        &-top {

            display: flex;
            justify-content: space-between;
            font-family: Montserrat;
            font-weight: 300;
            font-size: 16px;
            line-height: 20px;

        }

        &-current {
            text-align: center;
            &-time {
                font-family: Montserrat;
                font-weight: 400;
                font-size: 48px;
                line-height: 56px;
            }

        }

        &-counter {
            & > span {
                font-weight: bold;
                font-size: 18px;
            }
        }

        &-pray {
            display: flex;
            gap: 12px;

            &-item {
                background: #ffffff;
                border-radius: 100%;
                padding: 8px 20px;
                text-align: center;
                font-family: Montserrat;

                

                & > p {
                    font-weight: 400;
                    font-size: 22px;
                    line-height: 26px;
                }
                & > span {
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 17px;
                }

            }
        }

    }

    @include e(panel) {
        padding: 24px;
        grid-area: p;
        background: var(--bright-bg);
        font-family: Montserrat;
        display: flex;
        gap: 24px;
        color: #222426;
        border-radius: 12px;

        &-info {
            & > h2 {
                font-weight: 400;
                font-size: 22px;
                line-height: 26px;
                margin-bottom: 12px;
            }

            & > p {
            
                font-weight: 300;
                font-size: 14px;
                line-height: 17px;
                
            }
        }
        

    }

    @include e(table) {

        grid-area: tab;

        &-itself {
            
            position: relative;
            overflow: hidden;
            & .bg-pattern {
                
                position: absolute;
                width: 100%;
                top: 52px;
                left: 0;
                background: #FFFFFF;
                opacity: 2.5%;
                border-radius: 15px 15px 0px 0px;
                
            }
        }

        & > h4 {
            font-family: Montserrat;
            font-weight: 400;
            font-size: 22px;
            line-height: 26px;
            
            margin-bottom: 24px;
        }

        &-row {

            font-size: 16px;
            line-height: 20px;

            display: grid;
            grid-template-columns: repeat(auto-fill, 14.19%);
            grid-template-rows: repeat(auto-fill, 36px);

            font-family: Montserrat;
            font-weight: 300;
            text-align: center;
            align-items: center;

            border: 1px solid #E3E7EF;

            @include m(head) {
                background: #155BF9;
                color: #FFFFFF;

                font-family: Montserrat;
                
                grid-template-rows: repeat(auto-fill, 52px);

                border-radius: 15px 15px 0px 0px;
            }
           
            &:nth-child(odd) {
                background: var(--monday-cl);
            }

            

        }

    }

}

.fix-bg {
    position: absolute;
    bottom: 0;
    right: 0;
}


@include b( icon ) {
    @include e(teleg){
        width: 32px;
        height: 32px;
    }
    @include e(arrow-down-location){
        width: 15px;
        height: 10px;
    }
}

@media screen and (max-width: 600px) {
    .namaz-base__cards {
        display: flex;
        flex-direction: column;
    }
    .namaz-base__time-top {
        display: flex;
        flex-direction: column-reverse;
    }
    .namaz-base__time{
        gap: 20px;
    }
    .namaz-base__time-counter {
        text-align: center;
    }
    .namaz-base__time-pray {
        flex-wrap: wrap;
        justify-content: center;

    }
    .namaz-base__time-pray-item {
        & p {
            font-size: 14px;
            line-height: 17px;
        }
        & span {
            font-size: 8px;
            line-height: 10px;
        }
    }

    .namaz-base__panel{
        flex-direction: column;
        & > img {
            max-width: 40%;
        }
    }
    .namaz-base__panel-info { 
        & > h2{
            font-size: 20px;
            line-height: 24px;
        }
        & > p {
            font-size: 14px;
            line-height: 17px;
        }
    }
    .namaz-base__table > h4 {
        font-size: 20px;
        line-height: 24px;
    }
    .namaz-base__table-row{
        font-size: 12px;
    }
    .namaz-base__top-info {
        font-size: 12px;
        line-height: 14px;
    }
}


    
</style>