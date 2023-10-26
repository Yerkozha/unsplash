<template>
    <div class="timer-section">
        
        <div class="widget__location" v-if="selectedCurrentUrban">

            <SvgIcon nameId="location" />

            <span>{{ selectedCurrentUrban.title }}</span>

        </div>

        <div class="timer__inner" v-if="this.computedLastTime.hours || this.computedLastTime.minutes || computedLastTime.seconds">
            <h3>
                {{this.currentPrayTime[0]}}
            </h3>
            <p>До намаза осталось:</p>
            <span>{{this.computedLastTime.hours + ':' + this.computedLastTime.minutes + ':' + this.computedLastTime.seconds}}</span>
            <k-progress :show-text="false" :percent="overallPercent"></k-progress>
        </div>

        <div class="timer__bottom-time" v-if="this.currentPrayTime">
            <div>
                <span>Местное время </span>
                <p>{{currentTime}}</p>
            </div>
            <div>
                <span>Намаз {{this.currentPrayTime[0]}}</span>
                <p>{{this.currentPrayTime[1]}}</p>
            </div>
        </div>

        <a href="https://zk.kz/namaz/" class="switch__link" target="_parent">
            <span>
                Подробнее
            </span>
            <SvgIcon nameId="arr-dwn" />
        </a>
        
    </div>
</template>

<script lang="ts" >

import { defineComponent } from "vue";
import { prayTime } from "~/api/prayTime";
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
    },

    data() {
        return ({
            isModalOpen: false,
            currentUrban: {
                title: 'Алматы'
            },
            currentPrayTimeDaily: null,
            currentPrayTime: null,
            prayTimes: null,
            intervalId: null,

            shortedPrayTimesTable: [],

            computedLastTime: {},
            distancePercent: 0,
            currentTime: null,
            overallPercent: null
    })},

    mounted() {
        prayTime.getPrayTime({
                lng: 76.945465,
                lat: 43.238293
            }).then((function (res) {
                if(res.status === 200) {
                    this.prayTimes = res.data[0];
                    this.computeWholeProcess();
                }
            }).bind(this))

        
    },

    methods: {

        selectUrbanHandler ( city ) {
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
            clearTimeout(this.intervalId);
            this.computedLastTime = {};
            this.findCurrentPrayTime();
            this.cutLengthOfPrayTime();
        },

        findCurrentPrayTime() {
            const today = new Date();
            const todayDate = today.toLocaleDateString('fr-CH').replace(/\.+/g, '-');
            const currentTime = today.toLocaleTimeString('en-GB').replace(/:([0-9]+$|[0-9]+ .+)/,'');
            this.currentTime = currentTime;

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

            this.$emit('getDailyPrayTimes', {currentPrayTimeDaily: this.currentPrayTimeDaily , currentPrayTime: this.currentPrayTime})
            
            if( foundTimeIdx === -1 ) {
                this.currentPrayTime = tempSortedArr[tempSortedArr.length - 1];
            }
            
            const nextPrayTimeTemp = tempSortedArr[foundTimeIdx];
            const nextPrayTime = new Date();

            // currentPray time

            const currentTempTime = new Date();
            currentTempTime.setHours(parseInt((this.currentPrayTime[1] as string).replace( /:\d+/g , '')));
            currentTempTime.setMinutes( parseInt((this.currentPrayTime[1] as string).replace( /^\d+:/g , '')) );
            
            //                  TIMER
            nextPrayTime.setHours( parseInt((nextPrayTimeTemp[1] as string).replace( /:\d+/g , '')) );
            nextPrayTime.setMinutes( parseInt((nextPrayTimeTemp[1] as string).replace( /^\d+:/g , '')) );
            
            this.intervalId = setInterval((function () { this.calculateCountDown( nextPrayTime, currentTempTime ) }).bind(this), 1000);
        },

        calculateCountDown(  nextPrayTime, currentTempTime ) {

            const now = new Date();
            
            const distance = nextPrayTime.getTime() - now.getTime();
            this.distancePercent = distance;

            this.overallPercent = ((nextPrayTime.getTime() - now.getTime()) * 100) / (nextPrayTime.getTime() - currentTempTime.getTime());
            
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
            
            this.shortedPrayTimesTable = this.prayTimes.result.filter(function (times) {
                const now = new Date()
                tillDate = new Date();

                tillDate.setDate(times.date.replace(/-.*/g, ''));
                tillDate.setMonth(times.date[3] + times.date[4]);
                tillDate.setFullYear(times.date.replace(/\d*-/g, ''));

                return (now.getMonth() + 1) === tillDate.getMonth() && ( now.getDate() + 10 ) > tillDate.getDate() && now.getDate() < tillDate.getDate();
            });
            
        }
        
    },

    watch: {
        
        selectedCurrentUrban: function () {

            this.currentUrban = {
                ...this.selectedCurrentUrban
            }
            this.getPrayTime()
        }
        
    }

})

</script>

<style lang="scss">

.k-progress{ 
    justify-content: center;
}



.switch__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-top: 15px;

    background: #155BF9;
    border: 1px solid #155BF9;
    border-radius: 32px;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    padding: 9px 16px;
}

@include b(timer) {

    @include e(inner) {

        background: #F5F8FF;
        border-radius: 8px;
        padding: 15px;
        margin: 4px 0;

        text-align: center;

        
    }

    @include e(bottom-time) {
        display: flex;
        gap: 8px;

        & div {

            background: #F5F8FF;
            border-radius: 8px;
            padding: 8px 15px;
            text-align: center;
            

            & span {
                font-size: 12px;
            }

            & p {
                color: #000000;
                font-weight: bold;
                font-size: 16px;
                line-height: 20px;
            }

        }
    }

}

@include b(widget) {

    @include e(location) {
        background: #F5F8FF;
        border-radius: 8px;
        
        display: flex;
        gap: 10px;

        padding: 6px 10px;

        & span {
            font-weight: 300;
            font-size: 14px;
            line-height: 17px;
        }

    }

}

@include b(icon) {

    @include e(location) {

        width: 16px;
        height: 16px;

    }
    @include e(arr-dwn) {

        width: 14px;
        height: 14px;

    }

}
    
</style>