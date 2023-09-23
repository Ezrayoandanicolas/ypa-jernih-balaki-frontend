<script>
import { mapGetters, mapActions } from "vuex";
import { PhotoIcon } from '@heroicons/vue/24/solid';

export default {
    name: "Admin-Master-Carousel",
    data() {
        return {
            uploadImage: {
                id: null,
                content_id: '',
                imagePreviewUrl: null,
                imageFile: '',
                imagePreviewProcess: false,
            },
            showModal: false,
        }
    },
    async mounted() {
        try {
            // console.log(this.$route.params.id)
            await this.RetrieveSlide(this.$route.params.id).then(() => {
                // console.log('Berhasil Ambil Data Donasi')
                // this.Donasi.id = res.data.id
                // this.Donasi.title = res.data.title
                // this.Donasi.slug = res.data.slug
                // this.Donasi.article = res.data.article
                // this.Donasi.description = res.data.description
                // this.Donasi.image_id = res.data.image_id
                // this.Donasi.target_donasi = res.data.target_donasi
                // this.Donasi.date_start = res.data.date_start
                // this.Donasi.date_end = res.data.date_end
                // this.Donasi.category_id = res.data.category_id
                // this.Donasi.visibility = res.data.visibility

                // this.uploadImage.imagePreviewProcess = true
                // this.uploadImage.content_id = res.data.images.content_id
                // this.uploadImage.imagePreviewUrl = res.data.images.imageUrl
                // this.uploadImage.id = res.data.images.id

                // this.updateDonasiButton = true
            }).catch(() => {
                console.log('Error Mengambil Data Donasi')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Slide: 'getSlide',
        })
    },
    methods: {
        ...mapActions({
            RetrieveSlide: 'retrieveSlide',
        }),
        selectImage(event) {
            this.uploadImage.imageFile = event.target.files[0]

            let input = this.$refs.fileUploadMini
            let file = input.files
            if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {

                const data = new FormData();
                    data.append('imageUpload', this.uploadImage.imageFile);

                const query = {
                    data: data,
                }

                this.$store.dispatch('storeImageSlide', query).then(() => {
                    this.uploadImage.imagePreviewUrl = e.target.result
                    this.uploadImage.imagePreviewProcess = true

                    this.$swal.fire({
                        text: 'Berhasil Update Slide!',
                        icon: 'success',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }).catch(() => {
                    this.$swal.fire({
                        text: 'Gagal Update Slide!',
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
        destroySlide(data) {
            this.$swal.fire({
                title: 'Are you sure? ',
                text: "Apakah kamu ingin menghapus Slide ini?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$store.dispatch('deleteSlide', data).then(() => {
                            this.$swal.fire({
                                    text: 'Berhasil Delete Slide!',
                                    icon: 'success',
                                    position: 'bottom-right',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                        }).catch(() => {
                            this.$swal.fire({
                                    text: 'Gagal Delete Slide!',
                                    icon: 'Error',
                                    position: 'bottom-right',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                        })
                    }
                })
        },
        toggleModal() {
            this.showModal = !this.showModal
        }
    },
    components: {
        PhotoIcon
    }
}
</script>

<template>
    <div class="w-full py-4 px-4 mt-3 text-left bg-white border border-gray-200 rounded-lg shadow">
        <div class="container px-6 mx-auto grid">
            <div class="flex justify-between items-center w-full">
                <h2 class="my-6 text-2xl font-semibold text-gray-700 animate__animated animate__fadeIn">
                    Carousel
                </h2>
                <div class="button">
                    <button @click="toggleModal" class="rounded-lg bg-blue-500 text-white px-5 py-2">New Slide</button>
                </div>
            </div>
            <hr />
        </div>
        <!-- Main modal -->
        <div v-if="showModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="flex items-center justify-center h-screen">
                <div class="relative w-full max-w-2xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow">
                        <!-- Modal header -->
                        <div class="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 class="text-xl font-semibold text-gray-900 ">
                                Upload New Image
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " @click="toggleModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-6 space-y-6">
                            <div class="relative z-0 w-full h-full mb-6 group">
                                <label for="cover-photo" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Slide (Upload on Select)</label>
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
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="grid max-md:grid-cols-5 grid-cols-5 gap-2 mt-4">
            <div v-for="(items, index) in Slide" :key="index" class="h-24 w-full">
                <img @click="destroySlide(items)" class="h-full w-full rounded-lg" :src="items.value" alt="">
            </div>
        </div>
    </div>
</template>