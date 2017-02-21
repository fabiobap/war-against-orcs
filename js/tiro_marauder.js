function TiroMarauder(context, marauder, imagem, direcaoTiro) {
    this.context = context;
    this.marauder = marauder;
    this.imagem = imagem;
    this.direcaoTiro = direcaoTiro;

    //posicionar o tiro no bico da marauder
    this.largura = 32;
    this.altura = 32;
    this.x = marauder.x + 20; //36 / 2
    this.y = marauder.y - this.altura + 20;
    this.velocidadeY = 0;
    this.velocidadeX = 0;
    SOM_ESP_ATK_ARROW.currentTime = 0.0;
    SOM_ESP_ATK_ARROW.play();
}

TiroMarauder.prototype = {
    atualizar: function () {
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
        var ctx = this.context;
        var img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    },
    retangulosColisao: function () {
        if (this.direcaoTiro == 'baixo') {

            var rets = [
                {
                    x: this.x + 11,
                    y: this.y + 3,
                    largura: this.largura - 20,
                    altura: this.altura - 3
            }
            ];
        } else if (this.direcaoTiro == 'diagEsquerda') {
            var rets = [
                {
                    x: this.x + 15,
                    y: this.y,
                    largura: this.largura - 15,
                    altura: this.altura - 15
                },
                {
                    x: this.x + 5,
                    y: this.y + 15,
                    largura: this.largura - 18,
                    altura: this.altura - 18
                }
            ];

        } else if (this.direcaoTiro == 'diagDireita') {
            var rets = [
                {
                    x: this.x + 5,
                    y: this.y,
                    largura: this.largura - 15,
                    altura: this.altura - 15
                },
                {
                    x: this.x + 15,
                    y: this.y + 15,
                    largura: this.largura - 18,
                    altura: this.altura - 18
                }
            ];
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