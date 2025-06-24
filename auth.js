import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.cadastrar = async function () {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const tipo = document.getElementById("tipo").value;

  if (!email || !senha) {
    alert("Preencha email e senha.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await setDoc(doc(db, "usuarios", userCredential.user.uid), {
      email: email,
      tipo: tipo,
      criadoEm: new Date()
    });
    alert("Cadastro realizado!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro: " + error.message);
  }
};

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    alert("Preencha email e senha.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro: " + error.message);
  }
};
