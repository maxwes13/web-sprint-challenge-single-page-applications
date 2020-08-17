import React from "react";
import { Link } from "react-router-dom"


const Main = (props) => {
    return (

    <div className="home">
        <header>
            <nav>
                <h1>Lambda Eats</h1>
                <Link to='/'>Home</Link>
                <Link to='/pizza'>
                    <button className="pizza-button">Order Here!</button>
                </Link>
            </nav>
        </header>
    </div>

    )
}

export default Main;