import logo from './logo.svg';
import Navigation from './components/navigation/navigation';
import Login from './components/login/login';
import { MyProvider } from './components/ReactContext/myContext';

function App() {
  return (
    <MyProvider>
      <Navigation/>
    </MyProvider>
  );
} 

export default App;
