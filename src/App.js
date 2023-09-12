import logo from './logo.svg';
import './App.css';
import LoginwithToken from './Pages/LoginwithToken';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
// import {RouteProvider} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import CustomerPage from './Pages/CustomerPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
// import LayoutComponent from './Components/Layout.component';
import './App.css';
import { AppProvider } from "../src/Context/App.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerPage />,

  },
  {
    path: "/login",
    element: <LoginwithToken />,

  },
  {
    path: "/profile",
    element:<ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>, 

  },
]);

const App = () => {
  return(
    <AppProvider>
      <RouterProvider router = {router} />
    </AppProvider>
  );
}

export default App;

