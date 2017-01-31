import React from 'react';
import cp from '../js/component';
import main from '../js/main';


export default class Login extends React.Component{
    regHandle(){
        cp.loginReg({
            login : false,
            register : true
        });
    }
    submitHandle(){
        let login = {
            username : this.refs.username.value,
            password : this.refs.password.value
        };
        main.login(login);
    }
    render(){
        let isShow = this.props.isShow ? 'block' : 'none';
        return (
            <div className="m_user" style={{display:isShow}}>
                <div className="title">
                    <i></i>登录
                </div>
                <div className="box">
                    <input type="text" className="user" ref='username' placeholder="请输入您的账号"/> <br/>
                    <input type="password" ref='password' placeholder="请输入您的密码"/> <br/>
                    <button className="submit" onClick={this.submitHandle.bind(this)}>登录</button>
                </div>
                <p className="tips">没有账号？<a href="javascript:;" onClick={this.regHandle}>马上注册</a></p>
                <p className="hint">{this.props.message}</p>
            </div>
        );
    }
}