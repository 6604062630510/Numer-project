import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import './Bisection.css'
import React, { useEffect } from 'react';

import { MathJax, MathJaxContext } from "better-react-mathjax";
import CallFormula from "../CallFunc";
const Bisection =()=>{



    const [formula, setFormula] = useState("");
        
        useEffect(()=>{

            if (window.MathJax) {
                window.MathJax.typeset(); 
            }
            const fetchFormula = async () => {
                const formulaGet = await CallFormula("Bisection", 1); 
                setFormula(formulaGet);
            };
    
            fetchFormula();
    
    
        }, [formula]);

    const print = () =>{
        

        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        
        return(
            <Container>
                <Table className="center-table" striped bordered hover variant="light">
                    <thead class="table-warning">
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="25%">XL</th>
                            <th width="25%">XM</th>
                            <th width="25%">XR</th>
                        </tr>
                    </thead>
                    <tbody className="table-bd">
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 100;
        const e = 0.00001;
        var obj={};
        do
        {
            xm = (xl+xr)/2.0;
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x:xm,
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    

     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(1)
    const [XR,setXR] = useState(2)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueXl)
        console.log(valueXm)
        console.log(valueXr)
    }

    return (
            <Container>
                <h1>Bisection</h1>
                <MathJaxContext>
                <MathJax>
                <ul className='formu'>{/* แสดงสูตรที่ถูกดึงมาจากฐานข้อมูล */}
                    {`$$${formula}$$`}
     
                </ul>

            </MathJax>
            </MathJaxContext>
                <Form className="form-mm text-center">



  {/* Centered Input for f(x) */}
  <Form.Group className="mb-3 row justify-content-center">
    <div className="col-md-3">
      <Form.Label>Input f(x)</Form.Label>
      <input 
        type="text" 
        id="equation" 
        value={Equation} 
        onChange={inputEquation} 
        className="form-control-lg" 
      />
    </div>
  </Form.Group>

  <Form.Group className="row justify-content-center mt-3 mb-3">
    <div className="col-md-3">
      <Form.Label>Input XL</Form.Label>
      <input 
        type="number" 
        id="XL" 
        value={XL}
        onChange={inputXL} 
        className="form-control-lg" 
      />
    </div>
    <div className="col-md-3">
      <Form.Label>Input XR</Form.Label>
      <input 
        type="number" 
        id="XR" 
        value={XR}
        onChange={inputXR} 
        className="form-control-lg" 
      />
    </div>
  </Form.Group>


  <Button variant="danger"  onClick={calculateRoot} className="mt-4 btn-lg">
    Calculate
  </Button>
</Form>


                <br></br>
                <h5 className="Answer">Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default Bisection