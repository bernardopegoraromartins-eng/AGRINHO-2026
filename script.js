/* MENU MOBILE */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Alterna a visibilidade do menu mobile ao clicar no botão hambúrguer
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Fecha o menu mobile automaticamente após o usuário clicar em um link de ancoragem
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

/* QUIZ */
function responderQuiz(el, correto) {
    // Desabilita novas escolhas para impedir múltiplos cliques
    document.querySelectorAll(".quiz-option").forEach(e => {
        e.style.pointerEvents = "none";
    });

    if (correto) {
        el.style.background = "#c8e6c9";
        el.style.border = "1px solid #4caf50";
        mostrar("quizResult", "✅ <strong>Correto!</strong> Práticas sustentáveis protegem o solo e os recursos hídricos.");
    } else {
        el.style.background = "#ffcdd2";
        el.style.border = "1px solid #f44336";
        mostrar("quizResult", "❌ <strong>Errado!</strong> O desmatamento destrói o ecossistema e prejudica o regime de chuvas necessário para a própria agricultura.");
        document.getElementById("quizResult").style.borderColor = "var(--danger)";
    }
}

/* CALCULADORA */
function calcularImpacto() {
    const areaInput = document.getElementById("area");
    const cultivo = document.getElementById("cultivo").value;
    const area = parseFloat(areaInput.value);

    // Validação para garantir que o usuário digitou um número positivo válido
    if (!area || area <= 0) {
        alert("Por favor, digite uma área válida maior que zero.");
        return;
    }

    // Definição fictícia dos fatores de impacto ambiental para a lógica do cálculo
    let fator = cultivo === "soja" ? 2.5 : cultivo === "milho" ? 2.0 : 0.7;
    let resultado = (area * fator).toFixed(2);
    
    let mensagem = "";
    if (cultivo === "organico") {
        mensagem = `🌱 <strong>Pontuação de Impacto: ${resultado}</strong><br>Parabéns! O cultivo orgânico possui baixo impacto ambiental e regenera o ecossistema.`;
    } else {
        mensagem = `🚜 <strong>Pontuação de Impacto: ${resultado}</strong><br>Cultivos tradicionais exigem monitoramento constante do uso de recursos e insumos.`;
    }

    mostrar("resultado", mensagem);
}

/* FUNÇÃO AUXILIAR DE MENSAGEM */
function mostrar(id, msg) {
    const box = document.getElementById(id);
    box.style.display = "block";
    box.innerHTML = msg;
}
