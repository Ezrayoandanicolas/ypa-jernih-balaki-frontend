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
        <div v-else class="container mx-auto w-full md:w-2/3 animate__animated animate__fadeIn">
            <div class="thumbnail m-5">
                <div class="image-thumbnail">
                    <img class="object-cover w-full h-[250px] md:h-[500px] shadow-md rounded-lg" :src="Donasi.images.imageUrl" alt="thumbnail">
                </div>
            </div>
            <div class="detail-donasi">
                <h1 id="title-donasi" class="font-bold px-5 pt-5 text-2xl lg:text-4xl">{{ Donasi.title }}</h1>
                <h3 id="date-donasi" class="font-normal text-right px-5 pt-5 text-md lg:text-lg">{{ formateDateDonasi(Donasi.created_at) }}</h3>
            </div>
            <div class="content px-5 pt-5 text-left text-md leading-7">
                    <p v-html="Donasi.article"></p>
            </div>
        </div>
    </div>
</template>