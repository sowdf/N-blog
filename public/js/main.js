import cp from '../js/component';
let main = {
    userInfoInit (){
        $.ajax({
            url : '/api/user/userInfo',
            type : 'GET',
            dataType : 'JSON',
            success : function(res){
                if(!res.code){
                    cp.updateLoginRegComponent({
                        login : false,
                        register : false,
                        userInfo : true,
                        username : res.result.username,
                        isAdmin : res.result.isAdmin
                    });
                }else {
                    cp.updateLoginRegComponent({
                        login : true,
                        register : false,
                        userInfo : false
                    });
                }
            }
        })

    },
    register(data){
        $.ajax({
            url : '/api/user/register',
            type : 'POST',
            dataType : 'JSON',
            data : {
                username : data.userName,
                password : data.password,
                repassword : data.repassword
            },
            success : function(res){
                cp.updateMessage(res.message);
                if(!res.code){
                    setTimeout(function(){
                        cp.loginReg({
                            register : false,
                            login : true
                        });
                    },1000)
                }

            }
        })
    },
    login(data){
        $.ajax({
            url : '/api/user/login',
            type : 'POST',
            dataType : 'JSON',
            data : {
                username : data.username,
                password : data.password
            },
            success : function(res){
                cp.updateMessage(res.message);
                cp.updateUserInfo(res.result.username,res.result.isAdmin);
                setTimeout(function(){
                    if(!res.code){
                        setTimeout(function(){
                            cp.loginReg({
                                register : false,
                                login : false,
                                userInfo : true
                            });
                        },1000)
                    }
                });
            }
        })
    },
    logout(){
        $.ajax({
            url : '/api/user/logout',
            type : 'GET',
            dataType : 'JSON',
            success : function(res){
                if(!res.code){
                    cp.updateLoginRegComponent({
                        login : true,
                        register : false,
                        userInfo : false,
                        username : ''
                    });
                }
            }
        })
    }
};
export default main;
