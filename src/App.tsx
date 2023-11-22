import './App.css';

import { getQuotes } from './mocks';
import { Quote } from './types';
import { Quotation, QuotationTable } from './components';

function App() {
  const quotes: Quote[] = getQuotes();

  return (
    <div className="App">
      {/* <h1>
        Hello World
      </h1> */}
      {/* <Quotation id={1} quotes={quotes} /> */}
      <QuotationTable quotes={quotes} />
    </div>
  );
}

export default App;
