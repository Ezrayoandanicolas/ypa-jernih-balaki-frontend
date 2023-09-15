<script>
import { mapActions } from "vuex";
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
export default {
    name: 'Admin-Article-List',
    data() {
        return {
            donasiArticle: [
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
            DonasiArticle: null
        }
    },
    components: {
        PencilSquareIcon, TrashIcon
    },
    async mounted() {
        try {
            await this.ARetrieveDonasi().then((res) => {
                if (res.data.length == 0) {
                    this.DonasiArticle = null
                } else {
                    this.DonasiArticle = res.data
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
            ARetrieveDonasi: 'ARetrieveDonasi',
        }),
        deleteDonasi(data) {
            this.$swal.fire({
                title: 'Are you sure? ',
                text: "Delete Donasi "+data.title+"?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$store.dispatch('ADeleteDonasi', data.id).then(() => {
                            this.$swal.fire({
                                text: 'Berhasil Delete Donasi!',
                                icon: 'success',
                                position: 'bottom-right',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }).catch(() => {
                            this.$swal.fire({
                                text: 'Gagal Delete Donasi!',
                                icon: 'Error',
                                position: 'bottom-right',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                    }
                })
        }
    }
}
</script>

<template>
    <div class="admin-donasi-list">
        <div v-if="DonasiArticle == null" class="relative items-center block w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md animate__animated animate__fadeIn">            
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
        <div v-else v-for="(item, index) in DonasiArticle" :key="index" class="content mt-5 animate__animated animate__fadeIn animate__faster">

            <div class="donasi-list">
                <div class="flex m-auto bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg flex-row w-2/3 hover:bg-gray-100">
                    <!-- <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="item.imageUrl" alt=""> -->
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="item.images.imageUrl" alt="">
                    <div class="flex flex-col p-4 leading-normal">
                        <router-link :to="'donasi/read/'+item.slug">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ item.title }}</h5>
                            <button :class="item.visibility == 1 ? 'bg-blue-500' : 'bg-red-500'" class="py-1 px-2 mb-2 rounded-lg">
                                <h5 class="text-md text-white font-bold tracking-tight text-gray-900">{{ item.visibility == 1 ? 'Publish' : 'Draft' }}</h5>
                            </button>
                        </router-link>
                        <h3 class="text-md">{{ item.created_at }}</h3>
                        <div class="flex justify-start text-gray-700">
                            <div class="edit">
                                <router-link :to="'donasi/update/'+item.id">
                                    <PencilSquareIcon class="w-6 h-6 text-blue-500"/>
                                </router-link>
                            </div>
                            <div @click="deleteDonasi(item)" class="delete"><TrashIcon class="w-6 h-6 text-red-500"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>