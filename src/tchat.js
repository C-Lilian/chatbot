import Bot from './bot';

const Tchat = class {
  constructor(bots) {
    this.el = document.querySelector('#app');
    this.bots = this.createBots(bots);
  }

  // Créer l'entête de la page.
  renderHeader() {
    return `
      <header>
        <nav class="navbar navbar-dark bg-secondary">
          <div class="container-fluid">
            <span id="titreApp" class="navbar-brand mb-0 h1">ChatBot.IO</span>
          </div>
        </nav>
      </header>
    `;
  }

  // Créer le main de la page.
  renderContainer() {
    return `
      <main class="container-fluid">
        <div class="row">
          ${this.renderBotsList()}
          ${this.renderContentMessages()}
        </div>
      </main>
    `;
  }

  // Date a laquelle le message a été envoyé.
  dateSend() {
    const date = new Date();
    const dateEnvoie = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return dateEnvoie;
  }

  // Permet l'ajout d'un message envoyé.
  renderMessageSended(message) {
    return `
    <div class="row">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="row ps-3 pt-2">
          <div class="col-11">
            <div class="card m-2">
              <div class="card-header">
                <div class="row">
                  <div class="col-9 pt-2">Cleret Lilian</div>
                </div>
              </div>
              <div class="card-body">
                <p class="card-text">${message}</p>
                <p class="card-text"><small class="text-muted">${this.dateSend()}</small></p>
              </div>
            </div>
          </div>
          <div class="col-1 ps-0 pe-2 pt-2">
            <img id="img-msg" src="https://media-exp1.licdn.com/dms/image/C4D03AQGNqwC-w4Lu6g/profile-displayphoto-shrink_200_200/0/1595178140740?e=1645660800&v=beta&t=zd5WaDh0HUs8hogTCJBHGVQYTp_WBljn1V43_KdVsz8" class="img-fluid rounded-circle border border-dark border-2" alt="imageBot"/>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // Pemret l'ajout d'un message reçu.
  renderMessageReceived(bot) {
    const {
      name,
      avatar,
      message,
      status
    } = bot;

    const online = this.isOnline(status);
    return `
    <div class="row">
      <div class="col-6">
        <div class="row ps-3 pt-2">
          <div class="col-1 ps-2 pe-0 pt-2">
            <img id="img-msg" src="${avatar}" class="img-fluid rounded-circle border border-${online} border-2" alt="imageBot"/>
          </div>
          <div class="col-11">
            <div class="card m-2">
              <div class="card-header">
                <div class="row">
                  <div class="col-9 pt-2">${name}</div>
                </div>
              </div>
            <div class="card-body">
              <p class="card-text">${message}</p>
              <p class="card-text"><small class="text-muted">${this.dateSend()}</small></p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="col-6"></div>
    </div>
    `;
  }

  // Insère la partie permettant l'envoie d'un message.
  renderInputMessage() {
    return `
    <div id="message-input" class="row bg-light">
      <div class="row">
        <div class="col-12 pt-2">
          <form class="row g-3">
            <div class="col-10">
              <label for="inputMessage" class="visually-hidden">Message :</label>
              <input type="text" class="form-control" id="inputMessage" placeholder="Message...">
            </div>
            <div class="col-2">
              <button id="btnEnvoie" type="submit" class="btn btn-primary mb-3">Envoyez</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;
  }

  // Insère un bot avec les données reçu.
  renderBot(data) {
    const {
      id,
      name,
      avatar,
      countMessage,
      status,
      actions
    } = data;

    const online = this.isOnline(status, actions);
    return `
    <div data-id=${id} class="row m-1">
      <div class="col-4 my-1">
        <img id="img-list" src="${avatar}" class="img-fluid rounded-circle border border-${online[0]} border-2" alt="${name}"/>
      </div>
      <div class="col-5 pt-3">
        <div class="row">${name}</div>
        <div class="row text-${online[0]}">${online[1]}</div>
      </div>
      <div class="col-3 pt-4">
        <span class="badge rounded-pill bg-${online[0]}">${countMessage}</span>
      </div>
      <hr/>
    </div>
    `;
  }

  // Permet l'ajout d'une liste de bots.
  renderBotsList() {
    return `
    <section id="bot-list" class="col-3 bg-light">
      ${this.bots.map((bot) => this.renderBot(bot.bot)).join('')}
      ${this.allActionsInfo()}
    </section>
    `;
  }

  // Insère la partie des messages reçu/envoyé.
  renderContentMessages() {
    return `
    <section id="content-message" class="col-9">
      <div class="row" id="messages">
      <!-- Message send -->
      <!-- Message received -->
      </div>
      ${this.renderInputMessage()}
    </section>
    `;
  }

  // Ajout de la bulle d'information.
  allActionsInfo() {
    return `
    <div class="alert alert-primary" role="alert">
      <h4 class="alert-heading"><i class="fa fa-info-circle" aria-hidden="true"></i> Information utilisation !</h4>
      <hr>
      <div>
        ${this.bots.map((bot) => this.allActionsPerBots(bot.bot)).join('')}
      </div>
    </div>
    `;
  }

  // Insère le nom des bots avec la préparation de la liste pour la bulle d'info.
  allActionsPerBots(data) {
    const {
      name,
      actions
    } = data;

    // console.log(`data : ${data}`);
    if (actions.length === 0) {
      return '';
    }
    return `
      <strong>${name}</strong> possède les actions suivantes :<br>
      <ol class="list-group list-group-flush">
        ${this.getActions(actions)}
      </ol>
      <br>
    `;
  }

  // Insère la liste pour la bulle d'info.
  getActions(actions) {
    let nom = '';
    if (actions) {
      for (let i = 0; i < actions.length; i += 1) {
        nom += `<li class="list-group-item"> ${actions[i].name} : `;
        for (let j = 0; j < actions[i].keywords.length; j += 1) {
          nom += `${actions[i].keywords[j]}`;
          if (j + 1 !== actions[i].keywords.length) {
            nom += ', ';
          }
        }
        nom += '</li>';
      }
    }
    return nom;
  }

  // Méthode permettant l'incrémentation des badges des bots.
  addCountMessage(el) {
    const badge = el.querySelector('.badge');
    badge.textContent = parseInt(badge.textContent, 10) + 1;
  }

  // Lorsqu'un message est envoyé cette fonction est appelé.
  sendMessage() {
    const messagesEl = document.querySelector('#messages');
    const inputEl = document.querySelector('#message-input input');
    const buttonEl = document.querySelector('#message-input button');

    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();
      const { value } = inputEl;

      // Possibilité de mettre le btn en disable et de le remettre si un message est inséré.
      if (value !== '') { // Permet le non envoie de message si val de l'input est null
        messagesEl.innerHTML += this.renderMessageSended(value);
        this.searchActionByBot(value);
        inputEl.value = '';

        // Permet d'aller tout en bas du dernier message.
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    });
  }

  // Création des bots via le fichier du mm nom.
  createBots(bots) {
    return bots.map((bot) => new Bot(bot));
  }

  // Si le message envoyé fait partie des actions des bots
  // Alors on affiche la réponse selon les bots
  // + On incrémente le badge.
  searchActionByBot(value) {
    const messagesEl = document.querySelector('#messages');
    // filter renvoie que si la val est vrai
    const bots = this.bots.map((bot) => {
      const message = bot.findActionByValue(value);
      const {
        id,
        name,
        avatar,
        status
      } = bot.bot;
      if (message) {
        return {
          id,
          name,
          avatar,
          message,
          status
        };
      }
      return false;
    });

    bots.forEach((bot) => {
      if (bot.message) {
        messagesEl.innerHTML += this.renderMessageReceived(bot);
        const els = document.querySelectorAll('#bot-list > div');
        this.addCountMessage(els[parseInt(bot.id, 10) - 1]);
      }
    });
  }

  // Si le bot a un status === 1 ou qu'il possède des actions alors on met son cercle en vert.
  isOnline(status, actions) {
    if ((status === 1) || (actions.length !== 0)) {
      return ['success', 'online'];
    }
    return ['danger', 'offline'];
  }

  // Méthode permettant le lancement.
  run() {
    this.el.innerHTML += this.renderHeader();
    this.el.innerHTML += this.renderContainer();

    this.sendMessage();
  }
};

export default Tchat;
