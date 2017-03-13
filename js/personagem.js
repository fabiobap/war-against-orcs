var PERSONAGEM_DIREITA = 1;
var PERSONAGEM_CIMA = 2;
var PERSONAGEM_ESQUERDA = 3;
var PERSONAGEM_BAIXO = 4;
//som item
var SOM_ITEM = new Audio();
SOM_ITEM.src = 'snd/items.mp3';
SOM_ITEM.volume = 0.3;
SOM_ITEM.type = 'type="audio/mp3';
SOM_ITEM.load();
//som colisao com bichos
var SOM_COLISAO_CORTE = new Audio();
SOM_COLISAO_CORTE.src = 'snd/attack_colisao.mp3';
SOM_COLISAO_CORTE.volume = 0.2;
SOM_COLISAO_CORTE.type = 'type="audio/mp3';
SOM_COLISAO_CORTE.load();
//som de quando personagem morre
var SOM_GRITO = new Audio();
SOM_GRITO.src = 'snd/grunt.mp3';
SOM_GRITO.volume = 0.4;
SOM_GRITO.type = 'type="audio/mp3';
SOM_GRITO.load();
//som de quando personagem morre
var SOM_ITEM_FAIL = new Audio();
SOM_ITEM_FAIL.src = 'snd/fail_item.mp3';
SOM_ITEM_FAIL.volume = 0.9;
SOM_ITEM_FAIL.type = 'type="audio/mp3';
SOM_ITEM_FAIL.load();
//som de quando personagem morre
var SOM_SHIELD_SPARK = new Audio();
SOM_SHIELD_SPARK.src = 'snd/shield_cling.mp3';
SOM_SHIELD_SPARK.volume = 0.3;
SOM_SHIELD_SPARK.type = 'type="audio/mp3';
SOM_SHIELD_SPARK.load();

