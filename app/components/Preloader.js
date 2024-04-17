import {Texture} from 'ogl';

import GSAP from 'gsap'

import Component from '/app/classes/Component';

import each from 'lodash/each'

import { split } from 'utils/text'
import { image } from '@prismicio/client';

export default class Preloader extends Component {
    constructor(canvas){
        super({
            element:'.preloader',
            elements:{
                title:'.preloader__text',
                number:'.preloader__number',
                numberText:'.preloader__number__text'
            }
        })
        this.canvas = canvas
        window.TEXTURES = {}

        split({
            element : this.elements.title,
          expression : '<br>'
        })
        
        split({
            element : this.elements.title,
            expression : '<br>'
        })

        this.elements.titleSpans = this.elements.title.querySelectorAll('span span')

        this.length = 0

        // console.log(this.element,this.elements)
        
        this.createLoader()
    }

    createLoader() {
      window.ASSETS.forEach(image => {
        const media = new window.Image()
        console.log(media)
        
        const texturz = new Texture(this.canvas.gl,{
          generateMipmaps: false
        })

        media.crossOrigin = 'anonymous'
        media.src = image
        media.onload = _ => {
          texturz.image = media
          this.onAssetLoaded(media)
        }
        window.TEXTURES[image] = texturz
      });

        // each(this.elements.images, element =>{
            
        //     const image = new Image();
        //     image.onload = (_) => this.onAssetLoaded(image)
        //     image.src = element.getAttribute('data-src')
// tempfix
// ideal code
            // element.onload = (_) => this.onAssetLoaded(element)
            // element.src = element.getAttribute("data-src")
        
        // })
    }

    onAssetLoaded(image){
        this.length += 1
        // console.log(image)
        const percent  = this.length / this.elements.ASSETS.length
        // console.log(Math.round(percent*100) )
        this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`
        if (percent === 1){
            this.onLoaded()
        }
    
    }
    
    onLoaded(){

        return new Promise((resolve) => {
          this.animateOut = GSAP.timeline({
            delay:2
          })
          

          this.animateOut.to(this.elements.titleSpans, {
                
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1,
                y: '100%',
            })

          this.animateOut.to(this.elements.numberText, {
                
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1,
                y: '100%',
            },'-=1.4' )

          this.animateOut.to(this.element, {
                
            duration: 1.5,
            ease: 'expo.out',
            scaleY:0,
            transformOrigin:'100% 100%'
            }, '-=1')
            
            this.animateOut.call(_ => {
                  this.emit('completed')
              })
        })
        
      }

      destroy(){
        this.element.parentNode.removeChild(this.element)
      }
    

}