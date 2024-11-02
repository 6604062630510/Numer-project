
import { useState, useEffect } from "react";
import { Button, Container, Form, Table , Row, Col} from "react-bootstrap";
import './Matrix.css';
import { calculateCramer } from './CramerFunc';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { CallFormula } from '../CallFunc' 
import { det } from "mathjs";

const Cramer = () => {

    const [formula, setFormula] = useState("");
    useEffect(()=>{
        let formulaGet = new Array(4);
        const fetchFormula = async () => {
            for (let i = 0; i < 4; i++) {
                formulaGet[i] = await CallFormula("Cramer", i+1); 
                
            }
            
            setFormula(formulaGet);
        };

        fetchFormula();


    }, []);

    const size = 4; 
    const [matrix, setMatrix] = useState([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
    const [b, setB] = useState(Array(size).fill(0)); 
    const [results, setResults] = useState(Array(size).fill(0)); 

    const [A1, setA1] = useState([]);
    const [A2, setA2] = useState([]);
    const [A3, setA3] = useState([]);
    const [A4, setA4] = useState([]);


    const handleInputChange = (rowIndex, colIndex, value) => {
        const newMatrix = matrix.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                const newRow = row.slice();
                newRow[colIndex] = value;
                return newRow;
            }
            return row;
        });
        setMatrix(newMatrix);
    };


    const handleBChange = (index, value) => {
        const newB = [...b];
        newB[index] = value;
        setB(newB);
    };

    const CalMatrix = () => {
     
        const { results, A1, A2, A3, A4 } = calculateCramer(matrix, b);
        setResults(results); 
        setA1(A1); 
        setA2(A2); 
        setA3(A3); 
        setA4(A4); 

        console.log('Matrix A:', matrix);
        console.log('Matrix B:', b);
    };


    const printMatrix = (matrix) => {
        const latexString = matrix.map(row => row.join(' & ')).join(' \\\\ ');
        return `\\begin{vmatrix} ${latexString} \\end{vmatrix}`;
    };

    return (
        
        <Container>
            <h1>Cramer's Rule</h1>
            <MathJaxContext>
            <MathJax>
                <ul className='formu'>
                    {`$$Ax = B$$`}
     
                </ul>

                

            </MathJax>
            </MathJaxContext>

            <Form>
            <Form.Group>
            <Row className="Rowinput d-flex">


                    <Col md={2}>
                        <Form.Label className="InputLabel">Input A</Form.Label>
                        <Table className="matrix-input">
                        <tbody>
    {(() => {
        const rows = [];
        for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
            const cells = [];
            for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
                cells.push(
                    <td key={colIndex}>
                        <input 
                            className="form-control text-center small-input"
                            type="number"
                            value={matrix[rowIndex][colIndex]}
                            onChange={(e) => handleInputChange(rowIndex, colIndex, parseFloat(e.target.value))}
                        />
                    </td>
                );
            }
            rows.push(<tr key={rowIndex}>{cells}</tr>);
        }
        return rows;
    })()}
</tbody>
                        </Table>
                    </Col>


                    <Col md={2}>
                        <Form.Label className="InputLabel">Input B</Form.Label>
                        <Table className="matrix-input">
                        <tbody>
                            {(() => {
                                const rows = [];
                                for (let index = 0; index < b.length; index++) {
                                    rows.push(
                                        <tr key={index}>
                                            <td>
                                                <input 
                                                    className="form-control text-center small-input"
                                                    type="number"
                                                    value={b[index]}
                                                    onChange={(e) => handleBChange(index, parseFloat(e.target.value))}
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                                return rows;
                            })()}
                        </tbody>

                        </Table>
                    </Col>
                </Row>
                
                </Form.Group>
                <h6>If you want to use a 2*2 matrix, just change a11, a12, a21, a22 and b11, b21</h6>
                <Form.Group className='mt-8 mb-8 d-flex justify-content-center'>
                    <Button variant="danger" onClick={CalMatrix} className="btn-lg">
                        Calculate
                    </Button>
                </Form.Group>


                {/* แสดงค่าผลลัพธ์ x */}
                <div className="mt-4 ">
                    <h5 className="Answer">Answer :</h5>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>&nbsp;x<sub>{index + 1}</sub> = {result} , </li>
                        ))}
                    </ul>
                </div>


                <MathJaxContext>
    <div className="mt-4">
    <h4>Matrices:</h4>
<div className="matrices-container">
    {/* Matrix A */}
    <div className="matrix-row">
    <div className="matrix-item">
        <h4>A</h4>
        <h5>det A = {det(matrix)}</h5>
        <MathJax className="matrixA-display">{`\\( ${printMatrix(matrix)} \\)`}</MathJax>
    </div>
    </div>


    <div className="matrices-row">
        <div className="matrix-item">
            <h4>A1</h4>
            <h5>det A1 = {det(A1)}</h5>
            <MathJax className="matrixA-display">{`\\( ${printMatrix(A1)} \\)`}</MathJax>
            <MathJax>
                {`$$ ${formula[0]}$$`}
            </MathJax>
        </div>
        <div className="matrix-item">
            <h4>A2</h4>
            <h5>det A2 = {det(A2)}</h5>
            <MathJax className="matrixA-display">{`\\( ${printMatrix(A2)} \\)`}</MathJax>
            <MathJax>
                {`$$${formula[1]}$$`}
            </MathJax>
        </div>

        <div className="matrix-item">
            <h4>A3</h4>
            <h5>det A3 = {det(A3)}</h5>
            <MathJax className="matrixA-display">{`\\( ${printMatrix(A3)} \\)`}</MathJax>
            <MathJax>
                {`$$${formula[2]}$$`}
            </MathJax>
        </div>
        <div className="matrix-item">
            <h4>A4</h4>
            <h5>det A4 = {det(A4)}</h5>
            <MathJax className="matrixA-display">{`\\( ${printMatrix(A4)} \\)`}</MathJax>
            <MathJax>
                {`$$${formula[3]}$$`}
            </MathJax>
        </div>
    </div>
</div>

                
    </div>
</MathJaxContext>

            </Form>
        </Container>
    );
};

export default Cramer;
