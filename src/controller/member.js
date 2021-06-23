import axios from 'axios'

export default {
    async index() {
        return axios.get('/admin/member')
    },
    async store(data) {
        return axios.post('/admin/member', data)
    },
    async update(data, id) {
        return axios.put('/admin/member/' + id, data)
    },
    async destroy(id) {
        return axios.delete('/admin/user/' + id)
    },

    // async index() {
    //     return axios.get('/admin/user')
    // },
    // async store(data) {
    //     return axios.post('/admin/user', data)
    // },
    // async update(data, id) {
    //     return axios.put('/admin/user/' + id, data)
    // },
}