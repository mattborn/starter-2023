const g = document.getElementById.bind(document)
const q = document.querySelectorAll.bind(document)

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBTDD3ZuBRNUtchdG3OfIJnm3SCf4hneQ8',
  authDomain: 'mattborn.firebaseapp.com',
  databaseURL: 'https://mattborn.firebaseio.com',
  projectId: 'project-8793044166487435911',
  storageBucket: 'project-8793044166487435911.appspot.com',
  messagingSenderId: '915826759190',
  appId: '1:915826759190:web:9028f607150a3f3a79c737',
})
// Firebase Analytics is automatically initialized

const insert = (target = document.body, tag = 'div') => {
  const el = document.createElement(tag)
  target.appendChild(el)
  return el
}

const account = insert()
account.id = 'account'

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    testCreate(user)
    g('account').textContent = `User is signed in with uid: ${user.uid}`
    const signOut = insert(g('account'), 'button')
    signOut.textContent = 'Sign out'
    signOut.addEventListener('click', e => {
      firebase
        .auth()
        .signOut()
        .then(() => (g('account').textContent = ''))
        .catch(console.error)
    })
  } else {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => testCreate(user))
      .catch(console.error)
  }
})

const database = firebase.database()
// const saveData = data => {
//   database
//     .ref('starter')
//     .push(data)
//     .then(() => console.log('Data written to Realtime Database successfully!'))
//     .catch(error => console.error('Error writing data to Realtime Database:', error))
// }

/* test suite */

const testCreate = user => {
  // add user profile
  const { displayName, email, emailVerified, isAnonymous, photoURL, phoneNumber, providerData } = user
  const { creationTime, lastSignInTime } = user.metadata
  database
    .ref(`users/${user.uid}`)
    .update({
      creationTime,
      displayName,
      email,
      emailVerified,
      isAnonymous,
      lastSignInTime,
      phoneNumber,
      photoURL,
      providerData,
    })
    .catch(console.error)

  // add an idea
  // database.ref('global').push({ name: 'test idea' }).catch(console.error)

  // add a book
  database
    .ref(`reads/${user.uid}/books`)
    .push({
      added: Date.now(),
      author: 'Tim Ferris',
      chapters: 17,
      name: 'The 4-Hour Workweek',
      pages: 285,
      status: 'Closed',
      week: 2330,
    })
    .catch(console.error)

  // add a book progress update (book report, haha)
  database
    .ref(`reads/${user.uid}/minutes`)
    .push({
      added: Date.now(),
      bid: '-NaTL-8K2GTCyOpJUsV4',
      minutes: 30,
      type: 'Eval',
      week: 2330,
    })
    .catch(console.error)

  // add a debt case
  database
    .ref(`oliver`)
    .push({
      added: Date.now(),
    })
    .catch(console.error)

  // and an event
  database
    .ref(`events`)
    .push({
      added: Date.now(),
      date: Date.now(),
      image: '',
      markdown: '',
      name: '',
      place: '',
    })
    .catch(console.error)

  // add a subsurf object
  database
    .ref(`chvrch/events`)
    .push({
      added: Date.now(),
      date: Date.now(),
      image: '',
      markdown: '',
      name: '',
      place: '',
    })
    .catch(console.error)

  // add a recampture object

  database
    .ref(`recampture/${user.uid}/trips`)
    .push({
      added: Date.now(),
      end: Date.now(),
      latitude: 0,
      links: '',
      longitude: 0,
      markdown: '',
      media: '',
      name: '',
      place: '',
      start: Date.now(),
    })
    .catch(console.error)

  // add a chvrch event object
  database
    .ref(`chvrch/events`)
    .push({
      added: Date.now(),
      date: Date.now(),
      image: '',
      markdown: '',
      name: '',
      place: '',
    })
    .catch(console.error)

  // add a round object
  database
    .ref(`rounds/people`)
    .push({
      added: Date.now(),
      birthday: 'July 3',
      family: 'Hendrix',
      name: 'Joey',
    })
    .catch(console.error)
}

if (location.pathname === '/') {
  //github.com/markedjs/marked/releases/tag/v5.0.1
  marked.use({
    headerIds: false,
    mangle: false,
  })

  fetch('./readme.md')
    .then(response => response.text())
    .then(text => (g('markdown').innerHTML = marked.parse(text)))
}
