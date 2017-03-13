//som de morte de orc zerk
var SOM_MORTE_2 = new Audio();
SOM_MORTE_2.src = 'snd/orc_geral_morrendo_2.mp3';
SOM_MORTE_2.volume = 0.6;
SOM_MORTE_2.type = 'type="audio/mp3';
SOM_MORTE_2.load();

//som de zerk aparecendo
var SOM_ZERK_APARECENDO = new Audio();
SOM_ZERK_APARECENDO.src = 'snd/zerk_aparecendo.mp3';
SOM_ZERK_APARECENDO.volume = 0.2;
SOM_ZERK_APARECENDO.type = 'type="audio/mp3';
SOM_ZERK_APARECENDO.load();

function Zerk(context, imagem, imgMorto, imgSangue) {
    this.context = context;
    this.imagem = imagem;
    this.imgMorto = imgMorto;
    this.imgSangue = imgSangue;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.vidasExtras = 3;
    this.ultimoX = 0;
    this.ultimoY = 0;
    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 8);
    this.sheet.intervalo = 60;

    // Estado inicial
    this.andando = true;
    SOM_ZERK_APARECENDO.currentTime = 0.0;
    SOM_ZERK_APARECENDO.play();
    this.nome = "zerk";
}

Zerk.prototype = {

    atualizar: function () {

        this.sheet.proximoQuadro();
        this.y += this.velocidade;
        if (this.y > this.context.canvas.height) {
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
                altura: 40
            },
            //corpo
            {
                x: this.x + 25,
                y: this.y + 25,
                largura: 26,
                altura: 30
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
            var zerk = this;
            zerk.vidasExtras--;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (zerk.vidasExtras < 1) {
                SOM_MORTE_2.currentTime = 0.0;
                SOM_MORTE_2.play();
                this.ultimoX = this.x;
                this.ultimoY = this.y;
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
            var zerk = this;
            zerk.vidasExtras -= 3;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (zerk.vidasExtras < 1) {
                SOM_MORTE_2.currentTime = 0.0;
                SOM_MORTE_2.play();
                this.ultimoX = this.x;
                this.ultimoY = this.y;
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
    }
}