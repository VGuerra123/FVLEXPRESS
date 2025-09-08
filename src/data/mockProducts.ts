import { Product, Seller, ShippingInfo, FlashSale, BundleProduct, BulkPrice } from '../types/marketplace';

const mockSellers: Seller[] = [
  {
    id: 1,
    name: "TechWorld Chile",
    rating: 4.8,
    reviewCount: 15420,
    verified: true,
    responseTime: "< 2 horas",
    joinDate: "2019-03-15",
    location: "Santiago, Chile",
    badges: ["Top Seller Chile", "Envío Rápido", "Calidad Garantizada"]
  },
  {
    id: 2,
    name: "Fashion Hub Santiago",
    rating: 4.6,
    reviewCount: 8930,
    verified: true,
    responseTime: "< 4 horas",
    joinDate: "2020-01-20",
    location: "Valparaíso, Chile",
    badges: ["Trending Chile", "Nuevos Arrivals"]
  },
  {
    id: 3,
    name: "Hogar & Jardín Chile",
    rating: 4.7,
    reviewCount: 12340,
    verified: true,
    responseTime: "< 1 hora",
    joinDate: "2018-11-10",
    location: "Concepción, Chile",
    badges: ["Calidad Premium", "Eco-Friendly Chile"]
  },
  {
    id: 4,
    name: "Beauty Express Chile",
    rating: 4.9,
    reviewCount: 9876,
    verified: true,
    responseTime: "< 3 horas",
    joinDate: "2021-05-12",
    location: "La Serena, Chile",
    badges: ["Experto Belleza", "K-Beauty Chile", "Trending"]
  },
  {
    id: 5,
    name: "Sports & Fitness Chile",
    rating: 4.5,
    reviewCount: 7654,
    verified: true,
    responseTime: "< 6 horas",
    joinDate: "2020-08-30",
    location: "Temuco, Chile",
    badges: ["Especialista Deportes", "Equipos Calidad"]
  }
];

