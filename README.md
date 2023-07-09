# Flappy Bird

Réplica do jogo Flappy Bird feito com Javascript Puro (sem `Canvas`)


[Acesse o jogo completo aqui](https://josuefernandes7.github.io/FlappyBird_JS/)


[Assets utilizados](https://github.com/samuelcust/flappy-bird-assets/tree/master)

# Documentação do Jogo Flappy Bird

## Visão Geral
O jogo Flappy Bird é um jogo simples e viciante em que o jogador controla um pássaro e deve evitar obstáculos, como canos, voando através de espaços estreitos entre eles. O objetivo é chegar o mais longe possível, acumulando pontos a cada obstáculo superado. O jogo termina quando o pássaro colide com um obstáculo ou com o chão.

## Funcionamento do Jogo
- O jogador inicia o jogo clicando no botão "start".
- O pássaro começa a voar e cai gradualmente devido à gravidade.
- O jogador pode fazer o pássaro saltar clicando no tabuleiro do jogo.
- O objetivo é passar pelo máximo de espaços entre os canos sem colidir com eles.
- Cada vez que o jogador passa por um par de canos, ele ganha um ponto.
- O jogo continua até que o pássaro colida com um cano ou com o chão.
- Após o término do jogo, o jogador pode reiniciar clicando no botão "start".

## Implementação Resumida
- O jogo foi implementado em JavaScript utilizando elementos HTML e CSS para a representação visual.
- O código faz uso de manipulação do DOM para interagir com os elementos do jogo.
- As funções são utilizadas para controlar o movimento do pássaro, geração e posicionamento dos canos, detecção de colisão e pontuação.
- Foram utilizados temporizadores para atualizar a posição do pássaro, gerar os canos em intervalos regulares e monitorar a colisão a cada 50ms.
- Os áudios de fundo, ponto e morte foram incorporados ao jogo para criar uma experiência mais imersiva.

## Problemas e Soluções
- Problema: Detectar a colisão do pássaro com os canos e o chão.
  Solução: Utilizar as dimensões dos elementos e verificar as posições relativas para detectar colisões.

- Problema: Gerar canos em posições aleatórias e com espaçamento adequado.
  Solução: Utilizar números aleatórios para definir as posições dos canos e garantir um espaçamento adequado entre eles.

- Problema: Controlar o movimento do pássaro e simular o voo.
  Solução: Utilizar temporizadores para atualizar a posição vertical do pássaro e alternar entre diferentes imagens para criar a animação de movimento das asas.

- Problema: Reiniciar o jogo após o término.
  Solução: Limpar as variáveis, reiniciar os temporizadores e adicionar novamente os ouvintes de eventos para permitir que o jogador inicie um novo jogo.

Essa é uma documentação resumida do jogo Flappy Bird, destacando o funcionamento básico do jogo, sua implementação e algumas soluções para os problemas encontrados durante o desenvolvimento.
