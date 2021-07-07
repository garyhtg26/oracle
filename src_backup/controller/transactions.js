import axios from "axios"
export default {

    async payments() {
        return axios.get('xendit/payment_channels')
    },
    async index() {
        return axios.get('transaction')
    },
    async callback() {
        return axios.get('transaction/callback')
    },
    async report() {
        return axios.get('transaction/report')
    },
    async store(data) {
        // {
        // "status": "active",
        // "icon_url": "https://cdn.mobilepulsa.net/img/product/operator_list/140119035155-Gemscool-01.png",
        // "pulsa_code": "hgemscool30000",
        // "pulsa_op": "Gemscool",
        // "pulsa_nominal": "3,000 G-Cash",
        // "pulsa_details": "-",
        // "pulsa_price": 29700,
        // "pulsa_type": "game",
        // "masaaktif": "0",
        // "payment": "BCA",
        // "hp": "sds",
        // "no_hp": "werwerwer"
        // }
        const forms = {
            buyer_sku_code: data.pulsa_code,
            customer_no: data.no_hp,
            customer_id: data.hp,
            price: data.pulsa_price,
            category: data.pulsa_op,
            status: 'Pending',
            payment: data.payment,
        }
        return axios.post('transaction/topup', forms)
    },
    async redeem(forms, $store) {
        return axios.post('redeem', forms, {
            headers: {
                'Authorization': `Bearer ${$store.state.authentication}`
            }
        })
    }
}