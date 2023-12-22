import './App.css';

import { QuotesTable } from './components';

function App() {
  return (
    <div className="App">
      <QuotesTable
        getAutocompleteUrl="getAutocomplete"
        updateQuotationUrl="updateQuotation"
      />
    </div>
  );
}

export default App;
