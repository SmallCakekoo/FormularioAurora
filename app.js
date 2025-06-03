import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
console.log("Inicializando Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase inicializado correctamente");

// Funciones para el modal
window.closeModal = function () {
  document.getElementById("successModal").classList.remove("active");
};

function showModal() {
  document.getElementById("successModal").classList.add("active");
}

// Obtener el formulario
const form = document.getElementById("evaluationForm");
if (!form) {
  console.error("No se pudo encontrar el formulario");
}

// Manejar el envío del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Formulario enviado");

  try {
    // Obtener todos los valores del formulario
    const formData = {
      nombreGestora: form.nombreGestora.value,
      meGustaPorQue: form.meGustaPorQue.value,
      noMeGustaPorQue: form.noMeGustaPorQue.value,
      deseariaQue: form.deseariaQue.value,
      queTalSi: form.queTalSi.value,
      laGentePensariaQue: form.laGentePensariaQue.value,
      nosBeneficiariaEn: form.nosBeneficiariaEn.value,
      meGustariaQueBeneficiaraEn: form.meGustariaQueBeneficiaraEn.value,
      siPeroTenerEnCuenta: form.siPeroTenerEnCuenta.value,
      comentariosGenerales: form.comentariosGenerales.value,
      fechaCreacion: new Date(),
      // Nuevos campos de evaluación por puntos
      pertinencia_general:
        form.querySelector('input[name="pertinencia_general"]:checked')
          ?.value || null,
      factibilidad_general:
        form.querySelector('input[name="factibilidad_general"]:checked')
          ?.value || null,
      viabilidad_general:
        form.querySelector('input[name="viabilidad_general"]:checked')?.value ||
        null,
      impacto_general:
        form.querySelector('input[name="impacto_general"]:checked')?.value ||
        null,
    };

    console.log("Intentando guardar datos:", formData);

    // Agregar el documento a la colección "opinions"
    const docRef = await addDoc(collection(db, "opinions"), formData);
    console.log("Documento agregado con ID:", docRef.id);

    // Limpiar el formulario
    form.reset();

    // Mostrar el modal de éxito
    showModal();
  } catch (error) {
    console.error("Error detallado:", error);
    alert("Error al enviar la evaluación: " + error.message);
  }
});
