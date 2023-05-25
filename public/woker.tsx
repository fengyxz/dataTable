onmessage = (e)=>{
  let {x, y, flag, parsedata:data} = e.data;
  // console.log(e);
  // console.log(x,y,flag,data);
  let cart = [];
  let result = {};

  let myMap = new Map();
  for(let i = 0;i < data.length;i++){
    let rowData= data[i];
    let keyArray= [];
    for(let j = 0;j<y.length;j++){
      keyArray.push(rowData[y[j]]);
    }

   let key= keyArray.toString();
    if(!myMap.has(key)){
       //保存数组key信息,方便切割原始数据
       cart.push(keyArray);
       result[key]=0;
       let v = [];
       for (let t = 0; t < x.length; t++) {
         v.push(0);
       }
       myMap.set(key, v);
    }

   
    result[key]++;
    let oldv= myMap.get(key);
    let newv = [];
    for (let k = 0; k < x.length; k++) {
      let num = x[k] === "Row count" ? 1 : Number(rowData[x[k]]);
      if(oldv)newv.push(oldv[k] + num);
    }
    myMap.set(key, newv);
  }
  for (let key in result) {
    let num = result[key];
    for (let i = 0; i < x.length; i++) {
      if (flag[i]) {
        let v = myMap.get(key);
        if(v){
          v[i] = Number((v[i] / num).toFixed(3)); //获得平均数
          myMap.set(key, v);
        }
      }
    }
  }

  let obj = {};
  obj.map = myMap;
  obj.cart = cart;
  // console.log(e)

  postMessage(obj);
}

