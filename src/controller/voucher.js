import axios from 'axios'
export default {
    async list($store) {
        return axios.get('voucher/list').then((res) => {
            $store.commit('items', res.data)
            return Object.keys(res.data).map(function(val) {
                const data = res.data
                return {
                    name: val,
                    icon: !data[val][0] || data[val][0].icon_url,
                    status: !data[val][0] || data[val][0].status,
                }
            })
        })
    },
    async show(name, $store) {
        const products = $store.state.items
        return {
            data: products[name],
        }
        // return axios.get('voucher/show/' + name)
    },
    async topup() {
        return axios.post('voucher/topup')
    },
}