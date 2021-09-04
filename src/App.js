import React, { useState, useEffect } from 'react';
import './App.css';
var XMLParser = require('react-xml-parser');

const xmlText = [`
                  <div name="Student">
                    <table name="Student according to year">
                        <columns>
                          <column name="ID" parentchile="1">           
                            <data-type>integer</data-type>
                          </column>
                          <column name="year" parentchile="2">             
                            <data-type>integer</data-type>
                          </column>
                          <column name="rollNumber">                           
                            <data-type>integer</data-type>
                          </column>
                          <column name="class">                           
                            <data-type>string</data-type>
                          </column>
                          <column name="firstname">                           
                            <data-type>string</data-type>
                          </column>
                          <column name="lastname">                
                            <data-type>string</data-type>
                          </column>
                        </columns>
                    </table>
                  </div>
                  
`,
`
                  <div name="attendence">
                    <table name="Attendence database based on year">
                        <columns>
                          
                          <column name="Id">                           
                            <data-type>integer</data-type>
                          </column>
                          <column name="studentId" parentchile="1">                           
                            <data-type>integer</data-type>
                          </column>
                          <column name="totalAttendence">                           
                            <data-type>dictionary</data-type>
                          </column>                 
                        </columns>
                    </table>
                  </div>
                  
`,
`
                  <div name="cgpa">
                    <table name="year wise cgpa of students">
                        <columns>
                          <column name="Id">                           
                            <data-type>integer</data-type>
                          </column>       
                          <column name="studentId" parentchile="1">                           
                            <data-type>integer</data-type>
                          </column>
                          <column name="studyingyear" parentchile="2">                           
                            <data-type>integer</data-type>
                          </column>
                          <column name="cgpa">                           
                            <data-type>integer</data-type>
                          </column>                 
                        </columns>
                    </table>
                  </div>
                  
`
]
const dict1 =  {}
const dict2 =  {}

function App() {

  const[hh,sethh] = useState(0)
  const [heading,setHeading] = useState([])
  const [columns,setcolumns] = useState([])
  const [datatypes,setDataTypes] = useState([]) 
  
  useEffect(() => {
    if (hh<xmlText.length){
      var xml = new XMLParser().parseFromString(xmlText[hh]);
        
        let a = xml.getElementsByTagName('table');
        let a1 = ""
        a.map((individual,index)=>{
              a1 = individual.attributes.name
              setHeading([...heading,a1])    
          }) 

        const barray = []
        let b = xml.getElementsByTagName('column'); 
        b.map((individual,index)=>{
          barray.push(individual.attributes.name)
          if (individual.attributes.parentchile != undefined){
            dict1[individual.attributes.name] = individual.attributes.parentchile
            dict2[individual.attributes.parentchile] = "#"+Math.floor(Math.random()*16777215).toString(16)
          }
          
        },setcolumns([...columns,barray]))

        const carray = []
        let c = xml.getElementsByTagName('data-type');
        c.map((individual,index)=>{
          carray.push(individual.value)
        },setDataTypes([... datatypes, carray]))

      sethh(hh+1)
    }
    
  });
  
  return (
    <div className="App">
           {heading.map((head,index)=> {return(
            <div className="main-div-table" >
              <table className="table-box">
                <tr >
                  <h4>{head}</h4>
                </tr>
                    {columns[index].map((col,idx)=>{return(
                        <tr>
                          {dict1[col] !== undefined  ?  
                            <th style={{backgroundColor: dict2[dict1[col]]}} >{col}</th> 
                            
                            :<th>{col}</th>}
                
                          <th>{datatypes[index][idx]}</th>

                        </tr>
                    )})}
                </table>
                
            </div>
            )})}
      
    </div>
  );
}

export default App;
