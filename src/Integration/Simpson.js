import { useState, useEffect } from "react";
import { Button, Container, Form} from "react-bootstrap";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { abs, evaluate } from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';
import 'nerdamer/Calculus';

import { CalSimp } from "./CalSimpson";
import CallFormula from "../CallFunc";


const Simpson = () =>{
    const [equation, setEquation] = useState("x^7+2*x^3-1");
    const [lowerBound, setLbound] = useState(-1);
    const [upperBound, setUbound] = useState(2);
    const [I, setI] = useState(0);
    const [Exact, setExact] = useState(0);
    
    const [error, setError] = useState(0);
    const [inputError, setInputError] = useState(""); 
    const [formula, setFormula] = useState("");
    useEffect(()=>{
        if (window.MathJax) {
            window.MathJax.typeset(); 
        }
        const fetchFormula = async () => {
            const formulaGet = await CallFormula("Simpson", 1); 
            setFormula(formulaGet);
        };

        fetchFormula();


    }, [formula]);



    const handleCalculate = () =>{

        try {

            evaluate(equation.replace(/x/g, "1"));


            const result = CalSimp(equation, lowerBound, upperBound);
            setI(result.I);
            setExact(result.ExactAns);


            if (result.ExactAns !== null) {
                const errorValue = abs((result.ExactAns - result.I) / result.ExactAns) * 100;
                setError(errorValue);
            } else {
                setError(0);
            }
        } catch (err) {

            setInputError(err.message);
        }


    }




    return(
        <Container>
            <h1>Simpson's rule</h1>
            <MathJaxContext>
            <MathJax>
                <ul className='formu'>
                    {`$$ ${formula}$$`}
     
                </ul>

                

            </MathJax>
            </MathJaxContext>
            <Form className='form-mm text-center'>
                <Form.Group className='mb-3 row justify-content-center'>
                    <div className='col-md-3'>
                        <Form.Label>f(x)</Form.Label>
                        <input 
                            className='form-control-lg w-100 text-center'
                            type='text'
                            value={equation}
                            onChange={(e)=> setEquation(e.target.value)}
                            />

                    </div>
                </Form.Group>

                <Form.Group className='mb-4 row justify-content-center'>
                    <div className='col-md-2'>
                        <Form.Label>Upper Bound</Form.Label>
                        <input 
                            className='form-control-lg w-100 text-center'
                            type='number'
                            value={upperBound}
                            onChange={(e)=> setUbound(Number(e.target.value))}
                            />

                    </div>

                    <div className='col-md-2'>
                        <Form.Label>Lower Bound</Form.Label>
                            <input 
                                className='form-control-lg w-100 text-center'
                                type='number'
                                value={lowerBound}
                                onChange={(e)=> setLbound(Number(e.target.value))}
                                />

                    </div>
                </Form.Group>

            

                <Form.Group className='mt-4 mb-4 justify-content-center'>
                    <Button className='btn-lg' variant='danger' onClick={handleCalculate}>Calculate</Button>
                </Form.Group>
                <Container>

                        {inputError && (
                            <div>
                                <mark className='Error-display'>Invalid Equation</mark>
                            </div>
                        )}


                    {!inputError && (
                    <div >
                    <div >
                    <h5 className='Answer'>Answer: {I.toFixed(6)}</h5>

                    </div>

                    <div>
                    <ul className='AnswerX'>
                    &nbsp;Exact Value = {Exact.toFixed(6)}
                            &nbsp;</ul>
                        <ul className='AnswerX'>
                        &nbsp;Error = {error.toFixed(6)}&nbsp;
                        </ul>

                
                
                    </div>
                    </div>
                    )}

                    
                
                </Container>

            </Form>
        </Container>





    );


}

export default Simpson;