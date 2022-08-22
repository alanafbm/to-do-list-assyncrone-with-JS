import Task from "./Task.js";
export default class Form  {
    constructor(el) {
        // super();
        this._el = el;
        this._elInputTask = '';
        this._elInputDescription = '';
        this._elImportance = '';
        this._elTaskDetail = '';
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        const _elBouton = document.querySelector('[data-js-btn]');
        _elBouton.addEventListener('click', function (e) {
            e.preventDefault();
            /* Si valide */
            let estValide = this.validForm();
            if (estValide) {
                this.afficheTache();


            }
        }.bind(this));

        const btnsDelete = this._elToDoList.querySelectorAll('[data-js-delete]');
        btnsDelete.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const div = e.target.parentNode.parentNode
                this.deleteTache(div);
            }.bind(this))
        }.bind(this));

        const btnsDetail = this._elToDoList.querySelectorAll('[data-js-show-detail]');
        btnsDetail.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const id = e.target.parentNode.parentNode.getAttribute('data-js-task');
                console.log(e.target.parentNode);
                this.injectLocation('tache', id);
                this.showDetails()
            }.bind(this))
        }.bind(this));
    }

    showDetails() {
        /**
         * Comportement suite a l'evenement hashchange
         */
        window.addEventListener('hashchange', function () {

            // this._elInputTask = this._el.task.value;
            // this._elInputDescription = this._el.description.value;
            // this._elImportance = this._el.importance.value;
            console.log(this._elToDoList);

            let id = this.getIdInHash('tache');
            console.log(id);
            let encodedId = encodeURIComponent(id);
                        
            fetch(`requetes/requetesAsync.php?id=${encodedId}`)
                .then(function (response) {
                    if (response.ok) return response.text();
                    else throw new Error('La réponse n\'est pas OK');
                })
                .then(function (data) {
                    console.log(data.length);
                    let dt = data.split(':');
                
                    this.templateDetails(data)
                   
                }.bind(this))
                .catch(function (error) {
                    console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
                })

        }.bind(this))
    }

    injectLocation(slug, id) {
        window.location = `#!/${slug}/${id}`;
    }

    getIdInHash(slug) {
        let hash = window.location.hash,
            hashInArray = hash.split(`#!/${slug}/`),
            id = hashInArray[1];

        return id;
    }

    templateDetails(data){

        // console.log(JSON.parse(data)[0].description);
        let { description, importance, tache } = JSON.parse(data)[0];
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');
        // console.log(task);
        // console.log(description);
        // console.log(importance);
        let desc = 'Aucune description disponible.';
        if (description === '') description = desc;

        let elDetailDom = `
                    <div class="detail__info">
                        <p><small>Tâche : </small>${tache}</p>
                        <p><small>Description : </small>${description}</p>
                        <p><small>Importance : </small>${importance}</p>
                    </div>`;

        this._elTaskDetail.innerHTML = elDetailDom;
    }

    /**
     * Delete tache assyncrone
     * @param {*} div 
     */
    deleteTache(div) {
        const id = div.getAttribute('data-js-task')
        console.log(div);
        const encodedId = encodeURIComponent(id)
        const myInit = {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'action=deleteTache' + '&id=' + encodedId
        };

        fetch('requetes/requetesAsync.php', myInit)
            .then(function (response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function () {
                div.remove()
            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });
    }


    // handleEventListener(btns, fn){
    //     btns.forEach(btn => {
    //         btn.addEventListener('click', fn)
    //     });
    // }

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

    /**
     * Methode assyncrone pour l'affichage des taches
     */
    afficheTache() {
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
            .then(function (response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function (data) {
                let id = data,
                    tache = encodedTask,
                    importance = encodedImportance;
                this.createTask(id, tache, importance);
                this._el.reset();
            }.bind(this))
            .catch(function (error) {
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

 
}