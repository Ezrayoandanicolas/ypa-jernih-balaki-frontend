<script>
import moment from "moment";
export default {
    name: 'Fasilitas-List',
    data() {
        return {
            fasilitas: [
                {
                    id: 1,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 2,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-2.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 3,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 4,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-4.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 5,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 6,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-2.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 7,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 8,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-4.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 9,
                    imageUrl: 'http://127.0.0.1:8000/slide/images/foto-1.jpg',
                    title: 'Berbagi Kebahagiaan Bersama Brand Terkemuka',
                    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
                    date: '12-08-2023',
                    url : '#',
                },
                {
                    id: 10,
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
        filterFasilitasDescription(data) {
            return data.substring(0, 100) + '...'
        },
        filterFasilitasTitle(data) {
            return data.substring(0, 40) + '...'
        },
        formateDateFasilitas(data) {
            return moment(data).format('LL')
        }
    }
}
</script>

<template>
    <div class="fasilitas-list">
        <div id="fasilitas-mega" class="large-fasilitas m-5">
            <div class="grid grid-rows-3 md:grid-rows-2 md:grid-flow-col gap-5 h-[750px] md:h-[500px]">
                <div class="relative col-span-1 md:row-span-2 md:col-span-2 shadow-md h-full">
                    <img class="object-cover rounded-lg w-full h-full" src="http://127.0.0.1:8000/slide/images/foto-1.jpg">
                    <div class="group absolute rounded-lg hover:bg-opacity-25 hover:bg-gray-900 w-full h-full top-0 transition-all duration-300 ease-in-out">
                        <div class="absolute rounded-lg bottom-0 bg-opacity-95 bg-yellow-900 w-full h-[15%]">
                            <div class="grid grid-flow-col justify-stretch">
                                <h1 class="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold pl-1 pt-2 md:pt-5">Berbagi Kebahagiaan Bersama Brand ...</h1>
                                <h2 class="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold pl-1 pt-2 md:pt-5">14 Agustus 2023</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative col-span-1 shadow-md h-full">
                    <img class="object-cover rounded-lg w-full h-full" src="http://127.0.0.1:8000/slide/images/foto-2.jpg">
                    <div class="group absolute rounded-lg hover:bg-opacity-25 hover:bg-gray-900 w-full h-full top-0 transition-all duration-300 ease-in-out">
                        <div class="absolute rounded-b-lg bottom-0 bg-opacity-95 bg-yellow-900 w-full h-[15%] transition-all duration-300 ease-in-out">
                            <div class="grid grid-flow-col justify-stretch md:-ml-4 md:mr-4">
                                <h1 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">Berbagi Kebahagiaan Bersama Brand ...</h1>
                                <h2 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">14 Agustus 2023</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative col-span-1 shadow-md h-full">
                    <img class="object-cover rounded-lg w-full h-full" src="http://127.0.0.1:8000/slide/images/foto-3.jpg">
                    <div class="group absolute rounded-lg hover:bg-opacity-25 hover:bg-gray-900 w-full h-full top-0 transition-all duration-300 ease-in-out">
                        <div class="absolute rounded-b-lg bottom-0 bg-opacity-95 bg-yellow-900 w-full h-[15%] transition-all duration-300 ease-in-out">
                            <div class="grid grid-flow-col justify-stretch md:-ml-4 md:mr-4">
                                <h1 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">Berbagi Kebahagiaan Bersama Brand ...</h1>
                                <h2 class="text-white text-xs sm:text-sm md:text-xs lg:text-md font-bold pl-1 pt-2 lg:pt-3">14 Agustus 2023</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="title-list-of-fasilitas">
            <h1 class="text-left pl-10 lg:pt-5 font-bold text-2xl underline underline-offset-4">List of Fasilitas</h1>
        </div>
        <div id="list-of-fasilitas" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-8 px-10 container justify-items-center m-auto">
            <div
                v-for="(item, index) in fasilitas"
                :key="index"
                class="max-w-sm h-[85%] bg-gray-100 border border-gray-200 rounded-lg shado shadow-lg"
            >
                <a href="#">
                    <img class="rounded-t-lg h-1/2 object-cover w-full aspect-square hover:scale-100 duration-300 ease-in-out" :src="item.imageUrl" :alt="item.title" />
                </a>
                <div class="p-2">
                    <a href="#">
                        <h5 class="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900">{{ filterFasilitasTitle(item.title) }}</h5>
                    </a>
                    <p class="font-bold text-gray-900 dark:text-gray-900 text-left mt-[-7px]">{{ formateDateFasilitas(item.date) }}</p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 text-left">{{ filterFasilitasDescription(item.description) }}</p>
                    <a href="#" class="inline-flex float-right items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
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