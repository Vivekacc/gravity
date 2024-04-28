import {Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl'

import Home from './Home'
import About from './About'
import Collections from './Collections'
// import Detail from './Detail'
export default class Canvas  {

    constructor({template}){

        this.template = template

        this.x = {
            start: 0,
            distance: 0,
            end: 0,
          };
      
          this.y = {
            start: 0,
            distance: 0,
            end: 0,
          };


        this.createRender()
        this.createCamera()
        this.createScene()

        this.onResize()

        // this.onChangeEnd(this.template)
       
        }

    createRender(){
    this.renderer = new Renderer(
        {
            alpha:true,
            antialias:true,

        }
    )
    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
    }

    createCamera(){
        this.camera = new Camera(this.gl)
        this.camera.position.z = 5
    }

    createScene(){
        this.scene = new Transform()
    }

    createHome(){
        this.home = new Home({
           gl: this.gl,
           scene:this.scene,
           sizes: this.sizes
        })
    }

    destroyHome(){
        if (!this.home) return
        this.home.destroy()
        this.home = null
    }

    createAbout(){
        this.about = new About({
            gl: this.gl,
            scene:this.scene,
            sizes: this.sizes
        })
    }

    destroyAbout(){
        if (!this.about) return
        this.about.destroy()
        this.about = null
    }

    createCollections(){
        this.collections = new Collections({
            gl: this.gl,
            scene:this.scene,
            sizes: this.sizes
        })
    }

    destroyCollections(){
        if (!this.collections) return
        this.collections.destroy()
        this.collections = null
    }

    onPreloaded(){
        this.onChangeEnd(this.template)
        
    }

    onChangeSart(){
        if (this.home){
            this.home.hide()
        }

        if (this.about){
            this.about.hide()
        }

        if (this.collections){
            this.collections.hide()
        }

        // if (this.detail){
        //     this.detail.hide()
        // }
    }

    onChangeEnd(template){

        if (template === 'home'){
            this.createHome()
        } else {
            this.destroyHome()
        }

        if (template === 'about'){
            this.createAbout()
        } else {
            this.destroyAbout()
        }


        if (template === 'collections'){
            // this.gl.canvas.style.zIndex = 1000
            this.createCollections()
        } else if (this.collections){
            // this.gl.canvas.style.zIndex = ''
            this.destroyCollections()
        }

        // if (template === 'detail'){
        //     this.createDetail()
        // } else if (this.detail){
            // this.destroyDetail()
        // }   
    }

    onResize(){
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.camera.perspective({
            aspect: window.innerWidth/window.innerHeight
        })

        const fov = this.camera.fov * (Math.PI / 180)
        const height = 2 * Math.tan(fov/2) * this.camera.position.z
        const width =  height * this.camera.aspect

        this.sizes = {
            height,
            width
        }

        
        const value = {
            sizes: this.sizes,
        }


        if (this.home){
            this.home.onResize(value)
        }

        if (this.about){
            this.about.onResize(value)
        }

        if (this.collections){
            this.collections.onResize(value)
        }   

        // if (this.detail){
        //     this.detail.onResize(value)
        // }   
    }

    
    onTouchDown(e) {
        this.isDown = true

        this.x.start = e.touches ? e.touches[0].clientX : e.clientX;
        this.y.start = e.touches ? e.touches[0].clientY : e.clientY;

        
        const value = {
            x: this.x,
            y: this.y,
        }

    
        if (this.home) {
          this.home.onTouchDown(value)
      }

        if (this.about) {
            this.about.onTouchDown(value)

    }

    if (this.collections) {
        this.collections.onTouchDown(value)
    }

    
    if (this.detail){
        this.detail.onTouchDown(value)
    }  
}
    
// ---------------------------------------------------------------------------------------------------

      onTouchMove(e) {
        if (!this.isDown) return

        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
    
        this.x.end = x;
        this.y.end = y;

        
        // this.x.distance = x.start - x.end;
        // this.y.distance = y.start - y.end;
        
        const value = {
            x: this.x,
            y: this.y,
        }


        if (this.home) {
            this.home.onTouchMove(value)
      }
      
        if (this.about) {
            this.about.onTouchMove(value)
    }

        if (this.collections) {
            this.collections.onTouchMove(value)
        }

        
        // if (this.detail){
        //     this.detail.onTouchMove(value)
        // }  
}


//--------------------------------------------------------------------------------------------------------------------- 

    onTouchUp(e) {
        this.isDown = false

        const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

        this.x.end = x;
        this.y.end = y;

        // this.x.distance = x.start - x.end;
        // this.y.distance = y.start - y.end;
        
        const value = {
            x: this.x,
            y: this.y,
        }


        if (this.home) {
            this.home.onTouchUp(value)
      }

      if (this.about) {
        this.about.onTouchUp(value) 
    }

    if (this.collections) {
        this.collections.onTouchUp(value)
    }

    
    // if (this.detail){
    //     this.detail.onTouchUp(value)
    // }  
}
    onWheel(e){
        if (this.home) {
            this.home.onWheel(e)
        }
    }

    update(scroll){

        if (this.home) {
            this.home.update()
        }

        if (this.about) {
            this.about.update(scroll)
        }

        if (this.collections) {
            this.collections.update(scroll)
        }

        
        // if (this.detail){
        //     this.detail.update(value)
        // }  

        this.renderer.render({
            camera:this.camera,
            scene:this.scene,
        })
    }


}