//som quando é acertado
var SOM_SANGUE = new Audio();
SOM_SANGUE.src = 'snd/blood.mp3';
SOM_SANGUE.volume = 0.4;
SOM_SANGUE.type = 'type="audio/mp3';
SOM_SANGUE.load();

function Sangue(context, imagem, x, y) {
    this.context = context;
    this.imagem = imagem;
    this.spritesheet = new Spritesheet(context, imagem, 1, 6);
    this.spritesheet.intervalo = 50;
    this.x = x;
    this.y = y;
    SOM_SANGUE.currentTime = 0.0;
    SOM_SANGUE.play();
    var sangue = this;
    this.fimDaExplosao = null;
    this.spritesheet.fimDoCiclo = function () {
        sangue.animacao.excluirSprite(sangue);
        if (sangue.fimDaExplosao) sangue.fimDaExplosao();
    }
}

Sangue.prototype = {
    atualizar: function () {


    },
    desenhar: function () {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }

}