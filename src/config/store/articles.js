
import axios from '@/config/axios.js'

const users = {
    state: {
        AReadArticle: null,
        ARetrieveArticles: null,
    },
    getters: {
        getAReadArticle(state) {
            return state.AReadArticle
        },
        getARetrieveArticles(state) {
            return state.ARetrieveArticles
        }
    },
    mutations: {
        setAReadArticle(state, payload) {
            state.AReadArticle = payload.data
        },
        setARetrieveArticles(state, payload) {
            state.ARetrieveArticles = payload.data
        },
        deleteARetrieveArticles(state, payload) {
            let index = state.ARetrieveArticles.findIndex(obj => obj.id == payload.data);
            // state.products[index] = product;
            state.ARetrieveArticles.splice(index, 1)
        },
    },
    actions: {
        AReadArticle({ commit }, slug) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/readArticle/' + slug).then((res) => {
                    commit('setAReadArticle', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        ARetrieveArticles({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveArticles').then((res) => {
                    commit('setARetrieveArticles', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AStoreArticles({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/storeArticle', data).then((res) => {
                    commit('setARetrieveArticles', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AEditArticles({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveEditArticle/'+id).then((res) => {
                    commit('setARetrieveArticles', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AUpdateArticles({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/updateArticle/'+data.id, data).then((res) => {
                    commit('setARetrieveArticles', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        ADeleteArticles({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.delete('v1/admin/destroyArticle/'+data).then((res) => {
                    // console.log(res.data)
                    commit('deleteARetrieveArticles', res.data)
                    resolve(resolve)
                }).catch((err) => {
                    reject(err)
                })
            })
        },

        // Guest Landing Page
        ARetrieveArticlesGuest({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/guest/retrieveArticle').then((res) => {
                    commit('setARetrieveArticles', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },

        AReadArticleGuest({ commit }, slug) {
            return new Promise((resolve, reject) => {
                axios.get('v1/guest/readArticle/' + slug).then((res) => {
                    commit('setAReadArticle', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
    }
};

export default users