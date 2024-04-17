import GSAP from 'gsap';
import map from 'lodash/map';
import Media from './Media';
import Prefix from 'prefix';
import { Plane, Transform, Mesh } from 'ogl';


export default class {
    constructor({gl,scene,sizes}){
        this.gl = gl
        this.sizes = sizes
        this.scene = scene

        this.transformPrefix = Prefix('transform')
        this.group = new Transform()
        
        this.galleryElement = document.querySelector('.collections__gallery');
        this.galleryWrapper = document.querySelector('.collections__gallery__wrapper');

        this.titlesElement = document.querySelector('.collections__titles');
        
        this.collectionElement = document.querySelectorAll('.collections__article');
        this.collectionElementActive = 'collections__article--active';
        
        this.mediasElement = document.querySelectorAll('.collections__gallery__media');
        
        
        this.scroll = {
            current: 0,
            start: 0,
            target: 0,
            lerp: 0.1,
            last: 0,
            velocity: 1
        };
    
        
        
        this.createGeometry()
        this.createGallery()
    
        this.group.setParent(this.scene)
        this.show()
    }
    
    createGeometry(){
        this.geometry = new Plane(this.gl)
    }
    
    createGallery(){
        this.gallery = new Transform()
        
        this.medias = map(this.mediasElement, (element, index) => {
            
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
        map(this.medias, media => media.show())
        
    }
    
    hide(){
        map(this.medias, media => media.hide())

    }

    
            onResize (e) {
                this.sizes = e.sizes;

                this.Bounds = this.galleryWrapper.getBoundingClientRect()
                this.scroll.last = this.scroll.target =  0;

                map(this.medias,media => media.onResize(e,this.scroll.current))
                
                // this.scroll.limit = this.Bounds.width - this.medias[0].element.clientWidth
                this.scroll.limit = this.Bounds.width - this.medias[0].element.clientWidth;
            }


            onTouchDown ({ x, y }) {
                
            this.scroll.last = this.scroll.current ;
            }

            onTouchMove ({ x, y }) {
                const Distance = x.start - x.end;

                this.scroll.target = this.scroll.last - Distance;
                // console.log(this.scroll.target,Distance)
            }

            onTouchUp ({ x, y }) {
            
            }

            onWheel({pixelX,pixelY}){
                    this.scroll.target += pixelX;
                    // this.y.target += pixelY;
            }


            onChange(index){
                this.index = index;
                const selectedCollection =  parseInt( this.mediasElement[this.index].getAttribute('data-index'));
            
                // console.log(selectedCollection);

                map(this.collectionElement, (element, elementIndex) => {
                    if (elementIndex === selectedCollection){
                        element.classList.add(this.collectionElementActive)
                    }else{
                        element.classList.remove(this.collectionElementActive)
                    }
                })
                this.titlesElement.style[this.transformPrefix] = `translateY(-${25 * selectedCollection}%) translate(-50%,50%) rotate(-90deg)`
            }
            
            
            update () {
                if (!this.Bounds) return
                this.scroll.target = GSAP.utils.clamp( -this.scroll.limit, 0, this.scroll.target)
                this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)
                this.galleryElement.style[this.transformPrefix] = `translateX(${this.scroll.current}px)`
   
                if (this.scroll.last < this.scroll.current){
                    this.scroll.direction = 'right'
                    // this.scroll.velocity = -1
                }
                else if (this.scroll.last > this.scroll.current){
                    this.scroll.direction = 'left'
            
                    // this.scroll.velocity = 1
                }
                
                this.scroll.last = this.scroll.current;
        
                
                const index = Math.floor(Math.abs(this.scroll.current / this.scroll.limit) * this.medias.length)
                
                if(this.index !== index){
                    this.onChange(index)
                }
    
                map(this.medias, (media, index) => {
                 media.update(this.scroll.current, this.index)
                })
            }


            destroy(){
                this.scene.removeChild(this.group)
                // this.scene.removeChild(this.gallery)
            }
}