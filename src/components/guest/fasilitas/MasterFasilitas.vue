<script>
import FasilitasList from "./FasilitasList.vue";
import ReadFasilitas from "./ReadFasilitas.vue";

export default {
    name: 'Master-fasilitas',
    data() {
        return {
            titlePage: this.$route.params.fasilitas ?  this.$route.params.fasilitas: 'Mega Fasilitas',
            animationBreadcrumb: 'h-32 lg:h-56',
            animationTitleFasilitas: 'pt-[5%] lg:pt-16',
            animationContentFasilitas: 'mt-40 lg:mt-64',
        }
    },
    created () {
        if (window.scrollY > 72) {
            this.animationBreadcrumb = 'h-24 lg:h-56'
            this.animationTitleFasilitas = 'pt-0'
            this.animationContentFasilitas = 'mt-24 lg:mt-30'
        }

        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('scroll', this.changeTitlePage);
    },
    unmounted () {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('scroll', this.changeTitlePage);
    },
    methods: {
        handleScroll () {
            if (window.scrollY > 72) {
                this.animationBreadcrumb = 'h-24 lg:h-26'
                this.animationTitleFasilitas = 'pt-[0%]'
                this.animationContentFasilitas = 'mt-24 lg:mt-56'
            } else {
                this.animationBreadcrumb = 'h-32 lg:h-56'
                this.animationTitleFasilitas = 'pt-[5%] lg:pt-16'
                this.animationContentFasilitas = 'mt-40 lg:mt-64'
            }
        },
        changeTitlePage() {
            const A = document.getElementById('fasilitas-mega')
            // const B = document.getElementById('test-b')
            if (A) {
                if (window.scrollY < A.offsetTop+A.offsetHeight-120) {
                    this.titlePage = this.$route.params.fasilitas ?  this.$route.params.fasilitas: 'Mega Fasilitas'
                } else {
                    if (!this.$route.params.fasilitas) {
                        this.titlePage = 'List of Fasilitas'
                    }
                    
                }
            }
        },
        dynamicComponentFasilitas(data) {
            switch (data) {
                case 'ReadFasilitas':
                    return ReadFasilitas;
            
                default:
                    return FasilitasList;
            }
        }
    }
}
</script>

<template>
    <div class="master-fasilitas">
        <div :class="animationBreadcrumb" class="fixed top-[72px] pt-4 pl-4 z-10 w-full bg-yellow-800 rounded-b-xl transition-all duration-500 ease-in-out">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-sm font-medium text-white hover:text-gray-200">
                            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <a href="#" class="ml-1 text-sm font-medium text-white hover:text-gray-300 md:ml-2">Projects</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Flowbite</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <h1 :class="animationTitleFasilitas" class="font-bold text-2xl lg:text-4xl text-white pt-16 transition-all duration-700">
                {{ titlePage }}
            </h1>
        </div>

        <div :class="animationContentFasilitas" class="transition-all duration-700">
            <component :is="dynamicComponentFasilitas(this.$route.name)"></component>
        </div>
    </div>
</template>