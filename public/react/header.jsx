import React from 'react';
import cp from '../js/component';
import main from '../js/main';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories : ''
        }
    }
    componentDidMount(){
        main.categoriesInit(function(res){
            this.setState({
                categories : res
            })
        }.bind(this))
    }
    render(){
        return (
            <div id="header">
                <span className="logo">blog about web design</span>
                <ul id="menu" className="m_mean">
                    <li><a href="/">首页</a></li>

                    {
                        this.state.categories == '' ? '' : this.state.categories.map(function(item,index){
                            return <li key={index} ><a href="index.html">{item.name}</a></li>
                            })
                    }
                </ul>
                <div className="rss m_setalpm">

                </div>
                <map name="Map">
                    <area shape="circle" coords="60,60,63" href="sc.chinaz.com" />
                </map>
            </div>
        );
    }
}