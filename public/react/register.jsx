import React from 'react';
import cp from '../js/component';
import main from '../js/main';

export default class Register extends React.Component{
    loginHandle(){
        cp.loginReg({
            login : true,
            register : false,
        });
    }
    submitHandle(){
        let register = {
            userName : this.refs.username.value,
            password : this.refs.password.value,
            repassword : this.refs.repassword.value
        };

        main.register(register);
    }
    render(){
        let isShow = this.props.isShow ? 'block' : 'none';
        return (
            <div className="m_user" style={{display:isShow}}>
                <div className="title">
                    <i></i>注册
                </div>
                <div className="box">
                    <input type="text" className="user" ref='username' placeholder="请输入您的账号"/> <br/>
                    <input type="password" ref='password' placeholder="请输入您的密码"/> <br/>
                    <input type="password" ref='repassword' placeholder="请再次输入您的密码"/> <br/>
                    <button className="submit" onClick={this.submitHandle.bind(this)}>注册</button>
                </div>
                <p className="tips">已有注册账号？<a href="javascript:;" onClick={this.loginHandle}>马上登录</a></p>
                <p className="hint">{this.props.message}</p>
            </div>
        );
    }
}