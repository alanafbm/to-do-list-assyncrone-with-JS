import Form from './Form.js'
import SortTasks from './SortTasks.js'
import Detail from './Detail.js'

(function() {
    let elForms = document.querySelectorAll('[data-js-form]'),
        elSortTasks = document.querySelectorAll('[data-js-sort-tasks]'),
        elDetails = document.querySelectorAll('[data-js-section-detail]');
        
    for (let i = 0, l = elForms.length; i < l; i++) {
        new Form(elForms[i]);
    }

    for (let i = 0, l = elSortTasks.length; i < l; i++) {
        new SortTasks(elSortTasks[i]);
    }

    for (let i = 0, l = elDetails.length; i < l; i++) {
        new Detail(elDetails[i]);
    }
})(); 