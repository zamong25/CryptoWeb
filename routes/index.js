const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const fs = require('fs');
const { localsName } = require('ejs');
const axios = require("axios");
axios.default.timeout = 5 * 1000;
const DomParser = require("dom-parser");
const parser = new DomParser();
const convert = require('xml-js');
const request = require('request');
const { getSystemErrorMap } = require('util');

process.on("uncaughtException", function(err) { 
  console.error("uncaughtException (Node is alive)", err); 
});

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

router.get('/', function(req, res) {
  fs.readFile("./martinfo.json", 'utf8', function (err, data) {
    var mart = JSON.parse(data);
    res.render("index.ejs", { mart : mart });
  });
});

router.post('/', function(req, res, next) {

  var martName = req.body.martName;
  console.log(martName);

  if (martName.includes("롯데마트")) {
    console.log("롯데마트 파일 가져와");
    var data = fs.readFileSync('./lotteMart.json', 'utf8');
    console.log(data);
    res.render("index.ejs", { products : data });
  }
  else if (martName.includes("롯데슈퍼")) {
    console.log("롯데슈퍼 파일 가져와");
    var data = fs.readFileSync('./lotteSuper.json', 'utf8');
    //console.log(data);
    res.json(JSON.parse(data));
  }
  else if (martName.includes("롯데백화점")) {
    console.log("롯데백화점 파일 가져와");
    var data = fs.readFileSync('./lotteDepartment.json', 'utf8');
    console.log(data);
    res.render("index.ejs", { products : data });
  }
  else {
    console.log("아무것도 아니야");
    var data = fs.readFileSync('./lotteSuper.json', 'utf8');
    console.log(data);
    res.render("index.ejs", { products : data });
  }
  
});


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(express.static("public"));

module.exports = router;

/* 
1. get mart.list[i].name from index.ejs to index.js -> router.get(url, function (req, res) {
    let name = req.
})
2. send products data by reading json file from index.js to index.ejs -> res.render()
*/
/*
if (mart.list[i].name.contains("롯데마트")) {
  fs.readFile("./lotteMart.json", 'utf8', function (err, data) {
      var products = JSON.parse(data);
      res.render("index.ejs", { products : products });
  });
}
else (mart,list[i].name.contains("롯데슈퍼")) {
  fs.readFile("./lotteSuper.json", 'utf8', function (err, data) {
      var products = JSON.parse(data);
      res.render("index.ejs", { products : products });
  });
}
else (mart,list[i].name.contains("롯데백화점")) {
  fs.readFile("./lotteDepartment.json", 'utf8', function (err, data) {
      var products = JSON.parse(data);
      res.render("index.ejs", { products : products });
  });
}
else if {
  fs.readFile("./0806.json", 'utf8', function (err, data) {
      var martAndProducts = JSON.parse(data);
      res.render("index.ejs", { martAndProducts : martAndProducts });
  });
}
*/


/**
 * [The code can make martinfo.excel to json file] 
// const excel = xlsx.readFile('/Users/uzzing/Repository_Github/MartInfo_Web/Excel/MartInfo.xlsx');
// const sheetName = excel.SheetNames[0];
// const firstSheet = excel.Sheets[sheetName];
// const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval : "" });

// const martInfo = jsonData.map((data, index) => {
//    return { 
//      entpId: data['entpId'],
//      name: data['Name'],
//      index: index + 3,
//      address: data['Address']
//    }
// });
// 
// fs.writeFile('./martinfo.json', JSON.stringify(martInfo), 'utf8', () => {
//     console.log('Done');
// });
 */

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/**
 * sleep(1000)
        .then(
          fetch(url)
          .then(res => convert.xml2json(res, {compact : true, spaces: 4}))
          // .then(str => parser.parseFromString(str, "text/html"))
          .then(data => {
            fs.writeFile('./productPriceInfo.json', data, 'utf8', () => {
                console.log("done");
              });
          })
        ).catch(function (err) {
          console.log(err);
        });
         // fs.writeFile('./martinfo.json', content, 'utf8', () => {
        //   console.log('Done');
        // });
  // for (var i = 0; i < 102; i++) {

    //   const HOST = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do?goodInspectDay=20210806&entpId=';
    //   const SERVICE_KEY = '&ServiceKey=5ZDC6seJhCoIWl9KnCZsc0zxjP4SgXM4ZiEw1pLdbhrkF6pTmAwm90QVpwFyP4fHfxRoqWpczp69yYIAEjGb2Q==';
    //   var num = mart.list[i].entpId;
    //   var requestUrl = `${HOST}${num}${SERVICE_KEY}`;

    //   request.get(requestUrl, (err, res, body)=> {
    //     if (err) {
    //         console.log(`err => ${err}`);
    //     }
    //     else {
    //         if (res.statusCode == 200) {
    //           var xmlToJson = convert.xml2json(body, {compact: true, spaces: 4});
    //           var newJson = JSON.parse(xmlToJson);
    //           var originalFile = fs.readFileSync('./productPriceInfo_0806.json', 'utf8');
    //           var obj = JSON.parse(originalFile);
    //           obj.list.push(newJson.response.result);
    //           var json = JSON.stringify(obj);
    //           fs.writeFileSync('./productPriceInfo_0806.json', json, 'utf8', () => {
    //             console.log("done");
    //           });
    //         }
    //     }
    //   });
    // }
    for (var i = 0; i < 1019; i++) {

      const HOST = 'http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do?goodInspectDay=20200313&entpId=';
      const SERVICE_KEY = '&ServiceKey=5ZDC6seJhCoIWl9KnCZsc0zxjP4SgXM4ZiEw1pLdbhrkF6pTmAwm90QVpwFyP4fHfxRoqWpczp69yYIAEjGb2Q==';
      var num = mart.list[i].entpId;
      var requestUrl = `${HOST}${num}${SERVICE_KEY}`;

      request.get(requestUrl, (err, res, body)=> {
        if (err) {
            console.log(`err => ${err}`);
        }
        else {
            if (res.statusCode == 200) {
              var xmlToJson = convert.xml2json(body, {compact: true, spaces: 4});
              var newJson = JSON.parse(xmlToJson);
              var originalFile = fs.readFileSync('./productPriceInfo_0806.json', 'utf8');
              var obj = JSON.parse(originalFile);
              obj.list.push(newJson.response.result);
              var json = JSON.stringify(obj);
              fs.writeFileSync('./productPriceInfo_0806.json', json, 'utf8', () => {
                console.log("done");
              });
            }
        }
      });
    }
    */