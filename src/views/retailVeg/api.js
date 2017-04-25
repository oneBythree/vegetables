/**
 * create 2017/02/22
 * author ypf
 */
'use strict';


function getCustomerData(dataJson, callback) {
    const customerListUri = 'mobileTrace.do?method=getRetailer';
    $.ajax({
        type: "GET",
        url: customerListUri,
        dataType: "json",
        data: dataJson,
        success: function(json) {
            callback && callback(json)
        }
    })
}

/**
 * [getVegData ajax获取蔬菜类型 description]
 * @param  {[type]}   dataJson [ajax（data）]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
function getVegData(dataJson, callback) {
    const uri = 'mobileTrace.do?method=getGoodsCode';
    $.ajax({
        type: "GET",
        url: uri,
        dataType: "json",
        data: dataJson,
        success: function(json) {
            callback && callback(json)
        }
    })
}

/**
 * [getVegData ajax获取供应商 description]
 * @param  {[type]}   dataJson [ajax（data）]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
function getSupplierData(dataJson, callback) {
    const uri = 'mobileTrace.do?method=getWsSupplier';
    $.ajax({
        type: "GET",
        url: uri,
        dataType: "json",
        data: dataJson,
        success: function(json) {
            callback && callback(json)
        }
    })
}


function saveVeg(dataJson, callback) {
    const uri = 'mobileTrace.do?method=saveSaleVegIn'
    $.ajax({
        type: "GET",
        url: uri,
        dataType: "json",
        data: dataJson,
        success: function(json) {
            callback && callback(json)
        }
    })
}

module.exports.getCustomerData = getCustomerData;
module.exports.getVegData = getVegData;
module.exports.getSupplierData = getSupplierData;
module.exports.saveVeg = saveVeg;
