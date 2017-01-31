let cookies = {
    get : function(key){
        var arr = document.cookie.split(';');
        console.log(arr);
        for(var i=0; i<arr.length; i++){
            var arr2 = arr[i].split('=');
            if(arr2[0] == key){
                return decodeURI(arr2[1]);
            }
        }
    }
};

export default cookies;