import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const PersonDetails = React.lazy(() => import('./pages/PersonDetails'));
const InformationForm = React.lazy(() => import('./pages/InformationForm'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/pessoa/:id"
              element={
                <Suspense fallback={<div>Carregando...</div>}>
                  <PersonDetails />
                </Suspense>
              }
            />
            <Route
              path="/pessoa/:id/informar"
              element={
                <Suspense fallback={<div>Carregando...</div>}>
                  <InformationForm />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;