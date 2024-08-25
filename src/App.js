import React from 'react';
import Dashboard from './components/Dashboard';
import { WidgetProvider } from './context/WidgetContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  
  return (
    <WidgetProvider>
      <Dashboard />
    </WidgetProvider>
  );
};

export default App;
