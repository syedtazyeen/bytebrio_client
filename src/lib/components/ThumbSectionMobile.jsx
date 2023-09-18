import React from "react";


function ThumbSectionMobile(props){
    const {title,subtitle} = props
    return(
        <div>
            <div>
                <text>{title}</text>
                <text>{subtitle}</text>
            </div>
            <div>
                img
            </div>
        </div>
    )
}