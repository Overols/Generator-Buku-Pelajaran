
import React from 'react';
import { AppProvider } from './state/AppContext';
import DashboardView from './components/views/DashboardView';

// Root Component: Responsibilities limited to Providers and Routing (if added later)
const App: React.FC = () => {
  return (
    <AppProvider>
        <DashboardView />
    </AppProvider>
  );
};

export default App;
