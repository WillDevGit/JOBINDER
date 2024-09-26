
var cardContent = [
                {img: "url('../backend/database/poda3.jpg')" , desc: "<h3>José - jardineiro</h3><p>Especialidade: Manutenção de jardins e poda de árvores </p> <p>Serviços: Poda de arvore, limpeza de terrenos, retirada de entulhos e cercas de arame </p>"},
                {img: "url('../backend/database/poda1.jpg')", desc: "<h3>Anderson - Poda ornamental</h3> <p>Serviços: Poda de árvores, cuidado de gramados e plantio de flores </p> <p>Disponibilidade: Segunda à Sexta 13hs até 17hrs</p>"}, 
                {img: "url('../backend/database/poda2.jpg')", desc: "<h3> Antonio - Especialista em poda de árvores</h3> <p>Especialidade: Poda de árvores e revitalização de jardins</p> <p>Serviços: Poda de árvores, limpeza de jardins e decoração com plantas ornamentais</p> <p>Horário: Terça a domingo, 8h às 17h</p>"},
                {img: "url('../backend/database/mar1.jpg')", desc: "<h3>João Pereira - Marceneiro</h3> <p>Especialidade: Móveis planejados para cozinhas e escritórios</p> <p>Horário: Segunda a sexta, 8h às 18h</p> <p>Serviços: Medição no local e montagem inclusa</p>"},
                {img: "url('../backend/database/mar2.jpg')", desc: "<h3>Raimundo - Marceneiro</h3> <p>Especialidade: Reparos, restaurações de móveis antigos e móveis planejados</p> <p>Horário: Finais de semana, 9h às 17h</p> <p>Serviços: Restauração de peças antigas e personalização</p>"},
                {img: "url('../backend/database/mar3.jpg')", desc: "<h3>Kevin - Carpinteiro</h3> <p>Especialidade: Criação de móveis rústicos sob medida </p> <p>Serviços: Projetos personalizados e entrega rápida</p> <p>Horário: Segunda a sexta, 13h às 19h</p>"},
                {img: "url('../backend/database/pin1.jpg')", desc: "<h3>Adriano - Pintor</h3> <p>Especialidade: Pintura de interiores e exteriores </p> <p>Experiência: 10 anos em pintura residencial e comercial</p> <p>Serviços: Pintura de paredes, aplicação de texturas e grafiato</p>"},
                {img: "url('../backend/database/pin2.jpg')", desc: "<h3>Luciano - Pintor</h3> <p>Especialidade: Pintura decorativa e aplicação de papel de parede </p> <p>Horário: Segunda a sexta, 9h às 18h</p> <p>Serviços: Pintura de paredes, pintura artística e acabamentos finos</p>"},
                //{img: "url('../backend/database/s10.png')", desc: "<h3>Ames - Designer de Interfaces Web</h3> <p>Ferramentas: HTML5, CSS3, JavaScript, Visual Studio Code, Git, Node.js </p> <p>www.sofiaseo.com/otimizacao-noticias</p>"},
                //{img: "url('../backend/database/s9.png')", desc: "<h3>John smith - Criador de Sites WordPress</h3> <p>Ferramentas: HTML5, CSS3, JavaScript, Visual Studio Code, Git, Node.js </p> <p>www.sofiaseo.com/otimizacao-noticias</p>"},
]; 

    //index do banco de dados  
    let index = 0;

class Carousel {

    constructor(element) {
        this.board = element 
        

        // adiciona primeiro card 
        
        this.push();
        
        //adiciona segundo card
        this.push();

        // handle gestures
        this.handle(); 

    }

    handle() {

        // listar todos os cards 
        this.cards = this.board.querySelectorAll('.card'); 

        // pegar card do topo
        this.topCard = this.cards[this.cards.length - 1];

        // pegar próximo card
        this.nextCard = this.cards[this.cards.length - 2];

        // se pelo menos um cartão estiver presente
        if (this.cards.length > 0) {

            // definir posição e escala padrão do cartão superior
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'

            // destruir instância anterior do Hammer, se presente
            if (this.hammer) this.hammer.destroy()

            // ouça os gestos de tocar e mover no cartão superior
            this.hammer = new Hammer(this.topCard)
            this.hammer.add(new Hammer.Tap())
            this.hammer.add(new Hammer.Pan({
                position: Hammer.position_ALL,
                threshold: 0
            }))

            // passar dados de eventos para retornos de chamada personalizados
            this.hammer.on('tap', (e) => {
                this.onTap(e)
            })
            this.hammer.on('pan', (e) => {
                this.onPan(e); 

                // Se card arrastar para a direita 
                if (e.deltaX > 0) {
                    this.topCard.style.border = "3px solid green";
                }
                // Se card arrastar para a esquerda 
                else if (e.deltaX < 0){
                    this.topCard.style.border = "3px solid red";
                }
            })
            // Se card voltar para a posição original 
            this.hammer.on('panend', (e) => {
                this.topCard.style.border = "none";
            }); 

        }

    }

