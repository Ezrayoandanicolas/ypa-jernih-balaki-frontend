import axios from '@/config/axios.js'

const logDonasi = {
    state: {
        formDonasi: null,
    },
    getters: {
        getFormDonasi(state) {
            return state.formDonasi
        }
    },
    mutations: {
        setFormDonasi(state, payload) {
            state.formDonasi = payload.data
        },
        setUpdateForm(state, payload) {
            let index = state.formDonasi.findIndex(obj => obj.id == payload.data.id);
            state.formDonasi[index] = payload.data;
        },
    },
    actions: {
        retrieveLogDonasi({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveLogDonasi').then((res) => {
                    commit('setFormDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        updateLogDonasi({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/updateLogDonasi/'+data.id, data).then((res) => {
                    commit('setUpdateForm', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
    }
}

export default logDonasi;