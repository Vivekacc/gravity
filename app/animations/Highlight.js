import GSAP from 'gsap'

import each from 'lodash/each'

import Animation from  '/app/classes/Animation'

import { calculate, split } from 'utils/text'

export default class Highlight extends Animation{
    
    constructor ({element,elements}){
        super({
            element,
            elements
        })
    }
    
    animateIn(){
        this.timelineIn = GSAP.timeline({
            delay:0.5,
        })
    this.timelineIn.fromTo(this.element,{
        autoAlpha:0,
        scale:1.5,
    },{
        autoAlpha:1,
        duration:2.5,
        ease:'expo.out',
        scale:1
    })
    
    }
    
    animateOut(){           
        GSAP.set(this.element,{
            autoAlpha:0
        })  
    }
}