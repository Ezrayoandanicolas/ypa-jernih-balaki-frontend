import axios from "@/config/axios.js";

const Category = {
    state: {
        category: '',
    },
    getters: {
        getCategory(state) {
            return state.category
        }
    },
    mutations: {
        setCategory(state, payload) {
            state.category = payload
        }
    },
    actions: {
        retrieveCategory({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/retrieveCategory').then((res) => {
                    // console.log(res.data.data)
                    commit('setCategory', res.data.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }
}

export default Category;