    onTap(e) {

        // obter a posição do dedo na carta superior
        let propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth

        // obter graus de rotação em torno do eixo Y (+/- 15) com base na posição do dedo
        let rotateY = 15 * (propX < 0.05 ? -1 : 1)

        // habilitar transição de transformação
        this.topCard.style.transition = 'transform 100ms ease-out'

        // aplicar rotação em torno do eixo Y
        this.topCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)'

        // aguarde o fim da transição
        setTimeout(() => {
            // redefinir propriedades de transformação
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
        }, 100)

    }

    onPan(e) {

        if (!this.isPanning) {

            this.isPanning = true

            // remove propriedades de transição
            this.topCard.style.transition = null
            if (this.nextCard) this.nextCard.style.transition = null

            // obter coordenadas do cartão superior em pixels
            let style = window.getComputedStyle(this.topCard)
            let mx = style.transform.match(/^matrix\((.+)\)$/)
            this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0
            this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0

            // obtenha os melhores limites de cartas
            let bounds = this.topCard.getBoundingClientRect()

            // obter a posição do dedo na carta superior, superior (1) ou inferior (-1)
            this.isDraggingFrom =
                (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

        }

        // obter novas coordenadas
        let posX = e.deltaX + this.startPosX
        let posY = e.deltaY + this.startPosY

        // obter proporção entre pixels deslizados e os eixos
        let propX = e.deltaX / this.board.clientWidth
        let propY = e.deltaY / this.board.clientHeight
        

        // obter direção de deslizamento, esquerda (-1) ou direita (1)
        let dirX = e.deltaX < 0 ? -1 : 1

        // obtém graus de rotação, entre 0 e +/- 45
        let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45

        // obter proporção de escala, entre 0,95 e 1
        let scale = (95 + (5 * Math.abs(propX))) / 100
    
        // mover e girar a carta superior
        this.topCard.style.transform =
            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)'

        // aumente a próxima carta
        if (this.nextCard) this.nextCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')'

        if (e.isFinal) {

            this.isPanning = false

            let successful = false

            // propriedades de transição de retrocesso
            this.topCard.style.transition = 'transform 200ms ease-out'
            if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear'

            // verificar limite e direção do movimento
            if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
                this.topCard.style.border = "1px red solid";
                successful = true;
                // get right border position
                posX = this.board.clientWidth;

            } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
                this.topCard.style.border = "5px blue solid";
                successful = true
                // get left border position
                posX = -(this.board.clientWidth + this.topCard.clientWidth)

            } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {

                successful = true
                // get top border position
                posY = -(this.board.clientHeight + this.topCard.clientHeight)
            
            }

            if (successful) {
              
                // jogue a carta na direção escolhida
                this.topCard.style.transform =
                    'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

                // esperar a transição acabar 
                setTimeout(() => {
                    // remove cartão passado 
                    this.board.removeChild(this.topCard)
                    // adiciona novo cartão 
                    this.push()
                    // handle gestures on new top card
                    this.handle()
                }, 200)

            } else {

                // reset cards position and size
                this.topCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
                if (this.nextCard) this.nextCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)'

            }

        }

    }

    push() {
        // Cria um novo card
        let card = document.createElement('div');

        card.classList.add('card');

        //adiciona uma imagem 

        let imagem = document.createElement('div'); 
        
        imagem.style.backgroundImage = cardContent[index].img; 
        

        imagem.classList.add('imagem');
         
        //adiciona uma descrição 
        let descricao = document.createElement('div'); 
        descricao.innerHTML = cardContent[index].desc; 
        descricao.classList.add('descricao');

        //botoes obs: implementar 
        let botoes = document.createElement('div'); 
        botoes.innerHTML =  "<img src='../frontend/image/cancel.png'> <img src='../frontend/image/voltar.png'> <img src='../frontend/image/confirme.png'>";
        botoes.classList.add('botoes'); 

        card.appendChild(imagem); 
        card.appendChild(descricao);
        card.appendChild(botoes); 

        /** 
        codigo original 
        card.style.backgroundImage =
            "url('https://picsum.photos/320/320/?random=" + Math.round(Math.random() * 1000000) + "')"
        */

        this.board.insertBefore(card, this.board.firstChild)
        index = (index == cardContent.length - 1) ? 0 : index += 1;

    }
    
}

let board = document.querySelector('#board')

let carousel = new Carousel(board);

