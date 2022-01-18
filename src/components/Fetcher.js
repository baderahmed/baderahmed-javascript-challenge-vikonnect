import axios from 'axios'

const Fetcher = url => axios.get(url).then(res => res.data)

export default Fetcher