import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter
      fixed={false}
      style={{
        backgroundColor: '#39372e00',  // Dark gray background color
        color: '#ffffff',             // White text color for contrast
        padding: '1rem',              // Padding for spacing
      }}
    >
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
        <span className="ml-1">&copy; 2020 creativeLabs.</span>
      </div> */}
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          style={{ color: "blue" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Knon
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
