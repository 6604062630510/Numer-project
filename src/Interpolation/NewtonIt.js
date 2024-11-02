// InterpolationComponent.js
import React, { useState , useEffect} from 'react';
import { computeCoefficients, newtonPolynomial } from './newtonInterpolation';
import { Button, Container, Form } from "react-bootstrap";
import "./inter.css"
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import CallFormula from "../CallFunc";
const NewtonIt = () => {
    const [n, setN] = useState(3);
    const [xValues, setXValues] = useState([1, 2, 3]);
    const [yValues, setYValues] = useState([4, 5, 6]);
    const [value, setValue] = useState(1.5);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const [formula, setFormula] = useState("");

    useEffect(()=>{
        const fetchFormula = async () => {
            const formulaGet = await CallFormula("NewtonIter", 1); 
            setFormula(formulaGet);
        };

        fetchFormula();


    }, []);

    const handleCalculate = () => {

        setError("");


        if (n < 2) {
            setError("Number of points must be at least 2.");
            return;
        }
        if (xValues.length !== n || yValues.length !== n) {
            setError("X and Y values must have the same length as the number of points.");
            return;
        }
        if (value === "") {
            setError("Value cannot be empty.");
            return;
        }

        // Perform calculation
        const c = computeCoefficients(xValues, yValues, n);
        const interpolatedValue = newtonPolynomial(xValues, c, n, value);
        setResult(interpolatedValue);
    };

    return (
        <Container>
            <h1>Newton Interpolation</h1>

            <MathJaxContext>
                <MathJax>
                <ul className='formu'>
                    {`$$${formula}$$`}

                </ul>

            </MathJax>
            </MathJaxContext>
            <Form className="form-mm text-center">


            <Form.Group className="mb-3 row justify-content-center">
                <div className="col-md-3">
                <Form.Label>Number of Points</Form.Label>
                <input
                    className="form-control-lg w-100 text-center"
                    type="number"
                    value={n}
                    onChange={(e) => setN(Number(e.target.value))}
                />
                </div>
            </Form.Group>


            <Form.Group className="mb-4 row justify-content-center">
                <div className="col-md-3">
                <Form.Label>X Values</Form.Label>
                <Form.Label>(comma-separated)</Form.Label>
                <input
                    className="form-control-lg w-100 text-center"
                    type="text"
                    value={xValues}
                    onChange={(e) => setXValues(e.target.value.split(',').map(Number))}
                />
                </div>
                <div className="col-md-3">
                <Form.Label>Y Values</Form.Label>
                <Form.Label>(comma-separated)</Form.Label>
                <input
                    className="form-control-lg w-100 text-center"
                    type="text"
                    value={yValues}
                    onChange={(e) => setYValues(e.target.value.split(',').map(Number))}
                />
                </div>
            </Form.Group>




            <Form.Group className="mb-4 row justify-content-center">
                <div className="col-md-2">
                <Form.Label>Value :</Form.Label>
                <input
                    className="form-control-lg w-100 text-center"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                />
                </div>
            </Form.Group>


            <Form.Group className="mt-4 mb-4 justify-content-center">
                <Button variant="danger" className="btn-lg" onClick={handleCalculate}>Calculate</Button>
            </Form.Group>

            <Container>
                {error && (
                <div>
                    <mark className="Error-display">{error}</mark>
                </div>
                )}
                {result !== null && !error && (
                <div>
                    <h5 className="Answer">Result : {result.toFixed(6)}</h5>
                </div>
                )}
            </Container>
            </Form>

        </Container>
       
    );
};

export default NewtonIt;
