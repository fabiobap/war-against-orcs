function Painel(context, personagem) {
    this.context = context;
    this.personagem = personagem;
    this.spritesheet = new Spritesheet(context, personagem.imagem, 4, 9);
    this.spritesheet.linha = 3;
    this.spritesheet.coluna = 0;
    this.pontuacao = 0;

}

Painel.prototype = {
    atualizar: function () {},
    desenhar: function () {
        this.context.scale(0.5, 0.5);

        var x = 20;
        var y = 20;
        for (var i = 1; i <= this.personagem.vidasExtras; i++) {
            this.spritesheet.desenhar(x, y);
            x += 60;
        }
        this.context.scale(2, 2);

        // Para facilitar um pouco...
        var ctx = this.context;
        // Pontuação
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '18px sans-serif';
        ctx.fillText(this.pontuacao, 255, 27);
        ctx.restore();
    }
}