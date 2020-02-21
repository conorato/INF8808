"use strict";

/**
 * Fichier permettant de dessiner le diagramme à cordes.
 */


/**
 * Crée les groupes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param arc             Fonction permettant de dessiner les arcs.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  /* TODO:
     - Créer les groupes du diagramme qui sont associés aux stations de BIXI fournies.
     - Utiliser un "textPath" pour que les nom de stations suivent la forme des groupes.
     - Tronquer les noms des stations de BIXI qui sont trop longs (Pontiac et Métro Mont-Royal).
     - Afficher un élément "title" lorsqu'un groupe est survolé par la souris.
  */
  const get_short_enough_labels = name => {
    if (name === "Pontiac / Gilford") {
      name = "Pontiac";
    } else if (name === "Métro Mont-Royal (Rivard/Mont-Royal)") {
      name = "Métro Mont-Royal";
    }
    return name;
  };

  const get_title_text = d => `${data[d.index].name}: ${formatPercent(d.value/total)} des départs`;

  g.selectAll("groups.path")
      .data(layout.groups)
    .enter().append("path")
      .attr("class", "groups")
      .attr("fill", d => color(d.index))
      .attr("d", arc)
    .append("title")
      .text(get_title_text);

  g.selectAll("text")
      .data(layout.groups)
    .enter().append("text")
      .attr("dx", 5)
      .attr("dy", 17)
    .append("textPath")
      .attr("fill", "white") 
      .attr("path", arc)
      .attr("font-size", "80%")
      .text(d => get_short_enough_labels(data[d.index].name))
    .append("title")
      .text(get_title_text);

}

/**
 * Crée les cordes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param path            Fonction permettant de dessiner les cordes.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  /* TODO:
     - Créer les cordes du diagramme avec une opacité de 80%.
     - Afficher un élément "title" lorsqu'une corde est survolée par la souris.
  */
  const FILL_OPACITY_FULL = 0.8;
  const get_title = (from, to) => `${data[from.index].name} → ${data[to.index].name}: ${formatPercent(from.value/total)}`;

  g.selectAll("chords.path")
      .data(layout)
    .enter().append("path")
      .attr("class", "chords")
      .attr("d", path)
      .attr("fill-opacity", FILL_OPACITY_FULL)
      .attr("fill", d => color(d.source.index))
      .on("mouseover", _ => d3.select(event.currentTarget).attr("fill-opacity", 0.95))
      .on("mouseout", _ => d3.select(event.currentTarget).attr("fill-opacity", FILL_OPACITY_FULL))
    .append("title")
      .text(d => `${get_title(d.source, d.target)}\n${get_title(d.target, d.source)}`);
}

/**
 * Initialise la logique qui doit être réalisée lorsqu'un groupe du diagramme est survolé par la souris.
 *
 * @param g     Le groupe SVG dans lequel le diagramme à cordes est dessiné.
 */
function initializeGroupsHovered(g) {
  /* TODO:
     - Lorsqu'un groupe est survolé par la souris, afficher les cordes entrant et sortant de ce groupe avec une
       opacité de 80%. Toutes les autres cordes doivent être affichées avec une opacité de 10%.
     - Rétablir l'affichage du diagramme par défaut lorsque la souris sort du cercle du diagramme.
  */

}
