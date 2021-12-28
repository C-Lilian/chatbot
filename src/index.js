import Tchat from './tchat';
// import Bot from './bot';
import './index.scss';

const bots = [{
  id: '1',
  name: 'bot 1',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWE9Em67nYEJTQaiaDfPIE-OygGi1H5H-byA&usqp=CAU',
  countMessage: 0,
  status: 0,
  actions: [{
    name: 'hello',
    keywords: ['hello', 'bonjour'],
    action: () => 'Bonjour Lilian !'
  }, {
    name: 'hour',
    keywords: ['heure', 'hour'],
    action: () => {
      const date = new Date();
      return `Nous sommes le : ${date.toLocaleString()}`;
    }
  }]
}, {
  id: '2',
  name: 'bot 2',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWE9Em67nYEJTQaiaDfPIE-OygGi1H5H-byA&usqp=CAU',
  countMessage: 0,
  status: 0,
  actions: [{
    name: 'hello',
    keywords: ['hello', 'bonjour'],
    action: () => 'Bonjour Lilian !'
  }]
}, {
  id: '3',
  name: 'bot 3',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWE9Em67nYEJTQaiaDfPIE-OygGi1H5H-byA&usqp=CAU',
  countMessage: 0,
  status: 0,
  actions: []
}];

const tchat = new Tchat(bots);
tchat.run();
