import { createStore } from "vuex"

import Auth from '@/config/store/auth.js'
import Users from '@/config/store/users.js'
import Roles from '@/config/store/role.js'
import Articles from '@/config/store/articles.js'

const store = createStore({
    modules: {
        Auth,
        Roles,
        Users,
        Articles,
    }
})

export default store