function Personagem(context, teclado, imagem, imgMorto, personagemTipo, imgSparks) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.imgMorto = imgMorto;
    this.imgSparks = imgSparks;
    this.personagemTipo = personagemTipo;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;

    this.acabaramVidas = null;
    this.vidasExtras = 10;
    this.IsBoss = false;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 4, 9);
    this.sheet.intervalo = 100;

    // Estado inicial
    this.andando = false;
    this.direcao = PERSONAGEM_CIMA;
    this.podeApanhar = true;
    this.tiroRapido = false;
    this.shielded = false;
    this.shieldedPoints = 0;

    this.ultimoTempo = new Date().getTime();
    this.ultimoTempoShield = new Date().getTime();
    this.ultimoTempoTiro = new Date().getTime();
    this.ultimoTempoTiroEspecial = new Date().getTime();
    console.log(this.shielded);
}
Personagem.prototype = {
    atualizar: function () {

        if (this.teclado.pressionada(SETA_DIREITA) || this.teclado.pressionada(TECLA_D)) {
            // Se já não estava neste estado...
            if (!this.andando || this.direcao != PERSONAGEM_DIREITA) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 3;
                this.sheet.coluna = 1;
            }
            // Configuro o estado atual
            this.andando = true;
            this.direcao = PERSONAGEM_DIREITA;
            // Neste estado, a animação da spritesheet deve rodar
            this.sheet.proximoQuadro();
            if (this.x < this.context.canvas.width - 60) {
                // Desloco o Sonic
                this.x += this.velocidade;
            }
        } else if (this.teclado.pressionada(SETA_ESQUERDA) || this.teclado.pressionada(TECLA_A)) {
            if (!this.andando || this.direcao != PERSONAGEM_ESQUERDA) {
                this.sheet.linha = 2; // Atenção, aqui será 2!
                this.sheet.coluna = 1;
            }

            this.andando = true;
            this.direcao = PERSONAGEM_ESQUERDA;
            this.sheet.proximoQuadro();

            if (this.x > 0) {
                this.x -= this.velocidade;
            }
        } else if (this.teclado.pressionada(SETA_ACIMA) || this.teclado.pressionada(TECLA_W)) {
            if (!this.andando || this.direcao != PERSONAGEM_CIMA) {
                this.sheet.linha = 1;
                this.sheet.coluna = 1;
            }
            this.andando = true;
            this.direcao = PERSONAGEM_CIMA;
            this.sheet.proximoQuadro();
            if (this.y > 5) {
                this.y -= this.velocidade;
            }
        } else if (this.teclado.pressionada(SETA_ABAIXO) || this.teclado.pressionada(TECLA_S)) {
            if (!this.andando || this.direcao != PERSONAGEM_BAIXO) {
                this.sheet.linha = 0;
                this.sheet.coluna = 1;
            }
            this.andando = true;
            this.direcao = PERSONAGEM_BAIXO;
            this.sheet.proximoQuadro();
            if (this.y < this.context.canvas.height - 60) {
                this.y += this.velocidade;
            }
        } else {
            if (this.direcao == PERSONAGEM_DIREITA) {
                this.sheet.coluna = 0;
                this.sheet.linha = 3;
            } else if (this.direcao == PERSONAGEM_ESQUERDA) {
                this.sheet.coluna = 0;
                this.sheet.linha = 2;
            } else if (this.direcao == PERSONAGEM_BAIXO) {
                this.sheet.linha = 0;
            } else if (this.direcao == PERSONAGEM_CIMA) {
                this.sheet.linha = 1;
            }
            this.andando = false;
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    atirar: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempoTiro;
        if (decorrido > 250 || this.tiroRapido === true) {
            if (this.personagemTipo == 1) {

                var tipoMunicao = 'faca';

                var imgcima = new Image();
                imgcima.src = 'img/faca_1.png';
                var imgbaixo = new Image();
                imgbaixo.src = 'img/faca_2.png';
                var imgesquerda = new Image();
                imgesquerda.src = 'img/faca_4.png';
                var imgdireita = new Image();
                imgdireita.src = 'img/faca_3.png';

            } else if (this.personagemTipo == 2) {

                var tipoMunicao = 'arrow';

                var imgcima = new Image();
                imgcima.src = 'img/arrow_1.png';
                var imgbaixo = new Image();
                imgbaixo.src = 'img/arrow_2.png';
                var imgesquerda = new Image();
                imgesquerda.src = 'img/arrow_4.png';
                var imgdireita = new Image();
                imgdireita.src = 'img/arrow_3.png';
            } else if (this.personagemTipo == 3) {

                var tipoMunicao = 'fireball';

                var imgcima = new Image();
                imgcima.src = 'img/fireball_mage_cima.png';
                var imgbaixo = new Image();
                imgbaixo.src = 'img/fireball_mage_baixo.png';
                var imgesquerda = new Image();
                imgesquerda.src = 'img/fireball_mage_esquerda.png';
                var imgdireita = new Image();
                imgdireita.src = 'img/fireball_mage_direita.png';
            }

            if (this.direcao == PERSONAGEM_CIMA) {
                var tiro = new Tiro(this.context, this, imgcima, tipoMunicao);
                tiro.velocidadeY = -10;
                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            if (this.direcao == PERSONAGEM_BAIXO) {
                var tiro = new Tiro(this.context, this, imgbaixo, tipoMunicao);
                tiro.velocidadeY = 10;
                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            if (this.direcao == PERSONAGEM_ESQUERDA) {
                var tiro = new Tiro(this.context, this, imgesquerda, tipoMunicao);
                tiro.velocidadeX = -10;
                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            if (this.direcao == PERSONAGEM_DIREITA) {
                var tiro = new Tiro(this.context, this, imgdireita, tipoMunicao);
                tiro.velocidadeX = 10;
                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            this.ultimoTempoTiro = agora;

        }
    },
    atirarEspecial: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempoTiroEspecial;
        if (decorrido > 3000) {
            if (this.personagemTipo == 1) {
                var tipoMunicao = 'espada';
                var img = new Image();
                img.src = 'img/especial_sword_spritesheet.png';

            } else if (this.personagemTipo == 2) {
                var tipoMunicao = 'arrow';
                var img = new Image();
                img.src = 'img/especial_arrow_spritesheet.png';
            } else if (this.personagemTipo == 3) {
                var tipoMunicao = 'fireball';
                var img = new Image();
                img.src = 'img/especial_fireball_spritesheet.png';
            }

            var direcaoBaixo = 'baixo';
            var direcaoCima = 'cima';
            var direcaoEsquerda = 'esquerda';
            var direcaoDireita = 'direita';

            if (this.direcao == PERSONAGEM_CIMA) {

                var tiro = new TiroEspecial(this.context, this, img, tipoMunicao, direcaoCima);

                tiro.velocidadeY = -10;

                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            if (this.direcao == PERSONAGEM_BAIXO) {

                var tiro = new TiroEspecial(this.context, this, img, tipoMunicao, direcaoBaixo);

                tiro.velocidadeY = 10;

                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            if (this.direcao == PERSONAGEM_ESQUERDA) {

                var tiro = new TiroEspecial(this.context, this, img, tipoMunicao, direcaoEsquerda);

                tiro.velocidadeX = -10;

                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);

            }
            if (this.direcao == PERSONAGEM_DIREITA) {

                var tiro = new TiroEspecial(this.context, this, img, tipoMunicao, direcaoDireita);

                tiro.velocidadeX = 10;

                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
            }
            this.ultimoTempoTiroEspecial = agora;
        }

    },
    retangulosColisao: function () {
        // Estes valores vão sendo ajustados aos poucos
        if (this.personagemTipo == 1) {
            if (this.direcao == PERSONAGEM_CIMA) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 3,
                        y: this.y + 10,
                        largura: 30,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 33,
                        y: this.y + 14,
                        largura: 10,
                        altura: 10
                },
                ];
            }
            if (this.direcao == PERSONAGEM_BAIXO) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 10,
                        y: this.y + 10,
                        largura: 15,
                        altura: 30
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 25,
                        y: this.y + 12,
                        largura: 20,
                        altura: 10
                },
                ];
            }
            if (this.direcao == PERSONAGEM_ESQUERDA) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 5,
                        y: this.y + 5,
                        largura: 15,
                        altura: 45
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 22,
                        y: this.y + 12,
                        largura: 13,
                        altura: 10
                }
                ];
            }
            if (this.direcao == PERSONAGEM_DIREITA) {

                var rets = [
            //cabeça
                    {
                        x: this.x + 10,
                        y: this.y + 5,
                        largura: 15,
                        altura: 40
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 25,
                        y: this.y + 12,
                        largura: 15,
                        altura: 12
                }
                ];
            }
        } else if (this.personagemTipo == 2) {
            if (this.direcao == PERSONAGEM_CIMA) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 3,
                        y: this.y + 10,
                        largura: 30,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 33,
                        y: this.y + 14,
                        largura: 10,
                        altura: 10
                },
                ];
            }
            if (this.direcao == PERSONAGEM_BAIXO) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 20,
                        y: this.y + 10,
                        largura: 15,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 33,
                        y: this.y + 12,
                        largura: 13,
                        altura: 10
                },
                ];
            }
            if (this.direcao == PERSONAGEM_ESQUERDA) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 10,
                        y: this.y + 12,
                        largura: 15,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 25,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 22,
                        y: this.y + 12,
                        largura: 13,
                        altura: 10
                }
                ];
            }
            if (this.direcao == PERSONAGEM_DIREITA) {

                var rets = [
            //cabeça
                    {
                        x: this.x + 10,
                        y: this.y + 5,
                        largura: 15,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 15,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 22,
                        y: this.y + 5,
                        largura: 13,
                        altura: 10
                }
                ];
            }
        }
        if (this.personagemTipo == 3) {
            if (this.direcao == PERSONAGEM_CIMA) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 3,
                        y: this.y + 10,
                        largura: 30,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 30,
                        y: this.y + 45,
                        largura: 25,
                        altura: 20
                },
            //ombro
                    {
                        x: this.x + 33,
                        y: this.y + 28,
                        largura: 16,
                        altura: 15
                },
                ];
            }
            if (this.direcao == PERSONAGEM_BAIXO) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 10,
                        y: this.y + 12,
                        largura: 15,
                        altura: 38
                },
            //corpo
                    {
                        x: this.x + 28,
                        y: this.y + 35,
                        largura: 28,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 20,
                        y: this.y + 25,
                        largura: 20,
                        altura: 10
                },
                ];
            }
            if (this.direcao == PERSONAGEM_ESQUERDA) {
                var rets = [
            //cabeça
                    {
                        x: this.x + 12,
                        y: this.y + 10,
                        largura: 15,
                        altura: 38
                },
            //corpo
                    {
                        x: this.x + 25,
                        y: this.y + 38,
                        largura: 32,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 30,
                        y: this.y + 10,
                        largura: 13,
                        altura: 25
                }
                ];
            }
            if (this.direcao == PERSONAGEM_DIREITA) {

                var rets = [
            //cabeça
                    {
                        x: this.x + 15,
                        y: this.y + 10,
                        largura: 15,
                        altura: 33
                },
            //corpo
                    {
                        x: this.x + 28,
                        y: this.y + 35,
                        largura: 30,
                        altura: 30
                },
            //ombro
                    {
                        x: this.x + 28,
                        y: this.y + 18,
                        largura: 15,
                        altura: 18
                }
                ];
            }
        }
        //Desenhando os retângulos para visualização
        /*        var ctx = this.context;
                for (var i in rets) {
                    ctx.save();
                    ctx.strokeStyle = 'yellow';
                    ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura,
                        rets[i].altura);
                    ctx.restore();
                }*/
        return rets;
    },
    colidiuCom: function (outro) {
        // Se colidiu com um Zerk...
        var agoraShield = new Date().getTime();
        var agora = new Date().getTime();
        var decorridoShield = agoraShield - this.ultimoTempoShield;
        var decorrido = agora - this.ultimoTempo;
        this.checaShielded();
        if ((this.shielded === true) && (this.podeApanhar === true) && (decorridoShield >= 1200)) {
            if (outro instanceof Zerk || outro instanceof OrcNormal || outro instanceof Warrior || outro instanceof Warlord || outro instanceof Shaman || outro instanceof Rider || outro instanceof Marauder || outro instanceof Tazhadur) {
                
                SOM_SHIELD_SPARK.currentTime = 0.0;
                SOM_SHIELD_SPARK.play();

                var exp1 = new Sparks(this.context, this.imgSparks, this.x, this.y);
                this.animacao.novoSprite(exp1);

                var personagem = this;
                personagem.podeApanhar = false;
                exp1.fimDaExplosao = function () {
                    personagem.shieldedPoints--;
                    personagem.contadorApanhador();
                }
            }
            if (outro instanceof TiroMarauder || outro instanceof TiroRider || outro instanceof TiroWarlord || outro instanceof TiroTazhadur || outro instanceof TiroShaman) {
                
                SOM_SHIELD_SPARK.currentTime = 0.0;
                SOM_SHIELD_SPARK.play();
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);


                var exp1 = new Sparks(this.context, this.imgSparks, this.x, this.y);
                this.animacao.novoSprite(exp1);

                var personagem = this;
                personagem.podeApanhar = false;
                exp1.fimDaExplosao = function () {
                    personagem.shieldedPoints--;
                    personagem.contadorApanhador();
                }
            }
            if (outro instanceof ItemBoots || outro instanceof ItemShield || outro instanceof ItemVida || outro instanceof ItemEnergyBar) {
                SOM_ITEM_FAIL.currentTime = 0.0;
                SOM_ITEM_FAIL.play();
            }
        } else if ((this.podeApanhar === true) && (decorrido >= 2000) && (this.shielded === false)) {
            if (outro instanceof Zerk || outro instanceof OrcNormal || outro instanceof Warrior || outro instanceof Warlord || outro instanceof Shaman || outro instanceof Rider || outro instanceof Marauder || outro instanceof Tazhadur) {
                SOM_COLISAO_CORTE.currentTime = 0.0;
                SOM_COLISAO_CORTE.play();
                SOM_GRITO.currentTime = 0.0;
                SOM_GRITO.play();
                this.tiroRapido = false;
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
                        if (personagem.acabaramVidas)
                            personagem.acabaramVidas();
                    } else {
                        //recolocar a personagem no engine
                        personagem.colisor.novoSprite(personagem);
                        personagem.animacao.novoSprite(personagem);
                        personagem.posicionar();
                    }
                }
            }
            if (outro instanceof TiroMarauder || outro instanceof TiroRider || outro instanceof TiroWarlord || outro instanceof TiroTazhadur || outro instanceof TiroShaman) {
                SOM_COLISAO_CORTE.currentTime = 0.0;
                SOM_COLISAO_CORTE.play();
                SOM_GRITO.currentTime = 0.0;
                SOM_GRITO.play();
                this.tiroRapido = false;
                this.podeApanhar = false;
                this.animacao.excluirSprite(outro);
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(outro);
                this.colisor.excluirSprite(this);
                var exp1 = new Morto(this.context, this.imgMorto, this.x, this.y);
                this.animacao.novoSprite(exp1);

                var personagem = this;
                this.velocidade = 3;
                exp1.fimDaExplosao = function () {
                    personagem.vidasExtras--;
                    if (personagem.vidasExtras < 0) {
                        if (personagem.acabaramVidas)
                            personagem.acabaramVidas();
                    } else {
                        //recolocar a personagem no engine
                        personagem.colisor.novoSprite(personagem);
                        personagem.animacao.novoSprite(personagem);
                        personagem.posicionar();
                    }
                }
            }
            if (outro instanceof ItemVida) {
                var personagem = this;
                if (this.vidasExtras < 3) {
                    SOM_ITEM.currentTime = 0.0;
                    SOM_ITEM.play();
                    this.podeApanhar = true;
                    this.animacao.excluirSprite(outro);
                    this.colisor.excluirSprite(outro);
                    context.save();
                    context.fillStyle = 'green';
                    context.strokeStyle = 'white';
                    context.font = '30px sans-serif';
                    context.fillText("+1 HP", personagem.x + 10, personagem.y - 5);
                    context.strokeText("+1 HP", personagem.x + 10, personagem.y - 5);
                    context.restore();
                    this.vidasExtras++;
                } else {
                    SOM_ITEM_FAIL.currentTime = 0.0;
                    SOM_ITEM_FAIL.play();
                }
            }
            if (outro instanceof ItemBoots) {
                var personagem = this;
                if (this.velocidade < 6) {
                    SOM_ITEM.currentTime = 0.0;
                    SOM_ITEM.play();
                    this.podeApanhar = true;
                    this.animacao.excluirSprite(outro);
                    this.colisor.excluirSprite(outro);
                    this.velocidade = 6;
                    context.save();
                    context.fillStyle = 'yellow';
                    context.strokeStyle = 'white';
                    context.font = '30px sans-serif';
                    context.fillText("SPEED BOOST", personagem.x + 10, personagem.y - 5);
                    context.strokeText("SPEED BOOST", personagem.x + 10, personagem.y - 5);
                    context.restore();
                } else {
                    SOM_ITEM_FAIL.currentTime = 0.0;
                    SOM_ITEM_FAIL.play();
                }
            }
            if (outro instanceof ItemEnergyBar) {
                var personagem = this;
                if (this.tiroRapido === false) {
                    this.tiroRapido = true;
                    SOM_ITEM.currentTime = 0.0;
                    SOM_ITEM.play();
                    this.podeApanhar = true;
                    this.animacao.excluirSprite(outro);
                    this.colisor.excluirSprite(outro);
                    context.save();
                    context.fillStyle = 'yellow';
                    context.strokeStyle = 'white';
                    context.font = '30px sans-serif';
                    context.fillText("FAST SHOT", personagem.x + 10, personagem.y - 5);
                    context.strokeText("FAST SHOT", personagem.x + 10, personagem.y - 5);
                    context.restore();
                } else {
                    SOM_ITEM_FAIL.currentTime = 0.0;
                    SOM_ITEM_FAIL.play();
                }
            }
            if (outro instanceof ItemShield) {
                var personagem = this;
                if (this.shielded === false) {
                    personagem.shieldedPoints = 3;
                    var imgShieldStatus = new Image();
                    imgShieldStatus.src = 'img/Runic_Ice_Shield.png';
                    var shieldStatus = new ItemShieldStatus(this.context, imgShieldStatus, this);
                    this.animacao.novoSprite(shieldStatus);
                    this.colisor.novoSprite(shieldStatus);
                    this.shielded = true;
                    SOM_ITEM.currentTime = 0.0;
                    SOM_ITEM.play();
                    this.podeApanhar = true;
                    this.animacao.excluirSprite(outro);
                    this.colisor.excluirSprite(outro);
                    context.save();
                    context.fillStyle = 'yellow';
                    context.strokeStyle = 'white';
                    context.font = '30px sans-serif';
                    context.fillText("SHIELDED", personagem.x + 10, personagem.y - 5);
                    context.strokeText("SHIELDED", personagem.x + 10, personagem.y - 5);
                    context.restore();
                } else {
                    SOM_ITEM_FAIL.currentTime = 0.0;
                    SOM_ITEM_FAIL.play();
                }
            }
        }
    },
    posicionar: function () {
        this.direcao = PERSONAGEM_CIMA;
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 60; //36 / 2
        this.y = canvas.height - 120;
        if (decorrido >= 2000) {
            this.podeApanhar = true;
            this.ultimoTempo = agora;
        }
    },
    contadorApanhador: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempoShield;
        if (decorrido >= 1200) {
            this.podeApanhar = true;
            this.ultimoTempoShield = agora;
        }
    },
    checaShielded: function () {
        if (this.shieldedPoints < 1) {
            this.shielded = false;
        }
    }
}