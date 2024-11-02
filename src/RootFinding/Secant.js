import { useState , useEffect} from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
import './Bisection.css'
import { MathJaxContext, MathJax } from "better-react-mathjax";
import CallFormula from "../CallFunc";

const Secant =()=>{

    const [formula, setFormula] = useState("");
        
    useEffect(()=>{
        const fetchFormula = async () => {
            const formulaGet = await CallFormula("Secant", 1); 
            setFormula(formulaGet);
        };

        fetchFormula();


    }, []);

    const print =()=>{
        console.log(data)
        setDataValueXx(data.map((x)=>x.Xx));
        setDataIter(data.map((x)=>x.Iter));
        setDataError(data.map((x)=>x.Error));
        return(
            <Container>
                <Table className="center-table" striped bordered hover variant="Light">
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
    

    const CalSecant = (X0,X1 ,e) =>{
        var ea, scope, x2, fx1,fx0;
        var iter = 0;
        var MAX = 100;

        var obj = {};

        
        
        do{
            scope = {
                x:X0,
            }
            fx0 = evaluate(Equation, scope)

        
            scope = {
                x:X1,
            }
            fx1 = evaluate(Equation, scope)

            x2 = X1 - (fx1*(X0-X1))/(fx0-fx1)


            iter++;
            ea = error(X1, x2)
            obj = {
                Iter:iter,
                Xx:x2,
                Error:ea
            }
            data.push(obj)

            X0 = X1;
            X1 = x2;
        }while(ea>e && iter<MAX)
        setX(x2)
    }

    const data = [];
    const [valueIter, setDataIter] = useState([]);

    const [valueXx, setDataValueXx] = useState([]);
    const [valueError, setDataError] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("x^2-7");
    const [X,setX] = useState(0);
    const [X0,setX0] = useState(2);

    const [X1,setX1] = useState(3);
    const [E,setE] = useState(0.000001);


    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputX1 = (event) =>{
        console.log(event.target.value)
        setX1(event.target.value)
    }
    const inputError = (event) =>{
        console.log(event.target.value)
        setE(event.target.value)
    }

    const calculateRoot = () =>{
        const Xini = parseFloat(X0)
        const Xini2 = parseFloat(X1)
        const ErrorIP = parseFloat(E)
        CalSecant(Xini,Xini2, ErrorIP);

        setHtml(print());
        console.log(valueIter)

        console.log(valueXx)
        console.log(valueError)
    }

    return(
        <Container>
            <h1>Secant</h1>
            <MathJaxContext>
            <MathJax>
                <ul className='formu'>
                    {`$$${formula}$$`}
     
                </ul>

            </MathJax>
            </MathJaxContext>
            <Form className="form-mm text-center">
                <Form.Group className="mb-3 row">
                    <div className="col-md-3">
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control-lg text-center" />
                    </div>
                </Form.Group>
                <Form.Group className="mb-5 row mt-3">
                    <div className="col-md-3">
                        <Form.Label>Input X0</Form.Label>
                        <input type="number"  value={X0} onChange={inputX} className="form-control-lg text-center" />
                    </div>
                    <div className="col-md-3">
                        <Form.Label>Input X1</Form.Label>
                        <input type="number" value={X1}  onChange={inputX1} className="form-control-lg text-center" />
                    </div>

                </Form.Group>
                <Form.Group className="mb-5 row">
                <div className="col-md-3">
                        <Form.Label>Input Tolerance</Form.Label>
                        <input type="number" id="Errorinput" value={E} onChange={inputError} className="form-control-lg text-center" />
                    </div>
                </Form.Group>
            
                <Button variant="danger" className="btn-lg mt4" onClick={calculateRoot}>Calculate</Button>

            </Form>
            <br></br>
            <h5 className="Answer">Answer = {X.toPrecision(7)}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default Secant;