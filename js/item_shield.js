function ItemShield(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.largura = 32;
    this.altura = 32;
}

ItemShield.prototype = {

    atualizar: function () {

        this.y += this.velocidade;
        if (this.y > this.context.canvas.height) {
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
                x: this.x + 1,
                y: this.y + 1,
                largura: this.largura,
                altura: this.altura
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

    }
}