function add(a, b) {
return a+b
}
console.log(add(4, 6))

var data = {
    name: "cliff",
    age: "34",
    name: "ted",
    age: "42",
    name: "bob",
    age: "12"
  }
var calculatedData = [];



for (let index = 0; index < 10; index+=0.1) {

    const value = (index+0.8)*(index-0.2)*(index-0.3)*(index-0.6);
    var obj = {
        x: index,
        value: value
    }
    calculatedData.push (obj);
}

  
var jsonData = JSON.stringify(calculatedData);

var fs = require('fs');
fs.writeFile("test.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});