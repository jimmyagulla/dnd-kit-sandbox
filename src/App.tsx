import './App.css';

import { Form } from 'antd';

import { getQuotes } from './mocks';
import { Quote } from './types';
import { QuotationTable } from './components';
import { QuotationProvider } from './contexts';

// On part du principe que l'app correspond au tab "Edition de ligne de devis"
// appartenant à la page "Devis" du site TWP.
function App() {
  const [form] = Form.useForm();
  const quotes: Quote[] = getQuotes();

  return (
    <div className="App">
      <QuotationProvider form={form} quotes={quotes}>
        <QuotationTable />
      </QuotationProvider>
    </div>
  );
}

export default App;
