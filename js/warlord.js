//som de morte de orc warlord
var SOM_MORTE_WARLORD = new Audio();
SOM_MORTE_WARLORD.src = 'snd/warlord_morrendo.mp3';
SOM_MORTE_WARLORD.volume = 0.3;
SOM_MORTE_WARLORD.type = 'type="audio/mp3';
SOM_MORTE_WARLORD.load();

//som de orc warlord aparecendo
var SOM_WARLORD_APARECENDO = new Audio();
SOM_WARLORD_APARECENDO.src = 'snd/warlord_aparecendo.mp3';
SOM_WARLORD_APARECENDO.volume = 0.5;
SOM_WARLORD_APARECENDO.type = 'type="audio/mp3';
SOM_WARLORD_APARECENDO.load();

function Warlord(context, imagem, imgMorto, imgSangue) {
    this.context = context;
    this.imagem = imagem;
    this.y = 0;
    this.x = 0;
    this.velocidadeY = 0;
    this.velocidadeX = 0;
    this.imgMorto = imgMorto;
    this.imgSangue = imgSangue;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 2);
    this.sheet.intervalo = 150;
    this.ultimoTempo = new Date().getTime();

    // Estado inicial
    this.alive = false;
    this.andando = true;
    this.IsBoss = true;
    this.vidasExtras = 30;
    var warlord = this;
    SOM_WARLORD_APARECENDO.currentTime = 0.0;
    SOM_WARLORD_APARECENDO.play();
}

Warlord.prototype = {

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
            } else if (this.x <= 20) {
                this.velocidadeX = 2;
            }
        }

        if (this.x > this.context.canvas.width - 10) {
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
                x: this.x + 5,
                y: this.y + 2,
                largura: 40,
                altura: 43
            },
            //corpo
            {
                x: this.x + 25,
                y: this.y + 25,
                largura: 40,
                altura: 50
            },
            //ombro
            {
                x: this.x + 45,
                y: this.y + 4,
                largura: 20,
                altura: 30
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
            var warlord = this;
            warlord.vidasExtras--;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (warlord.vidasExtras < 1) {
                SOM_MORTE_WARLORD.currentTime = 0.0;
                SOM_MORTE_WARLORD.play();
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
            var warlord = this;
            warlord.vidasExtras -= 3;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (warlord.vidasExtras < 1) {
                SOM_MORTE_WARLORD.currentTime = 0.0;
                SOM_MORTE_WARLORD.play();
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
        img.src = 'img/sword_spritesheet.png';
        if (this.alive === true && decorrido > 900) {
            var tiro = new TiroWarlord(this.context, this, img);
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