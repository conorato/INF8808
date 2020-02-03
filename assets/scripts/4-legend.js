"use strict";

/**
 * Fichier permettant de générer la légende et de gérer les interactions de celle-ci.
 */


/**
 * Crée une légende à partir de la source.
 *
 * @param svg       L'élément SVG à utiliser pour créer la légende.
 * @param sources   Données triées par nom de rue et par date.
 * @param color     Échelle de 10 couleurs.
 */
const legend = (svg, sources, color) => {
  // TODO: Créer la légende accompagnant le graphique.
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100)
    .attr("backgound", "yellow");

  for (let i = 0; i < sources.length; i++) {
    const name = sources[i].name;
    const rect = legend.append("rect")
      .attr("id", name)
      .attr("x", 68)
      .attr("y", (1+i) * 25)
      .attr("width", 11)
      .attr("height", 11)
      .attr("fill", d => color(name))
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill-opacity", "100%")
      .on("click", () => displayLine(rect, color));

    if (name == "Moyenne") {
      rect.attr("fill", "black")
    }

    legend.append("text")
      .attr("x", 90)
      .attr("y", 10 + (1+i) * 25)
      .attr("font-size", "0.8em")
      .text(_ => name);
  }
}

/**
 * Permet d'afficher ou non la ligne correspondant au carré qui a été cliqué.
 *
 * En cliquant sur un carré, on fait disparaitre/réapparaitre la ligne correspondant et l'intérieur du carré
 * devient blanc/redevient de la couleur d'origine.
 *
 * @param element   Le carré qui a été cliqué.
 * @param color     Échelle de 10 couleurs.
 */
const displayLine = (element, color) => {
  // TODO: Compléter le code pour faire afficher ou disparaître une ligne en fonction de l'élément cliqué.
  const name = element.attr("id");
  const lines = d3.selectAll(`.line#${name}`);
  if(element.attr("fill-opacity") === "100%") {
    element.attr("fill-opacity", "0%");
    lines.attr("opacity", "0%");
  } else {
    element.attr("fill-opacity", "100%");
    lines.attr("opacity", "100%");
  }
};
