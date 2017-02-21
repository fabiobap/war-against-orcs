//som ataque spear
var SOM_ATK_SPEAR = new Audio();
SOM_ATK_SPEAR.src = 'snd/spear_throw.mp3';
SOM_ATK_SPEAR.volume = 0.6;
SOM_ATK_SPEAR.type = 'type="audio/mp3';
SOM_ATK_SPEAR.load();

function TiroRider(context, rider, imagem, tipoRider) {
    this.context = context;
    this.rider = rider;
    this.imagem = imagem;
    this.tipoRider = tipoRider;
    this.velocidadeY = 0;
    this.velocidadeX = 0;

    if (this.tipoRider == 1) {
        //posicionar o tiro no bico da rider
        this.largura = 10;
        this.altura = 45;
        this.x = rider.x + 40; //36 / 2
        this.y = rider.y - this.altura + 10;
    } else if (this.tipoRider == 2) {
        this.largura = 45;
        this.altura = 10;
        this.x = rider.x + 40; //36 / 2
        this.y = rider.y - this.altura + 10;
    }
    SOM_ATK_SPEAR.currentTime = 0.0;
    SOM_ATK_SPEAR.play();
}

TiroRider.prototype = {
    atualizar: function () {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Excluir o tiro quando sumir da tela
        if (this.y < -this.context.canvas.height + 480 || this.y > this.context.canvas.height - 10 || this.x < -this.context.canvas.width + 480) {
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
                x: this.x,
                y: this.y,
                largura: this.largura,
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