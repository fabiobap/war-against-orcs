//som de morte de orc marauder
var SOM_MORTE_TAZHADUR = new Audio();
SOM_MORTE_TAZHADUR.src = 'snd/dragon_morrendo.mp3';
SOM_MORTE_TAZHADUR.volume = 0.3;
SOM_MORTE_TAZHADUR.type = 'type="audio/mp3';
SOM_MORTE_TAZHADUR.load();
//som de marauder aparecendo
var SOM_TAZHADUR_APARECENDO = new Audio();
SOM_TAZHADUR_APARECENDO.src = 'snd/dragon_aparecendo.mp3';
SOM_TAZHADUR_APARECENDO.volume = 0.4;
SOM_TAZHADUR_APARECENDO.type = 'type="audio/mp3';
SOM_TAZHADUR_APARECENDO.load();

function Tazhadur(context, imagem, imgSangue) {
    this.context = context;
    this.imagem = imagem;
    this.imgSangue = imgSangue;
    this.y = 0;
    this.x = 0;
    this.velocidadeY = 0;
    this.velocidadeX = 0;
    this.ultimoX = 0;
    this.ultimoY = 0;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 8);
    this.sheet.intervalo = 60;
    this.ultimoTempoWave = new Date().getTime();
    this.ultimoTempoBeam = new Date().getTime();
    this.ultimoTempoFireball = new Date().getTime();
    this.ultimoTempo = new Date().getTime();

    // Estado inicial
    this.alive = false;
    this.andando = true;
    this.IsBoss = true;
    this.vidasExtras = 50;
    var tazhadur = this;
    SOM_TAZHADUR_APARECENDO.currentTime = 0.0;
    SOM_TAZHADUR_APARECENDO.play();
    this.nome = "tazhadur";
}

Tazhadur.prototype = {

    atualizar: function () {

        this.alive = true;
        this.atirar();
        this.sheet.proximoQuadro();

        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTempo;

        this.y += this.velocidadeY;
        this.x += this.velocidadeX;

        if ((this.y >= 5) && (decorrido >= 300)) {
            this.velocidadeY = 0;

            if (this.x >= 380) {
                this.velocidadeX = -2;
            } else if (this.x <= 2) {
                this.velocidadeX = 2;
            }
        }

        if (this.x > this.context.canvas.width - 10) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function () {

        var rets = [
            //cabeça
            {
                x: this.x + 10,
                y: this.y + 30,
                largura: 50,
                altura: 65
            },
            //corpo
            {
                x: this.x + 60,
                y: this.y + 10,
                largura: 40,
                altura: 100
            },
            //pata
            {
                x: this.x + 100,
                y: this.y + 40,
                largura: 20,
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
        // Se colidiu com um Tiro, os dois desaparecem
        if (outro instanceof Tiro) {
            var tazhadur = this;
            tazhadur.vidasExtras--;
            this.ultimoX = this.x;
            this.ultimoY = this.y;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (tazhadur.vidasExtras < 1) {
                SOM_MORTE_TAZHADUR.currentTime = 0.0;
                SOM_MORTE_TAZHADUR.play();
                this.alive = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
        if (outro instanceof TiroEspecial) {
            var tazhadur = this;
            tazhadur.vidasExtras -= 3;
            this.ultimoX = this.x;
            this.ultimoY = this.y;
            var sangue = new Sangue(this.context, this.imgSangue, this.x, this.y);
            this.animacao.novoSprite(sangue);
            if (tazhadur.vidasExtras < 1) {
                SOM_MORTE_TAZHADUR.currentTime = 0.0;
                SOM_MORTE_TAZHADUR.play();
                this.alive = false;
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

            } else {
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
    },
    atirar: function () {
        var agoraWave = new Date().getTime();
        var agoraFireball = new Date().getTime();
        var agoraBeam = new Date().getTime();
        var decorridoWave = agoraWave - this.ultimoTempoWave;
        var decorridoFireball = agoraWave - this.ultimoTempoFireball;
        var decorridoBeam = agoraBeam - this.ultimoTempoBeam;

        var imgWave = new Image();
        var imgFireball = new Image();
        var imgBeam = new Image();
        imgWave.src = 'img/especial_wave_tazhadur_spritesheet.png';
        imgBeam.src = 'img/especial_beam_tazhadur_spritesheet.png';
        imgFireball.src = 'img/fireball_tazhadur_spritesheet.png';

        if (this.alive === true && decorridoWave > 11650) {
            var tipoAtaque = 'wave';
            var tiro = new TiroTazhadur(this.context, this, imgWave, tipoAtaque);
            tiro.velocidadeY = 7;
            this.animacao.novoSprite(tiro);
            this.colisor.novoSprite(tiro);
            this.ultimoTempoWave = agoraWave;
            if (this.alive === false) {
                this.animacao.excluirSprite(tiro);
                this.colisor.excluirSprite(tiro);
            }
        }
        if (this.alive === true && decorridoBeam > 5400) {
            var tipoAtaque = 'beam';
            var tiro = new TiroTazhadur(this.context, this, imgBeam, tipoAtaque);
            tiro.velocidadeY = 7;
            this.animacao.novoSprite(tiro);
            this.colisor.novoSprite(tiro);
            this.ultimoTempoBeam = agoraBeam;
            if (this.alive === false) {
                this.animacao.excluirSprite(tiro);
                this.colisor.excluirSprite(tiro);
            }
        }
        if (this.alive === true && decorridoFireball > 1000) {
            var tipoAtaque = 'fireball';
            var tiro = new TiroTazhadur(this.context, this, imgFireball, tipoAtaque);
            tiro.velocidadeY = 7;
            this.animacao.novoSprite(tiro);
            this.colisor.novoSprite(tiro);
            this.ultimoTempoFireball = agoraFireball;
            if (this.alive === false) {
                this.animacao.excluirSprite(tiro);
                this.colisor.excluirSprite(tiro);
            }
        }
    }
}