module.exports  = function (namespace, data){
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var storeData = localStorage.getItem(namespace);
    return (storeData && JSON.parse(storeData)) || [];
};

