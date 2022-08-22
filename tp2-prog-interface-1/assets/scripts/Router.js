// import { showDetail } from './Task'

export default class Router {
    constructor(){
        // this._el = el;
        this.init();
    }
    init(){
        /**
         * Comportemente de chargement de la page
         */
        let id = this.getIdInHash('tache');
        if(id){

            showDetail(id);

        // this._el.querySelector(`option[value="${id}"]`).selected = true;
        // let elOptions = this._el.querySelector('option');
  

        /* for (let i = 0; i < elOptions.length; i++) {
                    if(elOptions[i].value == id) elOptions[i].selected = true
                    
                } 
        */         
       } 

        /**
         * Comportement suite a l'evenement hashchange
         */
        window.addEventListener('hashchange', function(){

            let id = this.getIdInHash('tache');
            showDetail(id);
    
        }.bind(this))

        /**
         * Comportement suite a l'evenement change du select
         */

        this._el.addEventListener('change', function(){
            let id = this._el.value;
            this.injectLocation('tache', id);
        }.bind(this))
    }

    // injectLocation(slug, id){
    //     window.location = `#!/${slug}/${id}`;
    // }

    // getIdInHash(slug) {
    //     let hash = window.location.hash,
    //         hashInArray = hash.split(`#!/${slug}/`),
    //         id = hashInArray[1];

    //     return id;
    // }
}