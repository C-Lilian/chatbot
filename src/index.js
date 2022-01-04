import Tchat from './tchat';
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
    name: 'date',
    keywords: ['date'],
    action: () => {
      const date = new Date();
      return `Nous sommes le : ${date.toLocaleString()}`;
    }
  }, {
    name: 'addittion',
    keywords: ['plus', 'addittion'],
    action: () => '2+2=4'
  }]
}, {
  // Bot n°2 sans actions pour montrer la différence entre online / offline
  id: '2',
  name: 'bot 2',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWE9Em67nYEJTQaiaDfPIE-OygGi1H5H-byA&usqp=CAU',
  countMessage: 0,
  status: 0,
  actions: [/* {
    name: 'hello',
    keywords: ['hello', 'bonjour'],
    action: () => 'Bonjour Lilian !'
  } */]
}, {
  id: '3',
  name: 'bot 3',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWE9Em67nYEJTQaiaDfPIE-OygGi1H5H-byA&usqp=CAU',
  countMessage: 0,
  status: 0,
  actions: [{
    name: 'hello',
    keywords: ['hello', 'bonjour'],
    action: () => 'Bonjour Lilian !'
  }, {
    name: 'fetch',
    keywords: ['fetch', 'api'],
    action: () => {
      let info = '';
      const api = fetch('https://geo.api.gouv.fr/communes?codePostal=92140&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre')
        .then((res) => res.json())
        .then((data) => {
          info = `La ville de ${data[0].nom} est située dans le ${data[0].codeDepartement}.</br>Il y a ${data[0].population} d'habitants.`;
          // console.log(info);
          return info;
        })
        .catch((err) => { throw err; });
      // const api2 = Promise.resolve(api).then((value) => {
      //   // console.log(`ici : ${value}`);
      //   return value;
      // });
      // const api2 = async () => console.log(api);
      // console.log(api2);
      // console.log(api);
      return [api, info];
    }
  }]
}];

const tchat = new Tchat(bots);
tchat.run();
