//som de morte de orc rider
var SOM_MORTE_RIDER = new Audio();
SOM_MORTE_RIDER.src = 'snd/rider_morrendo.mp3';
SOM_MORTE_RIDER.volume = 0.3;
SOM_MORTE_RIDER.type = 'type="audio/mp3';
SOM_MORTE_RIDER.load();
//som de rider aparecendo
var SOM_RIDER_APARECENDO = new Audio();
SOM_RIDER_APARECENDO.src = 'snd/rider_aparecendo.mp3';
SOM_RIDER_APARECENDO.volume = 0.4;
SOM_RIDER_APARECENDO.type = 'type="audio/mp3';
SOM_RIDER_APARECENDO.load();

function Rider(context, imagem, imgMorto, imgSangue, tipoRider) {
    this.context = context;
    this.imagem = imagem;
    this.imgMorto = imgMorto;
    this.imgSangue = imgSangue;
    this.tipoRider = tipoRider;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 3);
    this.sheet.intervalo = 80;
    this.ultimoTempo = new Date().getTime();

    // Estado inicial
    this.andando = true;
    this.IsBoss = false;
    this.vidasExtras = 3;
    this.alive = true;
    var rider = this;
    SOM_RIDER_APARECENDO.currentTime = 0.0;
    SOM_RIDER_APARECENDO.play();
}

Rider.prototype = {

    atualizar: function () {
        this.atirar();
        this.sheet.proximoQuadro();

        this.y += this.velocidadeY;
        this.x += this.velocidadeX;

        if (this.y > this.context.canvas.height || this.x < -this.context.canvas.width + 280) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {
        if (this.tipoRider == 1) {
            var rets = [
                {
                    //orc cabeça
                    x: this.x + 5,
                    y: this.y + 10,
                    largura: 20,
                    altura: 30
            },
                {
                    //orc corpo
                    x: this.x + 20,
                    y: this.y + 10,
                    largura: 20,
                    altura: 40
            },
                {
                    //lobo corpo
                    x: this.x + 40,
                    y: this.y + 5,
                    largura: 25,
                    altura: 60
            },
                {
                    //lobo cabeça
                    x: this.x + 30,
                    y: this.y + 68,
                    largura: 25,
                    altura: 30
            },
            ];
        } else {
            var rets = [
                {
                    //orc
                    x: this.x + 33,
                    y: this.y + 1,
                    largura: 35,
                    altura: 60
            },
                {
                    //lobo
                    x: this.x + 35,
                    y: this.y + 30,
                    largura: 60,
                    altura: 32
            },
                {
                    //lobo cabeça
                    x: this.x,
                    y: this.y + 33,
                    largura: 30,
                    altura: 25
            }

        ];

        }
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
        if (outro instanceof Tiro) {
            var rider = this;
            rider.vidasExtras--;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (rider.vidasExtras < 1) {
                SOM_MORTE_RIDER.currentTime = 0.0;
                SOM_MORTE_RIDER.play();
                this.alive = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var morto = new Morto(this.context, this.imgMorto, this.x, this.y);
                this.animacao.novoSprite(morto);
            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
        if (outro instanceof TiroEspecial) {
            var rider = this;
            rider.vidasExtras -= 3;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (rider.vidasExtras < 1) {
                SOM_MORTE_RIDER.currentTime = 0.0;
                SOM_MORTE_RIDER.play();
                this.alive = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var morto = new Morto(this.context, this.imgMorto, this.x, this.y);
                this.animacao.novoSprite(morto);
            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
    },
    atirar: function () {
        if (this.tipoRider == 1) {

            var agora = new Date().getTime();
            var decorrido = agora - this.ultimoTempo;
            var img = new Image();
            img.src = 'img/spear_2.png';

            if (this.alive === true && decorrido > 800) {

                var tiro = new TiroRider(this.context, this, img, this.tipoRider);

                tiro.velocidadeY = 10;
                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
                this.ultimoTempo = agora;

                if (this.alive === false) {
                    this.animacao.excluirSprite(tiro);
                    this.colisor.excluirSprite(tiro);
                }
            }
        } else if (this.tipoRider == 2) {

            var agora = new Date().getTime();
            var decorrido = agora - this.ultimoTempo;
            var img = new Image();
            img.src = 'img/spear_4.png';

            if (this.alive === true && decorrido > 800) {

                var tiro = new TiroRider(this.context, this, img, this.tipoRider);

                tiro.velocidadeX = -5;
                this.animacao.novoSprite(tiro);
                this.colisor.novoSprite(tiro);
                this.ultimoTempo = agora;

                if (this.alive === false) {
                    this.animacao.excluirSprite(tiro);
                    this.colisor.excluirSprite(tiro);
                }
            }
        }
    }
}