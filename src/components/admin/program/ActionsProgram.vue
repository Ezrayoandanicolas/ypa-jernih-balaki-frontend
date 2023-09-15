<script>
import { mapGetters, mapActions } from "vuex";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PhotoIcon } from '@heroicons/vue/24/solid';

export default {
    name: 'Admin-Program-Actions',
    data() {
        return {
            editor: ClassicEditor,
            editorData: 'Tulis Program.',
            editorConfig: {
                // 
            },
            uploadImage: {
                id: null,
                content_id: '',
                imagePreviewUrl: null,
                imageFile: '',
                imagePreviewProcess: false,
            },
            Program: {
                id: '',
                title: '',
                slug: '',
                article: '',
                description: '',
                image_id: '',
                category_id: '',
                visibility: '',
            },
            updateProgramButton: false
        }
    },
    async mounted() {
        try {
            // console.log(this.$route.params.id)
            await this.RetrieveEditProgram(this.$route.params.id).then((res) => {
                console.log('Berhasil Ambil Data Program')
                this.Program.id = res.data.id
                this.Program.title = res.data.title
                this.Program.slug = res.data.slug
                this.Program.article = res.data.article
                this.Program.description = res.data.description
                this.Program.image_id = res.data.image_id
                this.Program.category_id = res.data.category_id
                this.Program.visibility = res.data.visibility

                this.uploadImage.imagePreviewProcess = true
                this.uploadImage.content_id = res.data.images.content_id
                this.uploadImage.imagePreviewUrl = res.data.images.imageUrl
                this.uploadImage.id = res.data.images.id

                this.updateProgramButton = true
            }).catch(() => {
                console.log('Error Mengambil Data Program')
            })

            await this.RetrieveCategory().then(() => {
                console.log('Berhasil Ambil Data Category')
            }).catch(() => {
                console.log('Error Mengambil Data Category')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Category: 'getCategory',
            EditProgram: 'getARetrievePrograms',
        })
    },
    methods: {
        ...mapActions({
            RetrieveCategory: 'retrieveCategory',
            RetrieveEditProgram: 'AEditPrograms'
        }),

        selectImage(event) {
            this.uploadImage.imageFile = event.target.files[0]

            let input = this.$refs.fileUploadMini
            let file = input.files
            if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {

                const data = new FormData();
                    data.append('id', this.uploadImage.id);
                    data.append('content_id', this.uploadImage.content_id);
                    data.append('imageUpload', this.uploadImage.imageFile);

                const query = {
                    data: data,
                }

                this.$store.dispatch('storeImage', query).then((res) => {
                    this.uploadImage.imagePreviewUrl = e.target.result
                    this.uploadImage.imagePreviewProcess = true
                    this.uploadImage.id = res.data.id
                    this.Program.image_id = res.data.id

                    this.$swal.fire({
                        text: 'Berhasil Update Thumbnail!',
                        icon: 'success',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }).catch(() => {
                    this.$swal.fire({
                        text: 'Gagal Update Thumbnail!',
                        icon: 'Error',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })

            }
            reader.readAsDataURL(file[0])
            }
        },
        generateSlug(str) {
            this.Program.slug = str.replaceAll(' ', '-');
        },
        saveProgram(visible) {
            this.Program.visibility = visible
            this.$store.dispatch('AStorePrograms', this.Program).then(() => {
                this.$swal.fire({
                    text: 'Berhasil Tambah Program!',
                    icon: 'success',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
                return window.location.href = '/admin/program'
            }).catch(() => {
                this.$swal.fire({
                    text: 'Gagal Tambah Program!',
                    icon: 'Error',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        },
        updateProgram() {
            this.Program.visibility = 1
            this.$store.dispatch('AUpdatePrograms', this.Program).then(() => {
                this.$swal.fire({
                    text: 'Berhasil Update Program!',
                    icon: 'success',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
                return window.location.href = '/admin/program'
            }).catch(() => {
                this.$swal.fire({
                    text: 'Gagal Update Program!',
                    icon: 'Error',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        },
    },
    components: {
        PhotoIcon
    }
}
</script>

<template>
    <div class="admin-program-actions">
        <div class="container mt-4">
            <form class="w-full">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-title-program">
                        Title Program
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title-program" type="text" v-model="Program.title" @keyup="generateSlug(Program.title)" placeholder="Title Program">
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-slug">
                            Slug Program
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-slug" type="text" v-model="Program.slug" placeholder="Slug">
                    </div>
                </div>
                <div class="relative z-0 w-full h-full mb-6 group">
                    <label for="cover-photo" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Thumbnail (Upload on Select)</label>
                    <div id="cover-photo" class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div class="text-center">
                        <PhotoIcon v-if="!uploadImage.imagePreviewUrl" class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <!-- {{ LogoMini.imageUrl }} -->
                        <!-- <img v-if="!uploadImage.imagePreviewUrl" class="imagePreview w-40 h-40" :src="LogoMini.imageUrl" /> -->
                        <img v-else class="imagePreview w-full" :hidden="!uploadImage.imagePreviewProcess" :src="uploadImage.imagePreviewUrl" />

                            <div class="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                                <label for="file-upload-mini" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>{{ uploadImage.imageFile ? "Change a Photo" : "Upload a Photo" }}</span>
                                <input id="file-upload-mini" name="file-upload-mini" type="file" class="sr-only" ref="fileUploadMini" @input="selectImage"/>
                                </label>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG Max 2MB</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="flex justify-between items-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            <div>Category</div>
                            <div>
                                <button class="rounded-lg bg-blue-500 text-white px-4 py-2">
                                    Add
                                </button>
                            </div>
                        </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" v-model="Program.category_id">
                                <option v-for="(items, index) in Category" :key="index" :value="items.id">{{ items.name }}</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2 mt-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-program">
                            Program
                        </label>
                        <ckeditor class="w-full" :editor="editor" v-model="Program.article" :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </form>
            <div v-if="!updateProgramButton" class="mt-5 w-full flex justify-end">
                <button @click="saveProgram(0)" class="bg-red-500 text-white rounded-lg py-2 px-4 mr-5">Draft</button>
                <button @click="saveProgram(1)" class="bg-blue-500 text-white rounded-lg py-2 px-4">Publish</button>
            </div>
            <div v-else class="mt-5 w-full flex justify-end">
                <router-link :to="{ name: 'AdminMasterProgram' }">
                    <button class="bg-red-500 text-white rounded-lg py-2 px-4 mr-5">Cancel</button>
                </router-link>
                <button @click="updateProgram()" class="bg-blue-500 text-white rounded-lg py-2 px-4">Update & Publish</button>
            </div>

        </div>
    </div>
</template>