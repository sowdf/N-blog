import React from 'react';

import Login from './login';
import Register from './register';
import UserInfo from './userInfo';
import cp from '../js/component';
import main from '../js/main';

export default class LoginReg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login : true,
            register : false,
            userInfo : false,
            username : '',
            message : '',
            isAdmin : false
        }
    }
    componentDidMount(){
        cp.loginReg = function(data){
            this.setState(data);
        }.bind(this);
        cp.updateMessage = function(message){
            this.setState({
                message : message
            });
        }.bind(this);
        cp.updateUserInfo = function(username,isAdmin){
            this.setState({
                username : username,
                isAdmin :isAdmin
            });
        }.bind(this);
        cp.updateLoginRegComponent = function(data){
            this.setState(data);
        }.bind(this);
        main.userInfoInit();
    }
    render(){
        return (
            <div>
                <Login isShow={this.state.login} message={this.state.message}/>
                <Register isShow={this.state.register} message={this.state.message}/>
                <UserInfo isShow={this.state.userInfo} username={this.state.username} isAdmin={this.state.isAdmin}/>
            </div>
        );
    }
}