function TiroMarauderDiag(context, marauder, imagem) {
    this.context = context;
    this.marauder = marauder;
    this.imagem = imagem;

    //posicionar o tiro no bico da marauder
    this.largura = 15;
    this.altura = 12;
    this.x = marauder.x + 20; //36 / 2
    this.y = marauder.y - this.altura + 20;
    this.velocidade = 400;
    SOM_TIRO.currentTime = 0.0;
    SOM_TIRO.play();
}

TiroMarauderDiag.prototype = {
    atualizar: function () {
        this.y -= this.velocidade * this.animacao.decorrido / 900;
        this.x += this.velocidade * this.animacao.decorrido / 2200;


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
                x: this.x + 5,
                y: this.y + 18,
                largura: this.largura - 5,
                altura: this.altura
            },
            {
                x: this.x + 16,
                y: this.y + 5,
                largura: this.largura - 3,
                altura: this.altura
            }
            ];
        /*   //Desenhando os retângulos para visualização
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