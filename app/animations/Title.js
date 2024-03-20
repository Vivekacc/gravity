import GSAP from 'gsap'

import each from 'lodash/each'

import Animation from  '/app/classes/Animation'

import { calculate, split } from 'utils/text'

export default class Title extends Animation{
    
    constructor ({element,elements}){
        super({
            element,
            elements
        })

        split({element: this.element , append:true})
        split({element: this.element , append:true})

        this.elementLinesSpans = this.element.querySelectorAll('span span')
        this.onResize()
    }
    
    animateIn(){
        this.timelineIn = GSAP.timeline({
            delay:0.5,
        })
    
        this.timelineIn.set(this.element,{
                autoAlpha:1
            })
    
        each(this.elementsLines,(line,index)=>{
    
            this.timelineIn.fromTo(line,{
                y:'100%'
            },{
                delay: index * 0.2,
                duration: 1.5,
                ease: 'expo.out',
                y:'0%'
            },0)
        })
    
    }
    
    animateOut(){           
        GSAP.set(this.element,{
            autoAlpha:0
        })  
    }
    
    onResize () {
            this.elementsLines = calculate(this.elementLinesSpans)
            // console.log(this.elementsLines)
    }
}
    //  animateIn(){
        //     GSAP.set(this.element,{
    //         autoAlpha:1
    //     })
    //     GSAP.fromTo(this.elementsLines,{
    //         // autoAlpha:0,
    //         y:'100%'
    //     },{
    //         autoAlpha:1,
    //         delay:1,
    //         duration:1.5,
    //         stagger:0.2,
    //         y:'0%'
    //     })}