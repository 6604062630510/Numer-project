import { useState, useEffect } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import './Matrix.css';

import { MathJaxContext, MathJax } from "better-react-mathjax";
import { CalJordan2 } from "./CalJordan2";


const Jordan = () => {
    const [size, setSize] = useState(4); 
    const [A, setA] = useState([]);
    const [B, setB] = useState([]);
    const [results, setResults] = useState({ x: [] });
    const [newA2, setnewA] = useState([]); 
    const [newB2, setnewB] = useState([]); 
    const [xx, setxx] = useState([]);

    const createVariableMatrix = (size) => {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix.push(`x_${i + 1}`); 
        }
        return matrix;
    };


    const createMatrix = (size) => {
        const newAA = Array.from({ length: size }, () => Array(size).fill(0));
        const newBB = Array(size).fill(0);
        setA(newAA);
        setB(newBB);
        setResults({ x: Array(size).fill(0) }); 
        

    };

    useEffect(() => {
        createMatrix(size); 
        
    }, [size]);

    const handleInputChange = (rowIndex, colIndex, value) => {
        const newAA = [...A];
        newAA[rowIndex][colIndex] = value;
        setA(newAA);
    };

    const handleBChange = (index, value) => {
        const newBB = [...B];
        newBB[index] = value;
        setB(newBB);
    };

    const CalMatrix = () => {
        const { newA, newB, x } = CalJordan2(A, B, size);
        setResults({ x }); 
        setnewA(newA);
        setnewB(newB);
        const variable = createVariableMatrix(size);
        setxx(variable);
        
    };
    const printMatrixA = (matrix) => {
        const latexString = matrix.map(row => row.join(' & ')).join(' \\\\ ');
        return `\\begin{bmatrix} ${latexString} \\end{bmatrix}`;
    };

    const printMatrixฺB = (matrix) => {
        const latexString = matrix.map(value => value.toFixed(6)).join(' \\\\ '); 
    return `\\begin{bmatrix} ${latexString} \\end{bmatrix}`;
    };

    const printVariableMatrix = (variables) => {
        const latexString = variables.map(variable => variable).join(' \\\\ '); 
        return `\\begin{bmatrix} ${latexString} \\end{bmatrix}`; 
    };
    
    return (
        <Container>
            <h1>Gauss Jordan</h1>
            
            <Form>
                <Form.Group>
                    <Row className="Rowinput d-flex">
                        <Col md={4}>
                            <Form.Label className="InputLabel">Matrix Size:</Form.Label>
                            <Form.Control as="select" value={size} onChange={(e) => setSize(parseInt(e.target.value))}>
                                <option value={2}>2x2</option>
                                <option value={3}>3x3</option>
                                <option value={4}>4x4</option>
                                <option value={5}>5x5</option>
                            </Form.Control>
                        </Col>
                    </Row>

                    <Row className="Rowinput d-flex">
                        <Col md={2}>
                            <Form.Label className="InputLabel">Input A</Form.Label>
                            <Table className="matrix-input">
                                <tbody>
                                    {A.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((value, colIndex) => (
                                                <td key={colIndex}>
                                                    <input
                                                        className="form-control text-center small-input"
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) => handleInputChange(rowIndex, colIndex, parseFloat(e.target.value))}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>

                        <Col md={2}>
                            <Form.Label className="InputLabel">Input B</Form.Label>
                            <Table className="matrix-input">
                                <tbody>
                                    {B.map((value, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    className="form-control text-center small-input"
                                                    type="number"
                                                    value={value}
                                                    onChange={(e) => handleBChange(index, parseFloat(e.target.value))}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className='mt-8 mb-8 d-flex justify-content-center'>
                    <Button variant="danger" onClick={CalMatrix} className="btn-lg">
                        Calculate
                    </Button>
                </Form.Group>

                <div className="mt-4">
                    <h5 className="Answer">Answer :</h5>
                    <ul>
                        {results.x && results.x.map((result, index) => (
                            <li key={index}>&nbsp;x<sub>{index + 1}</sub> = {result.toFixed(6)} , </li>
                        ))}
                    </ul>
                </div>
                <div className="matrix-item mt-5">
                <MathJaxContext>
                <MathJax className="matrixA-display">{`\\( ${printMatrixA(newA2)}${printVariableMatrix(xx)} = ${printMatrixฺB(newB2)}\\)`}</MathJax>
            </MathJaxContext></div>
            </Form>
        </Container>
    );
};

export default Jordan;
