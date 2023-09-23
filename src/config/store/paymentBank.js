import axios from '@/config/axios.js'

const paymentBank = {
    state: {
        PaymentBank: null,
    },
    getters: {
        getPaymentBank(state) {
            return state.PaymentBank
        }
    },
    mutations: {
        setPaymentBank(state, payload) {
            state.PaymentBank = payload.data
        },
        setNewPaymentBank(state, payload) {
            state.PaymentBank.unshift(payload.data)
        },
        setUpdatePaymentBank(state, payload) {
            let index = state.PaymentBank.findIndex(obj => obj.id == payload.data.id);
            state.PaymentBank[index] = payload.data;
        },
    },
    actions: {
        retrievePaymentBank({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrievePaymentBank').then((res) => {
                    commit('setPaymentBank', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        storePaymentBank({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/storePaymentBank', data).then((res) => {
                    commit('setNewPaymentBank', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        updatePaymentBank({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/updatePaymentBank/'+data.id, data).then((res) => {
                    commit('setUpdatePaymentBank', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
    }
}

export default paymentBank;