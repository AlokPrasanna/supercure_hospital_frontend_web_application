import React from 'react';

const Image = ({ src, alt, style }) => {
    const Style = style ? style :  `w-[100px] h-[100px]`

    return (
        <div>
            <img className={`${Style}`} src={src} alt={alt} style={{backgroundSize:'cover', backgroundPosition:'center'}} />
        </div>
    );
}

export default Image;
