const video = document.getElementById("camera");
const canvas = document.getElementById("snapshot");
const captureBtn = document.getElementById("capture-btn");

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registrado."));
}

//solicita Permiso para el uso de camara
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Error al acceder a la cámara:", err));
} else {
    alert("Tu dispositivo no soporta acceso a la cámara.");
}

// Capturar imagen de la cámara
captureBtn.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    alert("Imagen capturada.");
});

/*  Notificaciones Push
document.getElementById("notify-btn").addEventListener("click", () => {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("¡Hola! Esto es una notificación.");
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("¡Notificaciones habilitadas!");
            }
        });
    }
});
*/
document.getElementById("notify-btn").addEventListener("click", () => {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            // Crear la notificación con un icono
            new Notification("¡Hola! Bienvenido a mi PWA", {
                body: "Feliz Fin de Año",
                icon: "./assets/notify.png"
            });
        } else {
            // Solicitar permiso para enviar notificaciones
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("¡Notificaciones habilitadas!", {
                        body: "Gracias por habilitar las notificaciones.",
                        icon: "./assets/notify.png"
                    });
                }
            });
        }
    } else {
        alert("Tu navegador no soporta notificaciones push.");
    }
});
