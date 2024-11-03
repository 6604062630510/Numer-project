import React, { useState , useEffect} from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Button, Container, Form } from "react-bootstrap";
import CallFormula from "../CallFunc";
import "./inter.css"

const Spline =()=> {
    const [n, setN] = useState(5);
    const [xValues, setXValues] = useState([2,4,6,8,10]);
    const [yValues, setYValues] = useState([9.5,8.0,10.5,39.5,72.5]);
    const [value, setValue] = useState(4.5);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);


    const [formula, setFormula] = useState("");

    useEffect(()=>{
        if (window.MathJax) {
            window.MathJax.typeset(); 
        }
        const fetchFormula = async () => {
            const formulaGet = await CallFormula("Spline", 1); 
            setFormula(formulaGet);
        };

        fetchFormula();


    }, [formula]);


    const CalM = (x, y, n, m)=> {

        for (let i = 1; i < n; i++) {
           m[i-1] = (y[i] - y[i - 1])/(x[i] - x[i - 1]);
            
        }
    };

    const CalSpline = (x, y, n, val) => {
        let m = new Array(n);
        var Ans = 0;
        CalM(x, y, n, m);

        for (let i = 1 ; i < n; i++){
            if( val >= x[i - 1] && val <= x[i]){
                Ans = y[i - 1] + m[i - 1] * (val - x[i - 1]);

                break;
            }        
        }

        return Ans;
    };

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

        const Answer = CalSpline(xValues, yValues, n, value);
        setResult(Answer);
    };

    return(
        <Container>
            <h1>Linear Spline</h1>

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

export default Spline;