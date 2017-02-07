var SOM_MORTO = new Audio();
SOM_MORTO.src = 'snd/grunt.mp3';
SOM_MORTO.volume = 0.4;
SOM_MORTO.load();

function Morto(context, imagem, x, y) {
    this.context = context;
    this.imagem = imagem;
    this.spritesheet = new Spritesheet(context, imagem, 1, 8);
    this.spritesheet.intervalo = 1;
    this.x = x;
    this.y = y;
    SOM_MORTO.currentTime = 0.0;
    SOM_MORTO.play();

    var explosao = this;
    this.fimDaExplosao = null;
    this.spritesheet.fimDoCiclo = function () {
        explosao.animacao.excluirSprite(explosao);
        if (explosao.fimDaExplosao) explosao.fimDaExplosao();
    }
}

Morto.prototype = {
    atualizar: function () {


    },
    desenhar: function () {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }

}