import {request} from "./request";
export function getDetailData() {
  request({
    url:'/detail/data',
    params:{
      iid
    }
  })
}
