<script>
import ArticleList from '@/components/admin/article/ArticleList.vue';
import ReadArticle from '@/components/admin/article/ReadArticle.vue';
import ActionsArticle from '@/components/admin/article/ActionsArticle.vue';
export default {
    name: "Admin-Master-Article",
    data() {
        return {
            title: null,
        }
    },
    methods: {
        dynamicComponentArticle(data) {
            switch (data) {
                case 'read':
                    this.title = 'Read Article'
                    return ReadArticle;
                case 'create':
                case 'update':
                    this.title = data == 'create' ?  'Create Article' : 'Update Article'
                    return ActionsArticle;
            
                default:
                    this.title = 'Article List'
                    return ArticleList;
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
                <router-link v-if="this.$route.name == 'AdminMasterArticle'" to="/admin/article/create">
                    <button class="rounded-lg bg-blue-500 text-white px-5 py-2">New Article</button>
                </router-link>
            </div>
            <hr />
            <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster" mode="out-in">
                <component 
                @TitleReadArticle="changeTitle($event)"
                :is="dynamicComponentArticle(this.$route.params.actions ? this.$route.params.actions : this.$route.name == 'MasterArticleReads' ? 'read' : null)"
                ></component>
            </transition>
        </div>
    </div>
</template>