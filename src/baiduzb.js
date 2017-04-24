var http_build_query = require('locutus/php/url/http_build_query')
var crypto = require('crypto');
const util = require('util');
var request = require('request');

//md5生成
function genMd5(str) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};

//计算百度地图sn
function caculateAKSN(sk, url, data){
    var querystr = http_build_query(data)
    //console.log('querystr:'+querystr+'\n');
    return genMd5(encodeURIComponent(url+'?'+querystr+sk));
}

//调用百度api，返回信息
function getInfo(url, callback){
    if (!url) { 
        callback(); 
    };
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // 打印google首页
            callback(body);
        } else {
            callback(error);
        }
    })
}

//生成数据对象  flag:1根据地址返回坐标    2根据坐标返回地址信息   
function getData(adata, flag=1){
    var data = {};
    if (flag===1){
        Object.assign(
            data,{
            address:'',
            city:'',
            output:'json',
            ak:''
        });
    } else if (flag===2){
        Object.assign(
            data, {
            coordtype:'bd09ll',
            location:'',
            city:'',
            output:'json',
            posi:0,
            ak:''
        });
    };
    Object.assign(data, adata);
    return data;
}

//调用百度接口Geocoder
//bd09ll（百度经纬度坐标）、bd09mc（百度米制坐标）、gcj02ll（国测局经纬度坐标）、wgs84ll（ GPS经纬度）
function getMapInfoGeocoder(adata, aurl, auri, ask, callback){
    var data = adata;
    var sn = caculateAKSN(ask, auri, data);
    //data.location = encodeURIComponent(data.location);  //这个不需要了，http_build_query内部做了编码处理
    data.sn = sn;
    var url = aurl + http_build_query(data);   
    //console.log('url:'+url+'\n');
    
    //var target = util.format(url,encodeURIComponent(data.location),data.output,data.ak,sn);  //根据字符串模板生成，不再使用这个方法，这样不灵活
    getInfo(url, function(data){
        if (callback) {
            callback(data);
        } else {
            return data;
        }
    })
};

module.exports['getData'] = getData;
module.exports['getMapInfoGeocoder'] = getMapInfoGeocoder;
