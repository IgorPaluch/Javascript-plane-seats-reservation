import './style.scss'

import { script } from './script';

document.querySelector('#app').innerHTML = `
  <div>
    <div class="container"></div>
  </div>
`

script();
