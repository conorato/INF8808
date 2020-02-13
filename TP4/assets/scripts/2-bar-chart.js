"use strict";

/**
 * Fichier permettant de dessiner le graphique à bandes.
 */


/**
 * Crée les axes du graphique à bandes.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 */
function createAxes(g, xAxis, yAxis, height) {
  // TODO: Dessiner les axes X et Y du graphique. Assurez-vous d'indiquer un titre pour l'axe Y.
  
  // Axe des abcisses
  g.append("g")
    .attr("class", "x-axis")
    .call(xAxis)
    .attr("transform", `translate(0, ${height})`)
    .selectAll("text")
    .style("text-anchor", "start")
    .attr("transform", "rotate(30) scale(1.1)");

  // Axe des ordonnées
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);
  
  // Légende des ordonnées
  g.append("text")
    .text("Nombre de trajets")
    .attr("x", -20)
    .attr("y", -10);
}

/**
 * Crée le graphique à bandes.
 *
 * @param g             Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param currentData   Les données à utiliser.
 * @param x             L'échelle pour l'axe X.
 * @param y             L'échelle pour l'axe Y.
 * @param color         L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param tip           L'infobulle à afficher lorsqu'une barre est survolée.
 * @param height        La hauteur du graphique.
 */
function createBarChart(g, currentData, x, y, color, tip, height) {
  // TODO: Dessiner les cercles à bandes en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'une barre est survolée.
  const SPACE_BETWEEN_BARS = 5;

  g.selectAll("rect")
      .data(currentData.destinations)
    .enter().append("rect")
      .style("fill", d => color(d.name))
      .attr("x", d => x(d.name) + SPACE_BETWEEN_BARS)
      .attr("width", x.bandwidth() - SPACE_BETWEEN_BARS)
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count))
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);
}

/**
 * Réalise une transition entre les données actuellement utilisées et les nouvelles qui doivent être utilisées.
 *
 * @param g         Le groupe SVG dans lequel le graphique à bandes est dessiné.
 * @param newData   Les nouvelles données à utiliser.
 * @param y         L'échelle pour l'axe Y.
 * @param yAxis     L'axe Y.
 * @param height    La hauteur du graphique.
 */
function transition(g, newData, y, yAxis, height) {
  /* TODO:
   - Réaliser une transition pour mettre à jour l'axe des Y et la hauteur des barres à partir des nouvelles données.
   - La transition doit se faire en 1 seconde.
   */
  const nbTrajets = newData
    .destinations
    .map(x => x.count);
  
  y.domain([d3.min(nbTrajets), d3.max(nbTrajets)]);

  g.selectAll("rect")
      .data(newData.destinations)
    .transition()
    .duration(1000)
    .attr("y", d => y(d.count))
    .attr("height", d => height - y(d.count))
    .ease(d3.easeExp)
  
  g.selectAll("g.y-axis")
    .transition()
    .duration(1000)
    .call(yAxis);
}

/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées à la barre survollée par la souris.
 * @param currentData     Les données qui sont actuellement utilisées.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, currentData, formatPercent) {
  // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
  //       Assurez-vous d'utiliser la fonction "formatPercent" pour formater le pourcentage correctement.
  const nbTotalTrajet = d3.sum(currentData
    .destinations
    .map(x => x.count));
  
  return `${d.count} (${formatPercent(d.count/nbTotalTrajet)})`;
}
