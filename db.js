let db;
const request = indexedDB.open("pwaDB", 1);

request.onupgradeneeded = event => {
    db = event.target.result;
    db.createObjectStore("data", { keyPath: "id" });
};

request.onsuccess = event => {
    db = event.target.result;
    console.log("Base de datos inicializada.");
};

request.onerror = event => {
    console.error("Error con IndexedDB:", event.target.error);
};
