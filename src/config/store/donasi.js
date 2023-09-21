
import axios from '@/config/axios.js'

const users = {
    state: {
        AReadDonasi: null,
        ARetrieveDonasi: null,
    },
    getters: {
        getAReadDonasi(state) {
            return state.AReadDonasi
        },
        getARetrieveDonasi(state) {
            return state.ARetrieveDonasi
        }
    },
    mutations: {
        setAReadDonasi(state, payload) {
            state.AReadDonasi = payload.data
        },
        setARetrieveDonasi(state, payload) {
            state.ARetrieveDonasi = payload.data
        },
        deleteARetrieveDonasi(state, payload) {
            let index = state.ARetrieveDonasi.findIndex(obj => obj.id == payload.data);
            // state.products[index] = product;
            state.ARetrieveDonasi.splice(index, 1)
        },
    },
    actions: {
        AReadDonasi({ commit }, slug) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/readDonasi/' + slug).then((res) => {
                    commit('setAReadDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        ARetrieveDonasi({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveDonasi').then((res) => {
                    commit('setARetrieveDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AStoreDonasi({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/storeDonasi', data).then((res) => {
                    commit('setARetrieveDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AEditDonasi({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveEditDonasi/'+id).then((res) => {
                    commit('setARetrieveDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AUpdateDonasi({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/updateDonasi/'+data.id, data).then((res) => {
                    console.log('hellow')
                    commit('setARetrieveDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        ADeleteDonasi({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.delete('v1/admin/destroyDonasi/'+data).then((res) => {
                    // console.log(res.data)
                    commit('deleteARetrieveDonasi', res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },

        // Guest Landing Page
        ARetrieveDonasiGuest({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/guest/retrieveDonasiArticle').then((res) => {
                    commit('setARetrieveDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },

        AReadDonasiGuest({ commit }, slug) {
            return new Promise((resolve, reject) => {
                axios.get('v1/guest/readDonasi/' + slug).then((res) => {
                    commit('setAReadDonasi', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
    }
};

export default users