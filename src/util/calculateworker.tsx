function calculateworker(x:string[],y:string[],flag:number[],parsedata:any){
  const worker = new Worker('woker.tsx')
  const generate = document.getElementById('generate')
  generate?.addEventListener('click',(event)=>{
    // worker.postMessage({x, y, flag, parsedata})
    worker.postMessage('received')
  })
  let dataObj:any = [];
  worker.onmessage = function(message){
    // console.log(message.data)
    // console.log("finished calculation");
    // dataObj = message.data;
  }
  return dataObj;
}

export { calculateworker };