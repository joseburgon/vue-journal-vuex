import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://vue-demos-534ba-default-rtdb.firebaseio.com'
})

export default journalApi