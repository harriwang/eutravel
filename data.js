// ═══════════════════════════════════════════
// eutravel — Data Layer (v2)
// 5 cities · 双人对话 · 抵达照片解锁
// 2026/5/16 - 5/31 · 16 天行程
// ═══════════════════════════════════════════

// ─────────────────────────────────────────
// PHOTOS — 各景点封面图(Unsplash + Wiki Commons)
// ─────────────────────────────────────────
export const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop&q=80",

  // ─── PARIS ───
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop&q=80",
  louvre: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=800&h=500&fit=crop&q=80",
  orsay: "https://images.unsplash.com/photo-1551867633-194f125bddfa?w=800&h=500&fit=crop&q=80",
  notredame: "https://images.unsplash.com/photo-1509439581820-b1f6b62cd5b1?w=800&h=500&fit=crop&q=80",
  eiffel: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop&q=80",
  seine: "https://images.unsplash.com/photo-1547893547-3284b1495a8b?w=800&h=500&fit=crop&q=80",
  shakespeare: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=500&fit=crop&q=80",
  passages: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&h=500&fit=crop&q=80",

  // ─── RIVIERA ───
  riviera: "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800&h=500&fit=crop&q=80",
  cezanne_studio: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&h=500&fit=crop&q=80",
  promenade: "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800&h=500&fit=crop&q=80",
  vieux_nice: "https://images.unsplash.com/photo-1559523275-98fb3c56faf7?w=800&h=500&fit=crop&q=80",
  picasso_museum: "https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&h=500&fit=crop&q=80",
  cannes: "https://images.unsplash.com/photo-1568146567103-3aa6cf30bdf1?w=800&h=500&fit=crop&q=80",
  eze: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&h=500&fit=crop&q=80",
  monaco: "https://images.unsplash.com/photo-1605723517503-3f78bf17c2cd?w=800&h=500&fit=crop&q=80",
  saint_paul: "https://images.unsplash.com/photo-1567366876793-d0aaa97a78e2?w=800&h=500&fit=crop&q=80",

  // ─── VENICE ───
  venice: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=500&fit=crop&q=80",
  san_marco: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=500&fit=crop&q=80",
  basilica_san_marco: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=500&fit=crop&q=80",
  salute: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=500&fit=crop&q=80",
  rialto: "https://images.unsplash.com/photo-1529154166925-574a0236a4f4?w=800&h=500&fit=crop&q=80",
  acqua_alta: "https://images.unsplash.com/photo-1543158266-0066955047b0?w=800&h=500&fit=crop&q=80",
  pieta_church: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&h=500&fit=crop&q=80",

  // ─── FLORENCE ───
  florence: "https://images.unsplash.com/photo-1761427271446-7eb5df444a8b?w=800&h=500&fit=crop&q=80",
  uffizi: "https://images.unsplash.com/photo-1563474369245-bb6cf001f72c?w=800&h=500&fit=crop&q=80",
  ponte: "https://images.unsplash.com/photo-1568143419492-24afc6e97005?w=800&h=500&fit=crop&q=80",
  duomo: "https://images.unsplash.com/photo-1662112506193-90de8435e381?w=800&h=500&fit=crop&q=80",
  accademia: "https://images.unsplash.com/photo-1559004328-d65ee06c5947?w=800&h=500&fit=crop&q=80",
  pisa: "https://images.unsplash.com/photo-1522919440916-8d57bf966857?w=800&h=500&fit=crop&q=80",

  // ─── ROME ───
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop&q=80",
  pantheon: "https://images.unsplash.com/photo-1570054623147-dbccfd1efa98?w=800&h=500&fit=crop&q=80",
  colosseum: "https://images.unsplash.com/photo-1515542483964-5e8c63d7d89b?w=800&h=500&fit=crop&q=80",
  forum: "https://images.unsplash.com/photo-1555992828-35627f3eb6ea?w=800&h=500&fit=crop&q=80",
  trevi: "https://images.unsplash.com/photo-1764947810288-079f2cb6f419?w=800&h=500&fit=crop&q=80",
  st_peter: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=500&fit=crop&q=80",
  sistine: "https://images.unsplash.com/photo-1576016770956-debb63d92058?w=800&h=500&fit=crop&q=80",

  // ─── 艺术品近图(Wiki Commons) ───
  art_mona_lisa: "https://commons.wikimedia.org/wiki/Special:FilePath/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg?width=600",
  art_venus_milo: "https://commons.wikimedia.org/wiki/Special:FilePath/Front_views_of_the_Venus_de_Milo.jpg?width=600",
  art_winged_victory: "https://commons.wikimedia.org/wiki/Special:FilePath/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg?width=600",
  art_starry_rhone: "https://commons.wikimedia.org/wiki/Special:FilePath/Starry_Night_Over_the_Rhone.jpg?width=800",
  art_water_lilies: "https://commons.wikimedia.org/wiki/Special:FilePath/Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg?width=800",
  art_dance_moulin: "https://commons.wikimedia.org/wiki/Special:FilePath/Pierre-Auguste_Renoir,_Le_Moulin_de_la_Galette.jpg?width=800",
  art_montsainte_victoire: "https://commons.wikimedia.org/wiki/Special:FilePath/Paul_C%C3%A9zanne_108.jpg?width=800",
  art_card_players: "https://commons.wikimedia.org/wiki/Special:FilePath/Paul_C%C3%A9zanne,_Les_Joueurs_de_cartes,_1892-95.jpg?width=800",
  art_picasso_joie: "https://commons.wikimedia.org/wiki/Special:FilePath/La_Joie_de_vivre_(Picasso).jpg?width=800",
  art_assumption_titian: "https://commons.wikimedia.org/wiki/Special:FilePath/Assunta_(Tiziano).jpg?width=600",
  art_david: "https://commons.wikimedia.org/wiki/Special:FilePath/'David'_by_Michelangelo_JBU0001.JPG?width=600",
  art_birth_venus: "https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg?width=800",
  art_primavera: "https://commons.wikimedia.org/wiki/Special:FilePath/Botticelli-primavera.jpg?width=800",
  art_annunciation: "https://commons.wikimedia.org/wiki/Special:FilePath/Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg?width=800",
  art_creation_adam: "https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_-_Creation_of_Adam_(cropped).jpg?width=800",
  art_last_judgment: "https://commons.wikimedia.org/wiki/Special:FilePath/Last_Judgement_(Michelangelo).jpg?width=600",
  art_apollo_daphne: "https://commons.wikimedia.org/wiki/Special:FilePath/Apollo_and_Daphne_(Bernini)_(cropped).jpg?width=600",
  art_proserpina: "https://commons.wikimedia.org/wiki/Special:FilePath/Rape_of_Prosepina_September_2015-3a.jpg?width=600",
  art_ecstasy_teresa: "https://commons.wikimedia.org/wiki/Special:FilePath/Ecstasy_of_Saint_Teresa_September_2015-2a.jpg?width=600",
  art_pieta: "https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo's_Pieta_5450_cropncleaned_edit.jpg?width=600",
  art_calling_matthew: "https://commons.wikimedia.org/wiki/Special:FilePath/Caravaggio_-_La_vocazione_di_San_Matteo.jpg?width=800",
  art_david_goliath: "https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_Caravaggio_061.jpg?width=600",
};

