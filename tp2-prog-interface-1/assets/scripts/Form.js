class Form extends App {
    constructor(el) {
        super();
        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elImportance = this._el.importance;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            let estValide = this.validForm();
            if (estValide) {
                // this.addTask();
                this.afficheTache();
                this._el.reset();
            }
        }.bind(this));
    }


    afficheTache(){
        let encodedTask = encodeURIComponent(this._elInputTask.value),
            encodedDescription = encodeURIComponent(this._elInputDescription.value),
            encodedImportance = encodeURIComponent(this._elImportance.value)

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
               
            }.bind(this))
            .catch(function(error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });            
    };

    /**
     * Validation du formualaire
     * @returns 
     */
    validForm() {

        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTask.value == '') {
            this._elInputTask.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTask.parentNode.classList.contains('error')) this._elInputTask.parentNode.classList.remove('error');
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


    /**
     * Ajoute la tâche au tableau toDoList et appelle la méthode pour injecter la nouvelle tâche
     */
    addTask() {
        // let task = {
           const tache = this._elInputTask.value,
                 description = this._elInputDescription.value,
                 importance = this._el.querySelector('input[name="importance"]:checked').value
        // }

        // toDoList.push(task);

        // Injecte la tâche
        // this.createTask(task.tache, task.description, task.importance);
    }
}