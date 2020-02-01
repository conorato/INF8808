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
const domainColor = (color, data) => {
  // TODO: Définir le domaine de la variable "color" en associant un nom de rue à une couleur.
  const fields = Object.keys(data[0]).filter(field => field !== "Date");
  color.domain(fields);
}

/**
 * Convertit les dates se trouvant dans le fichier CSV en objet de type Date.
 *
 * @param data    Données provenant du fichier CSV.
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
const parseDate = data => {
  // TODO: Convertir les dates du fichier CSV en objet de type Date.
  const parser = d3.timeParse("%d/%m/%Y"); //J ai trouvé ça la dessus http://learnjsdata.com/time.html
  for (const datum of data) {
    datum.Date = parser(datum.Date);
  }
};

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
const createSources = (color, data) => {
  // TODO: Retourner l'objet ayant le format demandé.
  return color.domain().map(name => {
    return {
      "name": name,
      "values": data.map(datum => {
        return {
          "date": datum.Date,
          "count": parseInt(datum[name]),
        };
      })
    };
  });
};

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe X.
 *
 * @param xFocus      Échelle en X utilisée avec le graphique "focus".
 * @param xContext    Échelle en X utilisée avec le graphique "contexte".
 * @param data        Données provenant du fichier CSV.
 */
const domainX = (xFocus, xContext, data) => {
  // TODO: Préciser les domaines pour les variables "xFocus" et "xContext" pour l'axe X.
  const dates = data.map(datum => datum.Date);
  xFocus.domain([d3.min(dates), d3.max(dates)]);
  xContext.domain([d3.min(dates), d3.max(dates)]);
};

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe Y.
 *
 * @param yFocus      Échelle en Y utilisée avec le graphique "focus".
 * @param yContext    Échelle en Y utilisée avec le graphique "contexte".
 * @param sources     Données triées par nom de rue et par date (voir fonction "createSources").
 */
const domainY = (yFocus, yContext, sources) => {
  // TODO: Préciser les domaines pour les variables "yFocus" et "yContext" pour l'axe Y.
  let counts = [];
  for (const source of sources) {
    counts.push(...source.values.map(el => el.count));
  }
  yFocus.domain([d3.min(counts), d3.max(counts)]);
  yContext.domain([d3.min(counts), d3.max(counts)]);
};
