# LightBox responsive

> This plugin made with 
>    * Vanilla JavaScript
>    * Css Framwork tailwindCSS (not important)
>    * Sass Preprocessor
>    * Pug template engine
>    * Gulp as task runner
---

###  Required
* nodejs

>
>    visite [Nodejs](http://nodejs.org/) site to install
>

* Gulp in global

```
$ npm install gulp-cli -g

```


### Installation


```
$ cd 'to the folder cloned' 

$ npm i 
or
$ yarn

```



### Developpement Serve

```
$ gulp

```


### Serve the Fully Built & Optimized Site

```
$ gulp build

```
---
Structure on source file
------
>    visite [body scroll lock](https://github.com/willmcpo/body-scroll-lock#readme) site to details for the plugin

> source
>    - assets
>        1. images
>            - chevron.svg
>            - close.svg
>            - loader.svg
>        2. styles
>            - mainb.sass
>            - main.sass
>            - sass
>               - lightbox.sass (***minimum style to make the LightBox work correctly***)
>        3. scripts
>            - app.js
>            - plugins
>               - Zoomer.js
>               - vendor
>                   * body-scroll-lock.js 
>            - touchMobile.js
>    - template
>       - index.pug    
>       - slider.pug


##### Version
1.0

##### License
MIT