import InvoicePage from "./components/InvoicePage";
import "./scss/main.scss";

function InVoiceApp() {
  const savedInvoice = window.localStorage.getItem("invoiceData");
  let data = null;

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice);
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice) => {
    window.localStorage.setItem("invoiceData", JSON.stringify(invoice));
  };

  return (
    <div className="app">
      <h1 className="center fs-30">React Invoice Generator</h1>
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
  );
}

export default InVoiceApp;
