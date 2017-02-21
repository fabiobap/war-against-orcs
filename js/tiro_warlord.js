function TiroWarlord(context, warlord, imagem) {
    this.context = context;
    this.warlord = warlord;
    this.imagem = imagem;

    //posicionar o tiro no bico da warlord
    this.largura = 70;
    this.altura = 70;
    this.x = warlord.x + 20; //36 / 2
    this.y = warlord.y - this.altura + 20;
    this.velocidadeY = 0;
    this.velocidadeX = 0;


    this.sheet = new Spritesheet(context, imagem, 1, 15);
    this.sheet.intervalo = 10;
    SOM_ESP_ATK_SWORD.currentTime = 0.0;
    SOM_ESP_ATK_SWORD.play();
}

TiroWarlord.prototype = {
    atualizar: function () {
        this.sheet.proximoQuadro();
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

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
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {
        var rets = [
            {
                x: this.x + 6,
                y: this.y,
                largura: this.largura - 15,
                altura: this.altura - 15
            }
            ];
        //Desenhando os retângulos para visualização
        /*          var ctx = this.context;
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