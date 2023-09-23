<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import { Tab, initTE, } from "tw-elements";

initTE({ Tab });

export default {
    name: 'Read-Donasi',
    data() {
        return {
            showModal: false,
            openTab: 0,
            form: {
                name: '',
                nominal: '',
                donasi_article_id: '',
                payment_id: '',
            }
        }
    },
    async mounted() {
        try {
            await this.AReadDonasiGuest(this.$route.params.donasi).then(() => {
                this.$emit('TitleReadArticle', this.Donasi.title)
                this.form.donasi_article_id = this.Donasi.id
            }).catch(() => {
                console.log('Error Ges')
            })

            await this.retrievePaymentBank(this.$route.params.donasi).then(() => {
                console.log('Success Retrieve PaymentBank')
            }).catch(() => {
                console.log('Error Get PaymentBank')
            })
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        ...mapGetters({
            Donasi: 'getAReadDonasi',
            PaymentBank : 'getPaymentBank',
        })
    },
    methods: {
        ...mapActions({
            AReadDonasiGuest: 'AReadDonasiGuest',
            retrievePaymentBank: 'retrievePaymentBank',
        }),
        filterDonasiDescription(data) {
            return data.substring(0, 100) + '...'
        },
        filterDonasiTitle(data) {
            return data.substring(0, 40) + '...'
        },
        formatDateDonasi(data) {
            return moment(data).format('LL')
        },
        formatCurrencyID(data) {
            return "Rp " + data.toString().replace(/(\d)(?=(\d{3})+(?:\\.\d+)?$)/g, "$1.")
        },
        numberDecimal(data) {
            return data.toFixed(0)
        },
        toggleModal() {
            this.showModal = !this.showModal
        },
        toggleTabs(tabNumber){
            this.openTab = tabNumber
        },
        storeForm() {
            this.$store.dispatch('storeLogDonasiGuest', this.form).then(() => {
                this.$swal.fire({
                        text: 'Berhasil Buat Form!',
                        icon: 'success',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
                
                    this.showModal = !this.showModal
                    // this.form.name = ''
                    // this.form.nominal = ''
                    // this.form.payment_id = ''
            }).catch(() => {
                this.$swal.fire({
                        text: 'Gagal Buat Form!',
                        icon: 'Error',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
            })
        }
    }
}
</script>

<template>
    <div v-if="Donasi != null" class="read-donasi relative max-sm:px-5">
        <div class="container mx-auto w-full md:w-2/3">
            <div class="thumbnail m-5">
                <div class="image-thumbnail">
                    <img class="object-cover w-full h-[250px] md:h-[500px] shadow-md rounded-lg" :src="Donasi.images.imageUrl" alt="thumbnail">
                </div>
            </div>
            <div class="detail-article">
                <h1 id="title-article" class="font-bold px-5 pt-5 text-2xl lg:text-4xl">{{ Donasi.title }}</h1>
                <div class="flex justify-between items-center">
                    <button @click="toggleModal" class="bg-blue-500 rounded-lg text-white px-4 py-2">Donasi</button>
                    <h3 id="date-article" class="font-normal px-5 pt-5 text-md lg:text-lg">{{ formatDateDonasi(Donasi.created_at) }}</h3>
                </div>
            </div>
            <div class="progress-bar mt-5">
                <div class="flex justify-between mb-1">
                    <span class="text-base font-medium text-gray-900">Target Donasi</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatCurrencyID(Donasi.target_donasi) }}</span>
                </div>
                <div class="w-full bg-red-200 rounded-full h-2.5 ">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="'width: '+numberDecimal(Donasi.result_donasi/Donasi.target_donasi*100 > 100 ? 100 : Donasi.result_donasi/Donasi.target_donasi*100)+'%'"></div>
                </div>
                <div class="flex justify-between mb-1">
                    <span class="text-base font-medium text-gray-900">{{ formatCurrencyID(Donasi.result_donasi) }} (Terkumpul)</span>
                    <span class="text-sm font-medium text-gray-900">{{ numberDecimal(Donasi.result_donasi/Donasi.target_donasi*100)+'%' }}</span>
                </div>
            </div>
            <div class="inline-flex justify-between mb-1 rounded-lg bg-red-500 text-white px-4 py-1">
                <span class="text-sm font-medium">Batas Waktu : &nbsp;</span>
                <span class="text-sm font-medium">{{ formatDateDonasi(Donasi.date_end) }}</span>
            </div>
            <div class="content px-5 pt-5 text-left text-md leading-7">
                    <h3 class="font-bold text-lg">{{ Donasi.title }}</h3>
                    <p v-html="Donasi.article"></p>
            </div>
            <div class="social-media my-5 pl-5">
                <h1 class="font-bold">Share to : </h1>
                <div class="flex mt-4 space-x-5 justify-center">
                    <a href="#" class="text-gray-500 hover:text-blue-500">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="sr-only">Facebook page</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span class="sr-only">Discord community</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-blue-500 ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                            <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="sr-only">Twitter page</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-gray-900">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="sr-only">GitHub account</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-pink-500 ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="sr-only">Dribbble account</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Main modal -->
    <div v-if="showModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed backdrop-blur-sm top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="flex items-center justify-center h-screen">
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900 ">
                            Form Donasi
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
                        <form class="w-full max-w-lg m-auto">
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-name">
                                        Masukkan Nama / Anonim
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="form-name" type="text" v-model="form.name" placeholder="Jane">
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                    </div>
                                    <div class="w-full md:w-1/2 px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nominal">
                                        Nominal
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nominal" type="number" v-model="form.nominal" :placeholder="formatCurrencyID(20000)">
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-2">
                                    
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="payment-bank">
                                            Pilih BANK
                                        </label>
                                        <div class="relative">
                                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="payment-bank" v-model="form.payment_id">
                                                <option v-for="(items, index) in PaymentBank" v-on:click="toggleTabs(index)" :key="index" :value="items.id">{{ items.bank }}</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        
                        <div class="flex flex-wrap">
                            <div class="w-full">
                                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                                    <li v-for="(item, index) in PaymentBank" :key="index" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(index)" v-bind:class="{'text-pink-600 bg-white': openTab !== index, 'text-white bg-pink-600': openTab === index}">
                                        {{ item.bank }}
                                    </a>
                                    </li>
                                </ul>
                                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                    <div class="px-4 py-5 flex-auto">
                                        <div class="tab-content tab-space">
                                            <div v-for="(item, index) in PaymentBank" :key="index" v-bind:class="{'hidden': openTab !== index, 'block': openTab === index}">
                                                <h1 class="font-bold text-2xl">Cara Pembayaran</h1>
                                                <p class="text-left">
                                                    * Login M-Banking/Internet Banking/ATM <br/>
                                                    * Masukkan Nomor Rekening Tujuan <br/>
                                                    <span class="font-bold ml-4">
                                                        Account Name : {{ item.name }} <br/>
                                                    </span>
                                                    <span class="font-bold ml-4">
                                                        Account Bank : {{ item.bank }} <br/>
                                                    </span>
                                                    <span class="font-bold ml-4">
                                                        Account Number : {{ item.card_number }} <br/>
                                                    </span>
                                                    * Masukkan Nominal yang ingin di Donasikan <br/>
                                                    * Pastikan kembali Nomor Rekening & Nama Tujuan Donasi <br/>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full text-right">
                            <button @click="storeForm" class="ml-auto text-white bg-blue-500 px-4 py-2 rounded-lg">Donasi</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>