// Generar exactamente 200 productos para todas las categorías
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let productId = 1;

  // OFERTAS RELÁMPAGO (25 productos)
  const flashDealsProducts = [
    {
      name: "iPhone 15 Pro Max 1TB Titanio - ¡CYBER CHILE!",
      price: 1599990,
      originalPrice: 2399990,
      category: "flash_deals",
      discount: 33,
      flashSale: {
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        originalPrice: 2399990,
        salePrice: 1599990,
        soldCount: 1847,
        totalStock: 2500
      }
    },
    {
      name: "Samsung Galaxy S24 Ultra 512GB - ¡ÚLTIMAS HORAS!",
      price: 1299990,
      originalPrice: 1899990,
      category: "flash_deals",
      discount: 32,
      flashSale: {
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        originalPrice: 1899990,
        salePrice: 1299990,
        soldCount: 923,
        totalStock: 1500
      }
    },
    {
      name: "MacBook Air M3 16GB RAM 1TB SSD - CYBER CHILE",
      price: 1649990,
      originalPrice: 2599990,
      category: "flash_deals",
      discount: 37,
      flashSale: {
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        originalPrice: 2599990,
        salePrice: 1649990,
        soldCount: 456,
        totalStock: 800
      }
    },
    {
      name: "Smart TV 75\" 4K OLED Dolby Vision - ¡NO TE QUEDES SIN LA TUYA!",
      price: 979990,
      originalPrice: 1849990,
      category: "flash_deals",
      discount: 47,
      flashSale: {
        endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
        originalPrice: 1849990,
        salePrice: 979990,
        soldCount: 234,
        totalStock: 500
      }
    },
    {
      name: "PlayStation 5 Pro + 2 Controles + 5 Juegos - CYBER CHILE",
      price: 759990,
      originalPrice: 1199990,
      category: "flash_deals",
      discount: 37,
      flashSale: {
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        originalPrice: 1199990,
        salePrice: 759990,
        soldCount: 678,
        totalStock: 1000
      }
    },
    {
      name: "AirPods Pro Max Cancelación Ruido - FLASH CHILE",
      price: 349990,
      originalPrice: 599990,
      category: "flash_deals",
      discount: 42
    },
    {
      name: "Nintendo Switch OLED + 10 Juegos - CYBER CHILE",
      price: 479990,
      originalPrice: 799990,
      category: "flash_deals",
      discount: 40
    },
    {
      name: "Drone DJI Mini 4 Pro Cámara 4K - ÚLTIMAS HORAS",
      price: 719990,
      originalPrice: 1199990,
      category: "flash_deals",
      discount: 40
    },
    {
      name: "Cámara Canon EOS R6 Mark II - FLASH CHILE",
      price: 1919990,
      originalPrice: 2799990,
      category: "flash_deals",
      discount: 31
    },
    {
      name: "Laptop Gaming RTX 4070 32GB RAM - CYBER CHILE",
      price: 1399990,
      originalPrice: 2199990,
      category: "flash_deals",
      discount: 36
    },
    {
      name: "Tablet iPad Pro M4 12.9\" 1TB - NO TE QUEDES SIN LA TUYA",
      price: 1119990,
      originalPrice: 1799990,
      category: "flash_deals",
      discount: 38
    },
    {
      name: "Apple Watch Ultra 2 Titanio - FLASH CHILE",
      price: 959990,
      originalPrice: 1399990,
      category: "flash_deals",
      discount: 31
    },
    {
      name: "Auriculares Sony WH-1000XM5 - CYBER CHILE",
      price: 399990,
      originalPrice: 639990,
      category: "flash_deals",
      discount: 38
    },
    {
      name: "Robot Aspiradora Roomba i7+ - ÚLTIMAS HORAS",
      price: 599990,
      originalPrice: 999990,
      category: "flash_deals",
      discount: 40
    },
    {
      name: "Refrigerador Samsung 500L Inverter - FLASH CHILE",
      price: 899990,
      originalPrice: 1399990,
      category: "flash_deals",
      discount: 36
    },
    {
      name: "Lavadora LG 18kg Inteligente - CYBER CHILE",
      price: 699990,
      originalPrice: 1099990,
      category: "flash_deals",
      discount: 36
    },
    {
      name: "Microondas Samsung 32L Smart - NO TE QUEDES SIN LA TUYA",
      price: 199990,
      originalPrice: 349990,
      category: "flash_deals",
      discount: 43
    },
    {
      name: "Aire Acondicionado LG 18000 BTU - FLASH CHILE",
      price: 549990,
      originalPrice: 899990,
      category: "flash_deals",
      discount: 39
    },
    {
      name: "Bicicleta Eléctrica 50km Autonomía - CYBER CHILE",
      price: 799990,
      originalPrice: 1299990,
      category: "flash_deals",
      discount: 38
    },
    {
      name: "Scooter Eléctrico Xiaomi Pro 2 - ÚLTIMAS HORAS",
      price: 449990,
      originalPrice: 699990,
      category: "flash_deals",
      discount: 36
    },
    {
      name: "Proyector 4K HDR 3000 Lúmenes - FLASH CHILE",
      price: 399990,
      originalPrice: 699990,
      category: "flash_deals",
      discount: 43
    },
    {
      name: "Impresora 3D Profesional - CYBER CHILE",
      price: 299990,
      originalPrice: 549990,
      category: "flash_deals",
      discount: 45
    },
    {
      name: "Silla Gaming RGB Ergonómica - NO TE QUEDES SIN LA TUYA",
      price: 199990,
      originalPrice: 399990,
      category: "flash_deals",
      discount: 50
    },
    {
      name: "Monitor Gaming 32\" 4K 144Hz - FLASH CHILE",
      price: 599990,
      originalPrice: 999990,
      category: "flash_deals",
      discount: 40
    },
    {
      name: "Teclado Mecánico RGB + Mouse Gaming - CYBER CHILE",
      price: 99990,
      originalPrice: 199990,
      category: "flash_deals",
      discount: 50
    }
  ];

  // TIENDA DE $990 (45 productos)
  const dollarStoreProducts = [
    { name: "Organizador Escritorio 6 Compartimentos - ¡TODO A $990!", price: 990, originalPrice: 2990 },
    { name: "Set 10 Clips Magnéticos Colores - CHILE $990", price: 990, originalPrice: 1990 },
    { name: "Porta Lápices Giratorio Transparente - ¡INCREÍBLE!", price: 990, originalPrice: 2490 },
    { name: "Separadores Cajón Ajustables x4 - TODO $990", price: 990, originalPrice: 1890 },
    { name: "Mini Pizarra Magnética con Marcador - CHILE", price: 990, originalPrice: 2990 },
    { name: "Dispensador Cinta Adhesiva Compacto - $990", price: 990, originalPrice: 1790 },
    { name: "Set 20 Ganchos Adhesivos Transparentes - ¡WOW!", price: 990, originalPrice: 2490 },
    { name: "Organizador Cables Espiral x5 - CHILE $990", price: 990, originalPrice: 1990 },
    { name: "Mini Calculadora Solar Colorida - ¡INCREÍBLE!", price: 990, originalPrice: 2990 },
    { name: "Porta Notas Adhesivas Acrílico - TODO $990", price: 990, originalPrice: 1890 },
    { name: "Soporte Celular Ajustable Mesa - CHILE", price: 990, originalPrice: 2490 },
    { name: "Lámpara LED USB Flexible - $990", price: 990, originalPrice: 1990 },
    { name: "Organizador Llaves Magnético - ¡WOW!", price: 990, originalPrice: 1790 },
    { name: "Set 5 Bolsas Reutilizables Compras - CHILE", price: 990, originalPrice: 2290 },
    { name: "Embudo Plegable Silicona - TODO $990", price: 990, originalPrice: 1590 },
    { name: "Abridor Botellas Magnético - ¡INCREÍBLE!", price: 990, originalPrice: 1490 },
    { name: "Cortador Pizza Acero Inoxidable - CHILE", price: 990, originalPrice: 1890 },
    { name: "Colador Té Acero con Cadena - $990", price: 990, originalPrice: 1690 },
    { name: "Medidor Espaguetis Acero - ¡WOW!", price: 990, originalPrice: 1390 },
    { name: "Pelador Verduras Ergonómico - TODO $990", price: 990, originalPrice: 1590 },
    { name: "Cepillo Limpieza Botellas - CHILE", price: 990, originalPrice: 1290 },
    { name: "Tapas Silicona Stretch x6 - ¡INCREÍBLE!", price: 990, originalPrice: 2190 },
    { name: "Rallador Queso Compacto - $990", price: 990, originalPrice: 1490 },
    { name: "Exprimidor Limón Manual - ¡WOW!", price: 990, originalPrice: 1690 },
    { name: "Cortador Huevo Acero - TODO $990", price: 990, originalPrice: 1390 },
    { name: "Separador Yema Clara Acero - CHILE", price: 990, originalPrice: 1190 },
    { name: "Pinzas Cocina Silicona - ¡INCREÍBLE!", price: 990, originalPrice: 1590 },
    { name: "Cuchara Medidora Ajustable - $990", price: 990, originalPrice: 1490 },
    { name: "Batidor Huevos Manual - ¡WOW!", price: 990, originalPrice: 1390 },
    { name: "Cortador Manzana 8 Gajos - TODO $990", price: 990, originalPrice: 1690 },
    { name: "Prensa Ajos Acero - CHILE", price: 990, originalPrice: 1890 },
    { name: "Cepillo Verduras Natural - ¡INCREÍBLE!", price: 990, originalPrice: 1290 },
    { name: "Espátula Silicona Flexible - $990", price: 990, originalPrice: 1490 },
    { name: "Tijeras Cocina Multiuso - ¡WOW!", price: 990, originalPrice: 1790 },
    { name: "Mortero Mini Granito - TODO $990", price: 990, originalPrice: 2290 },
    { name: "Colador Pasta Plegable - CHILE", price: 990, originalPrice: 1990 },
    { name: "Termómetro Cocina Digital - ¡INCREÍBLE!", price: 990, originalPrice: 2490 },
    { name: "Báscula Cocina 5kg - $990", price: 990, originalPrice: 2990 },
    { name: "Timer Cocina Magnético - ¡WOW!", price: 990, originalPrice: 1690 },
    { name: "Guantes Horno Silicona - TODO $990", price: 990, originalPrice: 1890 },
    { name: "Salvamanteles Silicona x4 - CHILE", price: 990, originalPrice: 1590 },
    { name: "Afilador Cuchillos Manual - ¡INCREÍBLE!", price: 990, originalPrice: 2190 },
    { name: "Dosificador Aceite Cristal - $990", price: 990, originalPrice: 1790 },
    { name: "Molde Hielo Esférico - ¡WOW!", price: 990, originalPrice: 1490 },
    { name: "Filtro Agua Grifo Universal - TODO $990", price: 990, originalPrice: 2490 }
  ];

  // JOYERÍA (32 productos)
  const jewelryProducts = [
    { name: "Set Joyería Dorada Completo - Collar + Aretes + Pulsera CHILE", price: 19990, originalPrice: 49990, subcategory: "sets" },
    { name: "Pulsera Cadena Oro 18k Ajustable - Elegancia Chilena", price: 13990, originalPrice: 31990, subcategory: "pulseras" },
    { name: "Collar Perlas Naturales 45cm - Belleza Chile", price: 25990, originalPrice: 55990, subcategory: "collares" },
    { name: "Aretes Diamante Sintético Brillante - Lujo Chile", price: 15990, originalPrice: 39990, subcategory: "aretes" },
    { name: "Anillo Compromiso Plata 925 - Amor Chileno", price: 31990, originalPrice: 79990, subcategory: "anillos" },
    { name: "Diadema Cristales Swarovski - Princesa Chile", price: 23990, originalPrice: 53990, subcategory: "accesorios_cabello" },
    { name: "Tobillera Cadena Delicada Oro - Verano Chile", price: 10990, originalPrice: 27990, subcategory: "tobilleras" },
    { name: "Cadena Cuerpo Bohemia Dorada - Estilo Chile", price: 18990, originalPrice: 45990, subcategory: "cadena_cuerpo" },
    { name: "Set Limpieza Joyería Profesional - Cuidado Chile", price: 12990, originalPrice: 30990, subcategory: "accesorios_joyeria" },
    { name: "Pulsera Tenis Diamantes CZ - Lujo Chileno", price: 28990, originalPrice: 69990, subcategory: "pulseras" },
    { name: "Collar Cadena Gruesa Oro 24k - Poder Chile", price: 35990, originalPrice: 79990, subcategory: "collares" },
    { name: "Aretes Perla Cultivada - Elegancia Chile", price: 18990, originalPrice: 42990, subcategory: "aretes" },
    { name: "Anillo Solitario Diamante 1ct - Compromiso Chile", price: 89990, originalPrice: 199990, subcategory: "anillos" },
    { name: "Pasador Cabello Perlas - Novia Chile", price: 14990, originalPrice: 32990, subcategory: "accesorios_cabello" },
    { name: "Tobillera Charm Corazón - Amor Chile", price: 8990, originalPrice: 21990, subcategory: "tobilleras" },
    { name: "Cadena Cuerpo Cristales - Fiesta Chile", price: 22990, originalPrice: 51990, subcategory: "cadena_cuerpo" },
    { name: "Estuche Joyería Terciopelo - Organización Chile", price: 16990, originalPrice: 35990, subcategory: "accesorios_joyeria" },
    { name: "Pulsera Charm Personalizable - Recuerdos Chile", price: 24990, originalPrice: 54990, subcategory: "pulseras" },
    { name: "Collar Choker Terciopelo - Moda Chile", price: 11990, originalPrice: 26990, subcategory: "collares" },
    { name: "Aretes Aro Grandes Oro - Tendencia Chile", price: 16990, originalPrice: 37990, subcategory: "aretes" },
    { name: "Anillo Banda Diamantes - Matrimonio Chile", price: 45990, originalPrice: 99990, subcategory: "anillos" },
    { name: "Corona Tiara Cristales - Quinceañera Chile", price: 39990, originalPrice: 89990, subcategory: "accesorios_cabello" },
    { name: "Tobillera Cadena Doble - Playa Chile", price: 12990, originalPrice: 28990, subcategory: "tobilleras" },
    { name: "Cadena Cuerpo Minimalista - Sutil Chile", price: 15990, originalPrice: 35990, subcategory: "cadena_cuerpo" },
    { name: "Limpiador Ultrasónico Joyería - Profesional Chile", price: 89990, originalPrice: 179990, subcategory: "accesorios_joyeria" },
    { name: "Pulsera Eslabones Cubanos - Hip Hop Chile", price: 32990, originalPrice: 72990, subcategory: "pulseras" },
    { name: "Collar Lariat Perlas - Sofisticación Chile", price: 29990, originalPrice: 64990, subcategory: "collares" },
    { name: "Aretes Chandelier Cristales - Gala Chile", price: 26990, originalPrice: 59990, subcategory: "aretes" },
    { name: "Anillo Cocktail Esmeralda - Lujo Chile", price: 67990, originalPrice: 149990, subcategory: "anillos" },
    { name: "Vincha Flores Perlas - Boda Chile", price: 21990, originalPrice: 48990, subcategory: "accesorios_cabello" },
    { name: "Tobillera Campanas Plata - Bohemia Chile", price: 9990, originalPrice: 23990, subcategory: "tobilleras" },
    { name: "Cadena Cuerpo Multicapa - Audaz Chile", price: 27990, originalPrice: 61990, subcategory: "cadena_cuerpo" }
  ];

  // ELECTRÓNICOS (28 productos)
  const electronicsProducts = [
    { name: "Smartphone Xiaomi 13 Pro 256GB - Tecnología Chile", price: 899990, originalPrice: 1299990 },
    { name: "Tablet Samsung Galaxy Tab S9 128GB - Productividad Chile", price: 649990, originalPrice: 999990 },
    { name: "Laptop HP Pavilion 16GB RAM 512GB SSD - Trabajo Chile", price: 799990, originalPrice: 1199990 },
    { name: "Auriculares Bluetooth JBL Tune 760NC - Música Chile", price: 149990, originalPrice: 249990 },
    { name: "Smartwatch Garmin Venu 3 - Fitness Chile", price: 549990, originalPrice: 799990 },
    { name: "Cámara Instantánea Fujifilm Instax Mini 12 - Recuerdos Chile", price: 119990, originalPrice: 179990 },
    { name: "Parlante Bluetooth Sony SRS-XB43 - Fiesta Chile", price: 199990, originalPrice: 329990 },
    { name: "Cargador Inalámbrico Rápido 15W - Comodidad Chile", price: 29990, originalPrice: 59990 },
    { name: "Power Bank 20000mAh Carga Rápida - Energía Chile", price: 39990, originalPrice: 79990 },
    { name: "Webcam 4K Logitech Brio - Streaming Chile", price: 299990, originalPrice: 449990 },
    { name: "Micrófono USB Blue Yeti - Podcast Chile", price: 249990, originalPrice: 399990 },
    { name: "Router WiFi 6 TP-Link AX3000 - Internet Chile", price: 179990, originalPrice: 299990 },
    { name: "Disco Duro Externo 2TB USB 3.0 - Almacenamiento Chile", price: 129990, originalPrice: 199990 },
    { name: "Memoria USB 128GB 3.0 - Portabilidad Chile", price: 19990, originalPrice: 39990 },
    { name: "Cable HDMI 4K 2 metros - Conexión Chile", price: 14990, originalPrice: 29990 },
    { name: "Adaptador USB-C Hub 7 en 1 - Versatilidad Chile", price: 49990, originalPrice: 89990 },
    { name: "Soporte Laptop Ajustable Aluminio - Ergonomía Chile", price: 59990, originalPrice: 99990 },
    { name: "Luz LED Ring 18\" con Trípode - Iluminación Chile", price: 89990, originalPrice: 149990 },
    { name: "Estabilizador Gimbal Smartphone - Video Chile", price: 199990, originalPrice: 349990 },
    { name: "Lente Macro Smartphone Clip - Fotografía Chile", price: 24990, originalPrice: 49990 },
    { name: "Ventilador USB Silencioso - Refrigeración Chile", price: 19990, originalPrice: 34990 },
    { name: "Humidificador Ultrasónico LED - Ambiente Chile", price: 39990, originalPrice: 69990 },
    { name: "Purificador Aire HEPA Compacto - Salud Chile", price: 149990, originalPrice: 249990 },
    { name: "Báscula Inteligente Bluetooth - Fitness Chile", price: 79990, originalPrice: 129990 },
    { name: "Termómetro Infrarrojo Sin Contacto - Salud Chile", price: 49990, originalPrice: 89990 },
    { name: "Oxímetro Pulso Digital - Monitoreo Chile", price: 29990, originalPrice: 59990 },
    { name: "Tensiómetro Digital Automático - Presión Chile", price: 69990, originalPrice: 119990 },
    { name: "Nebulizador Ultrasónico Portátil - Respiración Chile", price: 89990, originalPrice: 149990 }
  ];

  // Función para generar productos base con precios chilenos
  const createProduct = (data: any, id: number): Product => ({
    id,
    name: data.name,
    price: data.price,
    originalPrice: data.originalPrice || Math.floor(data.price * 1.8),
    image: `https://images.pexels.com/photos/${1000000 + id}/pexels-photo-${1000000 + id}.jpeg`,
    images: [
      `https://images.pexels.com/photos/${1000000 + id}/pexels-photo-${1000000 + id}.jpeg`,
      `https://images.pexels.com/photos/${1000001 + id}/pexels-photo-${1000001 + id}.jpeg`,
      `https://images.pexels.com/photos/${1000002 + id}/pexels-photo-${1000002 + id}.jpeg`
    ],
    category: data.category || "electronics",
    subcategory: data.subcategory,
    rating: 4.0 + Math.random() * 1.0,
    reviewCount: Math.floor(Math.random() * 5000) + 100,
    description: `${data.name} - ¡El producto más buscado en Chile! Calidad premium garantizada con envío rápido a todo el país. ¡Aprovecha esta oferta única disponible solo para chilenos!`,
    features: [
      "🇨🇱 Envío gratis a todo Chile desde $25.000",
      "⚡ Entrega 24-48 horas en Región Metropolitana",
      "🛡️ Garantía internacional válida en Chile",
      "💳 Pago con todas las tarjetas chilenas",
      "🔒 Compra 100% segura certificada Chile",
      "↩️ Cambios y devoluciones gratis 30 días",
      "📞 Atención al cliente Chile 24/7",
      "✅ Producto verificado para mercado chileno"
    ],
    inStock: Math.random() > 0.1,
    discount: data.discount || Math.floor(((data.originalPrice || Math.floor(data.price * 1.8)) - data.price) / (data.originalPrice || Math.floor(data.price * 1.8)) * 100),
    isPopular: Math.random() > 0.7,
    isFeatured: Math.random() > 0.8,
    brand: ["TechPro Chile", "StyleMax Chile", "QualityPlus", "PremiumBrand", "TopChoice Chile"][Math.floor(Math.random() * 5)],
    seller: mockSellers[Math.floor(Math.random() * mockSellers.length)],
    shipping: {
      free: data.price > 25000,
      cost: data.price > 25000 ? 0 : 3990,
      estimatedDays: Math.floor(Math.random() * 5) + 2,
      methods: ["Standard Chile", "Express Chile"],
      from: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Temuco"][Math.floor(Math.random() * 5)],
      express: {
        available: true,
        cost: 9990,
        days: 1
      }
    },
    flashSale: data.flashSale,
    specifications: {
      "Material": "Calidad Premium Internacional",
      "Garantía": "2 años garantía internacional válida en Chile",
      "Origen": "Importado con certificación chilena",
      "Calidad": "Estándar internacional certificado Chile",
      "Compatibilidad": "100% compatible con estándares chilenos"
    },
    tags: ["chile", "envio-gratis", "oferta", "popular", "cyber-chile"],
    warranty: "2 años garantía internacional válida en Chile",
    returnPolicy: "30 días cambios y devoluciones gratuitas en Chile",
    countryOfOrigin: "Importado y certificado para Chile",
    weight: Math.random() * 2 + 0.1
  });

  // Agregar productos de ofertas relámpago (25)
  flashDealsProducts.forEach((product, index) => {
    products.push(createProduct(product, productId++));
  });

  // Agregar productos de tienda de $990 (45)
  dollarStoreProducts.forEach((product, index) => {
    products.push(createProduct({...product, category: "dollar_store"}, productId++));
  });

  // Agregar productos de joyería (32)
  jewelryProducts.forEach((product, index) => {
    products.push(createProduct({...product, category: "jewelry"}, productId++));
  });

  // Agregar productos electrónicos (28)
  electronicsProducts.forEach((product, index) => {
    products.push(createProduct({...product, category: "electronics"}, productId++));
  });

  // Generar productos para las categorías restantes hasta llegar a 200
  const remainingCategories = [
    { 
      category: "bags", 
      count: 18, 
      names: [
        "Bolso Cuero Genuino Elegante - Estilo Chile",
        "Mochila Laptop Antirrobo - Seguridad Chile", 
        "Cartera Minimalista RFID - Protección Chile",
        "Bolso Viaje Grande Resistente - Aventura Chile",
        "Riñonera Deportiva Impermeable - Deporte Chile",
        "Bolso Bandolera Vintage - Moda Chile",
        "Mochila Escolar Ergonómica - Educación Chile",
        "Cartera Mujer Compartimentos - Organización Chile",
        "Bolso Playa Resistente Agua - Verano Chile",
        "Mochila Senderismo 40L - Outdoor Chile",
        "Bolso Mano Cadena Dorada - Elegancia Chile",
        "Cartera Hombre Cuero - Masculino Chile",
        "Bolso Trabajo Profesional - Oficina Chile",
        "Mochila Hidratación Ciclismo - Bike Chile",
        "Bolso Gimnasio Compartimentos - Fitness Chile",
        "Cartera Tarjetero Slim - Minimalista Chile",
        "Bolso Maternal Organizador - Mamá Chile",
        "Mochila Fotógrafo Acolchada - Cámara Chile"
      ],
      prices: [45990, 89990, 32990, 67990, 24990, 38990, 29990, 41990, 19990, 79990, 52990, 36990, 64990, 49990, 33990, 18990, 71990, 94990]
    },
    { 
      category: "footwear", 
      count: 22, 
      names: [
        "Zapatillas Running Nike Air - Deporte Chile",
        "Sandalias Verano Cómodas - Playa Chile",
        "Botas Lluvia Impermeables - Invierno Chile", 
        "Ojotas Ergonómicas Gel - Confort Chile",
        "Zapatos Cuero Formales - Elegancia Chile",
        "Zapatillas Casual Blancas - Moda Chile",
        "Botines Mujer Tacón - Estilo Chile",
        "Zapatos Deportivos Mesh - Transpirable Chile",
        "Sandalias Plataforma Verano - Altura Chile",
        "Botas Trabajo Seguridad - Protección Chile",
        "Zapatillas Skate Urbanas - Street Chile",
        "Zapatos Oxford Cuero - Clásico Chile",
        "Ojotas Masaje Reflexología - Salud Chile",
        "Botas Montaña Trekking - Aventura Chile",
        "Zapatillas Básquet Pro - Cancha Chile",
        "Sandalias Ortopédicas - Comodidad Chile",
        "Zapatos Baile Latino - Danza Chile",
        "Botas Lluvia Niños - Infantil Chile",
        "Zapatillas Yoga Antideslizantes - Zen Chile",
        "Zapatos Enfermería Cómodos - Salud Chile",
        "Ojotas Piscina Antideslizantes - Seguridad Chile",
        "Botas Ecuestre Cuero - Equitación Chile"
      ],
      prices: [129990, 34990, 45990, 19990, 89990, 67990, 79990, 54990, 42990, 119990, 72990, 94990, 24990, 149990, 109990, 38990, 64990, 29990, 31990, 52990, 16990, 189990]
    },
    { 
      category: "phone_accessories", 
      count: 35, 
      names: [
        "Funda iPhone Magnética MagSafe - Protección Chile",
        "Cargador Inalámbrico Rápido 15W - Tecnología Chile",
        "Protector Pantalla Vidrio Templado - Seguridad Chile",
        "Soporte Auto Magnético - Conducción Chile",
        "Auriculares Bluetooth TWS - Audio Chile",
        "Power Bank 10000mAh Compacto - Energía Chile",
        "Cable USB-C Trenzado 2m - Durabilidad Chile",
        "Anillo Soporte Giratorio - Agarre Chile",
        "Funda Impermeable Universal - Agua Chile",
        "Cargador Auto Dual USB - Viaje Chile",
        "Lente Macro Clip Smartphone - Fotografía Chile",
        "Soporte Mesa Ajustable - Escritorio Chile",
        "Protector Cámara Vidrio - Lente Chile",
        "Adaptador Lightning a Jack - Audio Chile",
        "Funda Cartera Cuero - Elegancia Chile",
        "Cargador Portátil Solar - Ecológico Chile",
        "Cable Retráctil 3 en 1 - Versatilidad Chile",
        "Soporte Cama Flexible - Comodidad Chile",
        "Funda Antigolpes Militar - Resistencia Chile",
        "Cargador Inalámbrico Auto - Integrado Chile",
        "Stylus Pen Capacitivo - Precisión Chile",
        "Soporte Bicicleta Impermeable - Ciclismo Chile",
        "Funda Transparente Reforzada - Claridad Chile",
        "Cargador Múltiple 6 Puertos - Familia Chile",
        "Lente Gran Angular Clip - Paisaje Chile",
        "Soporte Trípode Flexible - Estabilidad Chile",
        "Funda Silicona Líquida - Tacto Chile",
        "Cargador Rápido GaN 65W - Velocidad Chile",
        "Cable Magnético Carga - Innovación Chile",
        "Soporte Ventosa Parabrisas - Navegación Chile",
        "Funda LED Notificaciones - Visual Chile",
        "Cargador Inalámbrico Plegable - Portátil Chile",
        "Lente Ojo de Pez Clip - Creativo Chile",
        "Soporte Cuello Manos Libres - Libertad Chile",
        "Funda Batería Externa - Autonomía Chile"
      ],
      prices: [24990, 39990, 12990, 18990, 89990, 29990, 8990, 6990, 16990, 14990, 22990, 15990, 9990, 11990, 32990, 49990, 13990, 21990, 27990, 44990, 7990, 26990, 19990, 59990, 17990, 23990, 14990, 79990, 19990, 12990, 34990, 31990, 15990, 28990, 69990]
    },
    { 
      category: "tools", 
      count: 15, 
      names: [
        "Destornillador Eléctrico 21V - Potencia Chile",
        "Taladro Litio 18V Percutor - Profesional Chile",
        "Mini Motosierra Portátil - Jardín Chile",
        "Amoladora Angular 115mm - Corte Chile",
        "Pistola Pintura Eléctrica - Renovación Chile",
        "Set Brocas 100 Piezas - Completo Chile",
        "Tornillo Mesa Carpintería - Precisión Chile",
        "Máquina Roscadora Tubos - Plomería Chile",
        "Sierra Circular 1200W - Madera Chile",
        "Lijadora Orbital Eléctrica - Acabado Chile",
        "Soldadora Inverter 200A - Metalurgia Chile",
        "Compresor Aire 24L - Neumático Chile",
        "Martillo Demoledor 1500W - Construcción Chile",
        "Ingletadora 254mm Láser - Corte Chile",
        "Router Madera 1200W - Moldura Chile"
      ],
      prices: [89990, 149990, 79990, 69990, 119990, 34990, 189990, 249990, 179990, 94990, 299990, 199990, 349990, 449990, 229990]
    },
    { 
      category: "toys", 
      count: 28, 
      names: [
        "Bloques Construcción 1000 Piezas - Creatividad Chile",
        "Juguete Electrónico Robot - Tecnología Chile",
        "Juego Mesa Familiar Monopoly - Diversión Chile",
        "Burbujas Agua Gigantes - Jardín Chile",
        "Casa Muñecas 3 Pisos - Imaginación Chile",
        "Carro Control Remoto 4WD - Velocidad Chile",
        "Rompecabezas 1000 Piezas - Paciencia Chile",
        "Pelota Fútbol Profesional - Deporte Chile",
        "Muñeca Interactiva Habla - Compañía Chile",
        "Set Cocina Juguete - Chef Chile",
        "Drone Mini Cámara - Vuelo Chile",
        "Bicicleta Equilibrio Niños - Balance Chile",
        "Juego Ciencia Experimentos - Educativo Chile",
        "Peluche Gigante Oso - Abrazo Chile",
        "Pista Carreras Looping - Adrenalina Chile",
        "Instrumento Musical Teclado - Música Chile",
        "Juego Memoria Electrónico - Mental Chile",
        "Patineta Infantil LED - Diversión Chile",
        "Set Arte Completo - Creatividad Chile",
        "Juguete Baño Flotante - Agua Chile",
        "Robot Transformable - Acción Chile",
        "Juego Estrategia Ajedrez - Inteligencia Chile",
        "Pelota Saltarina Gigante - Ejercicio Chile",
        "Muñeco Acción Superhéroe - Aventura Chile",
        "Set Herramientas Juguete - Construcción Chile",
        "Juego Cartas Coleccionables - Estrategia Chile",
        "Bicicleta Triciclo Evolutivo - Crecimiento Chile",
        "Juguete Sensorial Fidget - Relajación Chile"
      ],
      prices: [49990, 89990, 32990, 14990, 129990, 79990, 19990, 24990, 94990, 38990, 119990, 89990, 54990, 67990, 109990, 74990, 29990, 64990, 42990, 16990, 84990, 27990, 21990, 36990, 31990, 18990, 149990, 12990]
    },
    { 
      category: "cosmetics", 
      count: 24, 
      names: [
        "Set Maquillaje Profesional 32 Piezas - Belleza Chile",
        "Labial Larga Duración Mate - Color Chile",
        "Base Líquida Cobertura Total - Perfección Chile",
        "Paleta Sombras 40 Colores - Variedad Chile",
        "Máscara Pestañas Volumen - Mirada Chile",
        "Corrector Ojeras Cobertura - Luminosidad Chile",
        "Rubor Polvo Compacto - Sonrojo Chile",
        "Delineador Ojos Waterproof - Definición Chile",
        "Primer Rostro Poros - Suavidad Chile",
        "Polvo Compacto Matificante - Control Chile",
        "Iluminador Líquido Glow - Brillo Chile",
        "Contorno Rostro Cremoso - Escultura Chile",
        "Brochas Maquillaje Set 12 - Aplicación Chile",
        "Desmaquillante Bifásico - Limpieza Chile",
        "Sérum Vitamina C - Antioxidante Chile",
        "Crema Hidratante Ácido Hialurónico - Juventud Chile",
        "Mascarilla Facial Arcilla - Purificación Chile",
        "Tónico Facial Agua Rosas - Frescura Chile",
        "Exfoliante Corporal Azúcar - Suavidad Chile",
        "Aceite Facial Argan - Nutrición Chile",
        "Protector Solar FPS 50 - Protección Chile",
        "Agua Micelar Limpieza - Delicadeza Chile",
        "Crema Contorno Ojos - Antiedad Chile",
        "Bálsamo Labial Reparador - Hidratación Chile"
      ],
      prices: [89990, 18990, 34990, 52990, 24990, 28990, 19990, 16990, 31990, 22990, 26990, 29990, 64990, 21990, 45990, 38990, 15990, 17990, 23990, 42990, 32990, 19990, 35990, 8990]
    },
    { 
      category: "home", 
      count: 19, 
      names: [
        "Lámpara LED Smart WiFi - Iluminación Chile",
        "Organizador Cocina Bambú - Orden Chile",
        "Cojín Decorativo Terciopelo - Confort Chile",
        "Vela Aromática Soja 3 Mechas - Relajación Chile",
        "Espejo Decorativo Marco Dorado - Elegancia Chile",
        "Alfombra Sala Antideslizante - Calidez Chile",
        "Cortinas Blackout Térmicas - Privacidad Chile",
        "Macetero Colgante Macramé - Verde Chile",
        "Reloj Pared Moderno - Tiempo Chile",
        "Difusor Aromas Ultrasónico - Bienestar Chile",
        "Cuadro Decorativo Canvas - Arte Chile",
        "Organizador Baño Acero - Funcionalidad Chile",
        "Lámpara Mesa Táctil - Lectura Chile",
        "Cesta Almacenaje Mimbre - Organización Chile",
        "Termómetro Higrómetro Digital - Ambiente Chile",
        "Perchero Pie Madera - Orden Chile",
        "Florero Cristal Moderno - Decoración Chile",
        "Organizador Zapatos 10 Niveles - Espacio Chile",
        "Humidificador Aromas LED - Ambiente Chile"
      ],
      prices: [45990, 32990, 24990, 18990, 67990, 89990, 54990, 28990, 38990, 49990, 42990, 36990, 52990, 29990, 21990, 64990, 31990, 79990, 58990]
    },
    { 
      category: "fashion", 
      count: 26, 
      names: [
        "Vestido Verano Floral - Frescura Chile",
        "Camisa Algodón Manga Larga - Elegancia Chile",
        "Pantalón Casual Stretch - Comodidad Chile",
        "Chaqueta Denim Vintage - Estilo Chile",
        "Blusa Seda Estampada - Sofisticación Chile",
        "Jean Skinny Tiro Alto - Moda Chile",
        "Sweater Lana Cuello V - Abrigo Chile",
        "Falda Plisada Midi - Feminidad Chile",
        "Polo Algodón Pima - Calidad Chile",
        "Shorts Denim Rotos - Juvenil Chile",
        "Cardigan Punto Abierto - Versatilidad Chile",
        "Vestido Cóctel Negro - Elegancia Chile",
        "Camisa Cuadros Franela - Casual Chile",
        "Pantalón Formal Pinzas - Oficina Chile",
        "Chaqueta Cuero Sintético - Rock Chile",
        "Top Crop Deportivo - Fitness Chile",
        "Maxi Vestido Bohemio - Libertad Chile",
        "Blazer Entallado Mujer - Poder Chile",
        "Leggins Deportivos Compresión - Deporte Chile",
        "Pijama Seda Conjunto - Descanso Chile",
        "Abrigo Lana Largo - Invierno Chile",
        "Bikini Triangular Push Up - Playa Chile",
        "Sudadera Capucha Oversize - Comodidad Chile",
        "Vestido Fiesta Lentejuelas - Brillo Chile",
        "Camisa Lino Manga Corta - Verano Chile",
        "Pantalón Yoga Cintura Alta - Zen Chile"
      ],
      prices: [45990, 38990, 42990, 67990, 54990, 49990, 52990, 39990, 29990, 32990, 46990, 89990, 34990, 59990, 79990, 24990, 64990, 74990, 31990, 69990, 149990, 28990, 41990, 119990, 36990, 33990]
    },
    { 
      category: "sports", 
      count: 12, 
      names: [
        "Pesas Ajustables 20kg Par - Fuerza Chile",
        "Banda Elástica Resistencia Set - Flexibilidad Chile",
        "Botella Térmica Acero 1L - Hidratación Chile",
        "Guantes Gym Antideslizantes - Agarre Chile",
        "Colchoneta Yoga TPE 6mm - Equilibrio Chile",
        "Cuerda Saltar Profesional - Cardio Chile",
        "Mancuernas Neopreno 3kg - Tonificación Chile",
        "Pelota Pilates 65cm - Core Chile",
        "Rodillo Foam Masaje - Recuperación Chile",
        "Cinturón Levantamiento Pesas - Soporte Chile",
        "Bicicleta Estática Plegable - Cardio Chile",
        "Set Discos Peso Olímpicos - Profesional Chile"
      ],
      prices: [189990, 34990, 42990, 18990, 29990, 12990, 24990, 19990, 31990, 45990, 299990, 449990]
    },
    { 
      category: "hats", 
      count: 8, 
      names: [
        "Gorra Deportiva Ajustable - Protección Chile",
        "Boina Elegante Lana - Estilo Chile",
        "Sombrero Playa Ala Ancha - Verano Chile",
        "Gorro Invierno Polar - Abrigo Chile",
        "Gorra Trucker Malla - Casual Chile",
        "Boina Militar Camuflaje - Aventura Chile",
        "Sombrero Cowboy Cuero - Western Chile",
        "Gorro Beanie Lana - Urbano Chile"
      ],
      prices: [24990, 32990, 28990, 19990, 21990, 26990, 54990, 16990]
    },
    { 
      category: "lights", 
      count: 8, 
      names: [
        "Luces Solar Jardín 8 Pack - Ecológico Chile",
        "Lámpara Camping Recargable - Aventura Chile",
        "Tira LED RGB 5m Control - Ambiente Chile",
        "Foco Recargable Emergencia - Seguridad Chile",
        "Luces Navidad 200 LED - Festividad Chile",
        "Lámpara UV Esterilizadora - Salud Chile",
        "Proyector Estrellas Galaxia - Relajación Chile",
        "Luz Lectura Clip Recargable - Estudio Chile"
      ],
      prices: [39990, 29990, 24990, 18990, 32990, 89990, 54990, 14990]
    },
    { 
      category: "artificial_flowers", 
      count: 6, 
      names: [
        "Ramo Rosas Artificiales 12 Unidades - Belleza Chile",
        "Plantas Decorativas Suculentas - Verde Chile",
        "Ramo Bodas Peonías Blancas - Elegancia Chile",
        "Flores Seda Girasoles - Alegría Chile",
        "Arreglo Floral Mesa Centro - Decoración Chile",
        "Guirnalda Eucalipto Artificial - Natural Chile"
      ],
      prices: [28990, 34990, 89990, 24990, 52990, 31990]
    },
    { 
      category: "school_supplies", 
      count: 8, 
      names: [
        "Set Útiles Completo 50 Piezas - Educación Chile",
        "Cuadernos A4 Pack 10 - Escritura Chile",
        "Lápices Colores 72 Unidades - Arte Chile",
        "Mochila Escolar Ergonómica - Comodidad Chile",
        "Calculadora Científica - Matemáticas Chile",
        "Reglas Geométricas Set - Precisión Chile",
        "Marcadores Permanentes 24 - Creatividad Chile",
        "Archivador Documentos A4 - Organización Chile"
      ],
      prices: [89990, 19990, 32990, 67990, 45990, 16990, 28990, 24990]
    },
    { 
      category: "bottles", 
      count: 6, 
      names: [
        "Botella Acero Inoxidable 750ml - Durabilidad Chile",
        "Termo Café Viaje 500ml - Temperatura Chile",
        "Botella Deportiva Silicona - Flexibilidad Chile",
        "Jarra Vidrio Borosilicato 1.5L - Pureza Chile",
        "Botella Infusor Frutas - Sabor Chile",
        "Termo Sopa Boca Ancha - Comida Chile"
      ],
      prices: [34990, 28990, 19990, 42990, 24990, 31990]
    },
    { 
      category: "watches", 
      count: 8, 
      names: [
        "Reloj Clásico Cuero Genuino - Elegancia Chile",
        "Smartwatch Deportivo GPS - Tecnología Chile",
        "Reloj Deportivo Resistente Agua - Aventura Chile",
        "Reloj Elegante Acero Inoxidable - Sofisticación Chile",
        "Smartwatch Salud Oxígeno - Bienestar Chile",
        "Reloj Vintage Automático - Tradición Chile",
        "Reloj Digital Multifunción - Practicidad Chile",
        "Reloj Lujo Oro Rosa - Exclusividad Chile"
      ],
      prices: [89990, 199990, 67990, 149990, 179990, 249990, 54990, 399990]
    },
    { 
      category: "umbrellas", 
      count: 4, 
      names: [
        "Paraguas Automático Resistente Viento - Protección Chile",
        "Paraguas Compacto Plegable - Portabilidad Chile",
        "Sombrilla Playa UV 50+ - Verano Chile",
        "Paraguas Golf Grande 150cm - Cobertura Chile"
      ],
      prices: [24990, 16990, 39990, 54990]
    },
    { 
      category: "socks", 
      count: 6, 
      names: [
        "Medias Deportivas Transpirables Pack 6 - Deporte Chile",
        "Calcetines Algodón Orgánico - Suavidad Chile",
        "Medias Térmicas Lana Merino - Calor Chile",
        "Pack Medias Invisibles 10 Pares - Discretas Chile",
        "Calcetines Compresión Circulación - Salud Chile",
        "Medias Navideñas Divertidas - Festividad Chile"
      ],
      prices: [18990, 24990, 32990, 16990, 45990, 12990]
    },
    { 
      category: "automotive", 
      count: 6, 
      names: [
        "Cargador Auto USB Dual Carga Rápida - Tecnología Chile",
        "Soporte Celular Auto Magnético - Navegación Chile",
        "Ambientador Auto Lujo - Fragancia Chile",
        "Kit Limpieza Auto Completo - Cuidado Chile",
        "Organizador Asientos Auto - Orden Chile",
        "Cámara Retroceso Inalámbrica - Seguridad Chile"
      ],
      prices: [19990, 24990, 8990, 54990, 32990, 89990]
    }
  ];

  // Agregar productos para las categorías restantes
  remainingCategories.forEach(categoryData => {
    categoryData.names.forEach((name, index) => {
      if (productId <= 200) {
        products.push(createProduct({
          name: name,
          price: categoryData.prices[index] || Math.floor(Math.random() * 150000) + 9990,
          category: categoryData.category
        }, productId++));
      }
    });
  });

  return products.slice(0, 200); // Asegurar exactamente 200 productos
};

