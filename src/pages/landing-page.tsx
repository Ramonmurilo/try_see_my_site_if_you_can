import "react"
import "./landing-page.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();


    const navigateToLogin = () => {
        navigate("/login");
    }


    function StartButton() {

        const [count, setCount] = useState(0);
        const stopped = count >=10;

        const handleMouseOver = () => {
            if (stopped) return;

            const btn = document.getElementById("start-button") as HTMLButtonElement;
            const maxX = window.innerWidth - btn.offsetWidth;
            const maxY = window.innerHeight - btn.offsetHeight;
            btn.style.left = `${Math.floor(Math.random()*maxX)}px`;
            btn.style.top = `${Math.floor(Math.random()* maxY)}px`;
            btn.style.transform = 'none';

            setCount(c => c + 1);
            
        }
        const centeredStyle = { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };

        return (
            <button 
            id="start-button" 
            onMouseMove={handleMouseOver}
            style={stopped ? centeredStyle : {}}
            onClick={navigateToLogin}
            >
                {stopped ? 'its over! next page is on construction!' : "Let's GOOO"}
            </button>
        );
    }

    return (
        <>
            <section id="first-message">
                
                <div className="texto-inicial">

                    <h1> Hello, welcome to my site! Enjoy!</h1>
                    
                    <div className="texto-siga">
                        let's start!
                    </div>

                    <div className="buttons">
                        <StartButton/>
                    </div>
                </div>



            </section>
        </>
    )
}

export default LandingPage