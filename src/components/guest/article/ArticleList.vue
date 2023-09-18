<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'Article-List',
    data() {
        return {
            Article: null,
        }
    },
    async mounted() {
        try {
            await this.ARetrieveArticleGuest().then((res) => {
                if (res.data.length == 0) {
                    this.Article = null
                } else {
                    this.Article = res.data
                }
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Article: 'getAReadArticle',
        })
    },
    methods: {
        ...mapActions({
            ARetrieveArticleGuest: 'ARetrieveArticlesGuest',
        }),
        filterArticleDescription(data) {
            return data.substring(0, 100) + '...'
        },
        filterArticleTitle(data) {
            return data.substring(0, 35) + '...'
        },
        formateDateArticle(data) {
            return moment(data).format('LL')
        }
    }
}
</script>

<template>
    <div v-if="Article != null" class="article-list">
        <div id="article-mega" class="large-article m-5 max-sm:hidden">
            <div class="grid grid-rows-3 md:grid-rows-2 md:grid-flow-col gap-5 h-[750px] md:h-[500px]">
                <div v-if="Article[0] != null" class="relative col-span-1 md:row-span-2 md:col-span-2 shadow-md h-full">
                    <img class="object-cover rounded-lg w-full h-full" :src="Article[0]['images']['imageUrl']">
                    <div class="group absolute rounded-lg hover:bg-opacity-25 hover:bg-gray-900 w-full h-full top-0 transition-all duration-300 ease-in-out">
                        <div class="absolute rounded-lg bottom-0 bg-opacity-95 bg-blue-900 w-full h-[15%]">
                            <div class="grid grid-flow-col justify-stretch">
                                <h1 class="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold pl-1 pt-2 md:pt-5">{{ filterArticleTitle(Article[0]['title']) }}</h1>
                                <h2 class="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold pl-1 pt-2 md:pt-5">{{ formateDateArticle(Article[0]['created_at']) }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="Article[1] != null" class="relative col-span-1 shadow-md h-full">
                    <img class="object-cover rounded-lg w-full h-full" :src="Article[1]['images']['imageUrl']">
                    <div class="group absolute rounded-lg hover:bg-opacity-25 hover:bg-gray-900 w-full h-full top-0 transition-all duration-300 ease-in-out">
                        <div class="absolute rounded-b-lg bottom-0 bg-opacity-95 bg-blue-900 w-full h-[15%] transition-all duration-300 ease-in-out">
                            <div class="grid grid-flow-col justify-stretch md:-ml-4 md:mr-4">
                                <h1 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">{{ filterArticleTitle(Article[1]['title']) }}</h1>
                                <h2 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">{{ formateDateArticle(Article[1]['created_at']) }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="Article[2] != null" class="relative col-span-1 shadow-md h-full">
                    <img class="object-cover rounded-lg w-full h-full" :src="Article[2]['images']['imageUrl']">
                    <div class="group absolute rounded-lg hover:bg-opacity-25 hover:bg-gray-900 w-full h-full top-0 transition-all duration-300 ease-in-out">
                        <div class="absolute rounded-b-lg bottom-0 bg-opacity-95 bg-blue-900 w-full h-[15%] transition-all duration-300 ease-in-out">
                            <div class="grid grid-flow-col justify-stretch md:-ml-4 md:mr-4">
                                <h1 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">{{ filterArticleTitle(Article[2]['title']) }}</h1>
                                <h2 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">{{ formateDateArticle(Article[2]['created_at']) }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="title-list-of-article">
            <h1 class="text-left pl-10 lg:pt-5 font-bold text-2xl underline underline-offset-4">List of Article</h1>
        </div>
        <div id="list-of-articles" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-8 px-10 container justify-items-center m-auto">
            <div
                v-for="(item, index) in Article"
                :key="index"
                class="max-w-sm h-full h-[85%] bg-gray-100 border border-gray-200 rounded-lg shado shadow-lg"
            >
                <a :href="'article/read/'+item.slug">
                    <img class="rounded-t-lg h-1/2 object-cover w-full aspect-square hover:scale-100 duration-300 ease-in-out" :src="item.images.imageUrl" :alt="item.title" />
                </a>
                <div class="p-2">
                    <a :href="'article/read/'+item.slug">
                        <h5 class="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900">{{ filterArticleTitle(item.title) }}</h5>
                    </a>
                    <p class="font-bold text-gray-900 dark:text-gray-900 text-left mt-[-7px]">{{ formateDateArticle(item.date) }}</p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 text-left">{{ filterArticleDescription(item.article) }}</p>
                    <a :href="'article/read/'+item.slug" class="inline-flex float-right items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="w-3.5 h-3.5 ml-2 animate__animated animate__headShake animate__infinite animate__slow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>