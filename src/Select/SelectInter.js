import React from 'react';
import { Link } from 'react-router-dom';

function SelectInter({ onSelect }) {
    return (
        <div>
            <h3>เลือกตัวเลือกเพื่อไปยังหน้าที่กำหนด:</h3>
            <Link to="/newtonit">
                <button>Newton Iteration</button>
            </Link>
            <Link to="/lagrange">
                <button>Lagrange</button>
            </Link>
            <Link to="/spline">
                <button>Spline</button>
            </Link>
            
        </div>
    );
}

export default SelectInter;
