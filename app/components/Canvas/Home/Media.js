import Detection from "/app/classes/Detection";
import GSAP from "gsap";
import {Mesh, Program} from "ogl";
import vertex from "/app/shaders/plane-vertex.glsl";
import fragment from "/app/shaders/plane-fragment.glsl";

export default class  {
    constructor ({element, geometry,index, gl, scene , sizes}){
        this.element = element
        this.geometry = geometry
        this.gl = gl
        this.scene = scene
        this.index = index
        this.sizes = sizes
        this.extra = {
            x: 0,
            y: 0
        }

        this.createTexture()
        this.createProgram()
        this.createMesh()
    }
    createTexture(){
        const imagz = this.element;
        this.texture = window.TEXTURES[imagz.getAttribute('data-src')];

        // console.log(this.element)
        // this.texture = new Texture(this.gl)
        // this.image = new window.Image()
        // this.image.crossOrigin = 'anonymous'
        // this.image.src = this.element.getAttribute('data-src')
        // this.image.onload = _ => (this.texture.image = this.image)
        
    }
    createProgram(){
        this.program = new Program(
            this.gl,{
            vertex,
            fragment,
            uniforms:{
                uAlpha: {value: 0},
                tMap: {value: this.texture}
            }
        })
    }
    createMesh(){
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })
        
        this.mesh.setParent(this.scene)
        
        this.mesh.rotation.z = GSAP.utils.random(-Math.PI*0.01, Math.PI*0.01)

    }

    createBound({sizes}){
        this.sizes = sizes
        this.bounds = this.element.getBoundingClientRect()
        
        this.updateScale()
        this.updateX()
        this.updateY()

    }

    show(){
        GSAP.fromTo(this.program.uniforms.uAlpha, {
            value:0
        },{
            value:1
        })
    }

    hide(){

        GSAP.to(this.program.uniforms.uAlpha,{
            value:0
        })
    }


    onResize(sizes,scroll){
        this.extra = {
            x: 0,
            y: 0
        }
        this.createBound(sizes)
        this.updateX(scroll ? scroll.x : 0 )
        this.updateY(scroll ? scroll.y : 0 )
    }
    
    updateScale(){
        this.width = this.bounds.width / window.innerWidth;
        this.height = this.bounds.height / window.innerHeight;

        this.mesh.scale.x = this.sizes.width * this.width;
        this.mesh.scale.y = this.sizes.height * this.height;

    }
    updateX(x = 0){

        this.x = (this.bounds.left + x) / window.innerWidth;
        this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x  * this.sizes.width) + this.extra.x; // prettier-ignore
    
    }
    updateY(y = 0){
        this.y = (this.bounds.top + y) / window.innerHeight;
        this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height) +this.extra.y ;
    }
    update(scroll){
        if(!this.bounds) return
        this.updateX(scroll.x)
        this.updateY(scroll.y)
        
    }

}
// updateY(Y=0){
    // const extra = Detection.isPhone() ? 20 : 40

    // 40-40 => extra-extra
// }