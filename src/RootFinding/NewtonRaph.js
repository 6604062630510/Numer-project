import { useState , useEffect } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
import './Bisection.css'
import { MathJaxContext, MathJax } from "better-react-mathjax";
import CallFormula from "../CallFunc";
     

const NewtonRaph =()=>{

    const [formula, setFormula] = useState("");
        
        useEffect(()=>{
            const fetchFormula = async () => {
                const formulaGet = await CallFormula("NewtonRaphson", 1); 
                setFormula(formulaGet);
            };
    
            fetchFormula();
    
    
        }, []);


    const print =()=>{
        console.log(data)
        setDataValueX1(data.map((x)=>x.Xx));
        setDataIter(data.map((x)=>x.Iter));
        setDataError(data.map((x)=>x.Error));
        return(
            <Container>
                <Table className="center-table" striped bordered hover variant="light">
                <thead class="table-warning">
                        <tr>
                            <th width="20%">Iteration</th>
                            <th width="40%">X</th>
                            <th width="40%">Error</th>
                        </tr>
                    </thead>
                    <tbody className="table-bd">
                        {data.map((element, index)=>{
                            return(
                            <tr key={index}>
                                <td>{element.Iter}</td>
                                <td>{element.Xx}</td>
                                <td>{element.Error}</td>
                            </tr>
                            )
                        })}
                        </tbody>
                </Table>
            </Container>

        );

    }

    const error =(xold, xnew)=> Math.abs((xnew - xold)/xnew)*100;
    

    const CalNewRa = (X0, e) =>{
        var ea, scope, x1, f2x0,fx0;
        var iter = 0;
        var MAX = 100;

        var obj = {};

        
        do{
            scope = {
                x:X0,
            }
            fx0 = evaluate(Equation, scope)

            f2x0 = evaluate(derivative(Equation, 'x').toString(), scope); 
        
            scope = {
                x:X0,
            }
            x1 = X0 - fx0/f2x0;

            iter++;
            ea = error(X0, x1)
            obj = {
                Iter:iter,
                Xx:x1,
                Error:ea
            }
            data.push(obj)

            X0 = x1;
        }while(ea>e && iter<MAX)
        setX(x1)
    }

    const data = [];
    const [valueIter, setDataIter] = useState([]);

    const [valueX1, setDataValueX1] = useState([]);
    const [valueError, setDataError] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("x^2-7");
    const [X,setX] = useState(0);
    const [X0,setX0] = useState(1);
    const [E,setE] = useState(0.000001);


    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }
    const inputError = (event) =>{
        console.log(event.target.value)
        setE(event.target.value)
    }

    const calculateRoot = () =>{
        const Xini = parseFloat(X0)
        const ErrorIP = parseFloat(E)
        CalNewRa(Xini, ErrorIP);

        setHtml(print());
        console.log(valueIter)

        console.log(valueX1)
        console.log(valueError)
    }

    return(
        <Container>
            <h1>Newton Raphson</h1>
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
                <Form.Label>Input f(x)</Form.Label>
                <input 
                    type="text" 
                    id="equation" 
                    value={Equation} 
                    onChange={inputEquation} 
                    className="form-control-lg text-center" 
                />
                </div>
            </Form.Group>

            <Form.Group className="row justify-content-center mt-3 mb-3">
                <div className="col-md-3">
                <Form.Label>Input X0</Form.Label>
                <input 
                    type="number" 

                    value={X0}
                    onChange={inputX} 
                    className="form-control-lg text-center" 
                />
                </div>
                <div className="col-md-3">
                <Form.Label>Input Tolerance</Form.Label>
                <input 
                    type="number" 
                    value={E}
                    onChange={inputError} 
                    className="form-control-lg text-center" 
                />
                </div>
            </Form.Group>


                

                <Button variant="danger" className="btn-lg mt-4" onClick={calculateRoot}>Calculate</Button>

            </Form>
            <br></br>
            <h5 className="Answer">Answer = {X.toPrecision(7)}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default NewtonRaph;