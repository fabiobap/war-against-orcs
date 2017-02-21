//som de morte de orc marauder
var SOM_MORTE_MARAUDER = new Audio();
SOM_MORTE_MARAUDER.src = 'snd/marauder_morrendo.mp3';
SOM_MORTE_MARAUDER.volume = 0.3;
SOM_MORTE_MARAUDER.type = 'type="audio/mp3';
SOM_MORTE_MARAUDER.load();
//som de marauder aparecendo
var SOM_MARAUDER_APARECENDO = new Audio();
SOM_MARAUDER_APARECENDO.src = 'snd/marauder_aparecendo.mp3';
SOM_MARAUDER_APARECENDO.volume = 0.4;
SOM_MARAUDER_APARECENDO.type = 'type="audio/mp3';
SOM_MARAUDER_APARECENDO.load();

function Marauder(context, imagem, imgMorto, imgSangue) {
    this.context = context;
    this.imagem = imagem;
    this.imgSangue = imgSangue;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.imgMorto = imgMorto;
    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 2);
    this.sheet.intervalo = 160;
    this.ultimoTempo = new Date().getTime();
    this.ultimoTempo2 = new Date().getTime();
    // Estado inicial
    this.alive = false;
    this.andando = true;
    this.IsBoss = true;
    this.vidasExtras = 25;
    var marauder = this;
    SOM_MARAUDER_APARECENDO.currentTime = 0.0;
    SOM_MARAUDER_APARECENDO.play();
}

Marauder.prototype = {

    atualizar: function () {
        this.alive = true;
        this.atirar();
        this.sheet.proximoQuadro();
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;

        this.y += this.velocidadeY;
        this.x += this.velocidadeX;

        if ((this.y >= 40) && (decorrido >= 300)) {
            this.velocidadeY = 0;

            if (this.x >= 350) {
                this.velocidadeX = -3;
            } else if (this.x <= 20) {
                this.velocidadeX = 3;
            }
        }

        if (this.x > this.context.canvas.width - 70) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.alive = false;

        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {

        var rets = [

            {
                //orc corpo
                x: this.x + 20,
                y: this.y + 10,
                largura: 45,
                altura: 40
            },
            {
                //lobo corpo
                x: this.x + 30,
                y: this.y + 10,
                largura: 25,
                altura: 60
            },

            ];
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
        // Se colidiu com um Tiro, os dois desaparecem
        if (outro instanceof Tiro) {
            var marauder = this;
            marauder.vidasExtras--;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (marauder.vidasExtras < 1) {
                SOM_MORTE_MARAUDER.currentTime = 0.0;
                SOM_MORTE_MARAUDER.play();
                this.alive = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var morto = new Morto(this.context, this.imgMorto, this.x, this.y);
                this.animacao.novoSprite(morto);
            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
        if (outro instanceof TiroEspecial) {
            var marauder = this;
            marauder.vidasExtras -= 3;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (marauder.vidasExtras < 1) {
                SOM_MORTE_MARAUDER.currentTime = 0.0;
                SOM_MORTE_MARAUDER.play();
                this.alive = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var morto = new Morto(this.context, this.imgMorto, this.x, this.y);
                this.animacao.novoSprite(morto);
            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
    },
    atirar: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;
        var direcaoBaixo = 'baixo';
        var direcaoDiagEsquerda = 'diagEsquerda';
        var direcaoDiagDireita = 'diagDireita';

        var imgbaixo = new Image();
        imgbaixo.src = 'img/shiver_arrowbaixo.png';
        var imgdiagesquerda = new Image();
        imgdiagesquerda.src = 'img/shiver_arrowdiagesquerda.png';
        var imgdiagdireita = new Image();
        imgdiagdireita.src = 'img/shiver_arrowdiagdireita.png';

        if (this.alive == true && decorrido > 1000) {
            var tiroBaixo = new TiroMarauder(this.context, this, imgbaixo, direcaoBaixo);
            var tiroDiagEsquerda = new TiroMarauder(this.context, this, imgdiagesquerda, direcaoDiagEsquerda);
            var tiroDiagDireita = new TiroMarauder(this.context, this, imgdiagdireita, direcaoDiagDireita);
            tiroBaixo.velocidadeY = 6;
            tiroDiagDireita.velocidadeY = 6;
            tiroDiagDireita.velocidadeX = 2;
            tiroDiagEsquerda.velocidadeY = 6;
            tiroDiagEsquerda.velocidadeX = -2;

            this.animacao.novoSprite(tiroBaixo);
            this.colisor.novoSprite(tiroBaixo);
            this.animacao.novoSprite(tiroDiagDireita);
            this.colisor.novoSprite(tiroDiagDireita);
            this.animacao.novoSprite(tiroDiagEsquerda);
            this.colisor.novoSprite(tiroDiagEsquerda);
            this.ultimoTempo = agora;
            if (this.alive === false) {
                this.animacao.excluirSprite(tiroBaixo);
                this.colisor.excluirSprite(tiroBaixo);
                this.animacao.excluirSprite(tiroDiagDireita);
                this.colisor.excluirSprite(tiroDiagDireita);
                this.animacao.novoSprite(tiroDiagEsquerda);
                this.colisor.novoSprite(tiroDiagEsquerda);

            }
        }
    }
}