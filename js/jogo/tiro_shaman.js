var SOM_TIROSHAMAN = new Audio();
SOM_TIROSHAMAN.src = 'snd/fireball.mp3';
SOM_TIROSHAMAN.volume = 0.5;
SOM_TIROSHAMAN.load();

function TiroShaman(context, shaman, imagem) {
    this.context = context;
    this.shaman = shaman;
    this.imagem = imagem;

    //posicionar o tiro no bico da nave
    this.largura = 27;
    this.altura = 53;
    this.x = shaman.x + 50 - this.largura; //36 / 2
    this.y = shaman.y + 53;
    this.velocidade = 300;
    SOM_TIROSHAMAN.currentTime = 0.0;
    SOM_TIROSHAMAN.play();

    this.sheet = new Spritesheet(context, imagem, 1, 4);
    this.sheet.intervalo = 160;
}

TiroShaman.prototype = {
    atualizar: function () {
        this.sheet.proximoQuadro();
        this.y += this.velocidade * this.animacao.decorrido / 900;



        // Excluir o tiro quando sumir da tela
        if (this.y > this.context.canvas.height - this.altura) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },

    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {
        var rets = [{
            x: this.x + 2,
            y: this.y,
            largura: this.largura,
            altura: this.altura
        }];

        /*    var ctx = this.context;
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