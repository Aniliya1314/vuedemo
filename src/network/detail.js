import {request} from "./request";
export function getDetailData() {
  request({
    url:'/detail/data',
    params:{
      iid
    }
  })
}
export class  Goods{
  constructor(itemInfo) {
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = itemInfo.columns;
    this.services = itemInfo.services;
    this.detailInfo = itemInfo.detailInfo;
  }
}
