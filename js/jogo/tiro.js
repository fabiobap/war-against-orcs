var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/arrow.mp3';
SOM_TIRO.volume = 0.4;
SOM_TIRO.type = 'type="audio/mp3';
SOM_TIRO.load();

function Tiro(context, personagem, imagem) {
    this.context = context;
    this.personagem = personagem;
    this.imagem = imagem;

    //posicionar o tiro no bico da personagem
    this.largura = 12;
    this.altura = 26;
    this.x = personagem.x + 60; //36 / 2
    this.y = personagem.y - this.altura + 60;
    this.velocidade = 400;
    SOM_TIRO.currentTime = 0.0;
    SOM_TIRO.play();
}

Tiro.prototype = {
    atualizar: function () {
        this.y -= this.velocidade * this.animacao.decorrido / 900;

        // Excluir o tiro quando sumir da tela
        if (this.y < -this.context.canvas.height + 480) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        } else if (this.y > this.context.canvas.height - 10) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },

    desenhar: function () {
        var ctx = this.context;
        var img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    },
    retangulosColisao: function () {
        var rets = [
            {
                x: this.x + 3,
                y: this.y,
                largura: this.largura,
                altura: this.altura
            }
            ];
        /* //Desenhando os retângulos para visualização
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

    }
}