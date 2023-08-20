
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
        }
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
        }
    }
};

export default users