# slide ([DEMO](https://trangpham-jh.github.io/demo-slide/)) :tomato:

> slide images

[![NPM](https://img.shields.io/npm/v/slide.svg)](https://www.npmjs.com/package/slide) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


![Farmers Market Finder Demo](https://media.giphy.com/media/3SAexJkelI8alJTu0z/giphy.gif?cid=790b7611af8c87a4eeca8a7cd103d7d49f95bef067511a28&rid=giphy.gif&ct=g)


## Install

```bash
npm install --save slide
```

## Usage

```jsx
import React, { Component } from 'react'

import SlideImage from 'slide'
import 'slide/dist/index.css'

import image1 from './assets/001.jpg'
import image2 from './assets/002.jpg'
import image3 from './assets/003.jpg'

class App extends Component {
  render() {
    return <SlideImage images={[ image1, image2, image3 ]} />
  }
}
```

## License

MIT © [Duoi Pham](https://github.com/trangpham-jh)
