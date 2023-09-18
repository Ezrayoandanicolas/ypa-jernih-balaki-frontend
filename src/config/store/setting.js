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
        },
        setNewSlide(state, payload) {
            state.slide.unshift(payload.data.data)
        },
        deleteSlide(state, payload) {
            let index = state.slide.findIndex(obj => obj.id == payload.data);
            // state.products[index] = product;
            state.slide.splice(index, 1)
        },
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
        },
        storeImageSlide({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/storeSlide', data.data, {
                    Headers: { 
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
                    commit('setNewSlide', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    console.log('error')
                    reject(err)
                })
            })
        },
        deleteSlide({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.delete('v1/admin/destroySlide/'+data.id).then((res) => {
                    commit('deleteSlide', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
    }

}

export default settings;