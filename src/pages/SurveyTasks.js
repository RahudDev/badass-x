import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

const SurveyTasks = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 animate__animated animate__fadeInLeft">
          {/*<div className="card" style={{ border: '2px solid #ddd', borderRadius: '15px' }}>
            <div className="card-body">
              <h5 className="card-title">Pollfish</h5>
              <p className="card-text">Complete surveys from Pollfish and earn <strong style={{ color: '#28a745' }}>$CUAN</strong>.</p>
              <Link to="/pollfish" className="btn btn-primary">View Tasks</Link>
            </div>
          </div>*/}
        </div>
        <div className="col-md-4 animate__animated animate__fadeInLeft">
          <div className="card"  style={{ border: '2px solid #ddd', borderRadius: '15px'  }}>
            <div className="card-body">
              <h5 className="card-title">Cpx Research</h5>
              <p className="card-text">Complete surveys from Cpx Research and earn  <strong style={{ color: '#28a745' }}>$CUAN</strong>.</p>
              <Link to="/cpx-research" className="btn btn-primary">View Tasks</Link>
            </div>
          </div>
        </div>
        {/*<div className="col-md-4 animate__animated animate__fadeInLeft animate__delay-2s">
          <div className="card" style={{ border: '2px solid #ddd', borderRadius: '15px'  }}>
            <div className="card-body">
              <h5 className="card-title">Bitlabs</h5>
              <p className="card-text">Complete surveys from Bitlabs and earn  <strong style={{ color: '#28a745' }}>$CUAN</strong>.</p>
              <Link to="/bitlabs" className="btn btn-primary">View Tasks</Link>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default SurveyTasks;
