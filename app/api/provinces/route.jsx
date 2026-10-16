import { readWriteClientPromise } from "../../../mongodb/mongodb";

export const dynamic = "force-dynamic";

// Sri Lanka: 9 Provinces, Key Districts & Divisional Secretariats
const FALLBACK_PROVINCES = [
  {
    Western: {
      Colombo: ["Colombo", "Dehiwala", "Moratuwa", "Kaduwela", "Homagama", "Maharagama", "Kesbewa", "Sri Jayawardenepura Kotte"],
      Gampaha: ["Gampaha", "Negombo", "Kelaniya", "Wattala", "Mirigama", "Ja-Ela", "Minuwangoda", "Attanagalla"],
      Kalutara: ["Kalutara", "Panadura", "Horana", "Beruwala", "Matugama", "Bandaragama", "Bulathsinhala"]
    },
    Central: {
      Kandy: ["Kandy Four Gravets", "Kundasale", "Peradeniya", "Gampola", "Nawalapitiya", "Harispattuwa", "Yatinuwara"],
      Matale: ["Matale", "Dambulla", "Galewela", "Rattota", "Ukuwela", "Naula"],
      "Nuwara Eliya": ["Nuwara Eliya", "Ambagamuwa", "Kothmale", "Walapane", "Hanguranketha", "Norwood"]
    },
    Southern: {
      Galle: ["Galle Four Gravets", "Ambalangoda", "Hikkaduwa", "Baddegama", "Karandeniya", "Habaraduwa", "Bentota"],
      Matara: ["Matara Four Gravets", "Weligama", "Akuressa", "Devinuwara", "Dikwella", "Hakmana"],
      Hambantota: ["Hambantota", "Tangalle", "Tissamaharama", "Beliatta", "Ambalantota", "Sooriyawewa"]
    },
    Northern: {
      Jaffna: ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Valikamam North", "Karainagar"],
      Kilinochchi: ["Karachchi", "Kandavalai", "Poonakary", "Pachchilaipalli"],
      Mannar: ["Mannar Town", "Manthai West", "Musali", "Nanaddan", "Madhu"],
      Vavuniya: ["Vavuniya", "Vavuniya North", "Vavuniya South", "Vengalacheddikulam"],
      Mullaitivu: ["Maritimepattu", "Puthukkudiyiruppu", "Oddusuddan", "Manthai East"]
    },
    Eastern: {
      Batticaloa: ["Manmunai North", "Eravur Pattu", "Koralai Pattu", "Porativu Pattu"],
      Ampara: ["Ampara", "Kalmunai", "Sammanthurai", "Akkaraipattu", "Pothuvil", "Sainthamaruthu"],
      Trincomalee: ["Town and Gravets", "Kinniya", "Muttur", "Kantale", "Seruvila", "Kuchchaveli"]
    },
    "North Western": {
      Kurunegala: ["Kurunegala", "Kuliyapitiya", "Wariyapola", "Ibbagamuwa", "Pannala", "Alawwa", "Mawathagama"],
      Puttalam: ["Puttalam", "Chilaw", "Nattandiya", "Wennappuwa", "Mahawewa", "Anamaduwa", "Kalpitiya"]
    },
    "North Central": {
      Anuradhapura: ["Nuwaragam Palatha Central", "Kekirawa", "Medawachchiya", "Tambuttegama", "Eppawala"],
      Polonnaruwa: ["Thamankaduwa", "Hingurakgoda", "Medirigiriya", "Dimbulagala", "Elahera"]
    },
    Uva: {
      Badulla: ["Badulla", "Bandarawela", "Welimada", "Mahiyanganaya", "Hali-Ela", "Passara", "Ella"],
      Monaragala: ["Monaragala", "Bibile", "Wellawaya", "Buttala", "Medagama", "Siyambalanduwa"]
    },
    Sabaragamuwa: {
      Ratnapura: ["Ratnapura", "Balangoda", "Pelmadulla", "Embilipitiya", "Kuruwita", "Eheliyagoda"],
      Kegalle: ["Kegalle", "Mawanella", "Ruwanwella", "Warakapola", "Galigamuwa", "Dehiowita"]
    }
  }
];

export async function GET(req) {
  if (req.method !== "GET")
    return new Response("Method not allowed", { status: 405 });

  try {
    const client = await readWriteClientPromise;
    const db = client.db("mel-nld");
    const provinceData = await db
      .collection("province_data")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    if (provinceData && provinceData.length > 0) {
      return new Response(JSON.stringify(provinceData), { status: 200 });
    }
    return new Response(JSON.stringify(FALLBACK_PROVINCES), { status: 200 });
  } catch (error) {
    console.warn("MongoDB unavailable for provinces, using fallback dataset.");
    return new Response(JSON.stringify(FALLBACK_PROVINCES), { status: 200 });
  }
}
