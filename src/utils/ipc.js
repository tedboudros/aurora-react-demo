const { ipcRenderer } = window.require("electron");

export default (type, params) =>
  new Promise((resolve) => {
    ipcRenderer.send(type.REQ, params);
    ipcRenderer.on(type.RES, (event, data) => resolve({ event, data }));
  });
