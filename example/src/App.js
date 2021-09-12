import React from 'react'

import SlideImage from 'slide'
import 'slide/dist/index.css'

import image1 from './assets/demo1.png'
import image2 from './assets/demo2.jpg'
import image3 from './assets/demo3.jpg'
import image4 from './assets/demo4.jpg'
import image5 from './assets/demo5.jpg'
import image6 from './assets/demo6.jpg'
import image7 from './assets/demo7.jpg'
import image8 from './assets/demo8.jpg'
import image9 from './assets/demo9.jpg'
import image10 from './assets/demo10.jpg'

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const App = () => {
  return <SlideImage images={images} />
}

export default App
