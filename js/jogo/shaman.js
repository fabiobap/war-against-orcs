function Shaman(context, imagem, imgExplosao, imgFumaca) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgExplosao = imgExplosao;
    this.imgFumaca = imgFumaca;
    this.alive = false;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 8);
    this.sheet.intervalo = 60;
    this.ultimoTempo = new Date().getTime();

    // Estado inicial
    this.andando = true;
    var shaman = this;
    this.vidasExtras = 5;

}

Shaman.prototype = {

    atualizar: function () {
        this.alive = true;
        this.atirar();
        this.sheet.proximoQuadro();
        this.x += this.velocidade * this.animacao.decorrido / 3000;

        if (this.x > this.context.canvas.width - 90) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.alive = false;

        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);

        /*        var ctx = this.context;
                var img = this.imagem;
                ctx.drawImage(img, this.x, this.y, img.width, img.height);*/
    },
    retangulosColisao: function () {

        var rets = [
            {
                x: this.x + 1,
                y: this.y + 1,
                largura: 58,
                altura: 60
            }
        ];
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
        this.alive = false;
        // Se colidiu com um Tiro, os dois desaparecem
        if (outro instanceof Tiro || outro instanceof Tiro2) {
            var shaman = this;
            shaman.vidasExtras--;
            var fumaca = new Fumaca(this.context, this.imgFumaca, this.x, this.y);
            this.animacao.novoSprite(fumaca);
            if (shaman.vidasExtras < 1) {
                SOM_GROWL.currentTime = 0.0;
                SOM_GROWL.play();
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
                this.animacao.novoSprite(explosao);
            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
    },
    atirar: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;
        var img = new Image();
        img.src = 'img/jogo/fireball_spritesheet.png'
        if (this.alive == true && decorrido > 900) {
            var t = new TiroShaman(this.context, this, img);
            this.animacao.novoSprite(t);
            this.colisor.novoSprite(t);
            this.ultimoTempo = agora;
            if (this.alive == false) {
                this.animacao.excluirSprite(t);
                this.colisor.excluirSprite(t);
            }
        }
    }
}