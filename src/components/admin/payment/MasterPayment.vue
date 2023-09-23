<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
    name: 'Master-payment',
    data() {
        return {
            Payment: null,
            showModal: false,
            edit: false,
            form: {
                id: '',
                bank: '',
                name: '',
                digit: '',
                card_number: '',
            }
        }
    },
    async mounted() {
        try {
            await this.retrievePaymentBank().then((res) => {
                if (res.data.length == 0) {
                    this.Payment = null
                } else {
                    this.Payment = res.data
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
            retrievePaymentBank: 'retrievePaymentBank',
        }),
        formateDateDonasi(data) {
            return moment(data).format('LL')
        },
        formatCurrencyID(data) {
            return "Rp " + data.toString().replace(/(\d)(?=(\d{3})+(?:\\.\d+)?$)/g, "$1.")
        },
        numberDecimal(data) {
            return data.toFixed(0)
        },
        updateForm() {
            this.$store.dispatch('updatePaymentBank', this.form).then(() => {
                this.$swal.fire({
                        text: 'Berhasil Update Form!',
                        icon: 'success',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    this.showModal = !this.showModal
                    this.form.id = ''
                    this.form.bank = ''
                    this.form.name = ''
                    this.form.digit = ''
                    this.form.card_number = ''
            }).catch(() => {
                this.$swal.fire({
                        text: 'Gagal Update Form!',
                        icon: 'Error',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
            })
        },
        toggleModal() {
            this.edit = false
            this.showModal = !this.showModal
            this.form.id = ''
            this.form.bank = ''
            this.form.name = ''
            this.form.digit = ''
            this.form.card_number = ''
        },
        storeForm() {
            this.$store.dispatch('storePaymentBank', this.form).then(() => {
                this.$swal.fire({
                        text: 'Berhasil Buat Payment!',
                        icon: 'success',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
                
                    this.showModal = !this.showModal
                    this.form.id = ''
                    this.form.bank = ''
                    this.form.name = ''
                    this.form.digit = ''
                    this.form.card_number = ''
            }).catch(() => {
                this.$swal.fire({
                        text: 'Gagal Buat Payment!',
                        icon: 'Error',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
            })
        },
        editForm(data) {
            this.edit = true
            this.showModal = !this.showModal
            this.form.id = data.id
            this.form.bank = data.bank
            this.form.name = data.name
            this.form.digit = data.digit
            this.form.card_number = data.card_number
        }
    }
}
</script>

<template>
    <div class="relative w-full py-4 px-4 mt-3 text-left bg-white border border-gray-200 rounded-lg shadow">
        <div class="container px-6 mx-auto grid">
            <div class="flex justify-between items-center w-full">
                <h2 class="my-6 text-2xl font-semibold text-gray-700 animate__animated animate__fadeIn">
                    Setting Payment
                </h2>
                <div class="button">
                    <button @click="toggleModal" class="rounded-lg bg-blue-500 text-white px-5 py-2">New Payment</button>
                </div>
            </div>
            <hr />

            <div class="flex flex-col mt-6 overflow-y-auto">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <button class="flex items-center gap-x-3 focus:outline-none">
                                                <span>Bank</span>

                                                <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Name
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Digit
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Card Number
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    <tr v-for="(item, index) in Payment" :key="index">
                                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                            <!-- <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                Customer
                                            </div> -->
                                            <div class="text-white">
                                                {{ item.bank }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 class="text-white">{{ item.name }}</h4>
                                            </div>
                                        </td>

                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 class="text-white">{{ item.digit }}</h4>
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 class="text-white">{{ item.card_number }}</h4>
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-sm text-white whitespace-nowrap">
                                            <div class="flex items-center m-auto">
                                                <button @click="editForm(item)" class="bg-blue-500 px-4 py-2 rounded-lg mr-2">Edit</button>
                                                <button class="bg-red-500 px-4 py-2 rounded-lg">Remove</button>
                                            </div>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
                                Form Payment
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
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-bank">
                                            Bank
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="form-bank" type="text" v-model="form.bank" placeholder="BCA">
                                        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                        </div>
                                        <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-nama-bank">
                                            Nama Bank
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="form-nama-bank" type="text" v-model="form.name" placeholder="Jane">
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-3">
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-bank">
                                            Digit
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="form-bank" type="number" v-model="form.digit" placeholder="10">
                                        </div>
                                        <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-nama-bank">
                                            Card Number
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="form-nama-bank" type="number" v-model="form.card_number" placeholder="1234567890">
                                    </div>
                                </div>
                                
                            </form>
    
                            <div class="w-full text-right">
                                <button v-if="!edit" @click="storeForm" class="ml-auto text-white bg-blue-500 px-4 py-2 rounded-lg">Tambah Payment</button>
                                <button v-else @click="updateForm(item)" class="ml-auto text-white bg-blue-500 px-4 py-2 rounded-lg">Update Payment</button>
                            </div>
    
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>

</template>