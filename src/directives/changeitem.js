export  function changItem(obj){
      var arr = [];
     $.each(obj, function(key, item) {
        if (typeof item === 'string') {
            arr.push({
                key: key,
                item: item
            })
        } else {
            arr.push(item);
        }
    })
    return arr;
}
