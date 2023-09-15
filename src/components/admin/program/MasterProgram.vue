<script>
import ProgramList from '@/components/admin/program/ProgramList.vue';
import ReadProgram from '@/components/admin/program/ReadProgram.vue';
import ActionsProgram from '@/components/admin/program/ActionsProgram.vue';
export default {
    name: "Admin-Master-Program",
    data() {
        return {
            title: null,
        }
    },
    methods: {
        dynamicComponentProgram(data) {
            switch (data) {
                case 'read':
                    this.title = 'Read Program'
                    return ReadProgram;
                case 'create':
                case 'update':
                    this.title = data == 'create' ?  'Create Program' : 'Update Program'
                    return ActionsProgram;
            
                default:
                    this.title = 'Program List'
                    return ProgramList;
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
                    <router-link v-if="this.$route.name == 'AdminMasterProgram'" to="/admin/program/create">
                        <button class="rounded-lg bg-blue-500 text-white px-5 py-2">New Program</button>
                    </router-link>
                    <router-link v-if="this.$route.name != 'AdminMasterProgram'" to="/admin/program">
                        <button class="rounded-lg bg-blue-500 text-white px-5 py-2 ml-2">Back To Program</button>
                    </router-link>
                </div>
            </div>
            <hr />
            <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster" mode="out-in">
                <component 
                @TitleReadProgram="changeTitle($event)"
                :is="dynamicComponentProgram(this.$route.params.actions ? this.$route.params.actions : this.$route.name == 'MasterProgramReads' ? 'read' : this.$route.name == 'MasterProgramUpdates' ? 'update' : null)"
                ></component>
            </transition>
        </div>
    </div>
</template>