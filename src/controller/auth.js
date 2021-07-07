import axios from 'axios'
// import stores from "../stores/index"
import voucher from "./voucher"
export default {
    async login(form, stores, router, $bvToast, modal) {
        return axios.put('/auth/login', form).then((res) => {
            stores.commit('authentication', res.data.bearer)
            stores.commit('user', res.data.user)
            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + stores.state.authentication
            console.log(router.path);
            this.prepare(stores, false)
            $bvToast.toast(res.data.message, {
                title: `Login Berhasil`,
                variant: "success",
                solid: true,
                autoHideDelay: 5000,
                appendToast: true,
            });
            modal.hide('modal-login')

        })
    },
    async prepare(store, hasVoucher) {
        let user = Object.assign({}, store.state.user)
        const res = await axios.get('premium/' + user.id)
        if (res.data.is_premium) {
            user.category = res.data.category
            store.commit('user', user)
            store.commit('items', {})
            if (!hasVoucher) await voucher.list(store)
        } else {
            user.category = undefined
            store.commit('user', user)
        }
    },
    async register(form) {
        const data = {
            name: form.name || form.phone,
            phone: form.phone.substr(0, 1) === '0' ? form.phone.substr(1) : form.phone,
            email: form.email,
            address: form.address,
            password: form.password,
        }
        return axios.put('/auth/register', data)
    },
    async verification(form, stores, router, $bvToast) {
        return axios
            .put('/auth/verification', form)
            .then((res) => {
                stores.commit('authentication', res.data.bearer)
                stores.commit('user', res.data.user)
                axios.defaults.headers.common['Authorization'] =
                    'Bearer ' + stores.state.authentication
                    // router = false
                $bvToast.toast("Selamat, akun anda telah terdaftar di yellowins", {
                    title: `Verifikasi berhasil`,
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 8000,
                    appendToast: true,
                })
                voucher.list(stores)
            })
            .catch(() => {
                $bvToast.toast("Maaf, lagi ada gangguan", {
                    title: `Error :(`,
                    variant: 'error',
                    solid: true,
                    autoHideDelay: 18000,
                    appendToast: true,
                })
            })
    },
    async logout(stores) {
        return axios.get('auth/logout').then(() => {
            stores.commit('authentication', false)
            stores.commit('user', {})
            stores.commit('items', {})
            axios.defaults.headers.common['Authorization'] = undefined
            voucher.list(stores)
                // router.push('/')
        })
    },
}