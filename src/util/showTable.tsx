export type Names = Array<string[]>

function sortRowNames(rowNames:Names):Names{
  let numofType:number = rowNames[0].length;
  let numofNames:number = rowNames.length;
  for (let i:number = 0; i < numofType - 1; i++) {
    //先选择第i个属性名称进行,排序,从一个开始,合并同类项
    let flagArr:number[] = new Array(numofNames).fill(0);
    let newrowName:Names = [];
    for (let j:number = 0; j < numofNames; j++) {
      //从第j个名称开始,如果没有则放入,寻找同类项;如果有则跳过
      if (!flagArr[j]) {
        newrowName.push(rowNames[j]);
        flagArr[j] = 1;
        for (let k:number = j + 1; k < numofNames; k++) {
          //如果出现了一个第i个属性与其相同的项,则放入
          if (!flagArr[k] && rowNames[j][i] === rowNames[k][i]) {
            let isAdd:boolean = true;
            for (let t:number = i; t >= 0; t--) {
              if (rowNames[j][t] !== rowNames[k][t]) {
                isAdd = false;
              }
            }
            if (!isAdd) continue;
            newrowName.push(rowNames[k]);
            flagArr[k] = 1;
          }
        }
      }
    }
    rowNames = newrowName;
  }
  return rowNames;
}

const setRowSpanFlag = (sortednames:Names):number[][] => {
  let res:Array<number[]> = [];
  const m:number = sortednames[0].length;
  const n:number = sortednames.length;
  // console.log("sorted", sortednames[1]);
  for (let k:number = 0; k < m - 1; k++) {
    let arr:number[] = Array(n).fill(0);
    for (let i:number = 0; i < n; ) {
      let j = i;
      for (j = i; j < n; j++) {
        let isSame:boolean = true;
        for (let t = k; t >= 0; t--) {
          if (sortednames[j][t] !== sortednames[i][t]) {
            isSame = false;
            break;
          }
        }
        if (!isSame) break;
      }
      arr[i] = j - i;
      i = j;
    }
    res.push(arr);
  }
  res.push(Array(n).fill(1));

  return res;
};

export {sortRowNames, setRowSpanFlag };
