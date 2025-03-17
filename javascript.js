let currentQuestion = 0;
let score = 0;
let playerName = '';
let history = JSON.parse(localStorage.getItem('quizHistory')) || [];

const questions = [
    // 8 fáceis (0,3 cada = 2,4 pontos)
    { text: "Qual é o maior estado do Brasil em área?", type: "radio", options: ["São Paulo", "Amazonas", "Bahia", "Minas Gerais"], answer: "Amazonas", difficulty: "easy", points: 0.3 },
    { text: "Quantos estados tem a região Nordeste?", type: "radio", options: ["7", "8", "9", "10"], answer: "9", difficulty: "easy", points: 0.3 },
    { text: "Qual rio é o maior do mundo em volume de água?", type: "radio", options: ["São Francisco", "Paraná", "Amazonas", "Tietê"], answer: "Amazonas", difficulty: "easy", points: 0.3 },
    { text: "Qual é a capital do Brasil?", type: "radio", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: "Brasília", difficulty: "easy", points: 0.3 },
    { text: "Qual estado é famoso pelo carnaval do Rio?", type: "radio", options: ["Pernambuco", "Rio de Janeiro", "Santa Catarina", "Espírito Santo"], answer: "Rio de Janeiro", difficulty: "easy", points: 0.3 },
    { text: "Quantas regiões oficiais o Brasil tem?", type: "radio", options: ["4", "5", "6", "7"], answer: "5", difficulty: "easy", points: 0.3 },
    { text: "Qual bioma cobre a maior parte do norte do Brasil?", type: "radio", options: ["Cerrado", "Caatinga", "Amazônia", "Pampa"], answer: "Amazônia", difficulty: "easy", points: 0.3 },
    { text: "Qual é a maior cidade da Amazônia?", type: "radio", options: ["Manaus", "Belém", "Porto Velho", "Macapá"], answer: "Manaus", difficulty: "easy", points: 0.3 },

    // 7 médias (0,7 cada = 4,9 pontos)
    { text: "Em qual região fica o Pantanal?", type: "radio", options: ["Centro-Oeste", "Sudeste", "Norte", "Sul"], answer: "Centro-Oeste", difficulty: "medium", points: 0.7 },
    { text: "O Brasil faz fronteira com quantos países?", type: "radio", options: ["8", "9", "10", "11"], answer: "10", difficulty: "medium", points: 0.7 },
    { text: "Qual é o menor estado do Brasil em área?", type: "radio", options: ["Sergipe", "Alagoas", "Rondônia", "Acre"], answer: "Sergipe", difficulty: "medium", points: 0.7 },
    { text: "Qual estado tem a maior costa litorânea?", type: "radio", options: ["Bahia", "Rio Grande do Sul", "São Paulo", "Paraná"], answer: "Bahia", difficulty: "medium", points: 0.7 },
    { text: "Qual estado abriga a Chapada Diamantina?", type: "radio", options: ["Goiás", "Bahia", "Mato Grosso", "Tocantins"], answer: "Bahia", difficulty: "medium", points: 0.7 },
    { text: "Digite o nome do arquipélago famoso por Fernando de Noronha:", type: "text", answer: "Fernando de Noronha", difficulty: "medium", points: 0.7 },
    { text: "Qual região tem o maior número de estados?", type: "radio", options: ["Nordeste", "Sudeste", "Sul", "Centro-Oeste"], answer: "Nordeste", difficulty: "medium", points: 0.7 },

    // 5 difíceis (1 cada = 5 pontos)
    { text: "Digite o nome da montanha mais alta do Brasil:", type: "text", answer: "Pico da Neblina", difficulty: "hard", points: 1 },
    { text: "Selecione o estado onde fica o deserto brasileiro:", type: "select", options: ["Maranhão", "Piauí", "Ceará", "Bahia"], answer: "Maranhão", difficulty: "hard", points: 1 },
    { text: "Selecione o estado com o maior número de municípios:", type: "select", options: ["São Paulo", "Minas Gerais", "Bahia", "Paraná"], answer: "Minas Gerais", difficulty: "hard", points: 1 },
    { text: "Digite o nome do rio que corta o sertão nordestino:", type: "text", answer: "São Francisco", difficulty: "hard", points: 1 },
    { text: "Qual estado é conhecido como 'Terra das Águas'?", type: "radio", options: ["Mato Grosso do Sul", "Pará", "Mato Grosso", "Amapá"], answer: "Mato Grosso do Sul", difficulty: "hard", points: 1 }
];

function startQuiz() {
    playerName = document.getElementById('player-name').value || 'Jogador Anônimo';
    document.getElementById('name-section').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('question-container');
    const q = questions[currentQuestion];
    let html = `<div class="question"><h3>${q.text} (${q.difficulty} - ${q.points} ponto${q.points > 1 ? 's' : ''})</h3>`;

    if (q.type === 'radio') {
        q.options.forEach(option => {
            html += `<label><input type="radio" name="q${currentQuestion}" value="${option}"> ${option}</label><br>`;
        });
    } else if (q.type === 'text') {
        html += `<input type="text" id="text-answer${currentQuestion}" placeholder="Digite sua resposta">`;
    } else if (q.type === 'select') {
        html += `<select id="select-answer${currentQuestion}">`;
        q.options.forEach(option => {
            html += `<option value="${option}">${option}</option>`;
        });
        html += `</select>`;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function nextQuestion() {
    const q = questions[currentQuestion];
    let userAnswer;

    if (q.type === 'radio') {
        const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
        userAnswer = selected ? selected.value : '';
    } else if (q.type === 'text') {
        userAnswer = document.getElementById(`text-answer${currentQuestion}`).value.trim();
    } else if (q.type === 'select') {
        userAnswer = document.getElementById(`select-answer${currentQuestion}`).value;
    }

    if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
        score += q.points;
        document.getElementById('score').textContent = `Pontuação: ${score.toFixed(1)}/10`;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('final-score').textContent = `${playerName}, sua pontuação final: ${score.toFixed(1)}/10`;

    history.push({ name: playerName, score: score.toFixed(1) });
    localStorage.setItem('quizHistory', JSON.stringify(history));
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    history.forEach(entry => {
        historyList.innerHTML += `<li>${entry.name}: ${entry.score}/10</li>`;
    });
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = 'Pontuação: 0/10';
    document.getElementById('result').style.display = 'none';
    document.getElementById('name-section').style.display = 'block';
}