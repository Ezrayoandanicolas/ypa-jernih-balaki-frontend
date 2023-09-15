import { createStore } from "vuex"

import Auth from '@/config/store/auth.js'
import Users from '@/config/store/users.js'
import Roles from '@/config/store/role.js'
import Category from '@/config/store/category.js'
import Articles from '@/config/store/articles.js'
import ProgramArticle from '@/config/store/programArticle.js'
import DonasiArticle from '@/config/store/donasi.js'
import Images from '@/config/store/images.js'

const store = createStore({
    modules: {
        Auth,
        Roles,
        Users,
        Articles,
        ProgramArticle,
        DonasiArticle,
        Category,
        Images,
    }
})

export default store