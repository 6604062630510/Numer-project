import React, { useState, useEffect } from 'react';


import { Button, Container, Form} from "react-bootstrap";
import "./inter.css"
import { creatMatrix, CalJordan } from './RegressFunc';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import CallFormula from "../CallFunc";



const Regression =()=>{

    const [formula, setFormula] = useState("");

    useEffect(()=>{
        if (window.MathJax) {
            window.MathJax.typeset(); 
        }
        const fetchFormula = async () => {
            const formulaGet = await CallFormula("Regression", 1); 
            setFormula(formulaGet);
        };

        fetchFormula();


    }, [formula]);
        

 
    
    const size = 3;
    const [results, setResults] = useState(Array(size).fill(0));
    const [n, setN] = useState(9);
    const [xValues, setXValues] = useState([10,15,20,30,40,50,60,70,80]);
    const [yValues, setYValues] = useState([5,9,15,18,22,30,35,38,43]);
    const [matrixA, setMatrixA] = useState([]);
    const [matrixB, setMatrixB] = useState([]);
    const [error, setError] = useState("");
    const [value, setValue] = useState(65);
    const [answerX, setAnswerX] = useState(0);
    

const handleCalculate = () => {
    
        setError("");

        if (xValues.length !==  yValues.length) {
            setError("X and Y values must have the same length");
            return;
        }
        
        setN(xValues.length);

        
        const {A, B} = creatMatrix(xValues, yValues, n);
        const { results } = CalJordan(A, B, size);

        setResults(results);
        setMatrixA(A);
        setMatrixB(B); 
        

        const answerX = results[0] +  value *  results[1] + results[2] * value * value;
        setAnswerX(answerX);

    };

    const setAns =(value)=>{
        const answerX = results[0] +  value *  results[1] + results[2] * value * value;
        setAnswerX(answerX);
    };


    return (
        <Container>
            
            <div><h1>Polynomial Regression</h1>
            <h3>(m = 2)
            </h3>
            </div>
            

            <MathJaxContext>
            <MathJax>
                <ul className='formu'>
                    {`$$ ${formula}$$`}
     
                </ul>

            </MathJax>
            </MathJaxContext>

            <Form className="form-mm text-center">

            {/* X Values */}
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
                    onChange={(e) =>  setYValues(e.target.value.split(',').map(Number))}
                />
                </div>
            </Form.Group>



            {/* Value */}
            <Form.Group className="mb-4 row justify-content-center">
                <div className="col-md-2">
                <Form.Label>Value</Form.Label>
                <input
                    className="form-control-lg w-100 text-center"
                    type="number"
                    value={value}
                    onChange={(e) => {setValue(Number(e.target.value))
                        setAns(Number(e.target.value));
                    }}
                />
                </div>
            </Form.Group>


            <Form.Group className="mt-4 mb-4 justify-content-center">
                <Button variant="danger" className="btn-lg" onClick={handleCalculate}>Calculate</Button>
            </Form.Group>


                {error && (
                <div>
                    <mark className="Error-display">{error}</mark>
                </div>
                )}
                {!error && (
                <div>
                <div className="mt-4">
                <h5 className='Answer'>Answer : </h5>
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>&nbsp;a<sub>{index}</sub> = {result.toFixed(6)} , </li>
                    ))}
                </ul>

                
                
            </div>

            <div>
                <ul className='AnswerX'>
                &nbsp;&nbsp;f({value}) = {answerX.toFixed(6)}
                    &nbsp;&nbsp;</ul>

                
                
            </div></div>
                )}
                

            </Form>
            </Container>
    );
}

export default Regression;