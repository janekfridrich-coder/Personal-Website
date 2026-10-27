JAN FRIDRICH — OSOBNÍ WEB
=================================================================

CO JE V TÉTO SLOŽCE
-----------------------------------------------------------------
index.html               → domovská stránka
about.html                → O mně
work.html                  → Práce / zkušenosti
projects.html            → Přehled projektů
projects/vesela-fest.html → detail projektu Veselá Fest
projects/alufen.html      → detail projektu Alufen
projects/digital.html     → detail Digital Projects
journey.html              → Cesta / vzdělání / mapa / timeline
contact.html               → Kontakt
404.html                   → vlastní stránka "stránka nenalezena"
css/style.css              → veškerý vzhled webu
js/main.js                 → veškerá interaktivita (menu, kurzor,
                              animace, timeline, mapa, grafy)
js/content.js               → VEŠKERÝ TEXTOVÝ OBSAH A ODKAZY
                              (tohle budete upravovat nejčastěji)
js/journey.js               → animovaná mapa trasy na stránce Journey
                              (data trasy a stáží: SITE.journey v content.js)
js/europe-map.js            → vygenerovaná data mapy Evropy (needitovat
                              ručně; generuje tools/build-europe-map.mjs)

JAK WEB NAHRÁT NA DOMÉNU
-----------------------------------------------------------------
1. Otevřete administraci svého webhostingu (např. přes FTP klienta
   typu FileZilla, nebo přes "Správce souborů" v administraci
   hostingu — Wedos, Forpsi, Active24, Vercel, Netlify apod.).
2. Nahrajte OBSAH této složky (ne samotnou složku, ale VŠECHNY
   soubory a podsložky uvnitř: index.html, css/, js/, projects/…)
   do kořenového adresáře domény — obvykle se jmenuje "public_html",
   "www" nebo "htdocs".
3. Ujistěte se, že soubor "index.html" je přímo v tomto kořenovém
   adresáři (ne o úroveň hlouběji), aby se doména otevřela rovnou
   na hlavní stránku.
4. Hotovo — web je statický (žádná databáze, žádný PHP), takže
   funguje na naprosto jakémkoliv hostingu, který umí zobrazit
   HTML soubory.

Alternativa (jednodušší, zdarma): nahrajte celou složku na
Netlify (netlify.com) přetažením do prohlížeče, nebo na Vercel /
GitHub Pages — vše bez nastavování.

JAK UPRAVIT TEXTY, ODKAZY A ČÍSLA
-----------------------------------------------------------------
Většinu obsahu najdete přehledně na jednom místě v souboru:

    js/content.js

Otevřete ho v jakémkoliv textovém editoru (např. VS Code, Poznámkový
blok) a upravte:
  - SITE.links.email / linkedin / instagram / cv → kontaktní odkazy
  - SITE.experience → pracovní zkušenosti
  - SITE.projects → texty jednotlivých projektů
  - SITE.numbers → čísla v sekci "A FEW NUMBERS"
  - SITE.timeline / education / mapPoints → sekce Journey
  - SITE.festivalGrowth → data pro graf růstu Veselé Fest

Po uložení souboru stačí znovu nahrát tento jeden soubor na hosting.

JAK PŘIDAT VLASTNÍ FOTKY
-----------------------------------------------------------------
Web nyní obsahuje tmavé "placeholder" plochy místo fotek (aby
nepůsobil obecně / generickým dojmem se stock fotkami). Až budete
mít vlastní fotografie (černobílé/desaturované doporučeno):

1. Vložte obrázky do složky "assets/" (např. assets/portrait.jpg).
2. V HTML souboru najděte příslušný <div class="portrait"> nebo
   <div class="project-media"> a nahraďte ho např.:
       <img src="assets/portrait.jpg" alt="Jan Fridrich">
3. U projektových fotek podobně nahraďte
   <div class="media-label">…</div> obrázkem.

VLASTNÍ CV
-----------------------------------------------------------------
Nahrajte PDF životopisu do složky, např. assets/cv.pdf, a v
js/content.js nastavte:
    cv: "assets/cv.pdf"

POZNÁMKA K FONTŮM
-----------------------------------------------------------------
Web používá Google Fonts (Inter + Caveat), které se načítají online.
Pokud by hosting/doména vyžadovala fungování i bez internetu, je
možné fonty stáhnout a odkazovat lokálně — v běžném provozu na
doméně to ale není potřeba.
