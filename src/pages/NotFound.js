import React from 'react';
export function NotFound(){
    return <h1 style={{
        height:window.innerWidth < 610 ? `${window.innerHeight-102}px` : `${window.innerHeight-57}px`
    }} className="blank-page-text">404 Page Not Found!!!!!</h1>
}