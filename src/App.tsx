import './App.css';

import { getQuotes } from './mocks';
import { Quote } from './types';
import { QuotationTable } from './components';

function App() {
  const quotes: Quote[] = getQuotes();

  return (
    <div className="App">
      <QuotationTable quotes={quotes} />
    </div>
  );
}

export default App;
