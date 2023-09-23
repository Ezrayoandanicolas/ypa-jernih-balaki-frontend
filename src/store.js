import { createStore } from "vuex"

import Auth from '@/config/store/auth.js'
import Users from '@/config/store/users.js'
import Roles from '@/config/store/role.js'
import Category from '@/config/store/category.js'
import Articles from '@/config/store/articles.js'
import ProgramArticle from '@/config/store/programArticle.js'
import DonasiArticle from '@/config/store/donasi.js'
import Images from '@/config/store/images.js'
import Settings from '@/config/store/setting.js'
import LogDonasi from '@/config/store/logDonasi'
import PaymentBank from '@/config/store/paymentBank'

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
        Settings,
        LogDonasi,
        PaymentBank
    }
})

export default store