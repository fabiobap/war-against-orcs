//som ataque faca
var SOM_ATK_KNIFE = new Audio();
SOM_ATK_KNIFE.src = 'snd/throwing_knife.mp3';
SOM_ATK_KNIFE.volume = 0.3;
SOM_ATK_KNIFE.type = 'type="audio/mp3';
SOM_ATK_KNIFE.load();
//som ataque arrow
var SOM_ATK_ARROW = new Audio();
SOM_ATK_ARROW.src = 'snd/arrow.mp3';
SOM_ATK_ARROW.volume = 0.3;
SOM_ATK_ARROW.type = 'type="audio/mp3';
SOM_ATK_ARROW.load();
//som ataque fireball
var SOM_ATK_FIREBALL = new Audio();
SOM_ATK_FIREBALL.src = 'snd/fireball.mp3';
SOM_ATK_FIREBALL.volume = 0.3;
SOM_ATK_FIREBALL.type = 'type="audio/mp3';
SOM_ATK_FIREBALL.load();

function Tiro(context, ator, imagem, tipoMunicao) {
    this.context = context;
    this.ator = ator;
    this.imagem = imagem;
    this.tipoMunicao = tipoMunicao;

    //tamanho da img

    this.largura = imagem.width;
    this.altura = imagem.height;

    this.x = ator.x + 35; //36 / 2
    this.y = ator.y - this.altura + 35;
    this.velocidadeX = 0;
    this.velocidadeY = 0;

    if (tipoMunicao == 'faca') {
        SOM_ATK_KNIFE.currentTime = 0.0;
        SOM_ATK_KNIFE.play();        
    } else if (tipoMunicao == 'arrow') {
        SOM_ATK_ARROW.currentTime = 0.0;
        SOM_ATK_ARROW.play();        
    } else if (tipoMunicao == 'fireball') {
        SOM_ATK_FIREBALL.currentTime = 0.0;
        SOM_ATK_FIREBALL.play();
    }
}

Tiro.prototype = {
    atualizar: function () {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Excluir o tiro quando sumir da tela
        if (this.y < -this.context.canvas.height + 480 || this.y > this.context.canvas.height - 10 || this.x < -this.context.canvas.width + 480 || this.x > this.context.canvas.width - 10) {
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
        /*         var ctx = this.context;
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