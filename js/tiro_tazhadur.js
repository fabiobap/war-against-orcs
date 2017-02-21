//som ataque firewave
var SOM_ATK_FIREWAVE = new Audio();
SOM_ATK_FIREWAVE.src = 'snd/dragon_wave.mp3';
SOM_ATK_FIREWAVE.volume = 0.2;
SOM_ATK_FIREWAVE.type = 'type="audio/mp3';
SOM_ATK_FIREWAVE.load();
//som ataque firebeam
var SOM_ATK_FIREBEAM = new Audio();
SOM_ATK_FIREBEAM.src = 'snd/dragon_beam.mp3';
SOM_ATK_FIREBEAM.volume = 0.2;
SOM_ATK_FIREBEAM.type = 'type="audio/mp3';
SOM_ATK_FIREBEAM.load();

function TiroTazhadur(context, tazhadur, imagem, tipoAtaque) {
    this.context = context;
    this.tazhadur = tazhadur;
    this.imagem = imagem;
    this.tipoAtaque = tipoAtaque;

    //posicionar o tiro no bico da tazhadur
    if (tipoAtaque == 'wave') {
        SOM_ATK_FIREWAVE.currentTime = 0.0;
        SOM_ATK_FIREWAVE.play();
        this.largura = 180;
        this.altura = 160;
        this.x = tazhadur.x - 20; //36 / 2
        this.y = tazhadur.y - this.altura + 100;
        this.sheet = new Spritesheet(context, imagem, 1, 8);
        this.sheet.intervalo = 200;
    } else if (tipoAtaque == 'beam') {
        SOM_ATK_FIREBEAM.currentTime = 0.0;
        SOM_ATK_FIREBEAM.play();
        this.largura = 56;
        this.altura = 150;
        this.x = tazhadur.x - 20; //36 / 2
        this.y = tazhadur.y - this.altura + 100;
        this.sheet = new Spritesheet(context, imagem, 1, 8);
        this.sheet.intervalo = 200;
    } else if (tipoAtaque == 'fireball') {
        SOM_ATK_FIREBALL.currentTime = 0.0;
        SOM_ATK_FIREBALL.play();
        this.largura = 65;
        this.altura = 92;
        this.x = tazhadur.x - 10; //36 / 2
        this.y = tazhadur.y - this.altura + 70;
        this.sheet = new Spritesheet(context, imagem, 1, 11);
        this.sheet.intervalo = 100;
    }

    this.velocidadeX = 0;
    this.velocidadeY = 0;
}

TiroTazhadur.prototype = {
    atualizar: function () {
        this.sheet.proximoQuadro();
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Excluir o tiro quando sumir da tela
        if (this.y < -this.context.canvas.height + 400) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        } else if (this.y > this.context.canvas.height - 10) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },

    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {
        if (this.tipoAtaque == 'wave') {
            var rets = [
            //parte 1
                {
                    x: this.x + 100,
                    y: this.y + 20,
                    largura: this.largura - 150,
                    altura: this.altura - 90
            },
            //parte 2
                {
                    x: this.x + 70,
                    y: this.y + 50,
                    largura: this.largura - 95,
                    altura: this.altura - 80
            },
            //parte 3
                {
                    x: this.x + 40,
                    y: this.y + 130,
                    largura: this.largura - 30,
                    altura: this.altura - 130
            },
            ];
        } else if (this.tipoAtaque == 'beam') {
            var rets = [
                {
                    x: this.x + 60,
                    y: this.y + 25,
                    largura: this.largura - 15,
                    altura: this.altura - 15
            }
            ];
        } else if (this.tipoAtaque == 'fireball') {
            var rets = [
                {
                    x: this.x + 10,
                    y: this.y + 10,
                    largura: this.largura - 25,
                    altura: this.altura - 15
            }
            ];
        }
        //Desenhando os retângulos para visualização
        /* var ctx = this.context;
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