var PERSONAGEM_DIREITA = 1;
var PERSONAGEM_CIMA = 2;
var PERSONAGEM_ESQUERDA = 3;
var PERSONAGEM_BAIXO = 4;
//som item
var SOM_ITEM = new Audio();
SOM_ITEM.src = 'snd/items.mp3';
SOM_ITEM.volume = 0.5;
SOM_ITEM.type = 'type="audio/mp3';
SOM_ITEM.load();
//som colisao com bichos
var SOM_ATAQUE = new Audio();
SOM_ATAQUE.src = 'snd/attack.mp3';
SOM_ATAQUE.volume = 0.4;
SOM_ATAQUE.type = 'type="audio/mp3';
SOM_ATAQUE.load();
//som colisao com espada
var SOM_CORTE = new Audio();
SOM_CORTE.src = 'snd/corte.mp3';
SOM_CORTE.volume = 0.3;
SOM_CORTE.type = 'type="audio/mp3';
SOM_CORTE.load();


function Personagem(context, teclado, imagem, imgExplosao, imgMorto) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgExplosao = imgExplosao;
    this.imgMorto = imgMorto;
    this.acabaramVidas = null;
    this.vidasExtras = 3;
    this.cheat = 1;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 4, 9);
    this.sheet.intervalo = 60;

    // Estado inicial
    this.andando = false;
    this.direcao = PERSONAGEM_CIMA;
    this.podeApanhar = true;
    this.ultimoTempo = new Date().getTime();
}
Personagem.prototype = {
    atualizar: function () {
        if (this.teclado.pressionada(SETA_DIREITA)) {
            // Se já não estava neste estado...
            if (!this.andando || this.direcao != PERSONAGEM_DIREITA) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 0;
                this.sheet.coluna = 1;
            }
            // Configuro o estado atual
            this.andando = true;
            this.direcao = PERSONAGEM_DIREITA;
            // Neste estado, a animação da spritesheet deve rodar
            this.sheet.proximoQuadro();
            if (this.x < this.context.canvas.width - 98) {
                // Desloco o Sonic
                this.x += this.velocidade;
            }
        } else if (this.teclado.pressionada(SETA_ESQUERDA)) {
            if (!this.andando || this.direcao != PERSONAGEM_ESQUERDA) {
                this.sheet.linha = 2; // Atenção, aqui será 2!
                this.sheet.coluna = 0;
            }

            this.andando = true;
            this.direcao = PERSONAGEM_ESQUERDA;
            this.sheet.proximoQuadro();

            if (this.x > -29) {
                this.x -= this.velocidade;
            }
        } else if (this.teclado.pressionada(SETA_ACIMA)) {
            if (!this.andando || this.direcao != PERSONAGEM_CIMA) {
                this.sheet.linha = 1;
                this.sheet.coluna = 0;
            }
            this.andando = true;
            this.direcao = PERSONAGEM_CIMA;
            this.sheet.proximoQuadro();
            if (this.y > -25) {
                this.y -= this.velocidade;
            }
        } else if (this.teclado.pressionada(SETA_ABAIXO)) {
            if (!this.andando || this.direcao != PERSONAGEM_BAIXO) {
                this.sheet.linha = 3;
                this.sheet.coluna = 0;
            }
            this.andando = true;
            this.direcao = PERSONAGEM_BAIXO;
            this.sheet.proximoQuadro();
            if (this.y < this.context.canvas.height - 97) {
                this.y += this.velocidade;
            }
        } else {
            if (this.direcao == PERSONAGEM_DIREITA)
                this.sheet.coluna = 0;
            else if (this.direcao == PERSONAGEM_ESQUERDA)
                this.sheet.linha = 2;
            else if (this.direcao == PERSONAGEM_BAIXO)
                this.sheet.linha = 3;
            else if (this.direcao == PERSONAGEM_CIMA)
                this.sheet.linha = 1;
            // Não chamo proximoQuadro!
            this.andando = false;
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    atirar: function () {
        var imgcima = new Image();
        imgcima.src = 'img/jogo/burst_arrowcima.png';
        var imgbaixo = new Image();
        imgbaixo.src = 'img/jogo/burst_arrowbaixo.png';
        var imgesquerda = new Image();
        imgesquerda.src = 'img/jogo/burst_arrowesquerda.png';
        var imgdireita = new Image();
        imgdireita.src = 'img/jogo/burst_arrowdireita.png';

        if (this.direcao == PERSONAGEM_CIMA) {
            var tiro = new Tiro(this.context, this, imgcima);
            this.animacao.novoSprite(tiro);
            this.colisor.novoSprite(tiro);
        }
        if (this.direcao == PERSONAGEM_BAIXO) {
            var tiro2 = new Tiro(this.context, this, imgbaixo);
            tiro2.velocidade = -400;
            this.animacao.novoSprite(tiro2);
            this.colisor.novoSprite(tiro2);
        }
        if (this.direcao == PERSONAGEM_ESQUERDA) {
            var tiro2 = new Tiro2(this.context, this, imgesquerda);
            tiro2.velocidade = -400;
            this.animacao.novoSprite(tiro2);
            this.colisor.novoSprite(tiro2);
        }
        if (this.direcao == PERSONAGEM_DIREITA) {
            var tiro2 = new Tiro2(this.context, this, imgdireita);
            this.animacao.novoSprite(tiro2);
            this.colisor.novoSprite(tiro2);
        }
    },
    retangulosColisao: function () {
        // Estes valores vão sendo ajustados aos poucos
        var rets = [
            {
                x: this.x + 35,
                y: this.y + 33,
                largura: 58,
                altura: 60
            }
            ];
        /*      //Desenhando os retângulos para visualização
        var ctx = this.context;
        for (var i in rets) {
        ctx.save();
        ctx.strokeStyle = 'yellow';
        ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura,
        rets[i].altura);
        ctx.restore();
        } */
        return rets;
    },
    colidiuCom: function (outro) {
        // Se colidiu com um Zerk...
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;
        if ((this.podeApanhar == true) && (decorrido >= 3000)) {
            if ((outro instanceof Zerk) || (outro instanceof Warrior) || (outro instanceof Shaman)) {
                SOM_ATAQUE.currentTime = 0.0;
                SOM_ATAQUE.play();
                this.podeApanhar = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                var exp1 = new Morto(this.context, this.imgMorto, this.x, this.y);
                this.animacao.novoSprite(exp1);

                var personagem = this;
                this.velocidade = 3;
                exp1.fimDaExplosao = function () {
                    personagem.vidasExtras--;
                    if (personagem.vidasExtras < 0) {
                        musicaAcao.pause();
                        if (personagem.acabaramVidas)
                            personagem.acabaramVidas();
                    } else {
                        //recolocar a personagem no engine
                        personagem.colisor.novoSprite(personagem);
                        personagem.animacao.novoSprite(personagem);
                        personagem.posicionar();
                    }
                }
            } else if ((outro instanceof TiroShaman) || (outro instanceof TiroWarlord) || (outro instanceof TiroMarauder) || (outro instanceof TiroMarauderDiag) || (outro instanceof TiroMarauderDiag2)) {
                SOM_CORTE.currentTime = 0.0;
                SOM_CORTE.play();
                this.podeApanhar = false;
                this.animacao.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(this);
                this.colisor.excluirSprite(outro);

                var exp1 = new Morto(this.context, this.imgMorto,
                    this.x, this.y);
                this.animacao.novoSprite(exp1);

                var personagem = this;

                exp1.fimDaExplosao = function () {
                    personagem.vidasExtras--;
                    if (personagem.vidasExtras < 0) {
                        musicaAcao.pause();
                        if (personagem.acabaramVidas) personagem.acabaramVidas();
                    } else {
                        //recolocar a personagem no engine
                        personagem.colisor.novoSprite(personagem);
                        personagem.animacao.novoSprite(personagem);
                        personagem.posicionar();
                    }
                }
            } else if (outro instanceof Health) {
                SOM_ITEM.currentTime = 0.0;
                SOM_ITEM.play();
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var personagem = this;

                if (personagem.vidasExtras < 3) {
                    context.save();
                    context.fillStyle = 'green';
                    context.strokeStyle = 'white';
                    context.font = '30px sans-serif';
                    context.fillText("+1 HP", personagem.x + 10, personagem.y - 5);
                    context.strokeText("+1 HP", personagem.x + 10, personagem.y - 5);
                    context.restore();
                    personagem.vidasExtras++;
                }
            } else if (outro instanceof Boots) {
                SOM_ITEM.currentTime = 0.0;
                SOM_ITEM.play();
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var personagem = this;

                this.velocidade = 10;
                context.save();
                context.fillStyle = 'yellow';
                context.strokeStyle = 'white';
                context.font = '30px sans-serif';
                context.fillText("SPEED BOOST", personagem.x + 10, personagem.y - 5);
                context.strokeText("SPEED BOOST", personagem.x + 10, personagem.y - 5);
                context.restore();
            }
        }
    },
    posicionar: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 60; //36 / 2
        this.y = canvas.height - 120;
        if (decorrido >= 2000) {
            this.podeApanhar = true;
            this.ultimoTempo = agora;
        }
    }
}