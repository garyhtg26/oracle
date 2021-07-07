import axios from 'axios'
export default {
    isDisabled($store, channel, code) {
        return (
            $store.state.payments.filter((x) => x[channel] === code && x.is_enabled)
            .length == 0
        )
    },
    optPayments($store, selected) {
        return [{
                img: 'alfamart',
                code: 'ALFAMART',
                disabled: this.isDisabled($store, 'channel_code', 'ALFAMART'),
            },
            {
                img: 'ovo',
                code: 'OVO',
                disabled: this.isDisabled($store, 'channel_code', 'OVO'),
            },
            {
                img: 'dana',
                code: 'DANA',
                disabled: this.isDisabled($store, 'channel_code', 'DANA'),
            },
            {
                img: 'shopeepay',
                code: 'SHOPEEPAY',
                disabled: this.isDisabled($store, 'channel_code', 'SHOPEEPAY'),
            },
            {
                img: 'LINKAJA',
                code: 'LINKAJA',
                disabled: this.isDisabled($store, 'channel_code', 'LINKAJA'),
            },
            {
                img: 'QRIS',
                code: 'QRIS',
                disabled: this.isDisabled($store, 'channel_code', 'QRIS'),
            },
            {
                img: 'atm',
                code: 'VIRTUAL_ACCOUNT',
                disabled: this.isDisabled(
                    $store,
                    'channel_category',
                    'VIRTUAL_ACCOUNT',
                ) || !selected.enable_va,
            },
        ]
    },
    async getVav() {
        return axios.get('voucher/va')
    },
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
        const forms = {
            buyer_sku_code: data.pulsa_code,
            customer_no: data.no_hp,
            customer_id: data.hp,
            price: data.pulsa_price,
            category: data.pulsa_op,
            status: 'Pending',
            payment: data.payment,
            server_id: data.server_id,
        }
        return axios.put('transaction/topup', forms)
    },
    async redeem(forms, $store) {
        return axios.put('redeem', forms, {
            headers: {
                Authorization: `Bearer ${$store.state.authentication}`,
            },
        })
    },
    async redeemCode(forms, $store) {
        return axios.put('redeem-code', forms, {
            headers: {
                Authorization: `Bearer ${$store.state.authentication}`,
            },
        })
    },
}