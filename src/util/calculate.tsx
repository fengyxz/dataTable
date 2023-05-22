
function calculate(x:string[],y:string[],flag:number[],data:any):{[key:string]:any}{
  const cart:Array<string[]> = [];
  const result:{[key:string]:number} = {};

  const myMap:Map<string,number[]> = new Map();
  for(let i:number = 0;i < data.length;i++){
    const rowData:any = data[i];
    let keyArray:string[] = [];
    for(let j:number = 0;j<y.length;j++){
      keyArray.push(rowData[y[j]]);
    }

    const key:string = keyArray.toString();
    if(!myMap.has(key)){
       //保存数组key信息,方便切割原始数据
       cart.push(keyArray);
       result[key]=0;
       let v:number[] = [];
       for (let t = 0; t < x.length; t++) {
         v.push(0);
       }
       myMap.set(key, v);
    }

   
    result[key]++;
    const oldv:number[] | undefined = myMap.get(key);
    let newv = [];
    for (let k = 0; k < x.length; k++) {
      const num = x[k] === "Row count" ? 1 : Number(rowData[x[k]]);
      if(oldv)newv.push(oldv[k] + num);
    }
    myMap.set(key, newv);
  }
  for (let key in result) {
    const num = result[key];
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

  const obj:{[key:string]:any} = {};
  obj.map = myMap;
  obj.cart = cart;
  return obj;
}

export { calculate };
