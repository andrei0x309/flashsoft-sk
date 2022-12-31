export const tables = [
    'fsk_prj_tech_type',
    'fsk_prj_techs',
    'fsk_prj_cat',
    'fsk_prj'
]

export const $prjCats = {
    1 : ['Web Dev', ''],
    2 : ['Mobile', 'Generaly related to mobile development'],
    3 : ['Web Design', 'Generaly related to mostly web interface design.'],
    4 : ['Desktop Native', 'Generaly related to apps that do specific desktop os calls.'],
    5 : ['Bots', 'Generaly related using services in an automatted manner.'],
    6 : ['Embedded Platforms', 'Generaly related to dev boards and socs.'],
    7 : ['Misc', 'Something that is hard to clasify neatly.'],
    8 : ['Serverless', 'Code that runs on cloud and service scaling is orchestarted by strangers.'], 
    9 : ['Web3 Dev', 'Code that reletes to blockchain networks.'],
    10: ['Desktop VM', 'Desktop Code that requires a runtime, mostly a VM to run.']
};

export const $prjTechs = {
    'php' : ["PHP", ''],
    'bootstrap' : ["BootStrap", ''],
    'sass' : ["SASS", ''],
    'js' : ["Javascript", ''],
    'vue' : ["Vue", ''],
    'browser-ext' : ["Browser Extension", ''],
    'cpp' : ["CPP", ''],
    'java' : ["Java", ''],
    'qt' : ["QT", ''],
    'node' : ["Node", ''],
    'ionic' : ["Ionic", ''],
    'laravel' : ["Laravel", ''],
    'ssr' : ['SSR', ''],
    'mobile' : ['Mobile', ''],
    'android' : ['Android', ''],
    'sqlite' : ['Sqlite DB', ''],
    'ts' :  ['TypeScript', ''],
    'webview' : ['WebVew', ''],
    'hybrid'  : ['Hybrid', ''],
    'webworker' : ['Web Workers', ''],
    'weak-ref': ['Weak Ref', ''],
    'browser-api' : ['Web Browser Api', ''],
    'tailwindcss' : ['Tailwindcss', ''],
    'wordpress' : ['Wordpress', ''],
    'mix' : ['Laravel Mix', ''],
    'angular' : ['Angular', ''],
    'capacitor' : ['Capacitor', ''],
    'windicss' : ['WindiCss', ''],
    'kotlin' : ['Kotlin', ''],
    'deno': ['Deno', ''],
    'ethers': ['Ethers', ''],
    'svelte-kit': ['Svelte kit'],
    'serverless' : ['Serverless', ''],
    'desktop': ['on Desktop OS', ''],
    'genral-purpose': ['GP Code', ''],
    'windows': ['Windows Platform', ''],
    'bot': ['Bots and automation', ''],
    'os-service': ['Runs as OS service', ''],
    'embed': ['Embedded Platforms', ''],
    'react': ['React', ''],
    'privacy': ['Privacy', ''],
};


        // [ title, cat_id, short_description, description, feature_image, video_url, demo_url, open_source, source_url, status, creation_date, weight]
export const $prjs = {
    12:
    {
        title: "Fsoft-Center Web APP",
        cat: 'Web Dev/APP',
        sort_desc: "Written using larvel it features an admin panel a courses database, a project database, a minmal blog system and custom front page it is an hybrid SPA-traditional web app using both REST Laravel Router and Vue router it also uses SSR.",
        feature_image: "1.svg",
        desc: "",
        tags: ["laravel", "php", "bootstrap", "sass", "vue", "node", 'ssr']
    },
    11: {
        title: "ShowNote - Android APP",
        cat: "Mobile",
        sort_desc: "An adroid app to save notes that can be shown easely to other people it uses screen awake, large fonts, display mods, you can also use it just for storing notes.",
        desc: "",
        feature_image: "2.svg",
        tags: ["mobile", "android", "sqlite", "ts", "webview", "hybrid"]
    },
    10: {
        title: "Tab timer alert - Chrome Extension",
        cat: 'Web Dev/APP',
        sort_desc: "A chrome extension to notify you wehn a certain ammont of time has passed sice you left a specific tab tahat you place on alert on.",
        desc: "description -> short_description - Lorem lorem lorem lorem",
        feature_image: "3.svg",
        tags: ["js", "browser-ext", "webworker", "weak-ref", "browser-api",]
    },
    9: {
        title: "Tailwindcss Wordpress Theme - a309",
        cat: 'Web Design',
        sort_desc: "An optimized flat extremely lightweight responsive theme that uses Tailwindcss.",
        desc: "",
        feature_image: "4.svg",
        tags: ["php", "tailwindcss", "sass", "wordpress", "mix"]
    },
    8: {
        title: "BlackEllis.Eu Blog APP",
        cat: "Mobile",
        sort_desc: "A mobile app that works with wordpress api display and interact with a wordpress blog.",
        desc: "",
        feature_image: "5.svg",
        tags: ["mobile", "android", "angular", "ts", "webview", "capacitor"]
    },
    7: {
        title: "Microservices For Fcc Front",
        cat: 'Web Dev/APP',
        sort_desc: "React front-end app to all 5 FCC microservices project challenges.",
        desc: "",
        feature_image: "6.svg",
        tags: ["react", "js", "ts"]
    },
    6: {
        title: "Microservices For Fcc Back",
        cat: 'Web Dev/APP',
        sort_desc: "Node.Js express microservices for all 5 FCC microservices project challenges.",
        desc: "",
        feature_image: "6.svg",
        tags: ["node", "js", "ts",]
    },
    5: {
        title: "Duolingo Puppeteer bot",
        cat: 'Bots',
        sort_desc: "A Duolingo Puppeteer bot that farms XP by completing german exercises.",
        desc: "",
        feature_image: "7.svg",
        tags: ["bot", "js", "ts"]
    },

    4: {
        title: "anti-wallet-lost",
        cat: "Embedded Platforms",
        sort_desc: "A small Arduino mini pro project it was featured on Instructables. Radio detection when you are to far from your wallet with alarm trigger.",
        desc: "",
        feature_image: "8.svg",
        tags: ["embed"]
    },
    3: {
        title: "WinClSvc-PP",
        cat: "Desktop Native",
        sort_desc: "This is a personal project written in C++ using QT framework involving a Windows service which runs some jobs according to some specified configured conditions.",
        desc: "",
        feature_image: "9.svg",
        tags: ["cpp", "qt", "desktop", 'os-service']
    },
    2: {
        title: "CWSoulutions",
        cat: "Misc",
        sort_desc: "Many solutions to programming quizzes and problems in various proggramming languages I sloved on CW.",
        desc: "description -> short_description - Lorem lorem lorem lorem",
        feature_image: "9.svg",
        tags: ["genral-purpose"]
    },
    1: {
        title: "univ_PGC-project",
        cat: "Desktop VM",
        sort_desc: "A in java project involving I made during my MSC for a course entitled: \"Multithreading Programming.\" ",
        desc: "",
        feature_image: "10.svg",
        tags: ["java", "desktop"]
    }
};

 