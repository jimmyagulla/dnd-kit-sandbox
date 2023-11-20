import './App.css';

import { getQuotes } from './mocks';
import { Quote } from './types';
import { Quotation } from './components';

function App() {
  const quotes: Quote[] = getQuotes();

  console.log(quotes);

  return (
    <>
      <h1>
        Hello World
      </h1>
      <Quotation id={1} quotes={quotes} />
    </>
  );
}

export default App;
