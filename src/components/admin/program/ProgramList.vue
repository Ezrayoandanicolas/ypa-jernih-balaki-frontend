<script>
import { mapActions, mapGetters } from "vuex";
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
export default {
    name: 'Admin-program-List',
    data() {
        return {
            programs: [
                {
                    title: 'Noteworthy technology acquisitions 2021',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12 Agustus 2023',
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                },
                {
                    title: 'Noteworthy technology acquisitions 2021',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12 Agustus 2023',
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                },
                {
                    title: 'Noteworthy technology acquisitions 2021',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12 Agustus 2023',
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                },
                {
                    title: 'Noteworthy technology acquisitions 2021',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12 Agustus 2023',
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                },
                {
                    title: 'Noteworthy technology acquisitions 2021',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12 Agustus 2023',
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                },
            ]
        }
    },
    components: {
        PencilSquareIcon, TrashIcon
    },
    async mounted() {
        try {
            await this.ARetrievePrograms().then(() => {
                console.log('Berhasil Get')
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Programs: 'getARetrievePrograms',
        })
    },
    methods: {
        ...mapActions({
            ARetrievePrograms: 'ARetrievePrograms',
        })
    }
}
</script>

<template>
    <div class="admin-program-list">
        <div v-if="Programs == null" class="relative items-center block w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md animate__animated animate__fadeIn">            
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
        <div v-else v-for="(item, index) in Programs" :key="index" class="content mt-5 animate__animated animate__fadeIn animate__faster">

            <div class="program-list">
                <router-link :to="'program/read/'+item.slug" class="flex justify-between bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg flex-row w-full hover:bg-gray-100">
                    <!-- <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="item.imageUrl" alt=""> -->
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="http://127.0.0.1:8000/slide/images/foto-1.jpg" alt="">
                    <div class="p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ item.title }}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ item.description }}</p>
                        <h3 class="text-md">{{ item.date }}</h3>
                    </div>
                    <div class="flex flex-col justify-center text-gray-700">
                        <div class="edit"><PencilSquareIcon class="w-8 h-8 text-blue-500"/></div>
                        <div class="delete mt-2"><TrashIcon class="w-8 h-8 text-red-500"/></div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>