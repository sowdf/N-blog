import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import Header from './header';
import Article from './article';
import Sidebars from './sidebar';
import Footer from './footer';

class Main extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <div id="content">
                    <Article/>
                    <Sidebars/>
                </div>
                <Footer/>
            </div>
        )
    }
};
let oDiv = document.createElement('div');
document.body.appendChild(oDiv);
ReactDOM.render(<Main/>,oDiv);



