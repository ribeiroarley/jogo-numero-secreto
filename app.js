document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('h1');
    titulo.innerHTML = 'Hora do Desafio';
});

function exibirTextoNaTela(seletor, texto) {
    const campo = document.querySelector(seletor);
    campo.innerHTML = texto;
}

let listaDeNumerosSorteados = [];
const numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
    let numeroEscolhido;
    const quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Reinicia a lista se todos os números já foram sorteados
    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

function verificarChute() {
    const chute = document.querySelector('input').value;

    // Verifica se o chute é válido
    if (chute < 1 || chute > 1000 || isNaN(chute)) {
        alert('Por favor, insira um número válido entre 1 e 1000.');
        limparCampo();
        return;
    }

    if (chute == numeroSecreto) {
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagemTentativas = `Parabéns! Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        
        // Exibe a mensagem de vitória e tentativas no parágrafo de feedback
        exibirTextoNaTela('#mensagem-feedback', mensagemTentativas);
        
        // Não reiniciar imediatamente após acerto
        setTimeout(() => {
            reiniciarJogo();
        }, 15000);  // Aguarda 15 segundos para exibir a mensagem de sucesso antes de reiniciar
    } else {
        // Dicas para o usuário
        exibirTextoNaTela('#mensagem-feedback', chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    const chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000');
    
    // Limpa a mensagem de feedback quando o jogo é reiniciado
    exibirTextoNaTela('#mensagem-feedback', '');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    limparCampo();
}

exibirMensagemInicial();

// Manipulação do evento Enter para verificar o chute
document.querySelector('input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        verificarChute();
    }
});

// Evento de clique para reiniciar o jogo
document.querySelector('#reiniciarButton').addEventListener('click', reiniciarJogo);
