export function uique(arr) {
    var temp = [];
    for (var i in arr) {
        if (temp.indexOf(arr[i]) == -1) {
            temp.push(arr[i]);
        }
    }
    return temp;
}


export function remove(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}



/**
 * [myDate description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function myDate(nextDay) {
    var d = new Date();
    var t = nextDay == undefined ? d.getTime() : d.getTime() - 1000 * 60 * 60 * 24 * nextDay;
    var cur = new Date(t);
    var year = cur.getFullYear();
    var month = cur.getMonth() + 1 >= 10 ? parseInt(cur.getMonth()) + 1 : '0' + (parseInt(cur.getMonth()) + 1);
    var day = cur.getDate() >= 10 ? parseInt(cur.getDate()) : '0' + cur.getDate();
    return year + '-' + month + '-' + day;
}


export function splitDate(date) {
    return date.split('-')[1] + '-' + date.split('-')[2];
}


export function changJSONkey(arrayJson, arrayKey) {
    var stringJson = JSON.stringify(arrayJson);
    var aa = stringJson.replaceAll(arrayKey[0], 'value');
    var ss = JOSN.parse(aa.replaceAll(arrayKey[1], 'index'));

    return ss;
}
