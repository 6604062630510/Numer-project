
import React from 'react';
import { Link } from 'react-router-dom';

function SelectIntegration({ onSelect }) {
    return (
        <div>
            <h3>เลือกตัวเลือกเพื่อไปยังหน้าที่กำหนด:</h3>
            <Link to="/trapoz">
                <button>Trapezoidal</button>
            </Link>
            <Link to="/simpson">
                <button>Simpson</button>
            </Link>

            
        </div>
    );
}

export default SelectIntegration;