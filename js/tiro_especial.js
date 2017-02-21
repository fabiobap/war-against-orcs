//som ataque faca
var SOM_ESP_ATK_SWORD = new Audio();
SOM_ESP_ATK_SWORD.src = 'snd/especial_sword.mp3';
SOM_ESP_ATK_SWORD.volume = 0.6;
SOM_ESP_ATK_SWORD.type = 'type="audio/mp3';
SOM_ESP_ATK_SWORD.load();
//som ataque arrow
var SOM_ESP_ATK_ARROW = new Audio();
SOM_ESP_ATK_ARROW.src = 'snd/especial_arrow.mp3';
SOM_ESP_ATK_ARROW.volume = 0.9;
SOM_ESP_ATK_ARROW.type = 'type="audio/mp3';
SOM_ESP_ATK_ARROW.load();
//som ataque arrow
var SOM_ESP_ATK_FIREBALL = new Audio();
SOM_ESP_ATK_FIREBALL.src = 'snd/especial_fireball.mp3';
SOM_ESP_ATK_FIREBALL.volume = 0.9;
SOM_ESP_ATK_FIREBALL.type = 'type="audio/mp3';
SOM_ESP_ATK_FIREBALL.load();

function TiroEspecial(context, ator, imagem, tipoMunicao, direcaoTiro) {
    this.context = context;
    this.ator = ator;
    this.imagem = imagem;
    this.tipoMunicao = tipoMunicao;
    this.direcaoTiro = direcaoTiro;

    if (this.tipoMunicao == 'espada') {
        SOM_ESP_ATK_SWORD.currentTime = 0.0;
        SOM_ESP_ATK_SWORD.play();
        this.largura = 40;
        this.altura = 40;
        this.sheet = new Spritesheet(context, imagem, 1, 14);
        this.sheet.intervalo = 20;
    } else if (this.tipoMunicao == 'arrow') {
        SOM_ESP_ATK_ARROW.currentTime = 0.0;
        SOM_ESP_ATK_ARROW.play();
        this.largura = 42;
        this.altura = 70;
        this.sheet = new Spritesheet(context, imagem, 4, 4);
        this.sheet.intervalo = 120;
    } else if (this.tipoMunicao == 'fireball') {
        SOM_ESP_ATK_FIREBALL.currentTime = 0.0;
        SOM_ESP_ATK_FIREBALL.play();
        this.largura = 160;
        this.altura = 160;
        this.sheet = new Spritesheet(context, imagem, 4, 5);
        this.sheet.intervalo = 120;
    }
    if (this.tipoMunicao == 'arrow') {
        if (this.direcaoTiro == 'baixo') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 55;
        }
        if (this.direcaoTiro == 'cima') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 55;
        }
        if (this.direcaoTiro == 'esquerda') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 80;
        }
        if (this.direcaoTiro == 'direita') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 75;
        }

    } else if (this.tipoMunicao == 'espada') {
        if (this.direcaoTiro == 'baixo') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 55;
        }
        if (this.direcaoTiro == 'cima') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 55;
        }
        if (this.direcaoTiro == 'esquerda') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 55;
        }
        if (this.direcaoTiro == 'direita') {
            this.x = ator.x + 10; //36 / 2
            this.y = ator.y - this.altura + 55;
        }
    } else if (this.tipoMunicao == 'fireball') {
        if (this.direcaoTiro == 'baixo') {
            this.x = ator.x - 40;
            this.y = ator.y - this.altura + 60;
        }
        if (this.direcaoTiro == 'cima') {
            this.x = ator.x - 40;
            this.y = ator.y - 10;
        }
        if (this.direcaoTiro == 'esquerda') {
            this.x = ator.x + 40;
            this.y = ator.y - 40;
        }
        if (this.direcaoTiro == 'direita') {
            this.x = ator.x - 80;
            this.y = ator.y - 30;
        }
    }
    this.velocidadeX = 0;
    this.velocidadeY = 0;
}

TiroEspecial.prototype = {
    atualizar: function () {
        if (this.tipoMunicao == 'arrow') {
            if (this.direcaoTiro == 'direita') {
                this.sheet.linha = 3;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();

            } else if (this.direcaoTiro == 'esquerda') {
                this.sheet.linha = 2;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();

            } else if (this.direcaoTiro == 'cima') {
                this.sheet.linha = 1;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();

            } else if (this.direcaoTiro == 'baixo') {
                this.sheet.linha = 0;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();
            }

        } else if (this.tipoMunicao == 'fireball') {
            if (this.direcaoTiro == 'direita') {
                this.sheet.linha = 3;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();

            } else if (this.direcaoTiro == 'esquerda') {
                this.sheet.linha = 2;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();

            } else if (this.direcaoTiro == 'cima') {
                this.sheet.linha = 1;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();

            } else if (this.direcaoTiro == 'baixo') {
                this.sheet.linha = 0;
                this.sheet.coluna = 1;
                this.sheet.proximoQuadro();
            }

        } else if (this.tipoMunicao == 'espada') {
            this.sheet.proximoQuadro();
        }
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Excluir o tiro quando sumir da tela
        if (this.y < -this.context.canvas.height + 380 || this.y > this.context.canvas.height - 10 || this.x < -this.context.canvas.width + 380 || this.x > this.context.canvas.width - 10) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }

    },

    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {
        if (this.tipoMunicao == 'espada') {
            var rets = [
                {
                    x: this.x + 5,
                    y: this.y + 5,
                    largura: this.largura - 5,
                    altura: this.altura - 5
            }
            ];
        } else if (this.tipoMunicao == 'fireball') {
            if (this.direcaoTiro == 'cima') {
                var rets = [
                    {
                        x: this.x + 60,
                        y: this.y,
                        largura: this.largura - 130,
                        altura: this.altura - 110
            }
            ];
            }
            if (this.direcaoTiro == 'baixo') {
                var rets = [
                    {
                        x: this.x + 70,
                        y: this.y + 110,
                        largura: this.largura - 130,
                        altura: this.altura - 110
            }
            ];
            }
            if (this.direcaoTiro == 'esquerda') {
                var rets = [
                    {
                        x: this.x + 3,
                        y: this.y + 70,
                        largura: this.largura - 115,
                        altura: this.altura - 130
            }
            ];
            }
            if (this.direcaoTiro == 'direita') {
                var rets = [
                    {
                        x: this.x + 112,
                        y: this.y + 60,
                        largura: this.largura - 115,
                        altura: this.altura - 130
            }
            ];
            }
        } else if (this.tipoMunicao == 'arrow') {
            if (this.direcaoTiro == 'cima') {
                var rets = [
                    {
                        x: this.x,
                        y: this.y,
                        largura: this.largura,
                        altura: this.altura - 20
            }
            ];
            }
            if (this.direcaoTiro == 'baixo') {
                var rets = [
                    {
                        x: this.x,
                        y: this.y,
                        largura: this.largura,
                        altura: this.altura - 20
            }
            ];
            }
            if (this.direcaoTiro == 'esquerda') {
                var rets = [
                    {
                        x: this.x,
                        y: this.y,
                        largura: this.largura,
                        altura: this.altura - 20
            }
            ];
            }
            if (this.direcaoTiro == 'direita') {
                var rets = [
                    {
                        x: this.x,
                        y: this.y,
                        largura: this.largura,
                        altura: this.altura - 20
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

    }
}