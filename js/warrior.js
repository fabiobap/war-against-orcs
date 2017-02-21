//som de morte de orc
/*var SOM_MORTE = new Audio();
SOM_MORTE.src = 'snd/orc_geral_morrendo.mp3';
SOM_MORTE.volume = 0.3;
SOM_MORTE.type = 'type="audio/mp3';
SOM_MORTE.load();*/

function Warrior(context, imagem, imgMorto, imgSangue) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgMorto = imgMorto;
    this.vidasExtras = 2;
    this.imgSangue = imgSangue;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 2);
    this.sheet.intervalo = 100;

    // Estado inicial
    this.andando = true;
}

Warrior.prototype = {

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

        /*        var ctx = this.context;
                var img = this.imagem;
                ctx.drawImage(img, this.x, this.y, img.width, img.height);*/
    },
    retangulosColisao: function () {

        var rets = [
            //cabeça
            {
                x: this.x + 3,
                y: this.y + 2,
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
            var warrior = this;
            warrior.vidasExtras--;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (warrior.vidasExtras < 1) {
                SOM_MORTE.currentTime = 0.0;
                SOM_MORTE.play();
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
            var warrior = this;
            warrior.vidasExtras -= 3;
            if (warrior.vidasExtras < 1) {
                SOM_MORTE.currentTime = 0.0;
                SOM_MORTE.play();
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