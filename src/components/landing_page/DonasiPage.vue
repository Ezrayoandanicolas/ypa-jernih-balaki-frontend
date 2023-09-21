<script>
import { mapActions } from "vuex";
import moment from "moment";
export default {
    name: 'Donasi-Page',
    data() {
        return {
            Donasi: []
        }
    },
    async mounted() {
        try {
            await this.ARetrieveDonasiGuest().then((res) => {
                if (res.data.length == 0) {
                    this.Donasi = null
                } else {
                    this.Donasi = res.data
                }
                
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        ...mapActions({
            ARetrieveDonasiGuest: 'ARetrieveDonasiGuest',
        }),
        filterDonasiDescription(data) {
            return data.substring(0, 100) + '...'
        },
        filterDonasiTitle(data) {
            return data.substring(0, 40) + '...'
        },
        formateDateDonasi(data) {
            return moment(data).format('LL')
        },
        formatCurrencyID(data) {
            return "Rp " + data.toString().replace(/(\d)(?=(\d{3})+(?:\\.\d+)?$)/g, "$1.")
        },
        numberDecimal(data) {
            return data.toFixed(0)
        }
    }
}
</script>

<template>
    <div class="donase-page">
        <h1 class="pt-[120px] pb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-8 decoration-red-700">
            Donasi
        </h1>
        <div v-if="Donasi.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-8 px-10 container justify-items-center m-auto">
            <div
                v-for="(item, index) in Donasi"
                :key="index"
                class="max-w-sm h-[85%] bg-gray-100 border border-gray-200 rounded-lg shado shadow-lg"
            >
                <a :href="'donasi/read/'+item.slug" class="relative">
                    <img class="rounded-t-lg h-1/2 object-cover w-full aspect-square hover:scale-100 hover:brightness-90 duration-300 ease-in-out" :src="item.images.imageUrl" :alt="item.title" />
                    <span class="absolute rounded-lg font-bold text-sm text-white px-4 py-1 bg-red-500 top-0 right-0">{{ item.category.name }}</span>
                </a>
                <div class="p-2">
                    <a :href="'donasi/read/'+item.slug">
                        <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">{{ item.title }}</h5>
                    </a>
                    <p class="font-semibold text-gray-900 dark:text-gray-900 text-left mt-[-7px]">{{ formateDateDonasi(item.date_start) }}</p>
                    <div class="progress-bar">
                        <div class="flex justify-between mb-1">
                            <span class="text-base font-medium text-gray-900">Target Donasi</span>
                            <span class="text-sm font-medium text-gray-900">{{ formatCurrencyID(item.target_donasi) }}</span>
                        </div>
                        <div class="w-full bg-red-200 rounded-full h-2.5 ">
                            <div class="bg-blue-600 h-2.5 rounded-full" :style="'width: '+item.result_donasi/item.target_donasi*100+'%' > 100 ? '100%' : item.result_donasi/item.target_donasi*100+'%'"></div>
                        </div>
                        <div class="flex justify-between mb-1">
                            <span class="text-base font-medium text-gray-900">{{ formatCurrencyID(item.result_donasi) }} (Terkumpul)</span>
                            <span class="text-sm font-medium text-gray-900">{{ numberDecimal(item.result_donasi/item.target_donasi*100)+'%' }}</span>
                        </div>
                    </div>
                    <div class="flex justify-center m-auto rounded-lg bg-red-500 text-white px-4 py-1">
                        <span class="text-sm font-medium">Batas Waktu : &nbsp;</span>
                        <span class="text-sm font-medium">{{ formateDateDonasi(item.date_end) }}</span>
                    </div>
                    
                    <a :href="'donasi/read/'+item.slug" class="inline-flex float-right items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="w-3.5 h-3.5 ml-2 animate__animated animate__headShake animate__infinite animate__slow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="container justify-items-center m-auto">
            <h1 class="-mt-8 ml-10 text-left text-2xl font-bold leading-none tracking-tight text-blue-500 underline underline-offset-6 decoration-blue-700">
                <router-link to="/donasi">Read more article ...</router-link>
            </h1>
        </div>
    </div>
</template>