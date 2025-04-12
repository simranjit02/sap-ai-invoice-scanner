sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("invoiceScanner.project1.controller.View1", {
    onInit: function () {
      this._selectedFile = null; // store selected file here
    },

    onFileChange: function (oEvent) {
      const file = oEvent.getParameter("files")?.[0];
      if (file) {
        this._selectedFile = file;
        MessageToast.show(`Selected file: ${file.name}`);
      } else {
        this._selectedFile = null;
        MessageToast.show("No file selected.");
      }
    },

    onUploadPress: function () {
      if (!this._selectedFile) {
        MessageToast.show("Please select a file before uploading.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this._selectedFile);

      fetch("https://9d9c-212-3-198-216.ngrok-free.app/scan-invoice", {
        method: "POST",
        body: formData
      })
        .then(response => console.log("response",response))
        .then(data => {
          const output = this.getView().byId("output");
          if (output) {
            output.setText(
              `Vendor: ${data.vendor}\nInvoice: ${data.invoiceNumber}\nDate: ${data.date}\nAmount: ${data.amount}`
            );
          }
        })
        .catch(error => {
          console.log("error->>>>",error)
          MessageToast.show("Error uploading invoice: " + error.message);
        });
    }
  });
});
