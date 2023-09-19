import logo from './logo.svg';
import './App.css';
import LoginwithToken from './Pages/LoginwithToken';
import {createBrowserRouter} from 'react-router-dom';
import {RouterProvider} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import CustomerPage from './Pages/CustomerPage';
import AdminLoanDataPage from './Pages/AdminLoanDataPage';
import UserLoanDataPage from './Pages/UserLoanDataPage';
import ProfilePage from './Pages/ProfilePage';
import AdminPortal from './Pages/AdminPortal';
import UserPortal from './Pages/UserPortal';
import HomePage from './Pages/HomePage';
import UserItemsPage from './Pages/UserItemsPage';
// import LayoutComponent from './Components/Layout.component';
import './App.css';
import { AppProvider } from "../src/Context/App.context";
import RegisterPage from './Pages/RegisterPage';
import EmployeeCredentialFormPage from './Pages/EmployeeCredentialFormPage';

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <RegisterPage />

  },
  {
    path: "/employeeCredentials",
    element: <EmployeeCredentialFormPage />,

  },
  {
    path: "/AdminPortal",
    element: <AdminPortal/>,

  },
  {
  path: "/UserPortal",
  element: <UserPortal/>,

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
    path: "/Adminloandata",
    element: <ProtectedRoute>
      <AdminLoanDataPage />
    </ProtectedRoute>
  },
  {
    path: "/Userloandata",
    element: <ProtectedRoute>
      <UserLoanDataPage />
    </ProtectedRoute>
  },
  {
    path: "/Useritemsdata",
    element: <ProtectedRoute>
      <UserItemsPage />
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

