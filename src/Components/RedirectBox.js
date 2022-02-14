import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
const RedirectBox = ({ state }) => {
    const navigate = useNavigate();
    const [boxDisplay, setBoxDisplay] = useState(state.box)
    const [ScreenDisplay, setScreenDisplay] = useState(state.screen)
    useEffect(() => {
        setBoxDisplay(state.box);
        setScreenDisplay(state.screen)
    }, [state]);
    return (
        <div className="redirectbox" style={{ display: ScreenDisplay }}>
            <div className="inner-rbox" style={{ display: boxDisplay }}>
                <h2 style={{margin:"0.4rem 0"}}>Uh! No</h2>
                <p>You are not logged in.</p>
                <div style={{ marginTop:"0.4rem", display: "flex", justifyContent: "space-between" }}>
                    <button className="btn-rbox"
                        onClick={() => { navigate('/login') }}
                    >Login</button>
                    <button className="btn-rbox"
                        onClick={() => { setBoxDisplay('none'), setScreenDisplay('none') }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default RedirectBox;
