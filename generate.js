var calculatedData = [];

for (let index = 0; index < 100; index+=0.1) {

    const y = (index+0.8)*(index-0.2)*(index-0.3)*(index-0.6);
    var obj = {
        x: index,
        y: y
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