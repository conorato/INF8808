"use strict";

/**
* Fichier permettant de gérer la transition entre les données.
*/


/**
 * Réalise une transition entre les données actuellement utilisées et les nouvelles qui doivent être utilisées.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles est dessiné.
 * @param data    Les nouvelles données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 */
function transition(g, data, x, y, r) {
  /* TODO:
       - Réaliser une transition entre l'ancienne position et la nouvelle position des cercles.
       - Mettre à jour la taille du rayon des cercles.
       - La transition doit se faire en 1 seconde.
   */
    var circles = g.selectAll("circle");

    circles.data(data).transition().duration(1000) // 1000ms = 1 seconde
                      .attr("cx", function(p){ return x(p.lifeExpectancy) })
                      .attr("cy", function(p){ return y(p.income) })
                      .attr("r", function(p){ return r(p.population) })
                      .ease(d3.easeExp); 
}
