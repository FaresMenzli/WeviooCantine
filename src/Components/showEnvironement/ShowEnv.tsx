
import React, { useState, useEffect, FC } from 'react';

import generatedGitInfo from '../../generatedGitInfo.json';
import { activeEnv } from '../../util/constant';

interface ShowEnvProps {
    
}
 
const ShowEnv: FC<ShowEnvProps> = () => {
    const getEnv =() => {
        return activeEnv();
      }
    
    return (
      <div>
        <div className='env'>{getEnv()}</div>
        <div className='branch'> Current Git Branch: {generatedGitInfo.gitBranch}</div>
      </div>
    );
  };
  
 
export default ShowEnv;