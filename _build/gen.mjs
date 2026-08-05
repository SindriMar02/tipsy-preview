/* Emits index.html from _build/data.mjs.
   Run:  node _build/gen.mjs
   The site itself stays build-free — this just writes the file once, so the
   drink markup is DERIVED from the transcribed menu rather than hand-typed
   twenty-five times (which is how a wrong price or band creeps in). */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const n2 = i => String(i + 1).padStart(2, '0');

/* ── glassware ───────────────────────────────────────────────────────────────
   Which silhouette a drink gets is DERIVED, never chosen by taste: a drink
   their own sheet tops long (tonic, ginger beer & 7up, 0% beer) pours into
   the highball; their sours and Old Fashioned pour onto the rock the way
   their own photographs serve them (one large cube in a rocks glass);
   everything stemmed pours into the coupe. */
const GLASS = {
  coupe:    { top:36, bot:83,  d:'M14 34 Q14 78 46 84 L46 112 L30 118 L30 124 L70 124 L70 118 L54 112 L54 84 Q86 78 86 34 Z' },
  wine:     { top:34, bot:83,  d:'M22 30 Q22 76 46 84 L46 112 L32 118 L32 124 L68 124 L68 118 L54 112 L54 84 Q78 76 78 30 Z' },
  highball: { top:33, bot:122, d:'M18 30 L23 118 Q23 124 30 124 L70 124 Q77 124 77 118 L82 30 Z' },
  collins:  { top:23, bot:122, d:'M28 20 L31 118 Q31 124 38 124 L62 124 Q69 124 69 118 L72 20 Z' },
  rocks:    { top:59, bot:122, d:'M20 56 L24 118 Q24 124 31 124 L69 124 Q76 124 76 118 L80 56 Z' }
};

function glassSvg(kind, id, ing) {
  const g = GLASS[kind];
  const n = ing.length;
  const h = (g.bot - g.top) / n;
  const bands = ing.map(([, colour], i) => {
    const y = (g.bot - (i + 1) * h).toFixed(1);
    return `<rect class="gl__band" data-band="${i}" x="0" y="${y}" width="100" height="${(h + 0.6).toFixed(1)}" fill="${colour}"/>`;
  }).join('');
  return `<svg viewBox="0 0 100 130" class="gl" data-fill>
                <defs><clipPath id="cp-${id}"><path d="${g.d}"/></clipPath></defs>
                <g clip-path="url(#cp-${id})">${bands}</g>
                <path class="gl__out" d="${g.d}"/>
              </svg>`;
}

function dish(drink, kind, id, i, price) {
  const spec = drink.ing.map(([label, colour], k) =>
    `<li data-ing="${k}"><i style="--c:${colour}" aria-hidden="true"></i>${esc(label)}</li>`).join('');
  const note = drink.d || drink.note;
  return `          <li class="dish">
            <div class="dish__glass" aria-hidden="true">
              ${glassSvg(kind, id, drink.ing)}
            </div>
            <div class="dish__body">
              <p class="dish__top"><span class="dish__n mono">${n2(i)}</span><span class="dish__name">${esc(drink.n)}</span><span class="dish__rule" aria-hidden="true"></span><span class="dish__p mono">${esc(drink.p || price)}</span></p>
              ${note ? `<p class="dish__note">${esc(note)}</p>` : ''}
              <ul class="dish__spec">${spec}</ul>
            </div>
          </li>`;
}

function course(id, title, priceLabel, drinks, kindFor, itemPrice = '') {
  const items = drinks.map((dr, i) => dish(dr, kindFor(dr), `${id}-${i}`, i, itemPrice)).join('\n');
  return `      <section class="course" aria-labelledby="course-${id}">
        <header class="course__head">
          <h3 class="course__title" id="course-${id}">${esc(title)}</h3>
          ${priceLabel ? `<p class="course__price mono">${esc(priceLabel)}</p>` : ''}
        </header>
        <ul class="course__list">
${items}
        </ul>
      </section>`;
}

