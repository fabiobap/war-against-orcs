function TiroShaman(context, shaman, imagem) {
    this.context = context;
    this.shaman = shaman;
    this.imagem = imagem;

    //posicionar o tiro no bico da shaman
    this.largura = 31;
    this.altura = 53;
    this.x = shaman.x + 40; //36 / 2
    this.y = shaman.y - this.altura + 30;
    this.velocidadeY = 0;
    this.velocidadeX = 0;


    this.sheet = new Spritesheet(context, imagem, 1, 4);
    this.sheet.intervalo = 80;
    SOM_ATK_FIREBALL.currentTime = 0.0;
    SOM_ATK_FIREBALL.play();
}

TiroShaman.prototype = {
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
                x: this.x + 2,
                y: this.y,
                largura: this.largura - 2,
                altura: this.altura
            }
            ];
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