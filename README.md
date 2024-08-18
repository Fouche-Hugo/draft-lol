# League of Legends Draft

## English

This web application allows you to create League of Legends drafts and easily share them with links and screenshots.

### Features

Create League of Legends drafts by selecting champions for each team.
Share your drafts with unique links that can be copied and pasted.
Take screenshots of your drafts to share on social media or save for later as links.

### Technologies Used
- JavaScript
- npm
- Svelte

### Demo
You can access a demo of the application by following this link: [https://draft-lol.fouche-hugo.fr](https://draft-lol.fouche-hugo.fr)

### Dev
1. Clone the repository
```bash
git clone https://github.com/Fouche-Hugo/draft-lol.git
```
2. Launch the app
```bash
npm install
npm run dev
```
3. You should now be able to use the app at http://localhost:5173/.

#### Update the file champions.json
When a new champion is released or an existing one is reworked, we need to update the file `src/data/champions.json` and the images in `public/champions`.
To do so, make sure `python` and the `requests` package are installed
```bash
pip install requests
```

Then, you can run the `update_champs.py` script which will :
- get the current League of Legends version
- download the most recent dragontail archive
- extract images and update the `champions.json` file

```python
python update_champs.py
```
## French

Cette application web vous permet de créer des drafts de League of Legends et de les partager facilement avec des liens et des captures d'écran.

### Fonctionnalités

Créez des drafts de League of Legends en sélectionnant des champions pour chaque équipe.
Partagez vos drafts avec des liens uniques qui peuvent être copiés et collés.
Prenez des captures d'écran de vos drafts pour les partager sur les réseaux sociaux ou les enregistrer pour plus tard sous forme de liens.

### Technologies utilisées
- JavaScript
- npm
- Svelte

### Démo
Vous pouvez accéder à une démonstration de l'application en suivant ce lien : [https://draft-lol.fouche-hugo.fr](https://draft-lol.fouche-hugo.fr)

