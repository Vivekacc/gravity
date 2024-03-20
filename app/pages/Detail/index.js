import Button from '/app/classes/Button';
import Page from '/app/classes/Page';

export default class Detail extends Page {
    constructor() {
        super({
            id: 'detail',
            element: '.detail',
            elements: {
                Button : '.detail__button'
            }
        })
    }

    create(){
        super.create()
        this.link = new Button({
            element : this.elements.Button
        })
    }

    destroy(){
        super.destroy()
        this.link.removeEventListeners()
    }
}