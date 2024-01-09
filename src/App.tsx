import './App.css';

import { QuotesTable } from './components';

function App() {
  return (
    <div className="App">
      <QuotesTable
        getAutocompleteUrl="getAutocomplete"
        updateQuotationUrl="updateQuotation"
      />

      {/* <div style={{ paddingTop: 100 }} />
      <QuotationProvider form={form} quotes={quotes}>
        <QuotationTable/>
      </QuotationProvider> */}
    </div>
  );
}

export default App;
