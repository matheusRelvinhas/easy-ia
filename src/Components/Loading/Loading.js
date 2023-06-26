import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-top">
        <div className="loading-square">
          <div className="loading-square">
            <div className="loading-square">
              <div className="loading-square">
                <div className="loading-square">
                  <div className="loading-square"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-bottom">
        <div className="loading-square">
          <div className="loading-square">
            <div className="loading-square">
              <div className="loading-square">
                <div className="loading-square">
                  <div className="loading-square"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-left">
        <div className="loading-square">
          <div className="loading-square">
            <div className="loading-square">
              <div className="loading-square">
                <div className="loading-square">
                  <div className="loading-square"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-right">
        <div className="loading-square">
          <div className="loading-square">
            <div className="loading-square">
              <div className="loading-square">
                <div className="loading-square">
                  <div className="loading-square"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
