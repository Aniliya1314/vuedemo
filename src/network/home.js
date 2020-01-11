import {request} from "./request";
export function requestAllData() {
  return request({
    url:'/get',
  })
}
export function getHomeGoods(type) {
  return request({
    url:'/home/data',
  })
}
