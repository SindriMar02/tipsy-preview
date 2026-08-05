/* ═══════════════════════════════════════════════════════════════════════════
   TIPSÝ BAR & LOUNGE — content source of truth.

   EVERY string here is either (a) taken verbatim from the bar's own
   published material, or (b) written by us and marked. Nothing is invented
   about the business.

   PRIMARY SOURCES
   ---------------
   • Cocktails, prices, winner credits — the bar's own drinks menu PDF,
     tipsybar.is/wp-content/uploads/2026/04/TIP-sedill-160426-web-1.pdf
     (published April 2026, the newest of the eleven menu PDFs in their
     WordPress uploads). Transcribed page by page.
   • Wine / champagne / beer / top shelf — same PDF, pages 12–27.
   • Hours, age limit, address, phone, e-mail, the BCA line, the sign-off —
     tipsybar.is front page, fetched 2026-08-05.
   • Happy hour offer — their own published graphic (uploads/2023/05/happy.png):
     "50% AFSLÁTTUR AF TIPSÝ KOKTEILUM ALLA DAGA 16–19".
   • Group bookings (7+) — their own Dineout page, dineout.is/tipsy.
   • Photographs — all from tipsybar.is's own WordPress media library.

   NOT CLAIMED ANYWHERE ON THE PAGE
   --------------------------------
   • Any opening year (company registered 12.05.2022 — kt. 490622-0630 —
     but registration is not an opening date, so neither is claimed).
   • Any staff name beyond the four the menu itself credits.
   • Any turnover, capacity or ranking beyond their own published awards.
   • Which drink in a photograph is which — captions describe only what is
     visibly in the frame.
   ═════════════════════════════════════════════════════════════════════════ */

export const biz = {
  name: 'Tipsý Bar & Lounge',
  street: 'Hafnarstræti 1-3',
  postal: '101',
  city: 'Reykjavík',
  phone: '546 6969',
  phoneHref: '+3545466969',
  email: 'tipsy@tipsybar.is',
  site: 'https://tipsybar.is',
  instagram: 'tipsybarrvk',
  booking: 'https://www.dineout.is/tipsy',
  age: '22',
  happyHour: '50% off Tipsý cocktails · every day 16–19',
  happyHourIs: '50% AFSLÁTTUR AF TIPSÝ KOKTEILUM · ALLA DAGA 16–19',
  hours: [
    ['Sun – Thu', '16:00', '01:00'],
    ['Fri – Sat', '16:00', '02:00']
  ]
};

/* Their printed sheet's own slips. Every correction evidenced, never guessed —
   the same rule the Jungle and Gilligogg builds used.                       */
export const CORRECTIONS = [
  ['Möet Champagne', 'Moët Champagne', 'spelling — Moët & Chandon’s own mark'],
  ['Camus Conac', 'Camus Cognac', 'spelling'],
  ['Angustura bitter', 'Angostura bitter', 'spelling — the bottle’s own label'],
  ['Maccallan', 'Macallan', 'spelling — the distillery’s own mark'],
  ['svavar helgi ernuson', 'Svavar Helgi Ernuson', 'capitalisation only; name kept as printed']
];

/* Illustrative ingredient colours. Stated as illustrative on the page,
   exactly as the Jungle and Gilligogg builds did.                          */
const C = {
  vodka:'#E7EAE4', gin:'#DDE4DA', pinkgin:'#E8B7C2', rum:'#A9743C', whiskey:'#B5772F',
  tequila:'#E3D9B0', cognac:'#8C4A1E', port:'#EDE2C0', calvados:'#C98A3A',
  champagne:'#EDE2B4', tonic:'#DDE7E4', soda:'#DCE6E6', gingerbeer:'#D9A845',
  beer0:'#E6C863', amaro:'#7E3220', aperol:'#E4622A', aperitivo:'#D65A3C',
  strega:'#D8C830', elderflower:'#E7E4BC', limoncello:'#EBC53C', sake:'#E9E4CE',
  lillet:'#E8C9C2', grandmarnier:'#D08A2E', vermouth:'#B4713F', campari:'#C0202B',
  bitter:'#B23A2A', brennivin:'#DCE3D4', lychee:'#EFE0D2', kahlua:'#5A3018',
  coffee:'#3C2412', lemon:'#E9D451', lime:'#8FBE3A',
  redcabbage:'#8E5A9E', carrot:'#E68A2E', pineapple:'#E6B93A', vanilla:'#EFE3C2',
  raspberry:'#C43A55', peach:'#EFB98A', jalapeno:'#5E9C3A', habanero:'#E06A2A',
  piquillo:'#C93A2A', amarillo:'#E6C23A', beetroot:'#A62A4E', honey:'#DCA83A',
  chili:'#C0392B', mango:'#EFB43A', apple:'#B9CE55', coriander:'#6E9C43',
  strawberry:'#C93A4A', goji:'#C25A32', cheese:'#EFE3B4', marmalade:'#E09A3A',
  passion:'#E6A23A', cherryplum:'#B4485A', soy:'#4A2A1E', olive:'#8A8A4A',
  basil:'#6E9C43', foamer:'#EFE7D4', sugar:'#EDE8D8',
  tajin:'#C05A2A', bourbon:'#B5772F', amaretto:'#9A5A2C', cointreau:'#E1A24E'
};

