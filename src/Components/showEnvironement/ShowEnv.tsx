
import React, { useState, useEffect, FC } from 'react';

import generatedGitInfo from '../../generatedGitInfo.json';
import { activeEnv } from '../../util/constant';
import { useAuth } from '../../Contexts/AuthContext';

interface ShowEnvProps {
    
}
 
const ShowEnv: FC<ShowEnvProps> = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const { user } = useAuth();
  useEffect(() => {
    user?setLoggedIn(true):setLoggedIn(false)
  }, [user])
  
    const getEnv =() => {
        return activeEnv();
      }
    
    return (
      <div>
        <div className='env'>{getEnv()}</div>
        <div  className={loggedIn?`branch bottom-0 `:`branch`}> Current Git Branch: {generatedGitInfo.gitBranch}</div>
      </div>
    );
  };
  
 
export default ShowEnv;