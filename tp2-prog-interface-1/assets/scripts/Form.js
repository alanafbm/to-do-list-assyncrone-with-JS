import Detail from './Detail.js'
export default class Form  {
    constructor(el) {
        // super();
        this._el = el;
        this._elInputTask = '';
        this._elInputDescription = '';
        this._elImportance = '';
        this._elTaskDetail = '';
        this._elInputImportance = document.querySelectorAll('input[name="importance"]');
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

        this.getBtnsDeleteListener();

        this.getBtnsDetailListener();
    }

    /**
     * Comportements button listener delete
     */
    getBtnsDeleteListener() {
        const btnsDelete = this._elToDoList.querySelectorAll('[data-js-delete]');
        btnsDelete.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const div = e.target.parentNode.parentNode
                this.deleteTache(div);
            }.bind(this))
        }.bind(this));
    }

    /**
     * Comportements button listener details
     */
    getBtnsDetailListener() {
        const btnsDetail = this._elToDoList.querySelectorAll('[data-js-show-detail]');
        btnsDetail.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();

                const id = e.target.parentNode.parentNode.getAttribute('data-js-task');
                this.injectLocation('tache', id);
            }.bind(this))
        }.bind(this));
    }
  /**
     * Delete tache assyncrone
     * @param {*} div 
     */
    deleteTache(div) {
        const id = div.getAttribute('data-js-task')
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
                else throw new Error('La r??ponse n\'est pas OK');
            })
            .then(function () {
                div.remove()
            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un probl??me avec l'op??ration fetch: ${error.message}`);
            });
    }

    injectLocation(slug, id) {
        window.location = `#!/${slug}/${id}`;
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

        /* Input 'Nouvelle t??che' */
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
                if (response.ok) return response.json();
                else throw new Error('La r??ponse n\'est pas OK');
            })
            .then(function (data) {
                let infos = {
                    id: data,
                    tache: encodedTask,
                    importance: encodedImportance
                }

                let elTaskTemplate = document.querySelector('[data-js-task-template]');
                let elCloneTemplate = elTaskTemplate.cloneNode(true);

                for (const key in infos) {
                    let regExp = new RegExp('{{' + key + '}}', 'g');
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regExp, infos[key]);
                }

                let elTemplate = document.importNode(elCloneTemplate.content, true);
                this._elToDoList.append(elTemplate);

                this._el.reset();
                new Detail();
                this.getBtnsDeleteListener();
                this.getBtnsDetailListener();
                return


            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un probl??me avec l'op??ration fetch: ${error.message}`);
            });
    };



}