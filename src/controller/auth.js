import axios from "axios";
// import stores from "../stores/index"

export default {
    async login(form, stores, router) {
        return axios.post("/auth/login", form).then(res => {
            stores.commit("authentication", res.data.bearer);
            stores.commit("user", res.data.user);
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + stores.state.authentication;
            router.go(-1);
        });
    },
    async register(form) {
        const data = {
            name: form.name || form.phone,
            phone: form.phone.substr(0, 1) === "0" ? form.phone.substr(1) : form.phone,
            email: form.email,
            address: form.address
        };
        return axios.post("/auth/register", data);
    },
    async verification(form, stores, router) {
        return axios.post("/auth/verification", form).then(res => {
            stores.commit("authentication", res.data.bearer);
            stores.commit("user", res.data.user);
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + stores.state.authentication;
            // router = false
            router.push("/");
        });
    },
    async logout(stores, router) {
        return axios.get("auth/logout").then(() => {
            stores.commit("authentication", {});
            stores.commit("user", {});
            axios.defaults.headers.common["Authorization"] = undefined;
            router.replace("/");
        });
    }
};