/* ── the Tipsý cocktails ────────────────────────────────────────────────────
   Verbatim from the April 2026 sheet, including each drink's own price.
   The glass is DERIVED, never chosen: a drink their sheet tops with tonic,
   ginger beer, soda or 0% beer pours long; everything else pours short.    */
export const signatures = [
  { n:'Violet Hill', p:'3.390',
    ing:[['Limoncello',C.limoncello],['Moët Champagne',C.champagne],['Red cabbage',C.redcabbage],['Lemon',C.lemon]] },
  { n:'G.K.', p:'3.490',
    ing:[['Finlandia vodka',C.vodka],['Bacardi seal rum',C.rum],['Carrot',C.carrot],['Pineapple',C.pineapple],['Vanilla',C.vanilla],['Lemon',C.lemon],['Foamer',C.foamer]] },
  { n:'Tipsý Queen', p:'3.490', long:true,
    ing:[['Tanqueray gin',C.gin],['Raspberries',C.raspberry],['Elderflower',C.elderflower],['Vanilla',C.vanilla],['Peach',C.peach],['Tonic',C.tonic]] },
  { n:'Major Pepper', p:'3.490',
    ing:[['Casamigos Reposado Tequila',C.tequila],['Aperol',C.aperol],['Jalapeño',C.jalapeno],['Habanero',C.habanero],['Piquillo',C.piquillo],['Amarillo',C.amarillo],['Lime',C.lime]] },
  { n:'Greenopolitan', p:'3.490',
    ing:[['Ginger & chive vodka',C.vodka],['Liquore Strega',C.strega],['Elderflower liqueur',C.elderflower],['Lemon',C.lemon]] },
  { n:'Bullseye', p:'3.390',
    ing:[['Beefeater pink gin',C.pinkgin],['Aperitivo blend',C.aperitivo],['Beetroot',C.beetroot],['Lime',C.lime]] },
  { n:'Fantaisie Française', p:'3.490',
    ing:[['Primadonna cheese',C.cheese],['Noisette-butter-washed Camus Cognac',C.cognac],['Montenegro amaro',C.amaro],['Marmalade cordial',C.marmalade]] },
  { n:'Bonsai Boi', p:'3.490',
    ing:[['Graham’s white port',C.port],['Calvados',C.calvados],['Green apple',C.apple],['Coriander',C.coriander],['Lemon',C.lemon]] },
  { n:'Golden Ratio', p:'3.490',
    ing:[['Lillet rosé',C.lillet],['Grand Marnier',C.grandmarnier],['Sake',C.sake],['Strawberry',C.strawberry],['Goji berry',C.goji]] },
  { n:'Letty', p:'3.490',
    ing:[['Flóki whiskey',C.whiskey],['Amaro',C.amaro],['Aperol',C.aperol],['Honey',C.honey],['Chili',C.chili],['Mango',C.mango],['Lemon',C.lemon]] },
  { n:'Holtasóley', p:'3.690',
    ing:[['Brennivín',C.brennivin],['Lychee liqueur',C.lychee],['Tajín & mango cordial',C.tajin],['Lemon',C.lemon]] }
];

/* Their classics, one bilingual group on the sheet (KLASSÍSKIR kokteilar /
   CLASSIC cocktails). Each drink pours in its classic serve: the sours and
   the Old Fashioned on the rock, everything stemmed in the coupe.          */
