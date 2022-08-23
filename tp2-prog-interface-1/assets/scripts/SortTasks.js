 import Form from "./Form.js";
export default class SortTasks extends Form  {
    constructor(el) {
        super();
        this._el = el;
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        const _elBtnsSort = document.querySelectorAll('[data-js-sort]');
        for (let i = 0, l = _elBtnsSort.length; i < l; i++) {
            _elBtnsSort[i].addEventListener('click', function(e) {
                let ordre = e.target.dataset.jsSort;
                this.sort(ordre);
            }.bind(this));
        }

        
    }

    /**
     * Réordonne le tableau toDoList et appelle la méthode pour injecter les tâches mises à jour
     * @param {string} column 
     */
    sort(column) {

        // Réinjecte les tâches dans l'ordre

        let encodedTrier = encodeURIComponent(column)
        fetch(`requetes/requetesAsync.php?ordre=${encodedTrier}`)
            .then(function (response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function (data) {
                if (data.length > 0){
                    this._elToDoList.innerHTML = '';
                    for (let i = 0, l = data.length; i < l; i++) {
                        let { id, importance, tache } = JSON.parse(data)[i];
                        this.createTask(id, tache, importance);
                    }
                }else{
                    let domain = location.pathname;
                    history.replaceState('Accueil', null, domain)
                }
            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });

     
    }

   
}