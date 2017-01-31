import React from 'react';
import LoginReg from './loginRegister';



export default class Sidebars extends React.Component{
    render(){
        return (
            <div id="sidebar">
                <div id="search">
                    <input type="text" placeholder="Search"/> <a href="sc.chinaz.com"><img src="images/go.gif" alt="" width="26" height="26" /></a>
                </div>
                <div className="list">
                    <img src="images/title1.gif" alt="" width="186" height="36" />
                    <ul>
                        <li><a href="sc.chinaz.com">animation</a></li>
                        <li><a href="sc.chinaz.com">magazines</a></li>
                        <li><a href="sc.chinaz.com">architecture</a></li>
                        <li><a href="sc.chinaz.com">news</a></li>
                        <li><a href="sc.chinaz.com">art</a></li>
                        <li><a href="sc.chinaz.com">photography</a></li>
                        <li><a href="sc.chinaz.com">blogs</a></li>
                        <li><a href="sc.chinaz.com">product design</a></li>
                        <li><a href="sc.chinaz.com">books</a></li>
                        <li><a href="sc.chinaz.com">stuff</a></li>
                        <li><a href="sc.chinaz.com">graphic design</a></li>
                        <li><a href="sc.chinaz.com">web design</a></li>
                        <li><a href="sc.chinaz.com">illustration</a></li>
                    </ul>
                    <img src="images/title2.gif" alt="" width="180" height="34" />
                    <ul>
                        <li><a href="sc.chinaz.com">January</a></li>
                        <li><a href="sc.chinaz.com">July</a></li>
                        <li><a href="sc.chinaz.com">February</a></li>
                        <li><a href="sc.chinaz.com">August</a></li>
                        <li><a href="sc.chinaz.com">March</a></li>
                        <li><a href="sc.chinaz.com">September</a></li>
                        <li><a href="sc.chinaz.com">April</a></li>
                        <li><a href="sc.chinaz.com">October</a></li>
                        <li><a href="sc.chinaz.com">May</a></li>
                        <li><a href="sc.chinaz.com">November</a></li>
                        <li><a href="sc.chinaz.com">June</a></li>
                        <li><a href="sc.chinaz.com">December</a></li>
                    </ul>
                </div>
                <LoginReg/>
            </div>
        );
    }
}