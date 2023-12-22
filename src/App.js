import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './components/context/loadingcontext';
import Header from './components/header/header';
import AppRoutes from './components/route/routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingProvider>
          <Header/>
          <AppRoutes/>
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;