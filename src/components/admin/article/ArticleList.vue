<script>
import { mapActions } from "vuex";
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
export default {
    name: 'Admin-Article-List',
    data() {
        return {
            articles: [
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
            ],
            Articles: null
        }
    },
    components: {
        PencilSquareIcon, TrashIcon
    },
    async mounted() {
        try {
            await this.ARetrieveArticles().then((res) => {
                this.Articles = res.data
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        // ...mapGetters({
        //     Articles: 'getARetrieveArticles',
        // })
    },
    methods: {
        ...mapActions({
            ARetrieveArticles: 'ARetrieveArticles',
        })
    }
}
</script>

<template>
    <div class="admin-article-list">
        <div v-if="Articles == null" class="relative items-center block w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md animate__animated animate__fadeIn">            
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
        <div v-else v-for="(item, index) in Articles" :key="index" class="content mt-5 animate__animated animate__fadeIn animate__faster">

            <div class="article-list">
                <div class="flex m-auto bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg flex-row w-2/3 hover:bg-gray-100">
                    <!-- <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="item.imageUrl" alt=""> -->
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="item.images.imageUrl" alt="">
                    <div class="flex flex-col p-4 leading-normal">
                        <router-link :to="'article/read/'+item.slug">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ item.title }}</h5>
                            <h5 class="w-16 pl-1 mb-2 rounded-lg text-md text-slate-600 font-bold tracking-tight text-gray-900 bg-gray-200">{{ item.visibility == 1 ? 'Publish' : 'Draft' }}</h5>
                        </router-link>
                        <h3 class="text-md">{{ item.created_at }}</h3>
                        <div class="flex justify-start text-gray-700">
                            <div class="edit">
                                <router-link :to="'article/update/'+item.id">
                                    <PencilSquareIcon class="w-6 h-6 text-blue-500"/>
                                </router-link>
                            </div>
                            <div class="delete"><TrashIcon class="w-6 h-6 text-red-500"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>