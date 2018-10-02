/*jslint browser:true, esnext:true*/
/*global $ */
class Bullestyle {
    static ajouterStyle() {
        var link = document.head.appendChild(document.createElement("link"));
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "bullestyle.css");
    }
    static load() {

    }
    static dom_prop(nom, valeur, nouveau, supprimer) {
        var resultat = document.createElement('div');
        if (nouveau) {
            resultat.classList.add("nouveau");
        } else {
            resultat.classList.add("vieux");
        }
        if (supprimer) {
            resultat.classList.add("supprimer");
        }
//        if (cacher) {
//            prop.classList.add("cacher");
//        }
        var span = resultat.appendChild(document.createElement("span"));
        span.innerHTML = nom;
        resultat.appendChild(document.createTextNode(":"));
        span = resultat.appendChild(document.createElement("span"));
        span.innerHTML = valeur;
        resultat.appendChild(document.createTextNode(";"));
        return resultat;
    }
    static ajouterIndicateurImage() {
        var indicateur = document.createElement("span");
        indicateur.classList.add("indicateurBulle");
        document.querySelectorAll("img.avecbulle").forEach(i => {
            i.parentNode.insertBefore(indicateur.cloneNode(true), i);
        });
    }
    static init() {
        this.ajouterStyle();
        window.addEventListener("load", () => this.load());
    }
}
Bullestyle.init();

$(function () {
    var elements = Array.from(document.querySelectorAll("*[style]"));
    elements.forEach(element => {
        var $this = $(element);
        var $bulle = $(document.createElement('div'))
            .addClass("bulle");
        var style = $this.attr("style");
        style = style.replace(/^ */g, "").replace(/ *$/g, "").replace(/ *: */g, ":").replace(/ *; */g, ";").replace(/ *\/\* */g, "/*").replace(/ *\*\/ */g, "*/").replace(/;+/g, ";");
        style = style.split(";");
        var nouveau = true;
        var supprimer = false;
        var cacher = false;
        var nbProps = 0;
        for (var i = 0; i < style.length; i++) {
            var s = style[i];
            if (s.substr(0, 2) === "*/") {
                supprimer = false;
                s = s.substr(2);
            }
            while (s.substr(0, 4) === "/**/") {
                if (i === 0 || nouveau === false) {
                    cacher = true;
                }
                nouveau = false;
                s = s.substr(4);
            }
            if (s.substr(0, 5) === "/***/") {
                nouveau = false;
                cacher = true;
                s = s.substr(5);
            }
            if (s.substr(0, 2) === "/*") {
                supprimer = true;
                s = s.substr(2);
            }
            s = s.replace(/^[\/\*]+/g, "");
            s = s.split(":");
            if (style[i] === "" || cacher) {
                continue;
            }
            nbProps += 1;
            var prop = Bullestyle.dom_prop(s[0], s[1], nouveau, supprimer);
            $bulle.append(prop);
        }
        if (nbProps > 0) {
            $this.addClass("avecbulle").after($bulle);
        }

    });
    Bullestyle.ajouterIndicateurImage();
});
