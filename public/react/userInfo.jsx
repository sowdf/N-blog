import React from 'react';
import main from '../js/main';
export default class UserInfo extends React.Component{
    logoutHandle(){
        main.logout();
    }

    render(){
        let isShow = this.props.isShow ? 'block' : 'none';
        return (
            <div className="m_user" style={{display:isShow}}>
                {
                    this.props.isAdmin ?  <div className="userInfo">
                            <em>{this.props.username}</em><a href="/admin/">进入管理页面</a><a href="javascript:;" onClick={this.logoutHandle}>退出</a>,<br/>欢迎管理员~~
                        </div> :  <div className="userInfo">
                            <em>{this.props.username}</em><a href="javascript:;" onClick={this.logoutHandle}>退出</a>,<br/>欢迎光临我的博客~~
                        </div>
                }

            </div>
        );
    }
}