export const classics = [
  { n:'Whiskey Sour', p:'3.490', glass:'rocks',
    ing:[['Woodford Bourbon',C.bourbon],['Angostura bitter',C.bitter],['Lemon',C.lemon],['Foamer',C.foamer]] },
  { n:'Basil Gimlet', p:'3.490', glass:'coupe',
    ing:[['Tanqueray Gin',C.gin],['Basil',C.basil],['Lime',C.lime]] },
  { n:'Negroni', p:'3.490', glass:'rocks',
    ing:[['Beefeater Gin',C.gin],['Campari',C.campari],['Antica Formula sweet vermouth',C.vermouth]] },
  { n:'Martini', p:'3.490', glass:'coupe',
    ing:[['Tanqueray No. 10 Gin',C.gin],['Belsazar dry vermouth',C.vermouth],['Olive',C.olive]] },
  { n:'Pornstar Martini', p:'3.490', glass:'coupe',
    ing:[['Absolut vanilla vodka',C.vodka],['Passion fruit',C.passion],['Lime',C.lime]] },
  { n:'Amaretto Sour', p:'3.490', glass:'rocks',
    ing:[['Bourbon',C.bourbon],['Amaretto',C.amaretto],['Lemon',C.lemon],['Sugar',C.sugar],['Foamer',C.foamer]] },
  { n:'Margarita', p:'3.490', glass:'coupe',
    ing:[['Don Julio Blanco Tequila',C.tequila],['Cointreau',C.cointreau],['Lime',C.lime]] },
  { n:'Sidecar', p:'3.490', glass:'coupe',
    ing:[['Hennessy VSOP Cognac',C.cognac],['Angostura bitter',C.bitter],['Cointreau',C.cointreau],['Lemon',C.lemon]] },
  { n:'Espresso Martini', p:'3.390', glass:'coupe',
    ing:[['Finlandia vodka',C.vodka],['Kahlúa',C.kahlua],['Coffee',C.coffee]] },
  { n:'Manhattan', p:'3.490', glass:'coupe',
    ing:[['Bulleit Rye Whiskey',C.whiskey],['Antica Formula sweet vermouth',C.vermouth],['Angostura bitter',C.bitter]] },
  { n:'Monkey Old Fashioned', p:'3.590', glass:'rocks',
    ing:[['Monkey Shoulder',C.whiskey],['Angostura bitter',C.bitter],['Sugar',C.sugar]] }
];

/* ÁN ÁFENGIS · alcohol free — one price for the course, their own wording. */
export const mocktails = {
  price:'2.290',
  items:[
    { n:'Sunshine Boulevard', long:true,
      ing:[['Passion fruit',C.passion],['Elderflower',C.elderflower],['Cherry plum',C.cherryplum],['Soy sauce',C.soy],['Peroni 0%',C.beer0]] },
    { n:'Cruella',
      ing:[['Bitter aperitif',C.bitter],['Cherry blossom tonic',C.tonic],['Olive brine',C.olive],['Lemon',C.lemon]] },
    { n:'Tipsý Temple', long:true,
      ing:[['Strawberry syrup',C.strawberry],['Lemon',C.lemon],['Basil',C.basil],['Soy sauce',C.soy],['Ginger beer & 7up',C.gingerbeer]] }
  ]
};

/* ── the trophy shelf ───────────────────────────────────────────────────────
   The sheet itself credits four winning cocktails by name; the front page
   claims the BCA People's Choice. All five lines verbatim from those two
   sources — nothing added, nothing ranked by us.                           */
export const wins = [
  { title:'People’s Choice', event:'BCA 2026', who:'Tipsý Bar & Lounge',
    src:'THEIR FRONT PAGE, 2026' },
  { title:'Vinningskokteill', event:'Barlady 2024', who:'Helga Signý Sveinsdóttir',
    src:'AS CREDITED ON THE SHEET' },
  { title:'Vinningskokteill', event:'RCW 2026', who:'Svavar Helgi Ernuson',
    src:'AS CREDITED ON THE SHEET' },
  { title:'Vinningskokteill', event:'Graham’s Blend Series 2023', who:'Sævar Helgi Örnólfsson',
    src:'AS CREDITED ON THE SHEET' },
  { title:'Vinningskokteill', event:'Reykjavík Cocktail Weekend 2023', who:'Sævar Helgi Örnólfsson',
    src:'AS CREDITED ON THE SHEET' }
];

/* ── the top shelf rail ─────────────────────────────────────────────────────
   Eight bottles from their own "top shelf collection" and "Eðalsafn" pages,
   names and single-pour prices verbatim.                                   */
export const topShelf = [
  { cat:'Cognac',    n:'Hennessy Paradis Extra Rare', p:'17.900' },
  { cat:'Cognac',    n:'Martell Chanteloup XXO',      p:'9.990'  },
  { cat:'Whisky',    n:'Macallan Double Cask 30 ára', p:'39.000' },
  { cat:'Whisky',    n:'Macallan Sherry Oak 25 ára',  p:'19.000' },
  { cat:'Whisky',    n:'Johnnie Walker Blue Label',   p:'5.490'  },
  { cat:'Tequila',   n:'Clase Azul Añejo',            p:'9.990'  },
  { cat:'Champagne', n:'Krug',                        p:'75.900' },
  { cat:'Champagne', n:'Louis Roederer Cristal',      p:'75.000' }
];

