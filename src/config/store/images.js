import axios from '@/config/axios.js'

const images = {
    state: {
        images: null,
    },
    getters: {
        getImages(state) {
            return state.images
        }
    },
    mutations: {
        storeImage(state, payload) {
            state.images = payload
        }
    },
    actions: {
        storeImage({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/storeImages', data.data, {
                    Headers: { 
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
                    commit('storeImage', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    console.log('error')
                    reject(err)
                })
            })
        },
    }
}

export default images;