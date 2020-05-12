import React, { Component } from 'react';

function BgPhotoInit() {
    const backGroundImg = document.querySelector("#root .App .bgPhoto");
    const unsplashUrl = "https://source.unsplash.com/category/nature/1600x900";
  
    function getImage() {
      let bgImg = new Image();
        bgImg.alt = "배경화면";
        bgImg.src = unsplashUrl;
        backGroundImg.appendChild(bgImg);
    }

    function init(){
      getImage();
  
    }
  
    init();
}

class BgPhoto extends Component {
    componentDidMount() {
        BgPhotoInit();
    }
    
    render() {
        return (
            <div id="bgPhoto">
                <div id="container">
                    <div className="bgPhoto"></div>
                </div>
            </div>
        )
    }
}

export default BgPhoto;