import Task from "./Task.js";
export default class Form {
    constructor(el) {
        this._el = el;
        this._elInputTask = '';
        this._elInputDescription = '';
        this._elImportance =  '';
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        const _elBouton = document.querySelector('[data-js-btn]');
        _elBouton.addEventListener('click', function(e) {
            e.preventDefault();
            /* Si valide */
            let estValide = this.validForm();
            if (estValide) {
                this.afficheTache();
              
                
            }
        }.bind(this));
    }


    /**
     * Validation du formualaire
     * @returns 
     */
    validForm() {
        this._elInputTask = this._el.task.value;
        this._elInputDescription = this._el.description.value;
        this._elImportance = this._el.importance.value;

        let estValide = true;
        /* Input 'Nouvelle tâche' */
        if (this._el.task.value === '') {
            this._el.task.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._el.task.parentNode.classList.contains('error')) this._el.task.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            
            if (this._elInputImportance[0].parentNode.classList.contains('error')) this._elInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }


    afficheTache(){
        this._elInputTask = this._el.task.value;
        this._elInputDescription = this._el.description.value;
        this._elImportance = this._el.importance.value;
        let encodedTask = encodeURIComponent(this._elInputTask),
            encodedDescription = encodeURIComponent(this._elInputDescription),
            encodedImportance = encodeURIComponent(this._elImportance)
        let myInit = { 
            method: 'post',
            headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'action=addTache' + '&tache=' + encodedTask + 
                '&description=' + encodedDescription + '&importance=' + encodedImportance
        };

        fetch('requetes/requetesAsync.php', myInit)
            .then(function(response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function(data) {
                let id = data,
                    tache = encodedTask,
                    importance = encodedImportance;
                this.createTask(id, tache, importance);   
                this._el.reset();
            }.bind(this))
            .catch(function(error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });            
    };

    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {int} index 
     */
     createTask(id, tache, importance) {

        let newTaskDom = `
                        <div data-js-task=${id}>
                            <p>
                                <span>
                                    <small>Tâche : </small>${tache}
                                </span>
                                -
                                <span>
                                    <small>Importance : </small>${importance}
                                </span>
                                <button data-js-show-detail>Afficher le détail</button>
                                <button data-js-delete>Supprimer</button>
                            </p>
                        </div> `;

    this._elToDoList.insertAdjacentHTML('beforeend', newTaskDom);

    new Task(this._elToDoList.lastElementChild);        
    } 

    // /**
    //  * Ajoute la tâche au tableau toDoList et appelle la méthode pour injecter la nouvelle tâche
    //  */
    // addTask() {
    //     // let task = {
    //        const tache = this._elInputTask.value,
    //              description = this._elInputDescription.value,
    //              importance = this._el.querySelector('input[name="importance"]:checked').value
    //     // }

    //     // toDoList.push(task);

    //     // Injecte la tâche
    //     // this.createTask(task.tache, task.description, task.importance);
    // }
}