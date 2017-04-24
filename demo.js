var baiduzs = require('./src/baiduzb');

var url = 'http://api.map.baidu.com/geocoder/v2/?';
var uri = '/geocoder/v2/';
var ak = 'yourak';
var sk = 'yoursk';
var output = 'json';

var address = '百度大厦';
var location_bd = '39.983424,116.322987';  //;
var location_gps = '35.4170983333333,116.558896666667';   //'40.05685561073758,116.30775539540982'

//根据
baiduzs.getMapInfoGeocoder(baiduzs.getData({coordtype:'wgs84ll', location:location_gps, posi:0, ak:ak}, 2), url, uri, sk, function(data){
    console.log(data);
});

baiduzs.getMapInfoGeocoder(baiduzs.getData({address:address, ak:ak}, 1), url, uri, sk, getInfo);
