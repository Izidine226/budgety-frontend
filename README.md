# Budgety - Application de Gestion de Budget 

**[Voir l'application en ligne](https://budgety-backend-bwnc-git-main-izidine226s-projects.vercel.app/)**

Budgety est une application web full-stack (MERN) conçue pour aider les étudiants à suivre leurs revenus et leurs dépenses de manière simple et intuitive. Ce projet m'a permis de mettre en pratique l'ensemble du cycle de développement d'une application moderne, de la conception de l'API à son déploiement.

---

### Aperçu de l'application


<img width="657" height="882" alt="Capture d’écran 2025-10-17 151215" src="https://github.com/user-attachments/assets/117ee124-dc6e-4db4-80af-caecf70214fc" />


---

### Fonctionnalités

* **Authentification sécurisée :** Inscription et connexion des utilisateurs avec des tokens JWT.
* **Gestion des Transactions (CRUD) :**
    * **Ajouter** des revenus ou des dépenses.
    * **Afficher** la liste de toutes les transactions.
    * **Supprimer** une transaction.
* **Tableau de Bord Dynamique :** Calcul et affichage en temps réel du solde, des revenus et des dépenses totaux.
* **Routes Protégées :** Seuls les utilisateurs connectés peuvent accéder à leur tableau de bord et à leurs données.


---

### Stack Technique

* **Front-End :** React.js, Vite, React Router, Axios
* **Back-End :** Node.js, Express.js
* **Base de Données :** MongoDB (avec Mongoose)
* **Authentification :** JSON Web Tokens (JWT), bcrypt.js
* **Déploiement :**
    * Front-end sur **Vercel**
    * Back-end sur **Railway**

---

### Pour lancer le projet en local

1.  Clonez le dépôt : `git clone https://github.com/VOTRE_PSEUDO/budgety-frontend.git`
2.  Installez les dépendances : `npm install`
3.  Lancez le serveur : `npm run dev`
    *(N'oubliez pas de lancer le serveur back-end en parallèle.)*
