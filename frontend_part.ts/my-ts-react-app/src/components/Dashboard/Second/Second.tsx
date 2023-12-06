import React from 'react';
import './second.css';

const Second: React.FC = () => {
  return (
    <>
      <div className="card mb-3 mt-3 cardS" >
        <div className="row g-0 ps-4 p-3">
          <div className="col-md-7">
            <h2 className="card-title">EXAMS TIME</h2>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            <button className='btn btn-primary'>View exams tips</button>
          </div>
          <div className="col-md-5">
            <div className="card-body">
              {/* Additional content for the right column, if any */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
