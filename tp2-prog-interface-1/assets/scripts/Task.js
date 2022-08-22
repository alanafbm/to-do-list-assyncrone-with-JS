// // import App from "./App.js";
// export default class Task {
//     constructor(el) {
//         this._el = el;
//         this._el = document.querySelector('[data-js-tasks]');
//         this._index = "";
//         this._elBtnShowDetail = this._el.querySelector('[data-js-show-detail]');
//         this._elBtnDelete = this._el.querySelector('[data-js-delete]');
//         this._elToDoList = this._el.closest('[data-js-tasks]');
//         this._elTaskDetail = document.querySelector('[data-js-task-detail]');
//         this.toDoList = [];
//         this.init();
//     }


//     /**
//      * Initialise les comportements
//      */
//     init() {
        
//         this._elBtnShowDetail.addEventListener('click', this.showDetail.bind(this));
//         this._elBtnDelete.addEventListener('click', this.delete.bind(this));
//     }


    // /**
    //  * Affiche le détail d'une tâche
    //  */
    // showDetail(id) {
    //     /* Cas description */
    //     console.log('entrei');
    //     let description = 'Aucune description disponible.';
    //     if (toDoList[this._index].description != '') description = toDoList[this._index].description;

    //     let elDetailDom = `
    //                 <div class="detail__info">
    //                     <p><small>Tâche : </small>${toDoList[this._index].tache}</p>
    //                     <p><small>Description : </small>${description}</p>
    //                     <p><small>Importance : </small>${toDoList[this._index].importance}</p>
    //                 </div>`;

    //     this._elTaskDetail.innerHTML = elDetailDom;


        
    //     let encodedId = encodeURIComponent(id);

    //     fetch(`requetes/requetesAsync.php?id=${encodedId}`)
    //         .then (function(response) {
    //             if (response.ok) return response.json();
    //             else throw new Error('La réponse n\'est pas OK');
    //         })
    //         .then (function(data) {

    //             let elDetail = document.querySelector('[data-js-task-detail]');

    //             if (elDetail) {
    //                 elDetail.classList.add('hidden');

    //                 /**
    //                  * Écoute l'événement 'transitionend' avant de lancer l'injection du nouvel élément
    //                  */
    //                 elPlayersList.addEventListener('transitionend', function(e) {
    //                     //console.log('Transition ended');

    //                     // https://stackoverflow.com/questions/18689031/transitionend-event-fires-twice
    //                     if (e.propertyName == 'opacity') { 
    //                         elPlayersList.remove();
    //                         this.showTeamPlayers(data);
    //                     }
    //                 }.bind(this));
    //             } else {
    //                 this.showTeamPlayers(data);
    //             }
    //         }.bind(this))
    //         .catch (function(error) {
    //             console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
    //         });
    
    // }    
// }