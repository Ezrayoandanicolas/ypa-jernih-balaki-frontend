import { createStore } from "vuex"

import Auth from '@/config/store/auth.js'
import Users from '@/config/store/users.js'
import Roles from '@/config/store/role.js'
import Category from '@/config/store/category.js'
import Articles from '@/config/store/articles.js'
import Images from '@/config/store/images.js'

const store = createStore({
    modules: {
        Auth,
        Roles,
        Users,
        Articles,
        Category,
        Images,
    }
})

export default store