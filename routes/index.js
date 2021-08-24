const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const fs = require('fs');
const { localsName } = require('ejs');
const excel = xlsx.readFile('/Users/uzzing/Repository_Github/MartInfo_Web/Excel/MartInfo.xlsx');
const sheetName = excel.SheetNames[0];
const firstSheet = excel.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval : "" });

const martInfo = jsonData.map((data, index) => {
   return { 
     name: data['Name'],
     index: index + 3,
     address: data['Address']
   }
});

// fs.writeFile('./martinfo.json', JSON.stringify(martInfo), 'utf8', () => {
//     console.log('Done');
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  fs.readFile("./martinfo.json", 'utf8', function (err, data) {
    // var mart = JSON.parse(data);
    console.log(data.name);
    // res.render(__dirname + "/views/index.ejs", { mart : JSON.stringify(mart) });
  });
});

module.exports = router;