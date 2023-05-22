import React, { useState } from "react";
import { sortRowNames, setRowSpanFlag } from "../util/showTable";
import { calculate } from "../util/calculate";
import { Names } from "../util/showTable";

type Props = {
  // flag:number[]|null,
  x: string[];
  y: string[];
  parsedata: any;
};


const Card = (props: Props) => {
  const [flag, setFlag] = useState<number[]>(new Array(30).fill(0))

  let { x, y, parsedata } = props;
  let num:number = x[0].length;
  const initFlag = new Array(num).fill(0);
  // setFlag(initFlag);
  const dataObj: { [key: string]: any } = calculate(x, y, flag, parsedata);
  // console.log("parsedata"+JSON.stringify(parsedata));
  // console.log(dataObj);
  let names: string[][] = [];
  const rowname: Array<string[]> = dataObj.cart;
  const data: Map<string, number[]> = dataObj.map;
  const sortedRowNames: Names = sortRowNames(rowname);

  for (let i = 0; i < rowname[0].length; i++) {
    names.push([]);
    for (let j = 0; j < rowname.length; j++) {
      names[i].push(rowname[j][i]);
    }
  }
  const rowSpanFlag = setRowSpanFlag(sortedRowNames);

  return (
    <div className="ml-16">
      <table>
        <thead>
          <tr>
            {y.map((yname, index) => {
              return <th key={yname + index}>{yname}</th>;
            })}
            {x.map((xname, index) => {
              return (
                <th key={xname + index}>
                  {xname}
                  <div
                    className="m-1 font-normal text-sm bg-gray-200 rounded-lg"
                    id="flagtable"
                  >
                    <div className="relative group" id="dropdown-flag">
                      <a href="#" className="block" id="dropdown-link">
                        {flag[index]===0?"sum":"mean"}
                      </a>
                      <ul
                        className="hidden absolute bg-white z-10 w-full border rounded shadow-md divide-y group-hover:block"
                        id="dropdown-items"
                      >
                        <li className="p-1">
                          <button
                             onClick={
                              ()=>{
                                setFlag(flag.map((item,_index) => _index === index? 0:item))
                              }
                            }
                            className="hover:text-blue-500"
                          >
                            sum
                          </button>
                        </li>
                        <li className="p-1">
                          <button
                            onClick={
                              ()=>{
                                setFlag(flag.map((item,_index) => _index === index? 1:item))
                              }
                            }
                            className="hover:text-blue-500"
                          >
                            mean
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from(sortedRowNames).map((row, rowindex) => {
            const key = row?.toString();
            const rowdata = data?.get(key);
            return (
              <tr key={rowindex}>
                {row?.map((title, typeindex) => {
                  if (rowSpanFlag[typeindex][rowindex]) {
                    return (
                      <th
                        key={typeindex + "," + rowindex}
                        rowSpan={rowSpanFlag[typeindex][rowindex]}
                      >
                        {title}
                      </th>
                    );
                  }
                  return null;
                })}

                {rowdata?.map((item: number, index) => {
                  return <td key={rowindex + "," + index}>{item}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default Card;
