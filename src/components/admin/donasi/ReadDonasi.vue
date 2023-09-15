<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'Admin-Read-Donasi',
    async mounted() {
        try {
            await this.AReadDonasi(this.$route.params.slug).then(() => {
                this.$emit('TitleReadDonasi', this.Donasi.title)
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Donasi: 'getAReadDonasi',
        })
    },
    methods: {
        ...mapActions({
            AReadDonasi: 'AReadDonasi',
        }),
        formateDateDonasi(data) {
            return moment(data).format('LL')
        }
    }
}
</script>

<template>
    <div class="admin-read-donasi">
        <div v-if="Donasi == null" class="relative container items-center block w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md animate__animated animate__fadeIn">            
            <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <div class="inline-flex">
                    <span class="relative flex h-3 w-3">
                        <span class="animate-[ping_1s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span class="relative flex h-3 w-3 ml-4">
                        <span class="animate-[ping_1s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span class="relative flex h-3 w-3 ml-4">
                        <span class="animate-[ping_1s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="container mx-auto w-full md:w-2/3">
            <div class="thumbnail m-5">
                <div class="image-thumbnail">
                    <img class="object-cover w-full h-[250px] md:h-[500px] shadow-md rounded-lg" :src="Donasi.images.imageUrl" alt="thumbnail">
                </div>
            </div>
            <div class="detail-article">
                <h1 id="title-article" class="font-bold px-5 pt-5 text-2xl lg:text-4xl">{{ Donasi.title }}</h1>
                <h3 id="date-article" class="font-normal text-right px-5 pt-5 text-md lg:text-lg">{{ Donasi.date_start }}</h3>
            </div>
            <div class="progress-bar mt-5">
                <div class="flex justify-between mb-1">
                    <span class="text-base font-medium text-gray-900">Target Donasi</span>
                    <span class="text-sm font-medium text-gray-900">{{ 'Rp. '+Donasi.target_donasi }}</span>
                </div>
                <div class="w-full bg-red-200 rounded-full h-2.5 ">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="'width: '+900000/Donasi.target_donasi*0.01"></div>
                </div>
                <div class="flex justify-between mb-1">
                    <span class="text-base font-medium text-gray-900">Rp. 9.000.000 (Terkumpul)</span>
                    <span class="text-sm font-medium text-gray-900">45%</span>
                </div>
            </div>
            <div class="inline-flex justify-between mb-1 rounded-lg bg-red-500 text-white px-4 py-1">
                <span class="text-sm font-medium">Batas Waktu : &nbsp;</span>
                <span class="text-sm font-medium">{{ Donasi.date_end }}</span>
            </div>
            <div class="content px-5 pt-5 text-left text-md leading-7">
                    <p v-html="Donasi.article"></p>
            </div>
        </div>
    </div>
</template>