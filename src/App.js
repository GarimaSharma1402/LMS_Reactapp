import logo from './logo.svg';
import './App.css';
import LoginwithToken from './Pages/LoginwithToken';
import {createBrowserRouter} from 'react-router-dom';
import {RouterProvider} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import CustomerPage from './Pages/CustomerPage';
import LoginPage from './Pages/LoginPage';
import LoanDataPage from './Pages/LoanDataPage';
import ProfilePage from './Pages/ProfilePage';
import HomePage from './Pages/HomePage';
// import LayoutComponent from './Components/Layout.component';
import './App.css';
import { AppProvider } from "../src/Context/App.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,

  },
  {
    path: "/login",
    element: <LoginwithToken />,

  },
  {
    path: "/customer",
    element:<ProtectedRoute>
      <CustomerPage />
    </ProtectedRoute>, 

  },
  {
    path: "/profile",
    element: <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  },
  {
    path: "/loandata",
    element: <ProtectedRoute>
      <LoanDataPage />
    </ProtectedRoute>
  }
]);

const App = () => {
  return(
    <AppProvider>
          
      <RouterProvider router = {router} />
    </AppProvider>

  );
}

export default App;