/* ── the trophy shelf: their own five published win lines ────────────────── */
const winsBlock = D.wins.map((w, i) => `      <section class="method">
        <header class="method__head">
          <svg class="method__gl" viewBox="0 0 100 130" aria-hidden="true"><path d="${GLASS.coupe.d}"/></svg>
          <div>
            <h3 class="method__title">${esc(w.event)}</h3>
            <p class="method__price mono">${esc(w.title).toUpperCase()}</p>
          </div>
        </header>
        <ul class="method__list"><li>${esc(w.who)}</li><li class="method__src mono">${esc(w.src)}</li></ul>
      </section>`).join('\n');

/* ── wine tables ─────────────────────────────────────────────────────────── */
const wineRows = rows => rows.map(r => {
  const [name, grape, region, a, b] = r;
  const price = b ? `${a} <span class="cw__slash">/</span> ${b}` : a;
  return `<li class="cw"><span class="cw__n">${esc(name)}</span>${grape ? `<span class="cw__g">${esc(grape)}</span>` : ''}<span class="cw__r">${esc(region)}</span><span class="cw__rule" aria-hidden="true"></span><span class="cw__p mono">${price}</span></li>`;
}).join('');

const wineBlock = `
      <div class="cellar__col">
        <h3 class="cellar__h">By the glass</h3>
        <p class="cellar__sub mono">GLASS / BOTTLE</p>
        <h4 class="cellar__cat">White</h4><ul class="cellar__list">${wineRows(D.wine.house.white)}</ul>
        <h4 class="cellar__cat">Red</h4><ul class="cellar__list">${wineRows(D.wine.house.red)}</ul>
        <h4 class="cellar__cat">Rosé</h4><ul class="cellar__list">${wineRows(D.wine.house.rose)}</ul>
        <h4 class="cellar__cat">Sparkling</h4><ul class="cellar__list">${wineRows(D.wine.house.sparkling)}</ul>
        <h4 class="cellar__cat">Champagne</h4><ul class="cellar__list">${wineRows(D.wine.house.champagne)}</ul>
      </div>
      <div class="cellar__col">
        <h3 class="cellar__h">By the bottle</h3>
        <p class="cellar__sub mono">BOTTLE</p>
        <h4 class="cellar__cat">Red</h4><ul class="cellar__list">${wineRows(D.wine.bottles.red)}</ul>
        <h4 class="cellar__cat">White</h4><ul class="cellar__list">${wineRows(D.wine.bottles.white)}</ul>
        <h4 class="cellar__cat">Champagne</h4><ul class="cellar__list">${wineRows(D.wine.bottles.champagne)}</ul>
        <h4 class="cellar__cat">On draft</h4><ul class="cellar__list">${wineRows(D.wine.beer.draft)}</ul>
      </div>`;

/* ── the top shelf rail ──────────────────────────────────────────────────────
   Eight real bottles off their own top-shelf and Eðalsafn pages. The rail
   keeps the source build's classes so the pinned horizontal engine carries
   over untouched — only the cargo changed. */
const shelfBlock = D.topShelf.map((b, i) => `        <li class="crew__card">
          <div class="crew__slot" aria-hidden="true"><span class="crew__slotn mono">${n2(i)}</span><span class="crew__cat mono">${esc(b.cat).toUpperCase()}</span></div>
          <div class="crew__body">
            <h3>${esc(b.n)}</h3>
            <p class="crew__await mono">${esc(b.p)} KR. &middot; 1X SINGLE</p>
          </div>
        </li>`).join('\n');

/* The landing is their own wordmark — the gold deco TIPSY with the spiral S —
   huge and centred. The <h1>'s accessible name is carried by the img alt,
   the tagline is their own marketing line. */
const HERO_TAG = 'Specially crafted cocktails, classic drinks & bubbles';

const hoursRows = D.biz.hours.map(([d, a, b]) =>
  `<li${d.startsWith('Fri') ? ' class="hrs--late"' : ''}><span class="hrs__d mono">${d}</span><span class="hrs__t mono">${a} – ${b}</span></li>`).join('');

