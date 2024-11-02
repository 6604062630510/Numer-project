import './App.css';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Mynavbar from './Mynavbar';
import Sample from './TestTest/Sample';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bisection from './RootFinding/Bisection';
import Select1 from './Select/Select1';
import Falseposition from './RootFinding/Falseposition';
import Onepoint from './RootFinding/Onepoint';
import NewtonRaph from './RootFinding/NewtonRaph';
import Secant from './RootFinding/Secant';
import SelectLinearag from './Select/SelectLinearag';
import Cramer from './Matrix/Cramer';
import NewtonIt from './Interpolation/NewtonIt';
import SelectInter from './Select/SelectInter';
import Lagrange from './Interpolation/Lagrange';
import Spline from './Interpolation/Spline';
import React from 'react';
import Regression from './Regress/Regression';
import Trapezoidal from './Integration/Trapezoidal';
import SelectIntegration from './Select/SelectIntegration';
import Simpson from './Integration/Simpson';
import Eli from './Matrix/Eli';
import Jordan from './Matrix/Jordan';
import { Button } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Mynavbar />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bisection" element={<Bisection />} />
            <Route path="/select1" element={<Select1 />} />
            <Route path="/sample" element={<Sample />} />
            <Route path="/falseposition" element={<Falseposition />} />
            <Route path="/onepoint" element={<Onepoint />} />
            <Route path="/newton-raph" element={<NewtonRaph />} />
            <Route path="/secant" element={<Secant />} />
            <Route path="/selectlinear" element={<SelectLinearag />} />
            <Route path="/cramer" element={<Cramer />} />
            <Route path="/newtonit" element={<NewtonIt />} />
            <Route path="/selectinter" element={<SelectInter />} />
            <Route path="/lagrange" element={<Lagrange />} />
            <Route path="/spline" element={<Spline />} />
            <Route path="/regression" element={<Regression />} />
            <Route path="/trapoz" element={<Trapezoidal />} />
            <Route path="/selectintegration" element={<SelectIntegration />} />
            <Route path="/simpson" element={<Simpson />} />
            <Route path="/eli" element={<Eli/>} />
            <Route path="/jordan" element={<Jordan/>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

const Home = () => {
  

  return (
    <div>
      <h1>Numerical</h1>
      <div className='row'>
            <div className='d-flex justify-content-center mb-5'>
            <Link to="/bisection">
            <Button variant="light" className='btn-lg text-center mx-3'>Bisection</Button>

            </Link>
            <Link to="/falseposition">
            <Button variant="light" className='btn-lg text-center mx-3'>False Position</Button>

            </Link>
            <Link to="/onepoint">
            <Button variant="light" className='btn-lg text-center mx-3'>One Point</Button>

            </Link>
            <Link to="/newton-raph">
            <Button variant="light" className='btn-lg text-center mx-3'>Newton Raphson</Button>

            </Link>
            <Link to="/secant">
            <Button variant="light" className='btn-lg text-center mx-3'>Secant</Button>

            </Link>
            </div>
      </div>
      <div className='row'>
            <div className='d-flex justify-content-center mb-5'>
            <Link to="/cramer">
            <Button variant="light" className='btn-lg text-center mx-3'>Cramer's Rule</Button>

            </Link>
            <Link to="/eli">
            <Button variant="light" className='btn-lg text-center mx-3'>Gauss Elimination</Button>

            </Link>
            <Link to="/jordan">
            <Button variant="light" className='btn-lg text-center mx-3'>Gauss Jordan</Button>

            </Link>
            </div>


      </div>
      <div className='row'>
            <div className='d-flex justify-content-center mb-5'>
            <Link to="/newtonit">
            <Button variant="light" className='btn-lg text-center mx-3'>Newton Iteration</Button>

            </Link>
            <Link to="/lagrange">
            <Button variant="light" className='btn-lg text-cente mx-3'>Lagrange</Button>

            </Link>
            <Link to="/spline">
            <Button variant="light" className='btn-lg text-center mx-3'>Spline</Button>

            </Link>
            </div>
      </div>
      <div className='row'>
            <div className='d-flex justify-content-center mb-5'>
            <Link to="/regression">
            <Button variant="light" className='btn-lg text-center'>Regression</Button>

            </Link>
            </div>
      </div>
      <div className='row'>
            <div className='d-flex justify-content-center mb-5'>
            <Link to="/trapoz">
                <Button variant="light" className='btn-lg text-center mx-3'>Trapezoidal</Button>
            </Link>
            <Link to="/simpson">
            <Button variant="light" className='btn-lg text-center mx-3'>Simpson</Button>

            </Link>
            </div>
      </div>
    </div>
  );
};

export default App;

