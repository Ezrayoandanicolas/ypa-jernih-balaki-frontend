<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
    name: 'Master-Form-Donasi',
    data() {
        return {
            Form: null,
        }
    },
    async mounted() {
        try {
            await this.retrieveLogDonasi().then((res) => {
                if (res.data.length == 0) {
                    this.Form = null
                } else {
                    this.Form = res.data
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
            retrieveLogDonasi: 'retrieveLogDonasi',
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
        updateForm(data) {
            this.$store.dispatch('updateLogDonasi', data).then(() => {
                this.$swal.fire({
                        text: 'Berhasil Update Form!',
                        icon: 'success',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 1500
                    });
            }).catch(() => {
                this.$swal.fire({
                        text: 'Gagal Update Form!',
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
    <div class="relative w-full py-4 px-4 mt-3 text-left bg-white border border-gray-200 rounded-lg shadow">
        <div class="container px-6 mx-auto grid">
            <div class="flex justify-between items-center w-full">
                <h2 class="my-6 text-2xl font-semibold text-gray-700 animate__animated animate__fadeIn">
                    Form Donasi
                </h2>
                <div class="button">
                    <button class="rounded-lg bg-blue-500 text-white px-5 py-2">New Form</button>
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
                                                <span>Confirmation</span>

                                                <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Name
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Bank
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Nominal
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Article Donasi</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    <tr v-for="(item, index) in Form" :key="index">
                                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                            <div v-if="item.confirm == false || item.confirm == null" class="flex items-center justify-center">
                                                <button @click="updateForm(item)" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Confirmation</button>
                                                <!-- <button class="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Reject</button>
                                                <button class="bg-green-500 text-white px-4 py-2 rounded-lg ml-2">View Bukti</button> -->
                                            </div>
                                            <div v-else class="flex items-center justify-center">
                                                <button disabled class="bg-blue-500 text-white px-4 py-2 rounded-lg">Sudah Verifikasi</button>
                                            </div>
                                        </td>
                                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                            <!-- <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                Customer
                                            </div> -->
                                            <div class="text-white">
                                                {{ item.name }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 class="text-white">{{ item.payment.bank }}</h4>
                                            </div>
                                        </td>

                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 class="text-white">{{ formatCurrencyID(item.nominal) }}</h4>
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-sm text-white whitespace-nowrap">
                                            <div>
                                                {{ item.donasi.title }}
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
    </div>
</template>