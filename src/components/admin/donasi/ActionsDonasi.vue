<script>
import { mapGetters, mapActions } from "vuex";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PhotoIcon } from '@heroicons/vue/24/solid';

export default {
    name: 'Admin-Donasi-Actions',
    data() {
        return {
            editor: ClassicEditor,
            editorData: 'Tulis Donasi.',
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
            Donasi: {
                id: '',
                title: '',
                slug: '',
                article: '',
                description: '',
                image_id: '',
                target_donasi: '',
                date_start: '',
                date_end: '',
                category_id: '',
                visibility: '',
            },
            updateDonasiButton: false
        }
    },
    async mounted() {
        try {
            // console.log(this.$route.params.id)
            await this.RetrieveEditDonasi(this.$route.params.id).then((res) => {
                console.log('Berhasil Ambil Data Donasi')
                this.Donasi.id = res.data.id
                this.Donasi.title = res.data.title
                this.Donasi.slug = res.data.slug
                this.Donasi.article = res.data.article
                this.Donasi.description = res.data.description
                this.Donasi.image_id = res.data.image_id
                this.Donasi.target_donasi = res.data.target_donasi
                this.Donasi.date_start = res.data.date_start
                this.Donasi.date_end = res.data.date_end
                this.Donasi.category_id = res.data.category_id
                this.Donasi.visibility = res.data.visibility

                this.uploadImage.imagePreviewProcess = true
                this.uploadImage.content_id = res.data.images.content_id
                this.uploadImage.imagePreviewUrl = res.data.images.imageUrl
                this.uploadImage.id = res.data.images.id

                this.updateDonasiButton = true
            }).catch(() => {
                console.log('Error Mengambil Data Donasi')
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
            EditDonasi: 'getARetrieveDonasi',
        })
    },
    methods: {
        ...mapActions({
            RetrieveCategory: 'retrieveCategory',
            RetrieveEditDonasi: 'AEditDonasi'
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
                    this.Donasi.image_id = res.data.id

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
            this.Donasi.slug = str.replaceAll(' ', '-');
        },
        saveDonasi(visible) {
            this.Donasi.visibility = visible
            this.$store.dispatch('AStoreDonasi', this.Donasi).then(() => {
                this.$swal.fire({
                    text: 'Berhasil Tambah Donasi!',
                    icon: 'success',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
                return window.location.href = '/admin/donasi'
            }).catch(() => {
                this.$swal.fire({
                    text: 'Gagal Tambah Donasi!',
                    icon: 'Error',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        },
        updateDonasi() {
            this.Donasi.visibility = 1
            this.$store.dispatch('AUpdateDonasi', this.Donasi).then(() => {
                this.$swal.fire({
                    text: 'Berhasil Update Donasi!',
                    icon: 'success',
                    position: 'bottom-right',
                    showConfirmButton: false,
                    timer: 1500
                });
                return window.location.href = '/admin/donasi'
            }).catch(() => {
                this.$swal.fire({
                    text: 'Gagal Update Donasi!',
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
    <div class="admin-donasi-actions">
        <div class="container mt-4">
            <form class="w-full">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-title-donasi">
                        Title Donasi
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title-donasi" type="text" v-model="Donasi.title" @keyup="generateSlug(Donasi.title)" placeholder="Title Donasi">
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-slug">
                            Slug Donasi
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-slug" type="text" v-model="Donasi.slug" placeholder="Slug">
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
                        <label class="flex justify-between items-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="donasi-category">
                            <div>Category</div>
                            <div>
                                <button class="rounded-lg bg-blue-500 text-white px-4 py-2">
                                    Add
                                </button>
                            </div>
                        </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="donasi-category" v-model="Donasi.category_id">
                                <option v-for="(items, index) in Category" :key="index" :value="items.id">{{ items.name }}</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="flex justify-between items-center inset-x-0 h-8 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="target-donasi">
                            <div>Target Donasi</div>
                        </label>
                        <div class="relative">
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="target-donasi" type="number" v-model="Donasi.target_donasi" placeholder="Target Donasi">
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date-start">
                        Date Start
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="date-start" type="date" v-model="Donasi.date_start" placeholder="Date Start">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date-end">
                            Date End
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="date-end" type="date" v-model="Donasi.date_end" placeholder="Slug">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2 mt-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-donasi">
                            Donasi
                        </label>
                        <ckeditor class="w-full" :editor="editor" v-model="Donasi.article" :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </form>
            <div v-if="!updateDonasiButton" class="mt-5 w-full flex justify-end">
                <button @click="saveDonasi(0)" class="bg-red-500 text-white rounded-lg py-2 px-4 mr-5">Draft</button>
                <button @click="saveDonasi(1)" class="bg-blue-500 text-white rounded-lg py-2 px-4">Publish</button>
            </div>
            <div v-else class="mt-5 w-full flex justify-end">
                <router-link :to="{ name: 'AdminMasterDonasi' }">
                    <button class="bg-red-500 text-white rounded-lg py-2 px-4 mr-5">Cancel</button>
                </router-link>
                <button @click="updateDonasi()" class="bg-blue-500 text-white rounded-lg py-2 px-4">Update & Publish</button>
            </div>

        </div>
    </div>
</template>