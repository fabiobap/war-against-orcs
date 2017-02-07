var SOM_TIROWARLORD = new Audio();
SOM_TIROWARLORD.src = 'snd/sword_woosh.mp3';
SOM_TIROWARLORD.volume = 0.4;
SOM_TIROWARLORD.load();

function TiroWarlord(context, warlord, imagem) {
    this.context = context;
    this.warlord = warlord;
    this.imagem = imagem;

    //posicionar o tiro no bico da nave
    this.largura = 50;
    this.altura = 50;
    this.x = warlord.x + 80 - this.largura; //36 / 2
    this.y = warlord.y + 30;
    this.velocidade = 400;
    SOM_TIROWARLORD.currentTime = 0.0;
    SOM_TIROWARLORD.play();

    this.sheet = new Spritesheet(context, imagem, 1, 15);
    this.sheet.intervalo = 30;
}

TiroWarlord.prototype = {
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
            x: this.x + 10,
            y: this.y + 7,
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