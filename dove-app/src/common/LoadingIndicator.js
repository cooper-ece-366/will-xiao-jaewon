import React from 'react';
import { ThreeBounce } from 'better-react-spinkit'

// Reference: exempli-gratia
// Edited by Xiao Lin

//Show a loading indicator with animations
export default function LoadingIndicator() {
    return (
        <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
            Loading ...
            <div>
                <ThreeBounce size={20} color='blue' />
            </div>
        </div>
    );
}