export const mockProducts: Product[] = generateProducts();

export const mockCategories = [
  { id: 'all', name: 'Todas las categorías', count: mockProducts.length, emoji: '🛍️' },
  { id: 'flash_deals', name: 'Ofertas Relámpago', count: mockProducts.filter(p => p.flashSale).length, emoji: '⚡', hot: true },
  { id: 'dollar_store', name: 'Tienda de $990', count: mockProducts.filter(p => p.category === 'dollar_store').length, emoji: '💰', trending: true },
  { id: 'jewelry', name: 'Joyería', count: mockProducts.filter(p => p.category === 'jewelry').length, emoji: '💎' },
  { id: 'electronics', name: 'Electrónicos', count: mockProducts.filter(p => p.category === 'electronics').length, emoji: '📱', trending: true },
  { id: 'bags', name: 'Bolsos', count: mockProducts.filter(p => p.category === 'bags').length, emoji: '👜' },
  { id: 'footwear', name: 'Calzados', count: mockProducts.filter(p => p.category === 'footwear').length, emoji: '👟' },
  { id: 'phone_accessories', name: 'Accesorios Celular', count: mockProducts.filter(p => p.category === 'phone_accessories').length, emoji: '📱' },
  { id: 'tools', name: 'Herramientas', count: mockProducts.filter(p => p.category === 'tools').length, emoji: '🔧' },
  { id: 'toys', name: 'Juguetes', count: mockProducts.filter(p => p.category === 'toys').length, emoji: '🧸' },
  { id: 'cosmetics', name: 'Cosméticos', count: mockProducts.filter(p => p.category === 'cosmetics').length, emoji: '💄', new: true },
  { id: 'home', name: 'Hogar', count: mockProducts.filter(p => p.category === 'home').length, emoji: '🏠' },
  { id: 'fashion', name: 'Vestimentas', count: mockProducts.filter(p => p.category === 'fashion').length, emoji: '👕' },
  { id: 'sports', name: 'Deportes', count: mockProducts.filter(p => p.category === 'sports').length, emoji: '⚽' },
  { id: 'hats', name: 'Sombreros', count: mockProducts.filter(p => p.category === 'hats').length, emoji: '🎩' },
  { id: 'lights', name: 'Luces', count: mockProducts.filter(p => p.category === 'lights').length, emoji: '💡' },
  { id: 'artificial_flowers', name: 'Flores Artificiales', count: mockProducts.filter(p => p.category === 'artificial_flowers').length, emoji: '🌸' },
  { id: 'school_supplies', name: 'Útiles Escolares', count: mockProducts.filter(p => p.category === 'school_supplies').length, emoji: '📚' },
  { id: 'bottles', name: 'Botellas', count: mockProducts.filter(p => p.category === 'bottles').length, emoji: '🍶' },
  { id: 'watches', name: 'Relojería', count: mockProducts.filter(p => p.category === 'watches').length, emoji: '⌚' },
  { id: 'umbrellas', name: 'Paraguas', count: mockProducts.filter(p => p.category === 'umbrellas').length, emoji: '☂️' },
  { id: 'socks', name: 'Medias', count: mockProducts.filter(p => p.category === 'socks').length, emoji: '🧦' },
  { id: 'automotive', name: 'Automotriz', count: mockProducts.filter(p => p.category === 'automotive').length, emoji: '🚗' }
];