// ═══════════════════════════════════════════
// CITIES — 5 城,带名言
// 顺序就是行程顺序,前端按这个顺序展示"全程地图"
// quote 字段:中文 + 原文 + 出处,用于城市页头部
// ═══════════════════════════════════════════
export const CITIES = {
  paris: {
    color: "#3B5998", nameZh: "巴黎", emoji: "🗼", en: "Paris",
    dates: "5/16 – 5/18", days: 3, order: 1,
    quote: {
      original: "Respirer Paris, cela conserve l'âme.",
      zh:       "呼吸巴黎,会让灵魂得到保存。",
      author:   "Victor Hugo",
      source:   "《悲惨世界》第三部第一卷第六章",
      lang:     "fr",
    },
  },
  riviera: {
    color: "#1E88E5", nameZh: "南法", emoji: "🌊", en: "Riviera",
    dates: "5/19 – 5/23", days: 5, order: 2,
    quote: {
      original: "Il y a une tristesse en Provence que personne n'a exprimée.",
      zh:       "普罗旺斯有一种悲伤,从来没有人表达出来。",
      author:   "Paul Cézanne",
      source:   "Joachim Gasquet《塞尚谈话录》",
      lang:     "fr",
    },
  },
  venice: {
    color: "#5E35B1", nameZh: "威尼斯", emoji: "🚤", en: "Venezia",
    dates: "5/24 – 5/25", days: 2, order: 3,
    quote: {
      original: "A fairy city of the heart, rising like water-columns from the sea.",
      zh:       "心中的童话之城,从大海里如水柱般升起。",
      author:   "Lord Byron",
      source:   "《恰尔德·哈罗尔德游记》第四章 第 18 节",
      lang:     "en",
    },
  },
  florence: {
    color: "#C17817", nameZh: "佛罗伦萨", emoji: "🌸", en: "Firenze",
    dates: "5/25 – 5/28", days: 4, order: 4,
    quote: {
      original: "Godi, Fiorenza, poi che se' sì grande, che per mare e per terra batti l'ali, e per lo 'nferno tuo nome si spande!",
      zh:       "为你自豪吧,佛罗伦萨——你如此伟大,展翅掠过陆地与海洋,连地狱里都回响着你的名字。",
      author:   "Dante Alighieri",
      source:   "《神曲·地狱篇》第 26 歌 第 1-3 行",
      lang:     "it",
    },
  },
  rome: {
    color: "#A63D40", nameZh: "罗马", emoji: "🐺", en: "Roma",
    dates: "5/28 – 5/30", days: 3, order: 5,
    quote: {
      original: "Veni, vidi, vici.",
      zh:       "我来,我见,我征服。",
      author:   "Gaius Iulius Caesar",
      source:   "公元前 47 年泽拉战役致罗马元老院捷报(普鲁塔克《对比列传》)",
      lang:     "la",
    },
  },
};

