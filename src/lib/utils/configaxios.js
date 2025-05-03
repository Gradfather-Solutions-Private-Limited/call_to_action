import axios from 'axios'
import Ls from '../utils/Ls'
//import { useAuthStore } from '@src/stores/auth'
//import { useNotificationStore } from '@src/stores/notification'


window.Ls = Ls
window.axios = axios
console.log("Inside axios")
console.log(import.meta.env.VITE_SERVER_URL)
window.axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;//"http://localhost/3ibazaaradmin/public/";
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'projectid': 'billing',
}
//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//window.axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
/**
 * Interceptors
 */

axios.interceptors.request.use(
  function (config) {
    //const authStore = useAuthStore()

    //if (authStore.isLoggedOut) {
    if(Ls.get('token')==null){
      let source = window.axios.CancelToken.source()
      config.cancelToken = source.token

      /*setTimeout(() => {
        authStore.isLoggedOut = false
      }, 200)*/

      return config
    }
    // Do something before request is sent
    /*const companyId = Ls.get('selectedCompany')

    if (companyId) {
      config.headers.common['company'] = companyId
    }
    */
    const token = Ls.get('token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

/**
 * Global Axios Response Interceptor
 */
/*
axios.interceptors.response.use(undefined, function (err) {
  // Do something with request error
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()

  if (authStore.isLoggedOut) {
    return true
  }
  if (!err.response) {
    notificationStore.showNotification({
      type: 'error',
      message:
        'Please check your internet connection or wait until servers are back online.',
    })
  } else {
    if (
      err.response.data &&
      (err.response.statusText === 'Unauthorized' ||
        err.response.data === ' Unauthorized.')
    ) {
      // Unauthorized and log out
      notificationStore.showNotification({
        type: 'error',
        message: err.response.data.message
          ? err.response.data.message
          : 'Unauthorized',
      })

      authStore.logout(true)
    } else if (err.response.data.errors) {
      // Show a notification per error
      const errors = JSON.parse(JSON.stringify(err.response.data.errors))
      for (const i in errors) {
        notificationStore.showNotification({
          type: 'error',
          message: errors[i][0],
        })
      }
    } else {
      // Unknown error
      notificationStore.showNotification({
        type: 'error',
        message: err.response.data.message
          ? err.response.data.message
          : err.response.data || 'Unknown error occurred',
      })
    }
  }
  return Promise.reject(err)
})
*/
