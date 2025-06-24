import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("formContato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    await addDoc(collection(db, "contatos"), {
      nome,
      email,
      mensagem,
      data: new Date()
    });

    alert("Mensagem enviada com sucesso!");
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar: ", error);
    alert("Erro ao enviar mensagem.");
  }
});
