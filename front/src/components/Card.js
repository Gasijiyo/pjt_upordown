import React from "react";
import "./Card.css"

function Card({title, imageUrl, body0, body1=<br/>, email}) {
    var mail_adress = 'mailto:' + email + '@naver.com'
    return (
        <div className="card-container">
            <div className="image-container">
                <img src={imageUrl} alt='' />
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3 className="h3-c">{title}</h3>
                </div>
                <div className="card-body">
                    <p className="pc">{body0}</p>
                    <p className="pc">{body1}</p>
                </div>
            </div>
            
            <div className="btn">
                <button>
                    <a href={mail_adress}>
                        Contact me! 
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Card