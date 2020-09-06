import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address; // should use sanitize, but output code will be rather big, so avoiding it here. Better fix it on backend
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
// const coords = {
//   lat: parseFloat(queryParams.get('lat')),
//   lng: +queryParams.get('lng')
// };
// const address = queryParams.get('address');
const locId = queryParams.get('location');
fetch('https://sharemyplace-mustonen.herokuapp.com/location/' + locId)
    .then(response => {
      if (response.status === 404) {
        throw new Error('Could not find location')
      }
      return response.json();
    })
    .then( data => {
      new LoadedPlace(data.coordinates, data.address)
    })
    .catch(err => {
      alert(err.message)
    });