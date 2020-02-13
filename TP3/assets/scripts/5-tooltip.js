"use strict";

/**
 * Fichier permettant de définir le texte à afficher dans l'infobulle.
 */


/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées au cercle survollé par la souris.
 * @param formatNumber    Fonction permettant de formater correctement des nombres.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, formatNumber) {
  // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
  //       Assurez-vous d'utiliser la fonction "formatNumber" pour formater les nombres correctement.
  var toolTipText = "Pays: "+ d.name + "\n <br>" + "Esperance de vie: " + formatNumber(d.lifeExpectancy) + "ans \n <br>"
                    + "Revenu Moyen: " + formatNumber(d.income) + "dollars \n <br>" + "Population: " + formatNumber(d.population) 
                    + "personnes \n <br>" + "Zone du monde: " + d.zone;

  return toolTipText;
}