// 工具函数:按 order 排序的城市列表(给前端遍历用)
export const CITY_ORDER = Object.entries(CITIES)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([id]) => id);

// ═══════════════════════════════════════════
// SPOTS — 每城 5-8 个景点
// guide:角色心目中的"必看",非机器人式全列表
// ═══════════════════════════════════════════
export const SPOTS = {
  // ─────────── PARIS ───────────
  paris: [
    {
      id: "louvre", name: "Louvre", nameZh: "卢浮宫",
      vibe: "全世界最大的画上博物馆",
      guide: [
        { name: "蒙娜丽莎", room: "德农馆 711 室", artist: "达芬奇", tip: "千万别花太多时间挤——画很小,人很多,意思一下就走" },
        { name: "米洛的维纳斯", room: "叙利馆 1 楼", artist: "古希腊", tip: "从背后看也很美,绕一圈" },
        { name: "萨莫色雷斯的胜利女神", room: "叙利馆楼梯顶", artist: "古希腊", tip: "楼梯转角看一眼就值回票价" },
        { name: "自由引导人民", room: "德农馆 700 室", artist: "德拉克洛瓦", tip: "原来这就是教科书那张" },
      ],
    },
    {
      id: "orsay", name: "Musée d'Orsay", nameZh: "奥赛博物馆",
      vibe: "印象派一网打尽的火车站",
      guide: [
        { name: "罗讷河上的星夜", room: "5 楼印象派", artist: "梵高", tip: "梵高生前只卖出过一幅画" },
        { name: "煎饼磨坊的舞会", room: "5 楼印象派", artist: "雷诺阿", tip: "光斑像撒了一地金币" },
        { name: "奥林匹亚", room: "马奈展厅", artist: "马奈", tip: "1865 年展出时被骂伤风败俗" },
        { name: "睡莲", room: "印象派核心展厅", artist: "莫奈", tip: "巨幅,要退到尽头看" },
      ],
    },
    {
      id: "notredame", name: "Notre-Dame", nameZh: "巴黎圣母院",
      vibe: "被火烧过、被雨果救过", guide: [],
    },
    {
      id: "eiffel", name: "Tour Eiffel", nameZh: "埃菲尔铁塔",
      vibe: "巴黎人原本想拆掉它", guide: [],
    },
    {
      id: "shakespeare", name: "Shakespeare and Company", nameZh: "莎士比亚书店",
      vibe: "海明威常蹭书的地方(虽然原版不是这家)", guide: [],
    },
    {
      id: "passages", name: "Passages Couverts", nameZh: "拱廊街",
      vibe: "本雅明用一辈子研究的地方",
      guide: [
        { name: "Galerie Vivienne", room: "二区", artist: "—", tip: "巴黎现存最美的拱廊街,1823 年" },
        { name: "Passage des Panoramas", room: "二区", artist: "—", tip: "巴黎最古老的拱廊街,1799 年" },
      ],
    },
    {
      id: "seine", name: "La Seine", nameZh: "塞纳河",
      vibe: "整座巴黎的脊柱", guide: [],
    },
  ],

  // ─────────── RIVIERA ───────────
  riviera: [
    {
      id: "cezanne_studio", name: "Atelier Cézanne", nameZh: "塞尚画室",
      vibe: "塞尚最后画画的地方,原样保留",
      guide: [
        { name: "圣维克多山", room: "画室东窗外", artist: "塞尚", tip: "他画了 87 次的那座山,从画室就能看见" },
        { name: "玩牌者", room: "画室藏品", artist: "塞尚", tip: "现代艺术市场最贵画作之一" },
      ],
    },
    {
      id: "promenade", name: "Promenade des Anglais", nameZh: "英国人散步道",
      vibe: "七公里地中海蓝", guide: [],
    },
    {
      id: "vieux_nice", name: "Vieux-Nice", nameZh: "尼斯老城",
      vibe: "窄巷 · 老市场 · socca 香", guide: [],
    },
    {
      id: "picasso_museum", name: "Musée Picasso (Antibes)", nameZh: "安提布毕加索美术馆",
      vibe: "毕加索 1946 年的工作室原址",
      guide: [
        { name: "生活的喜悦", room: "主厅", artist: "毕加索", tip: "二战刚结束,他在这里画下战后第一份快乐" },
      ],
    },
    {
      id: "cannes", name: "Cannes / La Croisette", nameZh: "戛纳·克鲁瓦塞特大道",
      vibe: "红毯走完就是海",
      guide: [
        { name: "电影宫(Palais des Festivals)", room: "克鲁瓦塞特大道", artist: "—", tip: "红毯阶梯就在这里,平时也能拍" },
      ],
    },
    {
      id: "eze", name: "Èze", nameZh: "埃兹小镇",
      vibe: "悬崖上的中世纪石头村", guide: [],
    },
    {
      id: "monaco", name: "Monaco", nameZh: "摩纳哥",
      vibe: "赌场 · F1 · 王妃 · 小国", guide: [],
    },
    {
      id: "saint_paul", name: "Saint-Paul-de-Vence", nameZh: "圣保罗德旺斯",
      vibe: "夏加尔晚年住在这里",
      guide: [
        { name: "夏加尔之墓", room: "村口墓园", artist: "—", tip: "墓碑朴素,常有人放小石头致意" },
      ],
    },
  ],

  // ─────────── VENICE ───────────
  venice: [
    {
      id: "san_marco", name: "Piazza San Marco", nameZh: "圣马可广场",
      vibe: "拿破仑说这是欧洲最美客厅", guide: [],
    },
    {
      id: "basilica_san_marco", name: "Basilica di San Marco", nameZh: "圣马可大教堂",
      vibe: "圣人遗骨从埃及偷回来的", guide: [],
    },
    {
      id: "salute", name: "Santa Maria della Salute", nameZh: "安康圣母圣殿",
      vibe: "瘟疫中许愿盖的教堂", guide: [],
    },
    {
      id: "rialto", name: "Ponte di Rialto", nameZh: "里亚托桥",
      vibe: "威尼斯商人交易过的桥", guide: [],
    },
    {
      id: "acqua_alta", name: "Libreria Acqua Alta", nameZh: "沉船书店",
      vibe: "书泡过水也照样卖", guide: [],
    },
    {
      id: "pieta_church", name: "Chiesa della Pietà", nameZh: "Pietà 慈悲教堂",
      vibe: "维瓦尔第教过书的孤儿院教堂", guide: [],
    },
  ],

  // ─────────── FLORENCE ───────────
  florence: [
    {
      id: "uffizi", name: "Uffizi Gallery", nameZh: "乌菲兹美术馆",
      vibe: "文艺复兴时期的朋友圈",
      guide: [
        { name: "维纳斯的诞生", room: "10-14 展厅", artist: "波提切利", tip: "早上开门就冲这里" },
        { name: "春", room: "10-14 展厅", artist: "波提切利", tip: "就在维纳斯旁边" },
        { name: "天使报喜", room: "15 展厅", artist: "达芬奇", tip: "达芬奇 25 岁画的" },
        { name: "圣家族", room: "35 展厅", artist: "米开朗基罗", tip: "米开朗基罗唯一的画板画" },
      ],
    },
    {
      id: "accademia", name: "Galleria dell'Accademia", nameZh: "学院美术馆",
      vibe: "大卫本人住这儿(不是复制品)",
      guide: [
        { name: "大卫", room: "主厅", artist: "米开朗基罗", tip: "5 米高,正面之外还要看背面" },
        { name: "未完成的奴隶", room: "通往大卫的走廊", artist: "米开朗基罗", tip: "半凿出来的人体,据说是故意停下的" },
      ],
    },
    {
      id: "duomo", name: "Il Duomo", nameZh: "圣母百花大教堂",
      vibe: "一座没人知道怎么盖的穹顶", guide: [],
    },
    {
      id: "ponte", name: "Ponte Vecchio", nameZh: "老桥",
      vibe: "从卖肉逆袭成卖珠宝", guide: [],
    },
    {
      id: "pisa", name: "Torre di Pisa", nameZh: "比萨斜塔",
      vibe: "歪了 800 年还在歪", guide: [],
    },
  ],

  // ─────────── ROME ───────────
  rome: [
    {
      id: "pantheon", name: "Pantheon", nameZh: "万神殿",
      vibe: "两千年前的混凝土,现代人复刻不出来", guide: [],
    },
    {
      id: "colosseum", name: "Colosseo", nameZh: "斗兽场",
      vibe: "古罗马的体育馆+海洋公园+电影院", guide: [],
    },
    {
      id: "forum", name: "Foro Romano", nameZh: "古罗马广场",
      vibe: "凯撒被刺的地方就在这", guide: [],
    },
    {
      id: "trevi", name: "Fontana di Trevi", nameZh: "特维雷许愿池",
      vibe: "全世界最赚钱的喷泉", guide: [],
    },
    {
      id: "st_peter", name: "Basilica di San Pietro", nameZh: "圣彼得大教堂",
      vibe: "米开朗基罗设计的穹顶,贝尼尼造的广场",
      guide: [
        { name: "圣殇(Pietà)", room: "入口右侧第一个礼拜堂", artist: "米开朗基罗", tip: "米开朗基罗 24 岁的作品,唯一签了名的" },
      ],
    },
    {
      id: "sistine", name: "Cappella Sistina", nameZh: "西斯廷礼拜堂",
      vibe: "米开朗基罗的怨气凝结成了世界遗产",
      guide: [
        { name: "创世纪(天顶画)", room: "天顶", artist: "米开朗基罗", tip: "仰头找'创造亚当'那只手" },
        { name: "最后的审判", room: "祭坛墙", artist: "米开朗基罗", tip: "基督右手是天堂,左手是地狱" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// 建议问题 — 双人对话页底部"试试问"
// 每城 3 条,降低用户"不知道问什么"的门槛
// ═══════════════════════════════════════════
export const SUGGESTED_QUESTIONS = {
  paris: [
    "拱廊街现在还在吗?哪一条最值得去?",
    "1920s 巴黎和现在比,最大的区别是什么?",
    "卢浮宫蒙娜丽莎排队那么久,真的值得吗?",
  ],
  riviera: [
    "圣维克多山从哪个角度看最像塞尚的画?",
    "戛纳电影节的红毯阶梯平时能拍照吗?",
    "夏加尔的墓在 Saint-Paul,值得专门去吗?",
  ],
  venice: [
    "总督府监狱怎么逃的?",
    "Pietà 教堂的女孩们呢?",
    "圣马可教堂的马为什么是铜的?",
  ],
  florence: [
    "你为什么把仇人都写进地狱?",
    "大卫为什么要朝向那个方向?",
    "百花大教堂穹顶到底怎么盖起来的?",
  ],
  rome: [
    "你怎么看米开朗基罗?",
    "卡拉瓦乔真的杀过人吗?",
    "万神殿屋顶那个洞下雨怎么办?",
  ],
};
