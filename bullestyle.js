$(function() {
	  $('head').append('<link rel="stylesheet" href="bullestyle.css" type="text/css" />');
		$("*[style]").each(function(){
		var $this = $(this);
		var $bulle = $(document.createElement('div'))
			.addClass("bulle")
		;
		var style = $this.attr("style");
		style = style.replace(/^ */g, "").replace(/ *$/g, "").replace(/ *: */g, ":").replace(/ *; */g, ";").replace(/ *\/\* */g, "/*").replace(/ *\*\/ */g, "*/").replace(/;+/g, ";");
		style = style.split(";");
		var nouveau = true;
		var supprimer = false;
		var cacher = false;
		var nbProps = 0;
		for (var i=0; i<style.length; i++) {
			var s = style[i];
			if (s.substr(0,2) == "*/") {
				supprimer=false;
				s = s.substr(2);
			}
			while (s.substr(0,4) == "/**/") {
				if (i==0 || nouveau==false) cacher=true;
				nouveau=false;
				s = s.substr(4);
			}
			if (s.substr(0,5) == "/***/") {
				nouveau=false;
				cacher=true;
				s = s.substr(5);
			}
			if (s.substr(0,2) == "/*") {
				supprimer=true;
				s = s.substr(2);
			}
			s = s.replace(/^[\/\*]+/g, "");
			var s = s.split(":");
			if (style[i]=="" || cacher) continue;
			nbProps++;
			$bulle.append($(document.createElement('div'))
				.addClass((nouveau) ? "nouveau" : "vieux")
				.addClass((supprimer) ? "supprimer" : "")
				//.addClass((cacher) ? "cacher" : "")
				.append($(document.createElement('span')).text(s[0]))
				.append(":")
				.append($(document.createElement('span')).text(s[1]))
				.append(";")
			);
		}
		if (nbProps > 0) {
			$this.addClass("avecbulle").after($bulle);
		}
	});
	$("img.avecbulle").before("<span class='indicateurBulle'></span>");
});
