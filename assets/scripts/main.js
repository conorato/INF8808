/**
 * Fichier principal permettant de dessiner les deux graphiques demandés. Ce fichier utilise les autres fichiers
 * que vous devez compléter.
 *
 * /!\ Aucune modification n'est nécessaire dans ce fichier!
 */
(function(d3, localization) {
  "use strict";

  /***** Configuration *****/

  // Graphique principal (focus)
 const marginFocus = {
    top: 10,
    right: 10,
    bottom: 100,
    left: 60
  };
 const widthFocus = 1200 - marginFocus.left - marginFocus.right;
 const heightFocus = 500 - marginFocus.top - marginFocus.bottom;

  // Graphique secondaire qui permet de choisir l'échelle de la visualisation (contexte)
 const marginContext = {
    top: 430,
    right: 10,
    bottom: 30,
    left: 60
  };
 const widthContext = widthFocus;
 const heightContext = 500 - marginContext.top - marginContext.bottom;

  /***** Échelles *****/
 const xFocus = d3.scaleTime().range([0, widthFocus]);
 const yFocus = d3.scaleLinear().range([heightFocus, 0]);

 const xContext = d3.scaleTime().range([0, widthContext]);
 const yContext = d3.scaleLinear().range([heightContext, 0]);

 const xAxisFocus = d3.axisBottom(xFocus).tickFormat(localization.getFormattedDate);
 const yAxisFocus = d3.axisLeft(yFocus);

  const xAxisContext = d3.axisBottom(xContext).tickFormat(localization.getFormattedDate);

  /***** Création des éléments *****/
  const svg = d3.select("body")
    .append("svg")
    .attr("width", widthFocus + marginFocus.left + marginFocus.right)
    .attr("height", heightFocus + marginFocus.top + marginFocus.bottom);

  // Groupe affichant le graphique principal (focus).
  const focus = svg.append("g")
    .attr("transform", "translate(" + marginFocus.left + "," + marginFocus.top + ")");

  // Groupe affichant le graphique secondaire (contexte).
  const context = svg.append("g")
    .attr("transform", "translate(" + marginContext.left + "," + marginContext.top + ")");

  // Ajout d'un plan de découpage.
  svg.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", widthFocus)
    .attr("height", heightFocus);

  // Fonctions pour dessiner les lignes
 const lineFocus = createLine(xFocus, yFocus);
 const lineContext = createLine(xContext, yContext);

  // Permet de redessiner le graphique principal lorsque le zoom/brush est modifié.
 const brush = d3.brushX()
    .extent([[0, 0], [widthContext, heightContext]])
    .on("brush", () => {
      brushUpdate(brush, focus, lineFocus, xFocus, xContext, xAxisFocus, yAxisFocus);
    });

  /***** Chargement des données *****/
  d3.csv("./data/2016.csv").then(function(data) {
    /***** Prétraitement des données *****/
    // Échelle permettant d'associer 10 valeurs à 10 couleurs différentes
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    domainColor(color, data);
    parseDate(data);

    const sources = createSources(color, data);
    domainX(xFocus, xContext, data);
    domainY(yFocus, yContext, sources);

    /***** Création du graphique focus *****/
    createFocusLineChart(focus, sources, lineFocus, color);

    // Axes focus
    focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightFocus + ")")
      .call(xAxisFocus);

    focus.append("g")
      .attr("class", "y axis")
      .call(yAxisFocus);

    /***** Création du graphique contexte *****/
    createContextLineChart(context, sources, lineContext, color);

    // Axes contexte
    context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightContext + ")")
      .call(xAxisContext);

    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", heightContext + 7);

    /***** Création de la légende *****/
    legend(svg, sources, color);
  });
})(d3, localization);
