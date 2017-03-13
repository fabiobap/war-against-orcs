function Painel(context, ator, imagem, shield) {
    
    this.context = context;
    this.ator = ator;
    this.pontuacao = 0;
    this.imagem = imagem;
    this.shield = shield;
}
Painel.prototype = {
    atualizar: function () {},
    desenhar: function () {
        this.context.scale(0.5, 0.5);
            var imgHp = this.imagem;
            var imgShield = this.shield;
        if (this.ator.IsBoss === false) {
            var x = 20;
            var y = 20;

            for (var i = 1; i <= this.ator.vidasExtras; i++) {
                this.context.drawImage(imgHp, x, y, imgHp.width, imgHp.height);
                x += 40;
            }  
            this.context.drawImage(imgShield, 20, 70, imgShield.width, imgShield.height);
            this.context.scale(2, 2);

            // Para facilitar um pouco...
            var ctx = this.context;
            // Pontuação
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = '16px sans-serif';
            ctx.fillText(this.ator.shieldedPoints, 45, 52);
            ctx.fillText('X', 30, 52);
            ctx.restore();
            // Pontuação
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = '18px sans-serif';
            ctx.fillText(this.pontuacao, 255, 27);
            ctx.restore();
        } else {
            var x = 790;
            var y = 20;

            this.context.drawImage(imgHp, x, y, imgHp.width, imgHp.height);
            
            this.context.scale(2, 2);
                        var ctx = this.context;
            // Pontuação
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = '18px sans-serif';
            ctx.fillText(this.ator.vidasExtras, 455, 27);
            ctx.fillText('X', 435, 27);
            ctx.restore();
        }
    }
}