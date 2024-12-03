
# node-red-contrib-jsmarty

Un nœud Node-RED pour le rendu des templates Smarty via le moteur de templating **JSmarty**.
[![Node-RED](https://img.shields.io/badge/Node--RED-Module-red)](https://flows.nodered.org)

## Installation

### Depuis npm
```bash
npm install node-red-contrib-jsmarty
```

## Fonctionnalités

- Supporte les templates Smarty pour générer du contenu dynamique.
- Sources multiples pour les templates :
  - **`msg.payload`** : Template fourni directement via `msg.payload`.
  - **`msg.template`** : Chemin vers un fichier `.tpl` configuré dans `msg.template`.
  - **Éditeur de nœud** : Template statique défini dans l'éditeur.

- Accès complet à toutes les propriétés de `msg` dans les templates.

---

## Usage

### Exemple avec Node-RED

1. Ajoutez un nœud **Function** avec ce contenu :
   ```javascript
   msg.payload = "<h1>{$title}</h1><ul>{foreach $cities as $city}<li>{$city.name} ({$city.population})</li>{/foreach}</ul>";
   msg.title = "City List";
   msg.cities = [
       { name: "Paris", population: 2148327 },
       { name: "London", population: 8982000 },
       { name: "New York", population: 8175133 }
   ];
   return msg;
   ```

2. Ajoutez un nœud **JSmarty** avec l'éditeur contenant ce template :
   ```smarty
   <h1>{$title}</h1>
   <ul>
       {foreach $cities as $city}
           <li>{$city.name} ({$city.population})</li>
       {/foreach}
   </ul>
   ```

3. Reliez un nœud **Debug** pour afficher la sortie.

---

## API

### Propriétés supportées

- **`msg.payload`** : Utilisé comme source principale pour le template.
- **`msg.template`** : Chemin d'un fichier `.tpl` (relatif ou absolu).
- **`msg` complet** : Toutes les propriétés de `msg` sont accessibles dans le template.

### Priorité

1. Template dans `msg.payload`.
2. Template dans `msg.template` (via fichier).
3. Template statique défini dans l'éditeur.

---

## Contribuer

Les contributions sont les bienvenues ! Si vous trouvez un bug ou souhaitez proposer une fonctionnalité, ouvrez une issue ou un pull request sur [GitHub](https://github.com/Meloman-zz/node-red-contrib-jsmarty).

---

## Licence

MIT © 2024 Cédric Barthe
