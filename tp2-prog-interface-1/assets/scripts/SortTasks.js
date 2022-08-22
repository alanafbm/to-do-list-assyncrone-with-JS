 import Form from "./Form.js";
export default class SortTasks extends Form  {
    constructor(el) {
        super();
        this._el = el;
        // this._elBtnsSort = this._el.querySelectorAll('[data-js-sort]');
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        // console.log(this._elToDoList);
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
        // this._elToDoList.sort(function(a, b) {
        //     if (a[column] < b[column]) { return -1; }
        //     if (a[column] > b[column]) { return 1; }
        //     return 0;
        // }.bind(this));
        // trierPar

        // Réinjecte les tâches dans l'ordre

        // console.log(column);
        
        let encodedTrier = encodeURIComponent(column)
        fetch(`requetes/requetesAsync.php?ordre=${encodedTrier}`)
            .then(function (response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function (data) {
                console.log(data);
                this._elToDoList.innerHTML = '';
                this.templateSort(data);
                
            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });

     
    }

    templateSort(data){
         for (let i = 0, l = data.length; i < l; i++) {
            console.log('boucle for');
            let { id, importance, tache } = JSON.parse(data)[i];
            this.createTask(id, tache, importance);
            console.log('after create');
         }

    }
}