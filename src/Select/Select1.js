import React from 'react';
import { Link } from 'react-router-dom';

function Select1({ onSelect }) {
    return (
        <div>
            <h3>เลือกตัวเลือกเพื่อไปยังหน้าที่กำหนด:</h3>
            <Link to="/bisection">
                <button>Bisection</button>
            </Link>
            <Link to="/falseposition">
                <button>False Position</button>
            </Link>
            <Link to="/onepoint">
                <button>One Point</button>
            </Link>
            <Link to="/newton-raph">
                <button>Newton Raphson</button>
            </Link>
            <Link to="/secant">
                <button>Secant</button>
            </Link>
        </div>
    );
}

export default Select1;
