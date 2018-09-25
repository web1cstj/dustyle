/*jslint browser:true,esnext:true*/
class Bullestyle {
	static ajouterLink() {
		var link = document.head.appendChild(document.createElement("link"));
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "bullestyle.css");
	}
	static traiterStyle(style) {
		if (style instanceof HTMLElement) {
			style = style.getAttribute("style");
		}
		style = style
			.replace(/^ */g, "")
			.replace(/ *$/g, "")
			.replace(/ *: */g, ":")
			.replace(/ *; */g, ";")
			.replace(/ *\/\* */g, "/*")
			.replace(/ *\*\/ */g, "*/")
			.replace(/;+/g, ";")
			.split(";");
		return style;
	}
	static propriete(nom, valeur, nouveau, supprimer) {
		var resultat, span;
		resultat = document.createElement('div');
		resultat.classList.add("propriete");
		resultat.classList.add((nouveau) ? "nouveau" : "vieux");

		if (supprimer) {
			resultat.classList.add("supprimer");
		}

		span = resultat.appendChild(document.createElement('span'));
		span.innerHTML = nom;
		resultat.appendChild(document.createTextNode(":"));
		span = resultat.appendChild(document.createElement('span'));
		span.innerHTML = valeur;
		resultat.appendChild(document.createTextNode(";"));
		return resultat;
	}
	static traiterImagesBulles() {
		var elements = Array.from(document.querySelectorAll("img.avecbulle"));
		elements.forEach(element => {
			var indicateur = element.parentNode.insertBefore(document.createElement("span"), element);
			indicateur.classList.add("indicateurBulle");
		});
	}

	static traiterStyles() {
		var elements = Array.from(document.querySelectorAll("*[style]"));
		elements.forEach(element => {
			var bulle = document.createElement('div');
			bulle.classList.add("bulle");
			var style = this.traiterStyle(element);
			var nouveau = true;
			var supprimer = false;
			var cacher = false;
			var nbProps = 0;
			for (var i = 0; i < style.length; i++) {
				var s = style[i];
				console.log(s);
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
				if (style[i] !== "" && !cacher) {
					nbProps++;
					bulle.appendChild(this.propriete(s[0], s[1], nouveau, supprimer));
				}
			}
			if (nbProps > 0) {
				element.classList.add("avecbulle");
				element.parentNode.insertBefore(bulle, element.nextSibling);
			}
		});
	}
	static load() {
		this.traiterStyles();
		this.traiterImagesBulles();
	}
	static init() {
		this.ajouterLink();
		window.addEventListener("load", () => {
			this.load();
		});
	}
}
Bullestyle.init();
