/** @format */

let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

function PrintDeveloperbyMap() {
  //Write your code here , just console.log
  let dev = arr.map((val) => {
    if (val.profession === "developer") return val.name;
  }).filter(Boolean)
  console.log("Developers with map=>",...dev)
}

function PrintDeveloperbyForEach() {
  //Write your code here , just console.log
let dev=[]
  arr.forEach(val=>{
    if(val.profession==="developer")
    dev.push(val.name)
  })
  console.log("Developers with forEach=>",...dev)
}

function addData() {
  //Write your code here, just console.log
  let newObj={id:4,name:"susan",age:"20",profession:"intern"} 
  arr.push(newObj)
  console.log("Console New Data with 4th Employee =>",arr)
}

function removeAdmin() {
  //Write your code here, just console.log
  arr=arr.filter(val=>val.profession!=="admin")
  console.log("Remove Admin =>",arr)
}

function concatenateArray() {
  //Write your code here, just console.log

  let newArr= [
    { name: "Narendra Modi", age: "71", profession: "Politician" },
    { name: "Shaharukh Khan", age: "55", profession: "Actor" },
    { name: "MS Dhoni", age: "40", profession: "Cricketer" },
  ];
  console.log("Concatenated Array=>",arr.concat(newArr))
}
