import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import cart from './modules/cart';
// import products from './modules/products';
// import auth from './modules/auth';
// import messages from './modules/messages';
// import * as actions from './actions';
import createPersistedState from 'vuex-persistedstate'
import secureLS from 'secure-ls'
var ls = new secureLS({
    encodingType: 'aes',
    encryptionSecret: '^77asj12@skdjasdk',
})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authentication: {},
        token: null,
        user: {},
        modalBank: false,
        modalDetail: false,
        detailPesanan: false,
        payments: [],
        forms: {},
        products: [],
        items: [],
    },
    mutations: {
        user(state, value) {
            state.user = value
        },
        token(state, value) {
            state.token = value
        },
        authentication(state, val) {
            state.authentication = val
        },
        modalBank(state, value) {
            state.modalBank = value
        },
        modalDetail(state, value) {
            state.modalDetail = value
        },
        detailPesanan(state, value) {
            state.detailPesanan = value
        },
        payments(state, value) {
            state.payments = value
        },
        forms(state, value) {
            state.forms = value
        },
        products(state, value) {
            state.products = value
        },
        items(state, value) {
            state.items = value
        },
    },
    actions: {
        updateForms({ commit, state }, data) {
            var forms = state.forms
            forms[data.key] = data.value
            commit('forms', forms)
        },
        async logout({ commit }) {
            const res = axios.get('/auth/logout')
            commit('authentication', {})
            commit('token', null)
            commit('user', { role: 'public', id: 0 })
            commit('code', 200)
            console.log(res)
            location.reload()
        },
    },
    // actions,
    // modules: {
    //     auth,
    //     cart,
    //     products,
    //     messages,
    // },
    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],
})