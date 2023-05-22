import React from 'react';
import { useState } from "react";
import "./App.css";
import Card from './Components/Card';
import Papa from 'papaparse'


function App() {
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<number[][]>([]);
  const [parseData, setParseData] = useState<any[]>([]);
  //x变量,y变量(暂时x为数量变量,y为质量变量)
  const [xName, setXName] = useState<string[]>([]);
  const [yName, setYName] = useState<string[]>([]);
  //所被选中进行数据透视的变量X,Y
  const [selectX, setSelectX] = useState<string[]>([]);
  const [selectY, setSelectY] = useState<string[]>([]);
  const [generateStatus, setgenerateStatus] = useState(false);
  
  const changeHandler:any = (event:any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray:string[][] = [];
        const valuesArray:number[][] = [];
        results.data.map((d:any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        const ynames = [];
        const xnames = ["casual", "registered", "count", "Row count"];
        for (let i = 0; i < rowsArray[0].length; i++) {
          const name = rowsArray[0][i];
          // console.log()
          if (!xnames.includes(name)) {
            // console.log(name);
            ynames.push(name);
          }
        }

        setParseData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
        setYName(ynames);
        setXName(xnames);
      },
    });
  };

  const handleXCheckboxChange = (event:any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectX([...selectX, value]);
    } else {
      setSelectX(selectX.filter((element) => element !== value));
    }
  };

  const handleYCheckboxChange = (event:any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectY([...selectY, value]);
    } else {
      setSelectY(selectY.filter((element) => element !== value));
    }
  };

  return (
    <>
    <div>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
    </div>

    <div className="flex">
      {/* left part */}
      <div className="ml-4">
        {/* x */}
        <div className="flex">
          <p className="w-8 font-bold">X:</p>
          <div className="flex w-96 flex-wrap">
            {xName.map((element,index) => {
              return (
                <div key={index} className="flex items-center mb-4 ">
                  <label className="ml-2  text-m font-medium text-left text-gray-900 dark:text-gray-300">
                    <input
                      className="w-4 h-4 m-1  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      value={element}
                      onChange={handleXCheckboxChange}
                      checked={selectX.includes(element)}
                    />
                    {element}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/* y */}
        <div className="flex">
          <p className="w-8 font-bold">Y:</p>
          <div className="flex w-96 flex-wrap">
            {yName.map((element,index) => {
              return (
                <div className="flex items-center mb-4 " key={index}>
                  <label className="ml-2  text-m font-medium text-left text-gray-900 dark:text-gray-300">
                    <input
                      className="w-4 h-4 m-1  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      value={element}
                      onChange={handleYCheckboxChange}
                      checked={selectY.includes(element)}
                    />
                    {element}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-96 px-16">
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => {
              // console.log("rows"+tableRows);
              // console.log(JSON.stringify(parseData));
              setgenerateStatus(true);
            }}
          >
            Generate
          </button>
        </div>
      </div>
      {/* <Card
         parsedata={parseData}
         /> */}
      {generateStatus === true && (
        <Card 
         x={selectX} y={selectY} parsedata={parseData} />
      )}
    </div>
  </>
  );
}

export default App;
