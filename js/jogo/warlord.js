var SOM_WARLORD = new Audio();
SOM_WARLORD.src = 'snd/rugido.mp3'
SOM_WARLORD.volume = 0.5;
SOM_WARLORD.load();

function Warlord(context, imagem, imgExplosao, imgFumaca) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.velocidade2 = 0;
    this.imgExplosao = imgExplosao;
    this.imgFumaca = imgFumaca;
    this.alive = false;
    this.vidasExtras = 15;
    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 2);
    this.sheet.intervalo = 160;
    this.ultimoTempo = new Date().getTime();
    this.ultimoTempo2 = new Date().getTime();
    // Estado inicial
    this.andando = true;
    var warlord = this;
    SOM_WARLORD.currentTime = 0.0;
    SOM_WARLORD.play();

}

Warlord.prototype = {

    atualizar: function () {
        this.alive = true;
        this.atirar();
        this.sheet.proximoQuadro();
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;
        var decorrido2 = agora - this.ultimoTempo2;

        this.y += this.velocidade2 * this.animacao.decorrido / 1000;
        this.x += this.velocidade * this.animacao.decorrido / 1000;

        if ((this.y >= 50) && (decorrido2 >= 300)) {
            this.velocidade2 = 0;


            if (this.x >= 400) {
                this.velocidade = -50;
            } else if (this.x <= 20) {
                this.velocidade = 50;
            }
        }

        if (this.x > this.context.canvas.width - 80) {
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
                largura: 80,
                altura: 80
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
        // Se colidiu com um Tiro, os dois desaparecem
        if (outro instanceof Tiro || outro instanceof Tiro2) {
            SOM_GROWL.currentTime = 0.0;
            SOM_GROWL.play();
            var warlord = this;
            warlord.vidasExtras--;
            var fumaca = new Fumaca(this.context, this.imgFumaca, this.x, this.y);
            this.animacao.novoSprite(fumaca);
            if (warlord.vidasExtras < 1) {
                this.alive = false;
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
        img.src = 'img/jogo/sword_spritesheet.png'
        if (this.alive == true && decorrido > 1000) {
            var t = new TiroWarlord(this.context, this, img);
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