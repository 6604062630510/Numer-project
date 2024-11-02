import { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate, compile, range } from 'mathjs';
import Plotly from 'plotly.js-dist';

const Onepoint= () => {
    const plotRef = useRef(null);

    const test = () => {
        try {
            const expression = document.getElementById('eq').value;
            const expr = compile(expression);
            const xVal = range(-10, 10, 0.5).toArray();
            const yVal = xVal.map((x) => expr.evaluate({ x: x }));

            const trace1 = {
                x: xVal,
                y: yVal,
                type: 'scatter'
            };
            const data = [trace1];
            Plotly.newPlot(plotRef.current, data);
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };

    return (
        <Container>
            <Form.Group>
                <Form.Label>Input Expression (f(x)):</Form.Label>
                <Form.Control type="text" id="eq" placeholder="Enter equation" />
            </Form.Group>
            <Button onClick={test} variant="dark">
                Plot Graph
            </Button>
            <div ref={plotRef} id="plot" style={{ width: "100%", height: "800px" }}></div>
        </Container>
    );
};

export default Onepoint;
