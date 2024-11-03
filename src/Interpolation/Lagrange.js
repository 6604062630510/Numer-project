import React, { useState ,useEffect } from 'react';
import { lagrangeCal } from './LagrangeFunc';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Button, Container, Form } from "react-bootstrap";
import CallFormula from "../CallFunc";
import "./inter.css"

const Lagrange = () =>{

    const [n, setN] = useState(5);
    const [xValues, setXValues] = useState([0, 20000, 40000, 60000, 80000]);
    const [yValues, setYValues] = useState([9.81, 9.7487, 9.6879, 9.6879,9.5682]);
    const [value, setValue] = useState(42000);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const [formula, setFormula] = useState("");

    useEffect(()=>{
        if (window.MathJax) {
            window.MathJax.typeset(); 
        }
        const fetchFormula = async () => {
            const formulaGet = await CallFormula("Lagrange", 1);
            setFormula(formulaGet);
        };

        fetchFormula();


    }, [formula]);

    const handleCalculate =()=>{
        setError("");

        if(n < 2){
            setError("Number of points must be at least 2.");
            return;
        }else if(xValues.length != n || yValues.length != n){
            setError("X and Y values must have the same length as the number of points.");
            return;
        }else if(value === ""){
            setError("Value cannot be empty.");
            return;
        }

        const Answer = lagrangeCal(xValues, yValues, n, value);
        setResult(Answer);
    };

    return (
        <Container>
            <h1>Lagrange</h1>
            <MathJaxContext>
                <MathJax>
                <ul className='formu'>
                    {`$$${formula}$$`}

                </ul>

            </MathJax>
            </MathJaxContext>
            <Form className='form-mm text-center'>
                <Form.Group className='mb-4 row justify-content-center'>
                    <div className='col-md-3'>
                        <Form.Label>Number of points</Form.Label>
                        <input 
                            className='form-control-lg text-center'
                            type='number'
                            value={n}
                            onChange={(e)=> setN(Number(e.target.value))}
                            />

                    </div>
                </Form.Group>

                <Form.Group className='mb-4 row justify-content-center'>
                    <div className='col-md-3'>
                        <Form.Label>X Value</Form.Label>
                        <Form.Label>(comma-separated)</Form.Label>
                        <input 
                            className='form-control-lg w-100 text-center'
                            type='text'
                            value={xValues}
                            onChange={(e)=> setXValues(e.target.value.split(',').map(Number))}
                            />

                    </div>

                    <div className='col-md-3'>
                        <Form.Label>Y Value</Form.Label>
                        <Form.Label>(comma-separated)</Form.Label>
                        <input 
                            className='form-control-lg w-100 text-center'
                            type='text'
                            value={yValues}
                            onChange={(e)=> setYValues(e.target.value.split(',').map(Number))}
                            />

                    </div>
                </Form.Group>

                

                <Form.Group className='mb-4 row justify-content-center'>
                    <div className='col-md-2'>
                        <Form.Label>Value</Form.Label>
                        <input 
                            className='form-control-lg w-100 text-center'
                            type='number'
                            value={value}
                            onChange={(e)=> setValue(Number(e.target.value))}
                            />

                    </div>
                </Form.Group>

                <Form.Group className='mt-4 mb-4 justify-content-center'>
                    <Button className='btn-lg' variant='danger' onClick={handleCalculate}>Calculate</Button>
                </Form.Group>
                <Container>
                {error && (
                    <div>
                        <mark className='Error-display'>{error}</mark>
                    </div>
                )}

                {result !== null && !error && (
                    <div >
                    <h5 className='Answer'>Result : {result.toFixed(6)}</h5>
                    </div>
                )}
                </Container>

            </Form>
        </Container>
    );
}
export default Lagrange;