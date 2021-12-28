const Bot = class {
  constructor(bot) {
    this.bot = bot;
    this.hasActions();
  }

  hasActions() {
    const { actions } = this.bot;
    console.log(this.bot.id, actions.length);
    if (actions.lenght > 0) {
      this.bot.status = 1;
    }
  }

  findActionByValue(message) {
    const { actions } = this.bot;
    if (actions) {
      this.bot.status = 1;
      for (let i = 0; i < actions.length; i += 1) {
        const action = actions[i];

        for (let j = 0; j < action.keywords.length; j += 1) {
          const keyword = action.keywords[j];
          if (message === keyword) {
            return action.action();
          }
        }
      }
    }
    return false;
  }
};

export default Bot;
