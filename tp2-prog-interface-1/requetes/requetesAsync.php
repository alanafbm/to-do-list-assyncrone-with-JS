<?php
    require_once __DIR__ . '/../requetes/fonctionsDB.php';

    $action = '';

    if (isset($_POST['action'])) {
        $action = $_POST['action'];
    }

    switch ($action) {
        
        case 'getAllTaches':
            
            return getAllTaches();

            break;

        case 'addTache':

            if (isset($_POST['tache']) && isset($_POST['description']) && isset($_POST['importance'])) {

                $tache = htmlspecialchars($_POST['tache']);
                $description = htmlspecialchars($_POST['description']);
                $importance = htmlspecialchars($_POST['importance']);

                $return_id = addTache($tache, $description, $importance);

                echo $return_id;
            
            } else {
                echo 'Erreur query string';
            }

            break;

        case 'deleteTache':
            
            if (isset($_POST['id'])) {

                $id = htmlspecialchars($_POST['id']);
                
                deleteTache($id);
            } else {
                echo 'Erreur query string';
            }
            break;
    }




?>