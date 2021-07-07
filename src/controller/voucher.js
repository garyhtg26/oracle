import axios from "axios";
import collect from "collect.js";

export default {
    async list($store) {
        let res = { data: [] };
        if ($store.state.authentication) {
            res = await axios.get("voucher-list");
        } else {
            res = await axios.get("voucher/list");
        }
        $store.commit("items", res.data);
        return Object.keys(res.data).map(function(val) {
            const data = res.data;
            return {
                name: val,
                icon: !data[val][0] || data[val][0].icon_url,
                status: !data[val][0] || data[val][0].status
            };
        });
    },
    async show(name, $store) {
        const products = $store.state.items;
        if (!products[name]) {
            return []
        }
        return {
            data: collect(products[name])
                .where("status", "!==", "empty")
                .sortBy("pulsa_price")
        };
        // return axios.get('voucher/show/' + name)
    },
    async topup() {
        return axios.post("voucher/topup");
    }
};