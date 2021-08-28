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
    for (var i = 0; i < 1; i++) {

      let options = {
        method: "GET",
        hostname: "openapi.price.go.kr",
        path: "/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do",
        params: {
          goodInspectDay : '20210820',
          entpId : mart.list[i].entpId,
          ServiceKey : 'yNc8/uCtg/QQnPAv9+JOrvKD4SIFKlNW/sHUVUzDwV55Q8Qz1UsPFApX32Y/WXM9xRdqHxatmGvLf81uPv6ulQ=='
        }
      }

      let url = "http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do?" + new URLSearchParams({
        goodInspectDay : '20210820',
        entpId : mart.list[i].entpId,
        ServiceKey : 'yNc8/uCtg/QQnPAv9+JOrvKD4SIFKlNW/sHUVUzDwV55Q8Qz1UsPFApX32Y/WXM9xRdqHxatmGvLf81uPv6ulQ=='
      });

      let URL = "http://openapi.price.go.kr/openApiImpl/ProductPriceInfoService/getProductPriceInfoSvc.do?goodInspectDay=20210820&entpId=642&ServiceKey=yNc8%2FuCtg%2FQQnPAv9%2BJOrvKD4SIFKlNW%2FsHUVUzDwV55Q8Qz1UsPFApX32Y%2FWXM9xRdqHxatmGvLf81uPv6ulQ%3D%3D";

      request.get(URL, (err, res, body)=> {
        if (err) {
            console.log(`err => ${err}`);
        }
        else {
            if (res.statusCode == 200) {
              var result = body;
              // console.log(`body data => ${result}`);
              var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
              // console.log(`xml to json => ${xmlToJson}`);
              fs.writeFile('./productPriceInfo.json', xmlToJson, 'utf8', () => {
                console.log("done");
              });
            }
        }
      });
    }
  });
});

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(express.static("public"));

module.exports = router;



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
 */