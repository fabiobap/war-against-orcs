//som de morte de orc shaman
var SOM_MORTE_SHAMAN = new Audio();
SOM_MORTE_SHAMAN.src = 'snd/orc_shaman_morrendo.mp3';
SOM_MORTE_SHAMAN.volume = 0.3;
SOM_MORTE_SHAMAN.type = 'type="audio/mp3';
SOM_MORTE_SHAMAN.load();
//som de shaman aparecendo
var SOM_SHAMAN_APARECENDO = new Audio();
SOM_SHAMAN_APARECENDO.src = 'snd/orc_shaman_aparecendo.mp3';
SOM_SHAMAN_APARECENDO.volume = 0.6;
SOM_SHAMAN_APARECENDO.type = 'type="audio/mp3';
SOM_SHAMAN_APARECENDO.load();

function Shaman(context, imagem, imgMorto, imgSangue) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.imgMorto = imgMorto;
    this.imgSangue = imgSangue;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 8);
    this.sheet.intervalo = 60;
    this.ultimoTempo = new Date().getTime();

    // Estado inicial
    this.alive = false;
    this.andando = true;
    this.IsBoss = true;
    this.vidasExtras = 10;
    var shaman = this;
    SOM_SHAMAN_APARECENDO.currentTime = 0.0;
    SOM_SHAMAN_APARECENDO.play();
}

Shaman.prototype = {

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

            if (this.x >= 400) {
                this.velocidadeX = -2;
            } else if (this.x <= 15) {
                this.velocidadeX = 2;
            }
        }

        if (this.x > this.context.canvas.width - 60) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {

        var rets = [
            //cabeça
            {
                x: this.x + 3,
                y: this.y + 2,
                largura: 30,
                altura: 53
            },
            //corpo
            {
                x: this.x + 25,
                y: this.y + 25,
                largura: 30,
                altura: 32
            },
            //ombro
            {
                x: this.x + 33,
                y: this.y + 4,
                largura: 10,
                altura: 20
            }
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
            var shaman = this;
            shaman.vidasExtras--;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (shaman.vidasExtras < 1) {
                SOM_MORTE_SHAMAN.currentTime = 0.0;
                SOM_MORTE_SHAMAN.play();
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
            var shaman = this;
            shaman.vidasExtras -= 3;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (shaman.vidasExtras < 1) {
                SOM_MORTE_SHAMAN.currentTime = 0.0;
                SOM_MORTE_SHAMAN.play();
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
        var img = new Image();
        img.src = 'img/fireball_spritesheet.png';
        if (this.alive === true && decorrido > 900) {
            var tiro = new TiroShaman(this.context, this, img);
            tiro.velocidadeY = 10;
            this.animacao.novoSprite(tiro);
            this.colisor.novoSprite(tiro);
            this.ultimoTempo = agora;
            if (this.alive === false) {
                this.animacao.excluirSprite(tiro);
                this.colisor.excluirSprite(tiro);
            }
        }
    }
}