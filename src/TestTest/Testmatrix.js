import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const OnePoint = () => {
    const matrixLatex = `\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}`;

    return (
        <MathJaxContext>
            <MathJax>{`\\( ${matrixLatex} \\)`}</MathJax>
        </MathJaxContext>
    );
};

export default OnePoint;
