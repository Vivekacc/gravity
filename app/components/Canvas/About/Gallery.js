import { Transform } from 'ogl'
import GSAP from 'gsap'
import { map } from 'lodash'
import Media from './Media'
export default class Gallery{
    constructor ({element, geometry,index, gl, scene , sizes}){
    this.element = element
    this.elementsWrapper = element.querySelector('.about__gallery__wrapper');
    this.geometry = geometry
    this.gl = gl
    this.scene = scene
    this.index = index
    this.sizes = sizes

    this.group = new Transform()
    
    this.scroll = {
        current: 0,
        target: 0,
        start :0,
        lerp: 0.1,
        velocity : 1
    }

    // this.createTexture()
    // this.createProgram()
    this.createMedias()
    this.group.setParent(this.scene)
}

createMedias(){
    this.mediasElement = this.element.querySelectorAll('.about__gallery__media')
    
    // console.log(this.element)

    this.mediaz = map(this.mediasElement, (element, index) => {
        // console.log(element)
        return new Media({
            element,
            geometry: this.geometry,
            index,
            gl: this.gl,
            scene:this.group,
            sizes: this.sizes
        })
    })
}


show(){
    map(this.mediaz, media => media.show())
    
}

hide(){
    map(this.mediaz, media => media.hide())

}

onResize (e) {
    this.Bounds = this.elementsWrapper.getBoundingClientRect()
    // this.Bounds = this.galleryElement.getBoundingClientRect()
    this.sizes = e.sizes;
    this.width =this.Bounds.width / window.innerWidth * this.sizes.width,

    this.scroll.current = this.scroll.target =  0

    map(this.mediaz,media => media.onResize(e,this.scroll.current))
}


onTouchDown ({ x, y }) {
    
this.scroll.start = this.scroll.current ;
}

onTouchMove ({ x, y }) {

const Distance = x.start - x.end;

this.scroll.target = this.scroll.start - Distance;

// console.log(this.scroll.target)

}

onTouchUp ({ x, y }) {

}


update (scroll) {
    if (!this.Bounds) return

    const distance = (scroll.current - scroll.target) * 0.1;
    const y = scroll.current / window.innerHeight;
    
    if (this.scroll.current < this.scroll.target){
        this.direction = 'right'
        this.scroll.velocity = -1
    }
    else if (this.scroll.current > this.scroll.target){
        this.direction = 'left'

        this.scroll.velocity = 1
    }
    
    // function velo(){
    
        this.scroll.target -= this.scroll.velocity
    // }
    
    this.scroll.target += distance
    // setTimeout(velo.bind(this), 4500)
    
    
    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)
    
    map(this.mediaz, (media, index) => {
     
      const  scaleX = media.mesh.scale.x / 2 + 0.25
      const  positionX = media.mesh.position.x
        
        if (this.direction === 'left' ){

            const x = positionX + scaleX
            
                if ( x < -this.sizes.width / 2){
                    media.extra += this.width 
                    // media.mesh.rotation.z = GSAP.utils.random(-Math.PI*0.01, Math.PI*0.01)
                }
            }
            else if (this.direction === 'right' ){
                const x = positionX - scaleX
                
                if ( x > this.sizes.width / 2){
                    media.extra -= this.width
                    // media.mesh.rotation.z = GSAP.utils.random(-Math.PI*0.01, Math.PI*0.01)
                } 
            }
            
            media.mesh.position.y = Math.cos((media.mesh.position.x / this.width) * Math.PI) * 75 - 75
    
        media.update(this.scroll.current)
    })

    this.group.position.y = y * this.sizes.height

}

destroy(){
    this.scene.removeChild(this.group)    
}

}