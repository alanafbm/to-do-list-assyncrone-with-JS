export default class Detail {
    constructor(el) {
        this._el = el;
        this._elChevron = document.querySelector('[data-js-chevron]');
        this._elBtnShowDetail = document.querySelector('[data-js-show-detail]');
        this._elBtnDelete = document.querySelector('[data-js-delete]');
        this._elToDoList = document.querySelector('[data-js-tasks]');
        this._elChevron = document.querySelector('[data-js-chevron]');
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBtnShowDetail.addEventListener('click', this.showDetails.bind(this));
        window.addEventListener('hashchange', this.showDetails.bind(this));
        this._elChevron.addEventListener('click', this.showHideDetail.bind(this));
    }


    /**
     * Ouvre / ferme l'accordéon de la section détail d'une tâche
     */
    showHideDetail() {
        if (this._el.classList.contains('detail--ferme')) {
            this._el.classList.replace('detail--ferme', 'detail--ouvert');
            this._elChevron.classList.replace('chevron--bottom', 'chevron--top');
        } else {
            this._el.classList.replace('detail--ouvert', 'detail--ferme');
            this._elChevron.classList.replace('chevron--top', 'chevron--bottom');
        }
    }

    showDetails() {
        console.log('entrou details');
        let id = this.getIdInHash('tache');
        let encodedId = encodeURIComponent(id);

        fetch(`requetes/requetesAsync.php?id=${encodedId}`)
            .then(function (response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function (data) {
                this._elTaskDetail.innerHTML = '';
                if (data.length > 0) {
                    let { description, importance, tache } = JSON.parse(data)[0];
                    let desc = 'Aucune description disponible.';
                    if (description === '') description = desc;
                    let infos = {
                        description,
                        tache,
                        importance
                    }

                    let elTaskDetailTemplate = document.querySelector('[data-js-task-detail-template]');
                    let elCloneDetailTemplate = elTaskDetailTemplate.cloneNode(true);

                    for (const key in infos) {
                        let regExp = new RegExp('{{' + key + '}}', 'g');
                        elCloneDetailTemplate.innerHTML = elCloneDetailTemplate.innerHTML.replace(regExp, infos[key]);
                    }

                    let elDetailTemplate = document.importNode(elCloneDetailTemplate.content, true);
                    this._elTaskDetail.append(elDetailTemplate);

                } else {
                    this._elTaskDetail.innerHTML = '';

                    let domain = location.pathname;
                    history.replaceState('Accueil', null, domain)
                    //replaceState vers l'accueil
                }

            }.bind(this))
            .catch(function (error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            })

    }

    getIdInHash(slug) {
        let hash = window.location.hash,
            hashInArray = hash.split(`#!/${slug}/`),
            id = hashInArray[1];

        return id;
    }

}