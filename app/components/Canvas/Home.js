import map from 'lodash/map';
import Media from './About/Media';
import { Plane, Transform, Mesh } from 'ogl';

export default class {
    constructor({gl,scene,sizes}){
        this.gl = gl
        this.group = new Transform()
        this.sizes = sizes

        this.mediasElement = document.querySelectorAll('.home__gallery__media__image');
        
        this.createGeometry()
        this.createGallery()

        this.group.setParent(scene)
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
            // const image = new Mesh(this.gl, {
            //     geometry: this.geometry,
            //     program: this.program,
            //     uniforms: {
            //         uTexture: {
            //             data: media[index]
            //         }
            //     }
            // })
            
            // image.scale.x = m.dataset.scaleX
            // image.scale.y = m.dataset.scaleY
            
            // image.position.x = m.dataset.x
            // image.position.y = m.dataset.y
            
            // image.setParent(this.gallery)
        })
    }
    
            onResize (e) {
                map(this.medias,media => media.onResize(e))
            }
}