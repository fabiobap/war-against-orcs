function Morto(context, imagem, x, y) {
    this.context = context;
    this.imagem = imagem;
    this.spritesheet = new Spritesheet(context, imagem, 1, 8);
    this.spritesheet.intervalo = 30;
    this.x = x;
    this.y = y;

    var corpo = this;
    this.fimDaExplosao = null;
    this.spritesheet.fimDoCiclo = function () {
        corpo.animacao.excluirSprite(corpo);
        if (corpo.fimDaExplosao) corpo.fimDaExplosao();
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