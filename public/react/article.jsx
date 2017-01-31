import React from 'react';

export default class Article extends React.Component{
    render(){
        return (
            <div id="posts">
                <div className="post">
                    <h2>Retro Photos</h2>
                    <div><span className="date">Mar 18th</span><span className="categories">in: Photos, Retro</span></div>
                    <div className="description">
                        <p><img src="images/pic1.jpg" alt="" width="239" height="232" />
                            Lorem ipsum dolor sit amet, consectetuer adipi scing elit.Mauris urna urna, varius et, interdum a, tincidunt quis, libero. Aenean sit amturpis. Maecenas hendrerit, massa ac laoreet iaculipede mnisl ullamcorpermassa, cosectetuer feipsum eget pede. Proin nunc. Donec nonummy, tellus er sodales enim, in tincidunmauris in odio. Massa ac laoreet iaculipede nisl ullamcorpermassa, ac consectetuer feipsum eget pede.  Proin nunc. Donec massa. Nulla pulvinar, nisl ac convallis nonummy, tellus eros sodales enim, in tincidunt mauris in odio.  massa ac laoreet iaculipede niorpermassa,consectetuer feipsum eget pede. Proin nunc. Donec massa. Nulla pulvinar, nisl ac convallis nonummy, tellus eros sodales enim, in tincidunt mauris in odio. Lorem ipsum dolor sit amet, consectetuer adipi scing elit.Mauris urna urna, varius et, interdum a, tincidunt quis, libero. Aenean sit amturpis. </p>
                    </div>
                    <p className="comments">Comments - <a href="sc.chinaz.com">17</a>   <span>|</span>   <a href="index2.html">Continue Reading</a></p>
                </div>
                <div className="post">
                    <h2>Original Wordpress Themes</h2>
                    <div><span className="date">Mar 12th</span><span className="categories">in: Design, Themes</span></div>
                    <div className="description">
                        <p>Lorem ipsum dolor sit amet, consectetuer adipi scing elit.Mauris urna urna, varius et, interdum a, tincidunt quis, libero. Aenean sit amturpis. Maecenas hendrerit, massa ac laoreet iaculipede mnisl ullamcorpermassa, cosectetuer feipsum eget pede. Proin nunc. Donec nonummy, tellus er sodales enim, in tincidunmauris in odio. Massa ac laoreet iaculipede nisl ullamcorpermassa, ac consectetuer feipsum eget pede.  Proin nunc. Donec massa. Nulla pulvinar, nisl ac convallis nonummy, tellus eros sodales enim, in tincidunt mauris in odio.  massa ac laoreet iaculipede niorpermassa,consectetuer feipsum eget pede. Proin nunc. Donec massa. Nulla pulvinar, nisl ac convallis nonummy, tellus eros sodales enim, in tincidunt mauris in odio. Lorem ipsum dolor sit amet, consectetuer adipi scing elit.Mauris urna urna, varius et, interdum a, tincidunt quis, libero. Aenean sit amturpis. </p>
                    </div>
                    <p className="comments">Comments - <a href="sc.chinaz.com">17</a>   <span>|</span>   <a href="index2.html">Continue Reading</a></p>
                </div>
            </div>
        );
    }
}