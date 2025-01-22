document.addEventListener('DOMContentLoaded', function() {
    // Alterar o conteúdo da tag h1
    let titulo = document.querySelector('h1');
    titulo.innerHTML = 'Hora do Desafio';

    // Função para exibir mensagem no console
    function exibirMensagemNoConsole() {
        console.log('O botão foi clicado!');
    }

    // Função para exibir alerta
    function exibirAlerta() {
        alert('Eu amo JS');
    }

    // Função para perguntar o nome de uma cidade e exibir um alerta
    function exibirPrompt() {
        let nomeDaCidade = prompt('Digite o nome de uma cidade do Brasil que você gosta muito:');
        alert(`Estive em ${nomeDaCidade} e lembrei de você`);
    }

    // Função para somar dois números e exibir o resultado
    function somandoDoisNumeros() {
        let primeiroNumero = parseInt(prompt('Digite o primeiro número'));
        let segundoNumero = parseInt(prompt('Digite o segundo número'));
        let resultado = primeiroNumero + segundoNumero;
        alert(`${primeiroNumero} + ${segundoNumero} = ${resultado}`);
    }

    // Adiciona eventos de clique aos botões
    document.querySelector('#botaoConsole').addEventListener('click', exibirMensagemNoConsole);
    document.querySelector('#botaoAlerta').addEventListener('click', exibirAlerta);
    document.querySelector('#botaoPrompt').addEventListener('click', exibirPrompt);
    document.querySelector('#botaoSoma').addEventListener('click', somandoDoisNumeros);
});

// Função para exibir texto na tela e falar o texto usando Web Speech API
function exibirTextoNaTela(seletor, texto) {
    let campo = document.querySelector(seletor);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Variáveis globais
let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para gerar um número aleatório entre 1 e 1000 que não foi sorteado antes
function gerarNumeroAleatorio() {
    let numeroEscolhido;
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados); // Para verificar a lista de números sorteados
    return numeroEscolhido;
}

// Função para verificar chute
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Função para exibir mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000');
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Exibir mensagem inicial ao carregar a página
exibirMensagemInicial();