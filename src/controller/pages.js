import axios from 'axios'

export default {
    async index(slide) {
        return axios.get('pages', { params: { is_slider: slide } }).then((res) => {
            return res.data
        })
    },
    async store(data) {
        let fd = new FormData()
        fd.append('title', data.title)
        fd.append('description', data.description)
        fd.append('photo', data.file)
        fd.append('is_slide', data.is_slide || true)
        fd.append('is_draft', data.is_draft || false)
        return axios.post('/admin/pages', fd)
    },
    async update(data) {
        let fd = new FormData()
        fd.append('title', data.title)
        fd.append('description', data.description)
        fd.append('photo', data.file)
        fd.append('is_slide', data.is_slide || true)
        fd.append('is_draft', data.is_draft || false)
        return axios.post('/admin/pages/' + data.id, fd)
    },
    async destroy(id) {
        return axios.delete('/admin/pages/' + id)
    },
}