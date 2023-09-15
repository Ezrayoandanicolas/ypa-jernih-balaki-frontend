<script>
import DonasiList from '@/components/admin/donasi/DonasiList.vue';
import ReadDonasi from '@/components/admin/donasi/ReadDonasi.vue';
import ActionsDonasi from '@/components/admin/donasi/ActionsDonasi.vue';
export default {
    name: "Admin-Master-Donasi",
    data() {
        return {
            title: null,
        }
    },
    methods: {
        dynamicComponentDonasi(data) {
            switch (data) {
                case 'read':
                    this.title = 'Read Donasi'
                    return ReadDonasi;
                case 'create':
                case 'update':
                    this.title = data == 'create' ?  'Create Donasi' : 'Update Donasi'
                    return ActionsDonasi;
            
                default:
                    this.title = 'Donasi List'
                    return DonasiList;
            }
        },
        changeTitle(data) {
            this.title = this.title + ' : ' + data
        }
    },
}
</script>

<template>
    <div class="w-full py-4 px-4 mt-3 text-left bg-white border border-gray-200 rounded-lg shadow">
        <div class="container px-6 mx-auto grid">
            <div class="flex justify-between items-center w-full">
                <h2 class="my-6 text-2xl font-semibold text-gray-700 animate__animated animate__fadeIn">
                    {{ title }}
                </h2>
                <div class="button">
                    <router-link v-if="this.$route.name == 'AdminMasterDonasi'" to="/admin/donasi/create">
                        <button class="rounded-lg bg-blue-500 text-white px-5 py-2">New Donasi</button>
                    </router-link>
                    <router-link v-if="this.$route.name != 'AdminMasterDonasi'" to="/admin/donasi">
                        <button class="rounded-lg bg-blue-500 text-white px-5 py-2 ml-2">Back To Donasi</button>
                    </router-link>
                </div>
            </div>
            <hr />
            <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster" mode="out-in">
                <component 
                @TitleReadDonasi="changeTitle($event)"
                :is="dynamicComponentDonasi(this.$route.params.actions ? this.$route.params.actions : this.$route.name == 'MasterDonasiReads' ? 'read' : this.$route.name == 'MasterDonasiUpdates' ? 'update' : null)"
                ></component>
            </transition>
        </div>
    </div>
</template>