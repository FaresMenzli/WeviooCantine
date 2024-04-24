import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../Models/User";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { showToast } from "../Components/Toaster/toasterService";
import { ToastContainer } from "react-toastify";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout :()=>void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(localStorage.getItem('userRole'));
  const [token, setToken] = useState<string | null>( localStorage.getItem("token"));
 
  const navigate = useNavigate();
  useEffect(() => {
 
   
    const storedUserData = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem("userRole")
    if (storedUserData && storedToken) {
      setUser(JSON.parse(storedUserData));
      setToken(storedToken);
      setRole(storedRole)
      
    }

    console.log(localStorage.getItem("userRole"))
    console.log(localStorage.getItem("user"))
    
   
  }, []);
  useEffect(() => {
    if (user && token) {
      console.log(user?.userRole)
      console.log("authContext")
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem("token", token || "");
    localStorage.setItem("userRole", user.userRole || "");
  
  }
  const interval = setInterval(checkTokenExpiration, 1000); 
  return () => clearInterval(interval); 
  }, [token , user  ]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    navigate("/login")
  };
  const isTokenExpired = (token:string) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp! < Date.now() / 1000) {
        return true; 
      }
      return false; 
    } catch (error) {
      return true; 
    }

  };
  const checkTokenExpiration = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp!  < Date.now()/1000) {
          showToast("your session has expired. please log in" ,{theme: "colored",autoClose: false,type:'error'
          })
          logout();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };
  

  return (
    <AuthContext.Provider value={{setUser,setToken, user, token  ,logout }}>
      {children}
      <ToastContainer></ToastContainer>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
