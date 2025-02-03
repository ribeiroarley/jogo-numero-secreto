// Aguarda o carregamento da página para exibir a mensagem inicial
document.addEventListener('DOMContentLoaded', function () {
    exibirMensagemInicial();
});

// Variáveis globais
let listaDeNumerosSorteados = []; // Lista para evitar repetição de números
let numeroLimite = 1000; // Define o limite do número
let numeroSecreto = gerarNumeroAleatorio(); // Gera o primeiro número secreto
let tentativas = 1; // Contador de tentativas do jogador

// Função para gerar um número aleatório sem repetir
function gerarNumeroAleatorio() {
    let numeroEscolhido;

    // Se todos os números já foram sorteados, reinicia a lista
    if (listaDeNumerosSorteados.length == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Gera um número que ainda não foi sorteado
    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    // Adiciona o número à lista de sorteados
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados); // Exibe os números sorteados no console para depuração
    return numeroEscolhido;
}

// Função para verificar o palpite do usuário
function verificarChute() {
    let chute = document.querySelector('#inputChute').value;
    let historico = document.querySelector('.historico');

    // Verifica se a entrada é válida
    if (isNaN(chute) || chute.trim() === '') {
        alert('Digite um número válido!');
        return;
    }

    chute = parseInt(chute); // Converte a entrada para número

    // Se o usuário acertou o número secreto
    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        // Ativa o botão de reinício e muda o fundo para verde
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.body.style.backgroundColor = 'green';
    } else {
        // Se o chute for maior ou menor que o número secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; // Aumenta o contador de tentativas
        limparCampo(); // Limpa o campo de entrada

        // Adiciona o chute ao histórico
        let lista = historico.querySelector('ul');
        if (!lista) {
            lista = document.createElement('ul');
            historico.appendChild(lista);
        }
        
        let item = document.createElement('li');
        item.textContent = `Chute: ${chute}`;
        lista.appendChild(item);

        // Altera a cor de fundo para vermelho
        document.body.style.backgroundColor = 'red';
    }
}

// Função para exibir mensagens na tela e ativar a leitura por voz
function exibirTextoNaTela(seletor, texto) {
    let campo = document.querySelector(seletor);
    campo.innerHTML = texto;

    // Se o navegador suporta leitura por voz
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    document.querySelector('#inputChute').value = '';
}

// Exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000');
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();

    // Desativa o botão de reinício e volta a cor do fundo ao normal
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.body.style.backgroundColor = '';

    // Limpa o histórico de chutes
    let historico = document.querySelector('.historico ul');
    if (historico) {
        historico.innerHTML = '';
    }
}
