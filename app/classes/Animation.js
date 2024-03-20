import Component from "/app/classes/Component"

export default class Animation extends Component {
    constructor ({ element,elements }) {
       super({
        element,
        elements
       }) 
        
       this.createObserver()
       
       this.animateOut()
    }

    createObserver(){
        this.observer = new window.IntersectionObserver((entries) => {

            entries.forEach(entry => {
                if (entry.isIntersecting){
                    // console.log("IN")
                    this.animateIn()
                }
                else{
                    // console.log("OUT")
                    this.animateOut()
                }
            })

        })
        this.observer.observe(this.element)
    }

    animateIn () {

    }

    animateOut () {

    }

    onResize(){
        
    }

}