/* ── wine, bubbles, beer ──────────────────────────────────────────────────── */
export const wine = {
  house: {
    white: [
      ['Angelo','Pinot Grigio','Italy','1.890','8.500'],
      ['La Baume','Sauvignon Blanc','France','1.990','9.500'],
      ['Petit Chablis La Chablisienne','Chardonnay','France','2.590','11.900']
    ],
    red: [
      ['Angelo Montepulciano d’Abruzzo','Montepulciano','Italy','1.890','8.590'],
      ['Trivento Golden Reserve','Malbec','Argentina','2.390','10.900'],
      ['Louis Jadot Bourgogne','Pinot Noir','France','2.590','11.900']
    ],
    rose: [
      ['La Baume Pinot Noir','Pinot Noir','France','1.890','8.500'],
      ['Muga Rosé','Grenache','Spain','1.990','8.900']
    ],
    sparkling: [
      ['Piccini Prosecco','','Italy','1.790','7.490'],
      ['Cava Delapierre','','Spain','1.790','7.490']
    ],
    champagne: [
      ['Moët','','France, Champagne','2.490','14.900'],
      ['Moët Rosé','','France, Champagne','2.790','16.900'],
      ['Veuve Clicquot','','France, Champagne','2.790','16.900']
    ]
  },
  bottles: {
    red: [
      ['Chateau Tour de Capet','Cabernet Franc, Merlot','France','13.990'],
      ['Muga Reserva','Tempranillo','Spain','14.900'],
      ['Trapiche Gran Medalla','Malbec','Argentina','15.900'],
      ['Prunotto Barolo','Nebbiolo','Italy','21.900']
    ],
    white: [
      ['Arthur Metz','Pinot Gris','France','9.500'],
      ['Laroche Chablis','Chardonnay','France','13.500'],
      ['Henri Bourgeois Sancerre','Sauvignon Blanc','France','16.500'],
      ['Bouchard Ainé & Fils Pouilly-Fuissé','Chardonnay','France','16.900']
    ],
    champagne: [
      ['G.H. Mumm Cordon Rouge Brut','','France, Champagne','16.900'],
      ['Veuve Clicquot Rosé','','France, Champagne','18.900'],
      ['Dom Pérignon','','France, Champagne','59.900'],
      ['Dom Pérignon Rosé','','France, Champagne','65.000'],
      ['Perrier-Jouët Belle Époque','','France, Champagne','65.000'],
      ['Louis Roederer Cristal','','France, Champagne','75.000'],
      ['Krug','','France, Champagne','75.900']
    ]
  },
  beer: {
    draft: [
      ['Peroni','','á krana · draft','1.790'],
      ['Úlfrún','','á krana · draft','1.890'],
      ['Snorri','','á krana · draft','1.890'],
      ['Corona','','á krana · draft','1.790']
    ]
  }
};

/* Photographs — all the bar's own, from their WordPress media library.
   Captions describe only what is visibly in the frame; no photograph is
   claimed to show a specific named drink.                                  */
export const photos = {
  hero:      { src:'assets/img/hero.webp', w:2000, h:1494,
               alt:'Two bartenders in tweed waistcoats at the Tipsý bar, cocktail trophies on the brass counter between them and the lit cognac shelf rising behind in mirrored arches.' },
  crew:      { src:'assets/img/crew.webp', w:2000, h:1334,
               alt:'Five of the Tipsý crew shoulder to shoulder under the pink neon script on the brick wall, trophies and bottles on the shelves beside them.' },
  pour:      { src:'assets/img/pour.webp', w:2000, h:1335,
               alt:'A bartender in a tweed waistcoat straining a drink from an etched tin into a rocks glass over one large clear cube.' },
  neon:      { src:'assets/img/neon.webp', w:1200, h:800,
               alt:'A stemmed coupe with a toasted garnish on the bar top, brass lamps either side and the red neon script glowing out of focus behind.' },
  velvet:    { src:'assets/img/velvet.webp', w:1920, h:2560,
               alt:'The scalloped rust-velvet banquette against the pink curtains, an embroidered tiger cushion in the corner of the seat.' },
  trio:      { src:'assets/img/trio.webp', w:1200, h:800,
               alt:'Three drinks lined up along the bar: a red one over ice, an amber one over a clear cube, and a tall-stemmed coupe with a cherry.' },
  bar:       { src:'assets/img/bar.webp', w:2000, h:1335,
               alt:'A hand resting on a rocks glass at the bar, etched shaker tins catching the light and red lamps burning in the dark behind.' },
  beet:      { src:'assets/img/beet.webp', w:1200, h:800,
               alt:'A deep red drink over one large cube, topped with a candy-striped slice of beetroot, on a pale coaster on the wooden bar.' },
  strawberry:{ src:'assets/img/strawberry.webp', w:2000, h:1335,
               alt:'A salt-rimmed glass of a strawberry-red drink, half a strawberry perched on the rim, on a Tipsý coaster.' }
};
