import React from "react";
import Card from "./Card/Card/index";

function CallingCards({ results }) {
    console.log(results)
    return (
        <>
            <div className="heading">
                <h1 className="heading-h1">Don't forget to bring your</h1>
            </div>

            <Card results={results} />
        </>
    );
}

export default CallingCards;