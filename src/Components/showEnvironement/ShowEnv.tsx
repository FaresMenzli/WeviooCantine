
import React, { useState, useEffect, FC } from 'react';

import generatedGitInfo from '../../generatedGitInfo.json';

interface ShowEnvProps {
    
}
 
const ShowEnv: FC<ShowEnvProps> = () => {
    const [currentBranch, setCurrentBranch] = useState<string>('');



  
    return (
      <div>
        <p>Current Branch: {generatedGitInfo.gitBranch}</p>
      </div>
    );
  };
  
 
export default ShowEnv;