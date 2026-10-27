/* =========================================================================
   CONTENT.JS
   -------------------------------------------------------------------------
   Every editable fact about the site lives here, in two languages. Change
   text, links, years and numbers here — you should not need to touch the
   HTML or CSS to update content later.

   Structure: SITE_I18N.en and SITE_I18N.cs hold identical shapes with
   translated strings. LANG / SITE are computed once at the bottom from the
   saved preference (localStorage "lang", default "en") and every page's
   script just uses the global SITE as before.
   ========================================================================= */

const SITE_I18N = {

  en: {
    name: "Jan Fridrich",
    monogram: "JF.",
    tagline: "Finance / Entrepreneurship / Events / Ideas",
    year: new Date().getFullYear(),

    links: {
      email: "hello@janfridrich.com",
      linkedin: "https://www.linkedin.com/in/jan-fridrich",
      instagram: "https://www.instagram.com/janfridrich",
      cv: "#"
    },

    nav: [
      { label: "About",    href: "about.html",    n: "01" },
      { label: "Work",     href: "work.html",      n: "02" },
      { label: "Projects", href: "projects.html",  n: "03" },
      { label: "Journey",  href: "journey.html",   n: "04" },
      { label: "Contact",  href: "contact.html",   n: "05" }
    ],

    logoWall: [
      {
        label: "Industry & Business",
        logos: [
          { name: "Alufen", src: "assets/logos/alufen.svg", href: "https://alufen.cz" },
          { name: "Eteron Group", src: "assets/logos/eteron-group.png", href: "https://eterongroup.com" }
        ]
      },
      {
        label: "Festivals",
        logos: [
          { name: "Veselá Fest", src: "assets/logos/vesela-fest.svg", href: "https://veselafest.cz", height: 48 }
        ]
      },
      {
        label: "Personal projects",
        logos: [
          { name: "John Freed", src: "assets/logos/john-freed.png", href: "#" }
        ]
      },
      {
        label: "Work Experience",
        logos: [
          { name: "Tatra Trucks", src: "assets/logos/tatra.png" },
          { name: "Excalibur Army", src: "assets/logos/excalibur-army.png" },
          { name: "Mattoni 1873", src: "assets/logos/mattoni-1873.svg" },
          { name: "Schott", src: "assets/logos/schott.png" },
          { name: "CSG Land Systems", src: "assets/logos/csg-land-systems.png" }
        ]
      }
    ],

    world: [
      { id: "vesela-fest", label: "VESELÁ FEST", meta: "FESTIVAL", desc: "An idea that grew from 120 people to thousands.", href: "https://veselafest.cz", logo: "assets/logos/vesela-fest.svg", external: true },
      { id: "alufen", label: "ALUFEN", meta: "BUSINESS", desc: "From drawing to reality.", href: "https://alufen.cz", logo: "assets/logos/alufen.svg", external: true },
      { id: "eteron", label: "ETERON GROUP", meta: "BUSINESS", desc: "A wider view of the businesses and ideas around me.", href: "https://eterongroup.com", logo: "assets/logos/eteron-group.png", external: true },
      { id: "work", label: "WORK EXPERIENCE", meta: "FINANCE / OPERATIONS", desc: "Where numbers meet decisions.", href: "work.html", external: false }
    ],

    numbers: [
      { value: 2019, suffix: "", label: "Veselá Fest founded" },
      { value: 1810, suffix: "+", label: "Festival visitors" },
      { value: 10, suffix: "th in Europe", label: "emlyon business school" },
      { value: null, display: "∞", label: "Excel tabs created", note: "yes, probably too many." }
    ],

    projectsPreview: [
      { n: "01", title: "Veselá Fest", tag: "Festivals / Ongoing", href: "projects/vesela-fest.html" },
      { n: "02", title: "Alufen", tag: "Business / Ongoing", href: "projects/alufen.html" },
      { n: "03", title: "Eteron Group", tag: "Business / Ongoing", href: "projects/eteron-group.html" }
    ],

    experience: [
      {
        company: "Veselá Fest",
        role: "Founder / Organisation / Finance",
        period: "2019 — present",
        focus: ["Founder", "Finance", "Strategy", "Production"],
        description: "An idea that started with around 120 people and grew into a festival attracting thousands.",
        logo: "assets/logos/vesela-fest.svg",
        sketch: "assets/sketch-vesela-fest.png",
        sketchAlt: "Sketch of the Veselá Fest stage and crowd"
      },
      {
        company: "Alufen",
        role: "Business Development / Operations",
        period: "2023",
        focus: ["Business development", "Operations", "Digitalisation", "Customer experience"],
        description: "Working between business development, digitalisation, customer experience and real-world process improvement.",
        logo: "assets/logos/alufen.svg",
        sketch: "assets/sketch-alufen.png",
        sketchAlt: "Technical sketch of an aluminium pergola"
      },
      {
        company: "Tatra Trucks",
        role: "Finance",
        period: "2024",
        focus: ["Financial analysis", "Working capital", "VAT group analysis"],
        description: "Financial analysis, working capital and VAT group analysis in a company with serious history.",
        logo: "assets/logos/tatra.png",
        sketch: "assets/sketch-tatra.png",
        sketchAlt: "Technical sketch of a Tatra Trucks vehicle"
      },
      {
        company: "Schott Termofrost",
        role: "Finance & Process Engineering",
        period: "2025",
        focus: ["Customer profitability", "Power BI", "Financial modelling", "Process digitalisation"],
        description: "Customer profitability, Power BI, financial modelling and process digitalisation.",
        logo: "assets/logos/schott.png",
        sketch: "assets/sketch-schott.png",
        sketchAlt: "Technical sketch of a refrigerated display cabinet"
      },
      {
        company: "Mattoni 1873",
        role: "Strategic Marketing",
        period: "2025",
        focus: ["Strategic marketing", "Brand", "Market analysis"],
        description: "A closer look at how a well-known consumer brand plans and positions itself, from the marketing side of the table.",
        logo: "assets/logos/mattoni-1873.svg",
        sketch: "assets/sketch-mattoni.png",
        sketchAlt: "Technical sketch of Mattoni bottles"
      },
      {
        company: "Excalibur Army",
        role: "Purchasing / Strategic Projects / Analytics",
        period: "2026",
        focus: ["Purchasing", "Strategy", "Analytics"],
        description: "A first look at the connection between operations, numbers and strategic work.",
        logo: "assets/logos/excalibur-army.png",
        sketch: "assets/sketch-excalibur.png",
        sketchAlt: "Technical sketch of a military vehicle"
      },
      {
        company: "Eteron Group",
        role: "Business / Strategy",
        period: "2026 — present",
        focus: ["Business", "Strategy", "Projects"],
        description: "A growing group of businesses and ideas — a wider view of how things connect and move forward.",
        logo: "assets/logos/eteron-group.png",
        sketch: "assets/sketch-eteron.png",
        sketchAlt: "Process diagram of a holiday recording workflow"
      },
      {
        company: "CSG Land Systems",
        role: "Financial Analyst",
        period: "2026 — present",
        focus: ["Market analysis", "Financial analysis", "M&A / due diligence", "Financial modelling", "Strategic projects"],
        description: "Understanding markets, companies and decisions from the inside. The useful kind of finance: the kind that helps move something forward.",
        logo: "assets/logos/csg-land-systems.png",
        sketch: "assets/sketch-csg.png",
        sketchAlt: "Technical sketch of a military land systems vehicle"
      }
    ],

    currently: [
      { label: "Working", value: "Financial analysis & strategy" },
      { label: "Building", value: "Businesses & digital projects" },
      { label: "Running", value: "Veselá Fest" },
      { label: "Studying", value: "Global BBA" },
      { label: "Exploring", value: "Whatever looks interesting next" }
    ],

    timeline: [
      { year: "2019", label: "Veselá Fest begins", note: "started with an idea" },
      { year: "2023", label: "France / Grenoble", note: "" },
      { year: "2024", label: "Tatra Trucks", note: "" },
      { year: "2025", label: "Schott / Lyon", note: "" },
      { year: "2026", label: "CSG Land Systems", note: "" }
    ],

    education: [
      { school: "Grenoble École de Management", program: "International BBA", period: "2023–2025", place: "Grenoble, France" },
      { school: "emlyon business school", program: "Global BBA", period: "2025–2027", place: "France" }
    ],

    /* Journey page map. `id` must match a city key in js/europe-map.js
       (valmez, ostrava, lyon, praha, sternberk, koprivnice). */
    journey: {
      route: [
        { id: "valmez",  name: "Gymnázium Valašské Meziříčí", place: "Valašské Meziříčí", years: "2017–2019", kind: "", badges: [] },
        { id: "ostrava", name: "Mezinárodní gymnázium",       place: "Ostrava",           years: "2019–2023", kind: "",
          badges: [
            { icon: "ib",       label: "International Baccalaureate" },
            { icon: "maturita", label: "Czech state maturita" }
          ] },
        { id: "lyon",    name: "emlyon business school",      place: "Lyon, France",      years: "2025–2027", kind: "Global BBA", badges: [] }
      ],
      ui: {
        eyebrow: "The route",
        heading: "FROM VALAŠSKO<br>TO LYON.",
        czechia: "CZECHIA",
        viewEurope: "Europe",
        viewCzechia: "Czechia",
        viewRoute: "Route",
        replay: "Replay",
        mapTitle: "Map of Europe with Jan's route",
        mapDesc: "A route from Gymnázium Valašské Meziříčí through the Mezinárodní gymnázium in Ostrava to emlyon business school in Lyon."
      }
    },

    festivalGrowth: [
      { year: 2019, visitors: 120 },
      { year: 2020, visitors: 350 },
      { year: 2021, visitors: 700 },
      { year: 2022, visitors: 950 },
      { year: 2023, visitors: 1200 },
      { year: 2024, visitors: 1350 },
      { year: 2025, visitors: 1600 },
      { year: 2026, visitors: 1810 }
    ],

    projects: {
      "vesela-fest": {
        title: "Veselá Fest",
        category: "Festival",
        year: "2019 —",
        role: "Co-founder / Finance / Organisation",
        status: "LIVE",
        cover: "assets/project-vesela-fest.jpg",
        externalUrl: "https://veselafest.cz",
        externalLabel: "Visit veselafest.cz",
        intro: "Started in 2019 as a garden party with a stage built from wooden pallets and around 120 people. Now it's a full one-day festival in the Valašsko region with over 1,800 visitors.",
        story: [
          "It began as a shared idea between me and Adam Kubját: put on a proper event in the village of Veselá, with a lineup we'd actually want to see, and give young local acts a stage they couldn't find anywhere else. The first edition took about two weeks to prepare — a stage hammered together from pallets, a few kegs of beer, a hundred sausages, and roughly a hundred nervous people watching us play our own sets.",
          "That first night was enough to know we wanted to keep going. We moved from the garden to the current Areál TJ Veselá, invested in a proper stage, and started inviting other performers. 2021 brought the festival's first real milestone — 700 people — and the tradition of a signed festival board every year since.",
          "2022 added a second stage, a partnership with Bernard brewery and close to 1,000 visitors. 2023 brought the first overnight camping village for the most dedicated crowd. 2024 was the turning point: Pavel Callta headlined, the branding got a proper professional refresh, and the festival stepped up to a level we hadn't operated at before.",
          "By 2025 the site was described as \"a perfect summer refuge for every generation,\" with a dedicated game zone alongside the music and food. The 2026 edition — the eighth — is headlined by Michal Hrůza, and the early-bird tickets sold out fast."
        ],
        responsibilities: ["Co-founder", "Finance", "Organisation", "Strategy", "Production"]
      },
      "alufen": {
        title: "Alufen",
        category: "Business",
        year: "Ongoing",
        role: "Founder",
        status: "LIVE",
        cover: "assets/project-alufen.jpg",
        externalUrl: "https://alufen.cz",
        externalLabel: "Visit alufen.cz",
        intro: "A family business based in Valašské Meziříčí, building aluminium fences, pergolas, winter gardens, gates and shading — made to order, exported across the Czech Republic.",
        story: [
          "Alufen came from a straightforward observation: people renovating their homes wanted a fence or a pergola that actually looked designed, not just functional — and aluminium made that possible without the maintenance headache of wood or the rust of steel.",
          "\"I founded Alufen mainly out of a need to offer a quality product to every customer who wants a modern take on their home and garden,\" is how I put it on the company's own site — and it's still the honest version. Every panel is made to order in our own workshop, then delivered and installed by the same team, end to end.",
          "The catalogue has grown from fences into pergolas (several product lines, including our own Alufen line alongside Aluxe and Isotra), winter gardens, aluminium and iron gates, carports and shading — awnings, blinds and screen roller shutters. The pitch is simple: aluminium doesn't rust like steel and doesn't rot like wood, so the fence still looks new years after installation.",
          "Day to day, most of the actual work here is unglamorous by design: quoting fast, keeping lead times honest, and making sure the five-step process — free consultation, no-obligation quote, custom project documentation, careful manufacturing, fast installation — holds up under real demand."
        ],
        responsibilities: ["Founder", "Business development", "Operations", "Product", "Customer experience"]
      },
      "eteron-group": {
        title: "Eteron Group",
        category: "Business / Software",
        year: "2026 —",
        role: "Co-founder",
        status: "LIVE",
        cover: "assets/project-eteron.jpg",
        externalUrl: "https://eterongroup.com",
        externalLabel: "Visit eterongroup.com",
        intro: "Engineering better businesses — automation, dashboards and internal systems built for Czech companies still running on Excel and phone calls.",
        story: [
          "Eteron Group started from a simple, slightly uncomfortable observation: most Czech mid-sized companies are still operating on processes that Western European and American companies moved on from a decade or two ago. Excel instead of systems. Phone calls instead of workflows. Monthly reports instead of live data.",
          "I co-founded it with Jan Kuča, who brings data analytics and reporting experience from Gothenburg and Czech industry; I bring the finance and international business side from Emlyon and Grenoble. Together we translate that outside perspective into something that actually fits how Czech companies run.",
          "The work sits in four areas: automation of the processes that slow a company down the most, dashboards that put the right numbers in front of the right people, internal tools and portals built around how a team actually works, and the unglamorous but essential job of cleaning up the underlying data so any of the above is possible.",
          "One recent example: a full marketing website and digital presence for a regional earthworks contractor — the kind of client who previously ran entirely on referrals and a phone number. Small business, real impact: a professional web presence and a clearer path from inquiry to job."
        ],
        responsibilities: ["Co-founder", "Automation", "Dashboards", "Internal tools", "Data foundations"]
      },
      "digital": {
        title: "Digital Projects",
        category: "Tools / Experiments",
        year: "Ongoing",
        role: "Various",
        status: "EXPERIMENT",
        externalUrl: "#",
        externalLabel: "",
        intro: "Smaller tools and experiments — data, dashboards, automation, whatever the current problem calls for.",
        story: [
          "Not every idea deserves its own company. Some just need a weekend, a dataset and a reason to open Power BI again. This is where those live — data tools, small automations and business utilities, still experimenting.",
          "Some of these will grow into something bigger. Some will stay exactly this size. Both outcomes are fine."
        ],
        responsibilities: ["Data", "Power BI", "Apps", "Automation", "Business tools"]
      }
    }
  },

  cs: {
    name: "Jan Fridrich",
    monogram: "JF.",
    tagline: "Finance / Podnikání / Akce / Nápady",
    year: new Date().getFullYear(),

    links: {
      email: "hello@janfridrich.com",
      linkedin: "https://www.linkedin.com/in/jan-fridrich",
      instagram: "https://www.instagram.com/janfridrich",
      cv: "#"
    },

    nav: [
      { label: "O mně",    href: "about.html",    n: "01" },
      { label: "Práce",    href: "work.html",      n: "02" },
      { label: "Projekty", href: "projects.html",  n: "03" },
      { label: "Cesta",    href: "journey.html",   n: "04" },
      { label: "Kontakt",  href: "contact.html",   n: "05" }
    ],

    logoWall: [
      {
        label: "Průmysl a byznys",
        logos: [
          { name: "Alufen", src: "assets/logos/alufen.svg", href: "https://alufen.cz" },
          { name: "Eteron Group", src: "assets/logos/eteron-group.png", href: "https://eterongroup.com" }
        ]
      },
      {
        label: "Festivaly",
        logos: [
          { name: "Veselá Fest", src: "assets/logos/vesela-fest.svg", href: "https://veselafest.cz", height: 48 }
        ]
      },
      {
        label: "Osobní projekty",
        logos: [
          { name: "John Freed", src: "assets/logos/john-freed.png", href: "#" }
        ]
      },
      {
        label: "Pracovní zkušenosti",
        logos: [
          { name: "Tatra Trucks", src: "assets/logos/tatra.png" },
          { name: "Excalibur Army", src: "assets/logos/excalibur-army.png" },
          { name: "Mattoni 1873", src: "assets/logos/mattoni-1873.svg" },
          { name: "Schott", src: "assets/logos/schott.png" },
          { name: "CSG Land Systems", src: "assets/logos/csg-land-systems.png" }
        ]
      }
    ],

    world: [
      { id: "vesela-fest", label: "VESELÁ FEST", meta: "FESTIVAL", desc: "Nápad, který narostl ze 120 lidí na tisíce.", href: "https://veselafest.cz", logo: "assets/logos/vesela-fest.svg", external: true },
      { id: "alufen", label: "ALUFEN", meta: "BYZNYS", desc: "Od výkresu ke skutečnosti.", href: "https://alufen.cz", logo: "assets/logos/alufen.svg", external: true },
      { id: "eteron", label: "ETERON GROUP", meta: "BYZNYS", desc: "Širší pohled na firmy a nápady kolem mě.", href: "https://eterongroup.com", logo: "assets/logos/eteron-group.png", external: true },
      { id: "work", label: "PRACOVNÍ ZKUŠENOSTI", meta: "FINANCE / PROVOZ", desc: "Kde se čísla potkávají s rozhodnutími.", href: "work.html", external: false }
    ],

    numbers: [
      { value: 2019, suffix: "", label: "Založena Veselá Fest" },
      { value: 1810, suffix: "+", label: "Návštěvníků festivalu" },
      { value: 10, suffix: ". v Evropě", label: "emlyon business school" },
      { value: null, display: "∞", label: "Vytvořených Excel tabů", note: "no jasně, asi až moc." }
    ],

    projectsPreview: [
      { n: "01", title: "Veselá Fest", tag: "Festivaly / Probíhá", href: "projects/vesela-fest.html" },
      { n: "02", title: "Alufen", tag: "Byznys / Probíhá", href: "projects/alufen.html" },
      { n: "03", title: "Eteron Group", tag: "Byznys / Probíhá", href: "projects/eteron-group.html" }
    ],

    experience: [
      {
        company: "Veselá Fest",
        role: "Zakladatel / Organizace / Finance",
        period: "2019 — dosud",
        focus: ["Zakladatel", "Finance", "Strategie", "Produkce"],
        description: "Nápad, který začal s asi 120 lidmi a vyrostl ve festival přitahující tisíce.",
        logo: "assets/logos/vesela-fest.svg",
        sketch: "assets/sketch-vesela-fest.png",
        sketchAlt: "Skica pódia a davu na Veselé Fest"
      },
      {
        company: "Alufen",
        role: "Rozvoj byznysu / Provoz",
        period: "2023",
        focus: ["Rozvoj byznysu", "Provoz", "Digitalizace", "Zákaznická zkušenost"],
        description: "Práce mezi rozvojem byznysu, digitalizací, zákaznickou zkušeností a reálným zlepšováním procesů.",
        logo: "assets/logos/alufen.svg",
        sketch: "assets/sketch-alufen.png",
        sketchAlt: "Technická skica hliníkové pergoly"
      },
      {
        company: "Tatra Trucks",
        role: "Finance",
        period: "2024",
        focus: ["Finanční analýza", "Pracovní kapitál", "Analýza DPH skupiny"],
        description: "Finanční analýza, pracovní kapitál a analýza DPH skupiny ve firmě s bohatou historií.",
        logo: "assets/logos/tatra.png",
        sketch: "assets/sketch-tatra.png",
        sketchAlt: "Technická skica vozidla Tatra Trucks"
      },
      {
        company: "Schott Termofrost",
        role: "Finance a procesní inženýrství",
        period: "2025",
        focus: ["Zisková marže zákazníků", "Power BI", "Finanční modelování", "Digitalizace procesů"],
        description: "Zisková marže zákazníků, Power BI, finanční modelování a digitalizace procesů.",
        logo: "assets/logos/schott.png",
        sketch: "assets/sketch-schott.png",
        sketchAlt: "Technická skica chladicí vitríny"
      },
      {
        company: "Mattoni 1873",
        role: "Strategický marketing",
        period: "2025",
        focus: ["Strategický marketing", "Značka", "Analýza trhu"],
        description: "Bližší pohled na to, jak známá spotřebitelská značka plánuje a pozicuje sama sebe — z marketingové strany stolu.",
        logo: "assets/logos/mattoni-1873.svg",
        sketch: "assets/sketch-mattoni.png",
        sketchAlt: "Technická skica lahví Mattoni"
      },
      {
        company: "Excalibur Army",
        role: "Nákup / Strategické projekty / Analytika",
        period: "2026",
        focus: ["Nákup", "Strategie", "Analytika"],
        description: "První pohled na propojení provozu, čísel a strategické práce.",
        logo: "assets/logos/excalibur-army.png",
        sketch: "assets/sketch-excalibur.png",
        sketchAlt: "Technická skica vojenského vozidla"
      },
      {
        company: "Eteron Group",
        role: "Byznys / Strategie",
        period: "2026 — dosud",
        focus: ["Byznys", "Strategie", "Projekty"],
        description: "Rostoucí skupina firem a nápadů — širší pohled na to, jak se věci propojují a posouvají vpřed.",
        logo: "assets/logos/eteron-group.png",
        sketch: "assets/sketch-eteron.png",
        sketchAlt: "Procesní diagram evidence dovolené"
      },
      {
        company: "CSG Land Systems",
        role: "Finanční analytik",
        period: "2026 — dosud",
        focus: ["Analýza trhu", "Finanční analýza", "M&A / due diligence", "Finanční modelování", "Strategické projekty"],
        description: "Pochopení trhů, firem a rozhodnutí zevnitř. Ten užitečný druh financí — takový, který pomáhá posouvat věci vpřed.",
        logo: "assets/logos/csg-land-systems.png",
        sketch: "assets/sketch-csg.png",
        sketchAlt: "Technická skica vojenského vozidla Land Systems"
      }
    ],

    currently: [
      { label: "Pracuji na", value: "Finanční analýze a strategii" },
      { label: "Buduji", value: "Firmy a digitální projekty" },
      { label: "Vedu", value: "Veselou Fest" },
      { label: "Studuji", value: "Global BBA" },
      { label: "Zkoumám", value: "Cokoliv, co zrovna vypadá zajímavě" }
    ],

    timeline: [
      { year: "2019", label: "Začíná Veselá Fest", note: "začalo to nápadem" },
      { year: "2023", label: "Francie / Grenoble", note: "" },
      { year: "2024", label: "Tatra Trucks", note: "" },
      { year: "2025", label: "Schott / Lyon", note: "" },
      { year: "2026", label: "CSG Land Systems", note: "" }
    ],

    education: [
      { school: "Grenoble École de Management", program: "International BBA", period: "2023–2025", place: "Grenoble, Francie" },
      { school: "emlyon business school", program: "Global BBA", period: "2025–2027", place: "Francie" }
    ],

    journey: {
      route: [
        { id: "valmez",  name: "Gymnázium Valašské Meziříčí", place: "Valašské Meziříčí", years: "2017–2019", kind: "", badges: [] },
        { id: "ostrava", name: "Mezinárodní gymnázium",       place: "Ostrava",           years: "2019–2023", kind: "",
          badges: [
            { icon: "ib",       label: "International Baccalaureate" },
            { icon: "maturita", label: "Státní maturita" }
          ] },
        { id: "lyon",    name: "emlyon business school",      place: "Lyon, Francie",     years: "2025–2027", kind: "Global BBA", badges: [] }
      ],
      ui: {
        eyebrow: "Trasa",
        heading: "Z VALAŠSKA<br>DO LYONU.",
        czechia: "ČESKÁ REPUBLIKA",
        viewEurope: "Evropa",
        viewCzechia: "Česko",
        viewRoute: "Trasa",
        replay: "Znovu",
        mapTitle: "Mapa Evropy s Janovou cestou",
        mapDesc: "Cesta z Gymnázia Valašské Meziříčí přes Mezinárodní gymnázium v Ostravě na emlyon business school v Lyonu."
      }
    },

    festivalGrowth: [
      { year: 2019, visitors: 120 },
      { year: 2020, visitors: 350 },
      { year: 2021, visitors: 700 },
      { year: 2022, visitors: 950 },
      { year: 2023, visitors: 1200 },
      { year: 2024, visitors: 1350 },
      { year: 2025, visitors: 1600 },
      { year: 2026, visitors: 1810 }
    ],

    projects: {
      "vesela-fest": {
        title: "Veselá Fest",
        category: "Festival",
        year: "2019 —",
        role: "Spoluzakladatel / Finance / Organizace",
        status: "AKTIVNÍ",
        cover: "assets/project-vesela-fest.jpg",
        externalUrl: "https://veselafest.cz",
        externalLabel: "Navštívit veselafest.cz",
        intro: "Začalo to v roce 2019 jako zahradní párty s pódiem z palet a asi 120 lidmi. Dnes je to plnohodnotný jednodenní festival na Valašsku s více než 1 800 návštěvníky.",
        story: [
          "Začalo to jako společný nápad mezi mnou a Adamem Kubjátem: uspořádat pořádnou akci v obci Veselá, s lineupem, na který bychom se sami chtěli přijít podívat, a dát mladým lokálním umělcům pódium, které jinde nenajdou. Příprava prvního ročníku trvala asi čtrnáct dní — pódium sbité z palet, pár sudů piva, stovka párků a asi stovka nervózních lidí sledujících naše vlastní vystoupení.",
          "Ten první večer stačil na to, abychom věděli, že chceme pokračovat. Přesunuli jsme se ze zahrady do současného Areálu TJ Veselá, investovali do pořádného pódia a začali zvát další účinkující. Rok 2021 přinesl první opravdový milník festivalu — 700 lidí — a tradici podpisové desky, která pokračuje dodnes.",
          "Rok 2022 přidal druhou stage, partnerství s pivovarem Bernard a téměř 1 000 návštěvníků. 2023 přinesla první noční stanové městečko pro ty nejvěrnější. Rok 2024 byl zlomový: hlavní hvězdou byl Pavel Callta, branding prošel profesionálním refreshem a festival se posunul na úroveň, na které jsme předtím nikdy nefungovali.",
          "V roce 2025 byl areál popsán jako „dokonalé letní útočiště pro všechny generace“, s vlastní herní zónou vedle hudby a jídla. Ročník 2026 — už osmý — má jako headlinera Michala Hrůzu a early-bird vstupenky se vyprodaly velmi rychle."
        ],
        responsibilities: ["Spoluzakladatel", "Finance", "Organizace", "Strategie", "Produkce"]
      },
      "alufen": {
        title: "Alufen",
        category: "Byznys",
        year: "Probíhá",
        role: "Zakladatel",
        status: "AKTIVNÍ",
        cover: "assets/project-alufen.jpg",
        externalUrl: "https://alufen.cz",
        externalLabel: "Navštívit alufen.cz",
        intro: "Rodinná firma se sídlem ve Valašském Meziříčí, vyrábí hliníkové ploty, pergoly, zimní zahrady, brány a stínicí techniku — na míru, s exportem po celé České republice.",
        story: [
          "Alufen vznikl z jednoduchého pozorování: lidé při rekonstrukci domu chtěli plot nebo pergolu, která vypadá skutečně navržená, ne jen funkční — a hliník to umožnil bez starostí s údržbou dřeva nebo koroze oceli.",
          "„Firmu Alufen jsem založil především z potřeby nabídnout všem zákazníkům toužícím po moderním pojetí svého domu a zahrady kvalitní produkt,“ jak to popisuji na webu firmy — a pořád je to ta upřímná verze. Každý dílec se vyrábí na míru v naší vlastní dílně a od výroby po montáž se o něj stará stejný tým.",
          "Katalog se rozrostl z plotů na pergoly (několik produktových řad, včetně vlastní řady Alufen vedle Aluxe a Isotra), zimní zahrady, hliníkové i železné brány, přístřešky a stínicí techniku — markýzy, žaluzie a screenové rolety. Poselství je jednoduché: hliník nekoroduje jako ocel a nehnije jako dřevo, takže plot vypadá jako nový i po letech.",
          "Běžný provoz je z velké části záměrně nevýrazná práce: rychlé kalkulace, poctivé dodací lhůty a dohled nad tím, aby pětikrokový proces — konzultace zdarma, nezávazná kalkulace, projekt na míru, pečlivá výroba, rychlá montáž — obstál i pod reálnou poptávkou."
        ],
        responsibilities: ["Zakladatel", "Rozvoj byznysu", "Provoz", "Produkt", "Zákaznická zkušenost"]
      },
      "eteron-group": {
        title: "Eteron Group",
        category: "Byznys / Software",
        year: "2026 —",
        role: "Spoluzakladatel",
        status: "AKTIVNÍ",
        cover: "assets/project-eteron.jpg",
        externalUrl: "https://eterongroup.com",
        externalLabel: "Navštívit eterongroup.com",
        intro: "Engineering better businesses — automatizace, dashboardy a interní systémy postavené pro české firmy, které pořád fungují na Excelu a telefonátech.",
        story: [
          "Eteron Group vznikl z jednoduchého, trochu nepříjemného pozorování: většina středních českých firem stále funguje na procesech, které západoevropské a americké firmy opustily už před deseti nebo dvaceti lety. Excel místo systémů. Telefonáty místo workflow. Měsíční reporty místo živých dat.",
          "Spoluzaložil jsem ho s Janem Kučou, který přináší zkušenosti s datovou analytikou a reportingem z Göteborgu i z českého průmyslu; já přináším finanční a mezinárodní byznysovou stránku z Emlyonu a Grenoblu. Společně překládáme tenhle vnější pohled do něčeho, co skutečně sedí na to, jak fungují české firmy.",
          "Práce se dělí do čtyř oblastí: automatizace procesů, které firmu nejvíc zpomalují, dashboardy, které dostanou správná čísla před správné lidi, interní nástroje a portály postavené podle toho, jak tým skutečně pracuje, a nevděčná, ale nezbytná práce na uklizení dat, bez které nic z výše uvedeného nejde postavit.",
          "Jeden nedávný příklad: kompletní marketingový web a digitální prezentace pro regionálního dodavatele zemních prací — klienta, který dřív fungoval čistě na doporučeních a telefonním čísle. Malá firma, reálný dopad: profesionální webová prezentace a jasnější cesta od poptávky k zakázce."
        ],
        responsibilities: ["Spoluzakladatel", "Automatizace", "Dashboardy", "Interní nástroje", "Datové základy"]
      },
      "digital": {
        title: "Digitální projekty",
        category: "Nástroje / Experimenty",
        year: "Probíhá",
        role: "Různé",
        status: "EXPERIMENT",
        externalUrl: "#",
        externalLabel: "",
        intro: "Menší nástroje a experimenty — data, dashboardy, automatizace, cokoliv si zrovna žádá aktuální problém.",
        story: [
          "Ne každý nápad si zaslouží vlastní firmu. Některé potřebují jen víkend, sadu dat a důvod znovu otevřít Power BI. Tady žijí právě ty — datové nástroje, drobné automatizace a byznysové utility, pořád ve fázi experimentu.",
          "Některé z nich vyrostou v něco většího. Některé zůstanou přesně v této velikosti. Oba výsledky jsou v pořádku."
        ],
        responsibilities: ["Data", "Power BI", "Aplikace", "Automatizace", "Byznys nástroje"]
      }
    }
  }
};

const LANG = (function () {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "cs") return saved;
  } catch (e) {}
  return "en";
})();

const SITE = SITE_I18N[LANG];
