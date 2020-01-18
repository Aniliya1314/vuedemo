import {ADD_COUNTER,ADD_TO_CART} from "./mutation_types";
export default {
  addCart(context,payload){
    return new Promise((resolve, reject) =>{
      let oldproduct = context.state.productList.find(item => item.iid === payload.iid)
      // for (let item of state.productList){
      //   if(item.iid === payload.iid){
      //     oldproduct = item;
      //   }
      // }
      if (oldproduct){
        // oldproduct.count +=1
        context.commit(ADD_COUNTER,oldproduct)
        resolve('该商品数量加一')
      }
      else {
        payload.count = 1;
        // state.productList.push(payload);
        context.commit(ADD_TO_CART,payload)
        resolve('商品已添加至购物车')
      }
    })
  }
}
