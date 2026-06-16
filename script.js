<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgroVerde – Sustentabilidade no Agronegócio</title>
    <style>
        :root {
            --primary: #2e7d32;
            --primary-light: #4caf50;
            --secondary: #1565c0;
            --dark: #212121;
            --light: #f5f5f5;
            --white: #ffffff;
            --danger: #c62828;
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: var(--light);
            color: var(--dark);
            line-height: 1.6;
        }

        /* HEADER */
        header {
            position: sticky;
            top: 0;
            background: var(--white);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }

        .logo {
            font-weight: bold;
            color: var(--primary);
            font-size: 1.3rem;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 1rem;
        }

        .nav-menu a {
            text-decoration: none;
            color: var(--dark);
            padding: 0.5rem 1rem;
            transition: var(--transition);
        }

        .nav-menu a:hover {
            color: var(--primary);
        }

        .menu-toggle {
            display: none;
            font-size: 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
        }

        /* HERO */
        .hero {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6') center/cover;
            color: white;
            text-align: center;
            padding: 6rem 2rem;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }

        /* SEÇÕES */
        section {
            padding: 4rem 2rem;
            max-width: 1000px;
            margin: auto;
        }

        section h2 {
            margin-bottom: 1.5rem;
            color: var(--primary);
        }

        /* BOTÃO & INPUTS */
        .btn {
            background: var(--primary);
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            margin-top: 10px;
            font-size: 1rem;
            border-radius: 4px;
            transition: var(--transition);
        }

        .btn:hover {
            background: var(--primary-light);
        }

        input[type="number"], select {
            padding: 10px;
            margin: 5px 0;
            width: 100%;
            max-width: 300px;
            display: block;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        /* QUIZ */
        .quiz-option {
            background: #eee;
            padding: 15px;
            margin: 10px 0;
            cursor: pointer;
            border-radius: 5px;
            transition: var(--transition);
        }

        .quiz-option:hover {
            background: #e0e0e0;
        }

        .result-box {
            margin-top: 15px;
            padding: 15px;
            background: #e8f5e9;
            border-left: 4px solid var(--primary);
            display: none;
            border-radius: 0 4px 4px 0;
            font-weight: bold;
        }

        /* MENU MOBILE */
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 60px;
                left: 0;
                width: 100%;
                background: white;
                padding: 1rem;
                box-shadow: 0 4px 5px rgba(0,0,0,0.1);
            }

            .nav-menu.active {
                display: flex;
            }

            .menu-toggle {
                display: block;
            }
        }
    </style>
</head>
<body>

    <header>
        <div class="nav-container">
            <div class="logo">🍃 AgroVerde</div>
            <button class="menu-toggle" id="menuToggle">☰</button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#home">Home</a></li>
                <li><a href="#quiz">Quiz</a></li>
                <li><a href="#calc">Calculadora</a></li>
            </ul>
        </div>
    </header>

    <section id="home" class="hero">
        <h1>Agronegócio Sustentável</h1>
        <p>Produzir hoje preservando o amanhã</p>
    </section>

    <section id="quiz">
        <h2>Quiz Sustentabilidade</h2>
        <div class="quiz-option" onclick="responderQuiz(this, true)">
            Agricultura sustentável ajuda o meio ambiente
        </div>
        <div class="quiz-option" onclick="responderQuiz(this, false)">
            Desmatamento sempre melhora a produção
        </div>
        <div class="result-box" id="quizResult"></div>
    </section>

    <section id="calc">
        <h2>Calculadora de Impacto</h2>
        <label for="area">Tamanho da Área:</label>
        <input id="area" type="number" placeholder="Área (hectares)">
        
        <label for="cultivo">Tipo de Cultivo:</label>
        <select id="cultivo">
            <option value="soja">Soja</option>
            <option value="milho">Milho</option>
            <option value="organico">Orgânico</option>
        </select>
        
        <button class="btn" onclick="calcularImpacto()">Calcular</button>
        <div class="result-box" id="resultado"></div>
    </section>

    <script>
        /* MENU MOBILE */
        const menuToggle = document.getElementById("menuToggle");
        const navMenu = document.getElementById("navMenu");

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        // Fecha o menu mobile ao clicar em um link
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });

        /* QUIZ */
        function responderQuiz(el, correto) {
            // Desabilita novas interações após a resposta
            document.querySelectorAll(".quiz-option").forEach(e => e.style.pointerEvents = "none");
            
            if (correto) {
                el.style.background = "#c8e6c9";
                mostrar("quizResult", "✅ Correto! A agricultura sustentável preserva os recursos naturais.");
            } else {
                el.style.background = "#ffcdd2";
                mostrar("quizResult", "❌ Errado! O desmatamento prejudica o ecossistema e destrói o solo a longo prazo.");
            }
        }

        /* CALCULADORA */
        function calcularImpacto() {
            const area = document.getElementById("area").value;
            const cultivo = document.getElementById("cultivo").value;

            if (!area || area <= 0) {
                alert("Digite uma área válida maior do que zero.");
                return;
            }

            // Define os multiplicadores de impacto com base na escolha
            let fator = cultivo === "soja" ? 2.5 : cultivo === "milho" ? 2 : 0.7;
            let resultado = (area * fator).toFixed(2);
            
            mostrar("resultado", `🌱 Índice de Impacto Estimado: ${resultado} pontos de pegada ecológica.`);
        }

        /* FUNÇÃO DE MENSAGEM */
        function mostrar(id, msg) {
            const box = document.getElementById(id);
            box.style.display = "block";
            box.innerHTML = msg;
        }
    </script>
</body>
</html>
