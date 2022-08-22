// import Form from "./Form.js";
export default class SortTasks  {
    constructor(el) {
        // super();
        this._el = el;
        // this._elBtnsSort = this._el.querySelectorAll('[data-js-sort]');
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        // console.log(this._el);
        // console.log(this._elToDoList);
        const _elBtnsSort = this._el.querySelectorAll('[data-js-sort]');
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
        console.log(column);
        toDoList.sort(function(a, b) {
            if (a[column] < b[column]) { return -1; }
            if (a[column] > b[column]) { return 1; }
            return 0;
        });
        // trierPar

        // Réinjecte les tâches dans l'ordre

        let encodedTrier = encodeURIComponent(column)
        let myInit = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'action=trier' //+ '&trierpar=' + encodedTrier
        };

        fetch(`requetes/requetesAsync.php`, myInit)
            .then(function (response) {
                console.log(response);
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function (data) {
                this._elToDoList.innerHTML = '';
                for (let i = 0, l = toDoList.length; i < l; i++) {
                    this.createTask(i);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });

     
    }
}