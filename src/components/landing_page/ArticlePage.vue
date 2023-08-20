<script>
import moment from "moment";
export default {
    name: 'Article-Page',
    data() {
        return {
            article: [
                {
                    id: 1,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 1,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-2.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 1,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 1,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-4.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
            ]
        }
    },
    methods: {
        filterArticleDescription(data) {
            return data.substring(0, 100) + '...'
        },
        filterArticleTitle(data) {
            return data.substring(0, 40) + '...'
        },
        formateDateArticle(data) {
            return moment(data).format('LL')
        }
    }
}
</script>

<template>
    <div class="article-page">
        <h1 class="pt-[120px] pb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-8 decoration-red-700">
            Update Artikel Terbaru
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-8 px-10 container justify-items-center m-auto">
            <div
                v-for="(item, index) in article"
                :key="index"
                class="max-w-sm h-[85%] bg-gray-100 border border-gray-200 rounded-lg shado shadow-lg"
            >
                <a href="#">
                    <img class="rounded-t-lg h-1/2 object-cover w-full aspect-square hover:scale-100 duration-300 ease-in-out" :src="item.imageUrl" :alt="item.title" />
                </a>
                <div class="p-2">
                    <a href="#">
                        <h5 class="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900">{{ filterArticleTitle(item.title) }}</h5>
                    </a>
                    <p class="font-bold text-gray-900 dark:text-gray-900 text-left mt-[-7px]">{{ formateDateArticle(item.date) }}</p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 text-left">{{ filterArticleDescription(item.description) }}</p>
                    <a href="#" class="inline-flex float-right items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="w-3.5 h-3.5 ml-2 animate__animated animate__headShake animate__infinite animate__slow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        
        <h1 class="mt-[-4%] pl-10 text-left text-2xl font-bold leading-none tracking-tight text-blue-500 underline underline-offset-6 decoration-blue-700">
            <router-link to="/article">Read more article ...</router-link>
        </h1>
    </div>
</template>