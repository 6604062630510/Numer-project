import React from 'react';
import { Link } from 'react-router-dom';

function SelectLinearag({ onSelect }) {
    return (
        <div>
            <h3>เลือกตัวเลือกเพื่อไปยังหน้าที่กำหนด:</h3>
            <Link to="/cramer">
                <button>Cramer's Rule</button>
            </Link>
            <Link to="/eli">
                <button>Gauss Elimination</button>
            </Link>
            <Link to="/jordan">
                <button>Gauss Jordan</button>
            </Link>
            <Link to="/newton-raph">
                <button>Matrix Inversion</button>
            </Link>
            <Link to="/secant">
                <button>LU decomposition</button>
            </Link>

            <Link to="/secant">
                <button>Cholesky decomposition</button>
            </Link>
        </div>
    );
}

export default SelectLinearag;
