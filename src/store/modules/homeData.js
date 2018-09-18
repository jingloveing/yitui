import { homeData,dataOverView} from '@/api/homeData'
import Cookies from "js-cookie";

const home = {
  state: {

  },
  mutations: {

  },
  actions: {
    //获取首页所有数据
    GetHomeData({ commit }, data) {
      return new Promise((resolve, reject) => {
        homeData(Cookies.get('userId'), data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取首页数据概览
    GetDataOverView({ commit }, data) {
      return new Promise((resolve, reject) => {
        dataOverView(Cookies.get('userId'), data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },

}

export default home
