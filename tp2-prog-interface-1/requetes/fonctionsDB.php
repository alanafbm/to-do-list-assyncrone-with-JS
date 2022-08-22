<?php
	$connexion = connectDB();
	
	function connectDB() {
		define('DB_HOST', 'localhost');
		define('DB_USER', 'root');
		//define('DB_PASSWORD', 'root');			// MAC
		define('DB_PASSWORD', '');			// Windows

		$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}
		
		$selected = mysqli_select_db($laConnexion, 'to-do-list');

		if (!$selected) {
			die('La base de données n\'existe pas.');
		}
		
		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}
	

	/**
	 * On recoit une requete sql, on l'execute et retourne le resultat.
	 * Si $last est true, on retourne plutot l'id du dernier item inseré.
	 * @param $requete
	 * @param false $last
	 * @return bool|int|mysqli_result|string
	 */
	function executeRequete($requete, $last = false) {
		global $connexion;
		if ($last) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}
	
	function getAllTaches() {
		return executeRequete("SELECT * FROM taches");		
	}

	function addTache($tache, $description, $importance) {
		return executeRequete("INSERT INTO taches (id, tache, description, importance) 
							   VALUES (NULL,'$tache', '$description', '$importance')", true); 		// On veut le dernier id inseré
	}

	function deleteTache($id) {
		return executeRequete("DELETE FROM taches WHERE id = '$id'");
	}

	function showDetail($id) {
		return executeRequete("SELECT tache, description, importance FROM taches WHERE id = $id");
	}

	function trierPar($trierpar) {
		return executeRequete("SELECT * FROM taches ORDER BY importance ASC");
	}
?>