const P = D.photos;
const fig = (k, cap, cls = '') => `  <figure class="bleed ${cls}" data-pour>
    <img src="${P[k].src}" alt="${esc(P[k].alt)}" width="${P[k].w}" height="${P[k].h}" loading="lazy" decoding="async" />
    <figcaption class="mono">${esc(cap)}</figcaption>
  </figure>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Tipsý Bar &amp; Lounge &middot; Hafnarstræti 1-3, Reykjavík</title>
<meta name="description" content="Cocktail bar &amp; lounge on Hafnarstræti. Eleven Tipsý originals, eleven classics, champagne from Moët to Krug, and 50% off Tipsý cocktails every day from 16 to 19." />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#180C07" />

<meta property="og:type" content="website" />
<meta property="og:title" content="Tipsý Bar &amp; Lounge &middot; Hafnarstræti 1-3, Reykjavík" />
<meta property="og:description" content="Specially crafted cocktails, classic drinks &amp; bubbles. Happy hour every day 16–19: 50% off Tipsý cocktails." />
<meta property="og:image" content="https://sindrimar02.github.io/tipsy-preview/${P.strawberry.src}" />
<meta property="og:locale" content="en_GB" />

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="assets/favicon-48.png" type="image/png" sizes="48x48" />
<link rel="icon" href="assets/favicon-32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png" />
<link rel="preload" href="assets/fonts/Boska-Black.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="assets/fonts/Switzer-Regular.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" as="image" href="${P.hero.src}" />
<link rel="stylesheet" href="styles.css" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  "name": "Tipsý Bar & Lounge",
  "url": "${D.biz.site}",
  "email": "${D.biz.email}",
  "telephone": "+354 ${D.biz.phone}",
  "servesCuisine": "Cocktails",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${D.biz.street}",
    "postalCode": "${D.biz.postal}",
    "addressLocality": "${D.biz.city}",
    "addressCountry": "IS"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"], "opens": "16:00", "closes": "01:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday","Saturday"], "opens": "16:00", "closes": "02:00" }
  ]
}
</script>
</head>
<body>

<a class="skip" href="#main">Skip to content</a>

<!-- ══════════ opening scene ══════════
     Their navy — the ink of their own happy-hour graphic — rises behind the
     gold wordmark and drains away. Their own sign says the rest. -->
<div class="gate" id="gate">
  <svg class="gate__liquid" id="gateLiquid" viewBox="0 0 1200 1000" preserveAspectRatio="none" aria-hidden="true">
    <path id="gateWave" fill="#2F2C3D" d="M0,1000 L0,1000 Q300,1000 600,1000 T1200,1000 L1200,1000 Z"/>
  </svg>
  <div class="gate__stage">
    <img class="gate__logo" src="assets/wordmark.svg" alt="" width="200" height="134" />
    <p class="gate__line mono" id="gateLine">FEELING TIPSY</p>
  </div>
  <p class="gate__count mono" id="gateCount">00</p>
  <button class="gate__skip mono" id="gateSkip" type="button">Skip</button>
</div>

<!-- ══════════ header ══════════ -->
<header class="hdr" id="hdr">
  <p class="hdr__side hdr__side--l mono">HAFNARSTRÆTI 1-3 &middot; 101 REYKJAVÍK</p>

  <a class="hdr__mark" href="#top" aria-label="Tipsý, back to top">
    <img src="assets/wordmark.svg" alt="Tipsý Bar &amp; Lounge" width="200" height="134" />
  </a>

  <div class="hdr__side hdr__side--r">
    <p class="mono hdr__open">HAPPY HOUR 16–19</p>
    <button class="burger" id="burger" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
      <span class="burger__box" aria-hidden="true"><i></i><i></i></span>
      <span class="burger__word mono" aria-hidden="true">MENU</span>
    </button>
  </div>
</header>

<div class="menu" id="menu" hidden>
  <div class="menu__inner">
    <nav class="menu__nav" aria-label="Site">
      <a href="#drinks"><span><i class="mono" aria-hidden="true">01</i>The list</span></a>
      <a href="#wins"><span><i class="mono" aria-hidden="true">02</i>The trophies</span></a>
      <a href="#room"><span><i class="mono" aria-hidden="true">03</i>The lounge</span></a>
      <a href="#shelf"><span><i class="mono" aria-hidden="true">04</i>Top shelf</span></a>
      <a href="#cellar"><span><i class="mono" aria-hidden="true">05</i>Wine &amp; bubbles</span></a>
      <a href="#happy"><span><i class="mono" aria-hidden="true">06</i>Happy hour</span></a>
      <a href="#visit"><span><i class="mono" aria-hidden="true">07</i>Visit</span></a>
    </nav>
    <div class="menu__foot">
      <p class="mono">HAFNARSTRÆTI 1-3 &middot; 101 REYKJAVÍK &middot; ${esc(D.biz.phone)}</p>
      <a class="btn btn--main" href="${D.biz.booking}" rel="noopener" lang="is">Bóka borð</a>
    </div>
  </div>
</div>

<main id="main">

<!-- ══════════ 1. hero ══════════ -->
<div class="heropin" id="heropin">
<section class="hero" id="top">
  <img class="hero__film" id="heroPlate" src="${P.hero.src}" alt="${esc(P.hero.alt)}" width="${P.hero.w}" height="${P.hero.h}" fetchpriority="high" decoding="async" />

  <div class="hero__scrim" aria-hidden="true"></div>
  <div class="hero__veil" aria-hidden="true"></div>

  <div class="hero__content">
    <p class="hero__eyebrow mono">COCKTAIL BAR &amp; LOUNGE &middot; HAFNARSTRÆTI &middot; REYKJAVÍK</p>

    <h1 class="hero__h1">
      <img class="hero__mark" id="heroMark" src="assets/wordmark.svg" alt="Tipsý Bar &amp; Lounge" width="200" height="134" fetchpriority="high" />
      <span class="hero__tag">${esc(HERO_TAG)}</span>
    </h1>

    <div class="hero__base" id="heroBase">
      <p class="hero__blurb">Rust velvet, mirrored arches, a wall of cognac, and a sheet of drinks their crew keeps winning with. Twenty-two and up.</p>
      <div class="hero__acts">
        <a class="btn btn--main" href="#drinks">See the list</a>
        <a class="btn btn--ghost" href="${D.biz.booking}" rel="noopener" lang="is">Bóka borð</a>
      </div>
    </div>

    <p class="hero__scroll mono" id="heroHint" aria-hidden="true">SCROLL</p>
  </div>
</section>
</div>

<!-- ══════════ 2. ticker ══════════ -->
<section class="ticker" aria-hidden="true">
  <div class="ticker__skew" id="tickSkew"><div class="ticker__track" id="tickTrack"></div></div>
</section>

<!-- ══════════ 3. thesis ══════════ -->
<section class="thesis" id="about">
  <div class="thesis__grid">
    <div class="thesis__text">
      <p class="kicker mono">01 / THE SIGN ON THE WALL</p>
      <h2 class="h2">The neon says it<br /><em>before you sit down</em></h2>
      <p class="lead">Feeling tipsy. The room takes the old shopfront at Hafnarstræti 1-3 and lines it with rust velvet, pink curtains and mirrored arches full of cognac. A lounge built around one sheet of cocktails and the people who mix them.</p>
      <blockquote class="quote">
        <p lang="is">&bdquo;Hlökkum til að sjá þig&hellip; smá tipsý!&ldquo;</p>
        <footer>
          <span class="quote__who">The bar's own welcome</span>
          <span class="quote__src mono">TIPSYBAR.IS</span>
        </footer>
      </blockquote>
      <p class="thesis__gloss">Their menu credits four winning cocktails by name, their front page carries the BCA People's Choice, and the trophies stand on the back bar in their own photographs. None of that is on their website as text a search engine can read. Here it is.</p>
    </div>

    <ul class="facts">
      <li><span class="facts__n">11</span><span class="facts__l">Tipsý originals on the April sheet, from Violet Hill to Holtasóley</span></li>
      <li><span class="facts__n">4</span><span class="facts__l">Winning cocktails credited by name on the sheet itself</span></li>
      <li><span class="facts__n">20</span><span class="facts__l">Cognacs in the top-shelf collection, Polignac to Paradis</span></li>
      <li><span class="facts__n">50<sup>%</sup></span><span class="facts__l">Off every Tipsý cocktail on happy hour, every day 16–19</span></li>
    </ul>
  </div>

${fig('crew', 'THE CREW · UNDER THEIR OWN NEON', 'bleed--tall')}
</section>

<!-- ══════════ 4. the list — every drink pours its own glass ══════════ -->
<section class="drinks paper" id="drinks">
  <header class="sec-head">
    <p class="kicker mono">02 / THE LIST</p>
    <h2 class="h2">Every drink,<br />poured in front of you</h2>
    <p class="sec-head__note">Their menu lives in a PDF, so none of it can be read by a search engine, a screen reader or a phone without a download. Here it is as text. Every drink pours itself into its glass, one band per ingredient.</p>
  </header>

  <div class="sheet">
${course('sig', 'Tipsý kokteilar', '', D.signatures, dr => dr.long ? 'highball' : 'coupe')}
${course('cls', 'Klassískir · Classics', '', D.classics, dr => dr.glass)}
${course('zero', 'Án áfengis · Alcohol free', `${D.mocktails.price} kr.`, D.mocktails.items, dr => dr.long ? 'collins' : 'coupe', D.mocktails.price)}
  </div>

${fig('beet', 'FROM THE BAR · BEETROOT, ONE CUBE')}

  <p class="sheet__note">Names, ingredients and prices as printed on the bar's own April 2026 sheet. Glass shapes follow each drink's serve: long-topped drinks pour tall, the rest pour short; band colours are illustrative, not a recipe.</p>
</section>

<!-- ══════════ 5. the trophy shelf ══════════ -->
<section class="classics" id="wins">
  <header class="sec-head sec-head--mid">
    <p class="kicker mono">03 / THE TROPHY SHELF</p>
    <h2 class="h2">The sheet keeps<br />winning things</h2>
    <p class="sec-head__note">Five lines, all published by the bar itself: four winner credits printed on the drinks sheet, and the People's Choice on their front page.</p>
  </header>
  <div class="classics__grid">
${winsBlock}
  </div>
</section>

<!-- ══════════ 6. the lounge ══════════ -->
<section class="paintings" id="room">
  <header class="sec-head">
    <p class="kicker mono">04 / THE LOUNGE</p>
    <h2 class="h2">Rust velvet,<br /><em>pink curtains, neon</em></h2>
    <p class="sec-head__note">The room does the talking: scalloped velvet booths, curtains the colour of the logo, brass lamps on the bar and a script in neon on the brick.</p>
  </header>

${fig('neon', 'THE BAR TOP · UNDER THE SCRIPT', 'bleed--wide')}
${fig('velvet', 'THE BOOTHS · SCALLOPED VELVET')}
</section>

<!-- ══════════ 7. the top shelf rail ══════════ -->
<section class="crew" id="shelf">
  <div class="crew__pin" id="crewPin">
    <header class="crew__head">
      <p class="kicker mono">05 / THE TOP SHELF</p>
      <h2 class="h2">Bottles you scroll<br />along, not past</h2>
      <p class="crew__note">Eight pours off their own top-shelf and Eðalsafn pages. The wall of cognac in the photographs, as a list you can actually read. Prices per single, as printed.</p>
    </header>
    <ul class="crew__track" id="crewTrack">
${shelfBlock}
    </ul>
    <p class="crew__progress mono"><span id="crewCount">01</span> / ${n2(D.topShelf.length - 1)}</p>
  </div>
${fig('pour', 'THE STRAIN · ONE CUBE, ONE TIN')}
</section>

<!-- ══════════ 8. wine and bubbles ══════════ -->
<section class="cellar paper" id="cellar">
  <header class="sec-head">
    <p class="kicker mono">06 / WINE &amp; BUBBLES</p>
    <h2 class="h2">Moët to Krug,<br />Angelo to Barolo</h2>
    <p class="sec-head__note">The rest of the printed sheet, as text: house pours by the glass, bottles up to Cristal and Krug, and what's on the taps.</p>
  </header>
  <div class="cellar__grid">
${wineBlock}
  </div>
</section>

<!-- ══════════ 9. happy hour ══════════ -->
<section class="rent" id="happy" aria-labelledby="happy-h">
  <div class="rent__band">
    <p class="rent__eyebrow mono" lang="is">${esc(D.biz.happyHourIs)}</p>
    <h2 class="rent__big" id="happy-h">HAPPY HOUR<br />16 – 19</h2>
    <p class="rent__sub">Half price on every Tipsý cocktail on the sheet. Not some days. Every day.</p>
  </div>
</section>

<!-- ══════════ 10. visit ══════════ -->
<section class="visit" id="visit">
  <header class="sec-head">
    <p class="kicker mono">07 / VISIT</p>
    <h2 class="h2">Hafnarstræti 1-3,<br />from four o'clock</h2>
  </header>

  <div class="visit__grid">
    <div class="visit__col">
      <h3 class="visit__h">Opening hours</h3>
      <ul class="hrs">${hoursRows}</ul>
      <p class="visit__hh mono">HAPPY HOUR EVERY DAY 16–19 &middot; AGE LIMIT ${esc(D.biz.age)}</p>
    </div>
    <div class="visit__col">
      <h3 class="visit__h">Where</h3>
      <p class="visit__addr">${esc(D.biz.street)}<br />${esc(D.biz.postal)} ${esc(D.biz.city)}</p>
      <p class="visit__phone"><a href="tel:${D.biz.phoneHref}">${esc(D.biz.phone)}</a></p>
      <p class="visit__blurb">Tables for seven or more are booked by phone or e-mail; everything else through Dineout or by walking in.</p>
      <a class="btn btn--main" href="${D.biz.booking}" rel="noopener" lang="is">Bóka borð &middot; Dineout</a>
      <a class="btn btn--ghost" href="mailto:${D.biz.email}">${D.biz.email}</a>
      <a class="btn btn--ghost" href="https://www.instagram.com/${D.biz.instagram}" rel="noopener">@${D.biz.instagram}</a>
    </div>
  </div>

${fig('trio', 'THREE ON THE BAR')}
${fig('bar', 'THE TINS · RED LAMPS BEHIND')}
</section>

<!-- ══════════ 11. closer ══════════ -->
<section class="closer">
  <img class="closer__logo" src="assets/wordmark.svg" alt="Tipsý Bar &amp; Lounge" width="200" height="134" />
  <p class="closer__line" lang="is">Hlökkum til að sjá þig&hellip; smá tipsý!</p>
  <a class="btn btn--main" href="#drinks">See the list</a>
</section>

<footer class="foot">
  <p class="mono">${esc(D.biz.street)} &middot; ${esc(D.biz.postal)} ${esc(D.biz.city)} &middot; ${esc(D.biz.phone)}</p>
  <p class="mono"><a href="mailto:${D.biz.email}">${D.biz.email}</a></p>
  <p class="mono foot__note">Concept redesign by SNDR. Not affiliated with the bar. Drinks, prices, hours and awards transcribed from the bar's own published menu, graphics and website.</p>
</footer>

</main>

<script src="assets/vendor/lenis.min.js" defer></script>
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="app.js" defer></script>
</body>
</html>
`;

writeFileSync(join(ROOT, 'index.html'), html);
const drinks = D.signatures.length + D.classics.length + D.mocktails.items.length;
console.log(`index.html written — ${drinks} poured drinks, ${D.wins.length} trophy lines, ${D.topShelf.length} shelf bottles`);
