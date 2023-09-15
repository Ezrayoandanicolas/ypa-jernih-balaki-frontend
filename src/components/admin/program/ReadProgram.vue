<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'Admin-Read-Program',
    async mounted() {
        try {
            await this.AReadProgram(this.$route.params.slug).then(() => {
                this.$emit('TitleReadProgram', this.Program.title)
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Program: 'getAReadProgram',
        })
    },
    methods: {
        ...mapActions({
            AReadProgram: 'AReadProgram',
        }),
        formateDateProgram(data) {
            return moment(data).format('LL')
        }
    }
}
</script>

<template>
    <div class="admin-read-program">
        <div v-if="Program == null" class="relative container items-center block w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md animate__animated animate__fadeIn">            
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
                    <img class="object-cover w-full h-[250px] md:h-[500px] shadow-md rounded-lg" :src="Program.images.imageUrl" alt="thumbnail">
                </div>
            </div>
            <div class="detail-program">
                <h1 id="title-program" class="font-bold px-5 pt-5 text-2xl lg:text-4xl">{{ Program.title }}</h1>
                <h3 id="date-program" class="font-normal text-right px-5 pt-5 text-md lg:text-lg">{{ formateDateProgram(Program.created_at) }}</h3>
            </div>
            <div class="content px-5 pt-5 text-left text-md leading-7">
                    <p v-html="Program.article"></p>
            </div>
        </div>
    </div>
</template>