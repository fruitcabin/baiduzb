# baiduzb
使用百度地图服务，查询地址的坐标或根据坐标返回定位信息

# Install
npm install baiduzb

调用百度地图服务，获取坐标或位置信息

getData
生成数据对象，调用格式：getData(adata, flag=1)

flag为1（根据地址返回坐标时），adata格式：
{
    address:'',
    city:'',
    output:'json',
    ak:'' //API控制台申请得到的ak
}
flag为2（根据坐标返回地址信息）时，adata格式：
{
    coordtype:'bd09ll',
    location:'',
    city:'',
    output:'json',
    posi:0,
    ak:''
}

getMapInfoGeocoder
调用百度接口Geocoder，调用格式：getMapInfoGeocoder(adata, aurl, auri, ask, callback)

adata：查询参数，可以使用getData生成。
aurl：地理编码的请求url，http://api.map.baidu.com/geocoder/v2/?
auri：get请求uri前缀，/geocoder/v2/
ask：Security Key
