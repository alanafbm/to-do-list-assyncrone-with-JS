class App {

    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {int} index 
     */
     createTask(id, tache, importance) {
         console.log(tache);

        let newTaskDom = `
                        <div data-js-task=${id}>
                            <p>
                                <span>
                                    <small>Tâche danilo: </small>${tache}
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