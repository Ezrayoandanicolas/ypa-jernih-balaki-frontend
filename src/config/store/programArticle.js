
import axios from '@/config/axios.js'

const storeProgramArticle = {
    state: {
        AReadProgram: null,
        ARetrievePrograms: null,
    },
    getters: {
        getAReadProgram(state) {
            return state.AReadProgram
        },
        getARetrievePrograms(state) {
            return state.ARetrievePrograms
        }
    },
    mutations: {
        setAReadProgram(state, payload) {
            state.AReadProgram = payload.data
        },
        setARetrievePrograms(state, payload) {
            state.ARetrievePrograms = payload.data
        },
        deleteARetrievePrograms(state, payload) {
            let index = state.ARetrievePrograms.findIndex(obj => obj.id == payload.data);
            // state.products[index] = product;
            state.ARetrievePrograms.splice(index, 1)
        },
    },
    actions: {
        AReadProgram({ commit }, slug) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/readProgram/' + slug).then((res) => {
                    commit('setAReadProgram', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        ARetrievePrograms({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveProgramArticle').then((res) => {
                    commit('setARetrievePrograms', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AStorePrograms({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/storeProgramArticle', data).then((res) => {
                    commit('setARetrievePrograms', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AEditPrograms({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveEditProgramArticle/'+id).then((res) => {
                    commit('setARetrievePrograms', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AUpdatePrograms({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/updateProgramArticle/'+data.id, data).then((res) => {
                    commit('setARetrievePrograms', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        ADeletePrograms({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.delete('v1/admin/destroyProgramArticle/'+data).then((res) => {
                    // console.log(res.data)
                    commit('deleteARetrievePrograms', res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },

        // Guest Landing Page
        ARetrieveProgramsGuest({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/guest/retrieveProgramArticle').then((res) => {
                    commit('setARetrievePrograms', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AReadProgramGuest({ commit }, slug) {
            return new Promise((resolve, reject) => {
                axios.get('v1/guest/readProgram/' + slug).then((res) => {
                    commit('setAReadProgram', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
    }
};

export default storeProgramArticle