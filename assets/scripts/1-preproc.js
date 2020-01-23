"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier CSV.
 */


/**
 * Précise le domaine en associant un nom de rue à une couleur précise.
 *
 * @param color   Échelle de 10 couleurs.
 * @param data    Données provenant du fichier CSV.
 */
function domainColor(color, data) {
  // TODO: Définir le domaine de la variable "color" en associant un nom de rue à une couleur.
  var rues = Object.keys(data[0]);
  color.domain(rues);
  // console.log(rues);
}

/**
 * Convertit les dates se trouvant dans le fichier CSV en objet de type Date.
 *
 * @param data    Données provenant du fichier CSV.
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function parseDate(data) {
  // TODO: Convertir les dates du fichier CSV en objet de type Date.
  var parser = d3.timeParse("%d/%m/%Y"); //J ai trouvé ça la dessus http://learnjsdata.com/time.html
  for (var i = 0; i<data.length; i++) {
      data[i].Date = parser(data[i].Date);
  }
}

/**
 * Trie les données par nom de rue puis par date.
 *
 * @param color     Échelle de 10 couleurs (son domaine contient les noms de rues).
 * @param data      Données provenant du fichier CSV.
 *
 * @return Array    Les données triées qui seront utilisées pour générer les graphiques.
 *                  L'élément retourné doit être un tableau d'objets comptant 10 entrées, une pour chaque rue
 *                  et une pour la moyenne. L'objet retourné doit être de la forme suivante:
 *
 *                  [
 *                    {
 *                      name: string      // Le nom de la rue,
 *                      values: [         // Le tableau compte 365 entrées, pour les 365 jours de l'année.
 *                        date: Date,     // La date du jour.
 *                        count: number   // Le nombre de vélos compté ce jour là (effectuer une conversion avec parseInt)
 *                      ]
 *                    },
 *                     ...
 *                  ]
 */
function createSources(color, data) {
  // TODO: Retourner l'objet ayant le format demandé.
  //var rues = color.domain()
  var rues = []
  for (var i = 1; i < color.domain().length; i++) {
    // var rue = color.domain()[i];
    var rue = { "name": color.domain()[i], "values" : [] };
    rues.push(rue);
  }
  
  for (var i = 0; i < rues.length; i++) {
    for (var j = 0; j < data.length; j ++) {
      rues[i]["values"].push({"date": data[j].Date, "count": parseInt(data[j][rues[i].name])}); //parseINT la dessus
    }
  }
  console.log(rues);

  return rues;
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe X.
 *
 * @param xFocus      Échelle en X utilisée avec le graphique "focus".
 * @param xContext    Échelle en X utilisée avec le graphique "contexte".
 * @param data        Données provenant du fichier CSV.
 */
function domainX(xFocus, xContext, data) {
  // TODO: Préciser les domaines pour les variables "xFocus" et "xContext" pour l'axe X.
  var dates = []
  for (let i = 0; i < data.length; i++) {
    dates.push(data[i].Date);
  }
  //console.log(dates);
  xFocus.domain([d3.min(dates), d3.max(dates)]);
  xContext.domain([d3.min(dates), d3.max(dates)]);
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe Y.
 *
 * @param yFocus      Échelle en Y utilisée avec le graphique "focus".
 * @param yContext    Échelle en Y utilisée avec le graphique "contexte".
 * @param sources     Données triées par nom de rue et par date (voir fonction "createSources").
 */
function domainY(yFocus, yContext, sources) {
  // TODO: Préciser les domaines pour les variables "yFocus" et "yContext" pour l'axe Y.
  var counts = [];
  for( let i = 0; i < sources.length; i++) {
    for (var j = 0; j < sources[i]["values"].length; j++) {
        counts.push(sources[i]["values"][j]["count"]);
    }
  }
  yFocus.domain([d3.min(counts), d3.max(counts)]);
  yContext.domain([d3.min(counts), d3.max(counts)]);
}
