import axios from '@/config/axios.js'

const settings = {
    state: {
        slide: '',

    },
    getters: {
        getSlide(state) {
            return state.slide
        }
    },
    mutations: {
        setSlide(state, payload) {
            state.slide = payload.data
        }
    },
    actions: {
        retrieveSlide({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveSlide').then((res) => {
                    commit('setSlide', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }

}

export default settings;