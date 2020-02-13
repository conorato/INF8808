"use strict";

/**
 * Fichier permettant de dessiner le graphique à bulles.
 */


/**
 * Crée les axes du graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 * @param width   La largeur du graphique.
 */
function createAxes(g, xAxis, yAxis, height, width) {
  // TODO: Dessiner les axes X et Y du graphique.
  // Axe horizontal

  // Axe des abcisses
  g.append("g").attr("class", "axe x")
               .call(xAxis)
               .attr("transform", "translate(0," + height + ")");

  // Axe des ordonnées
  g.append("g").attr("class", "axe y")
               .call(yAxis);
     
  // Légende des abcisses
  g.append("text").text("Espérance de vie (années)")
                  .attr("class", "legende abcisses")
                  .attr("text-anchor", "end")
                  .attr("x", width)
                  .attr("y", height - 10);

  // Légende des ordonnées
  g.append("text").text("Salaire ($ US)")
                  .attr("class", "legende ordonnées")
                  .attr("text-anchor", "end")
                  .attr("x", 0)
                  .attr("transform", "rotate(-90)")
                  //.attr("transform", "translate(-15)")
                  .attr("y", 15);
}

/**
 * Crée le graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param data    Les données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 * @param color   L'échelle pour la couleur des cercles.
 * @param tip     L'infobulle à afficher lorsqu'un cercle est survolé.
 */
function createBubbleChart(g, data, x, y, r, color, tip) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.
  // On selection tous les cercles pour appliquer les modifs sur chacun d'entre eux
  var circles = g.selectAll("circle");

  circles.data(data).enter().append("circle")
                    .attr("cx", function(p){ return x(p.lifeExpectancy) })
                    .attr("cy", function(p){ return y(p.income) })
                    .attr("r", function(p){ return r(p.population) })
                    .attr("fill", function(p){ return color(p.zone) })
                    .on("mouseover", tip.show)
                    .on("mouseout", tip.hide);

}
