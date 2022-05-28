var input = document.getElementById("msg");

    input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMSG();
    }
    });
    document.getElementById("butao").addEventListener("click", (() => {
        enviarMSG()
    }));

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
    import {
    getDatabase,
    ref,
    set,
    push,
    remove,
    onValue,
    } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

    var firebaseConfig = {
    apiKey: "AIzaSyCk6DZ3AzD94H52crcyhrAhQ9ZovemnZ-Q",
    authDomain: "chat-app-a761e.firebaseapp.com",
    projectId: "chat-app-a761e",
    storageBucket: "chat-app-a761e.appspot.com",
    messagingSenderId: "767776715184",
    appId: "1:767776715184:web:a5984a222e3eeb6320a675",
    };

    const app = initializeApp(firebaseConfig);

    var db = getDatabase(app);
    const dbRef = ref(db, "turma3", "turma4");

    var meuhtml = "";

    var nomeUsuario = prompt("Digite seu nome: ");

    onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    meuhtml = "";
    snapshot.forEach(function (childSnapshot) {
        
        var key = childSnapshot.key;
        console.log(key);
        console.log(childSnapshot.val().nome);
        console.log(childSnapshot.val().mensagem);
    
    let classezinha = ""
    if (nomeUsuario == childSnapshot.val().nome){
        classezinha = "eu";
    }else{
        classezinha = "outros"
    }
    meuhtml += '<div class="bo"><div class="'+classezinha+'"><div class="hoho self"><b>' + childSnapshot.val().nome + '</b><span>' + childSnapshot.val().mensagem + '<span><br><span class="hour">' + childSnapshot.val().horario + ' </span><span id="'+key+'" class="botaoDel"> DEL</span></div></div></div>'

    });
    atualizarHTML();
    let arrBotoesDelete = Array.from(document.querySelectorAll('.botaoDel'))

    arrBotoesDelete.forEach((botao) => {
        botao.addEventListener('click', () => {
            let msgRef = ref(db, `turma3/${botao.id}`);
            remove(msgRef);

        });
    });
    });

    function enviarMSG() {
    var datahj = new Date();
    var hora =
        datahj.getHours() +
        ":" +
        datahj.getMinutes() +
        ":" +
        datahj.getSeconds();

    push(ref(db, "turma3"), {
        nome: nomeUsuario,
        horario: hora,
        mensagem: document.getElementById("msg").value,
    });

    document.getElementById("msg").value = "";
    }

    function atualizarHTML() {
    document.getElementById("conteudo").innerHTML = meuhtml;
    ajustarScroll();
    }
    function ajustarScroll() {
    console.log("corrirgir scroll");
    var divConteudo = document.getElementById("conteudo");
    divConteudo.scrollTop = divConteudo.scrollHeight;
    }