function ItemShieldStatus(context, imagem, ator) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.largura = 32;
    this.altura = 32;
    this.ator = ator;
}

ItemShieldStatus.prototype = {

    atualizar: function () {
        var ator = this.ator;
        this.y = ator.y;
        this.x = ator.x+35;
        if (ator.shieldedPoints < 1) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        var ctx = this.context;
        var img = this.imagem;
        img.width = 15;
        img.height = 15;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);

    },
    retangulosColisao: function () {

    },
    colidiuCom: function (outro) {

    }
}