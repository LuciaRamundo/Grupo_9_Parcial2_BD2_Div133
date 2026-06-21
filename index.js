import {MongoClient} from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function conexionAlaBase() {
    try {
        await client.connect();
        console.log("✅ Conectado exitosamente a MongoDB.");
        const db = client.db("cartelera");

        await db.collection("peliculas").deleteMany({});
        await db.collection("directores").deleteMany({});
        await db.collection("reseñas").deleteMany({});

        // DATOS
        await db.collection("directores").insertMany([
            { _id: 1, nombre: "Christopher Nolan", nacionalidad: "Britanico" },
            { _id: 2, nombre: "Greta Gerwig", nacionalidad: "Estadounidense" },
            { _id: 3, nombre: "Pedro Almodóvar", nacionalidad: "Español" },
            { _id: 4, nombre: "Ridley Scott", nacionalidad: "Britanico" },
            { _id: 5, nombre: "Bong Joon-ho", nacionalidad: "Surcoreano" }, 
            { _id: 6, nombre: "Damián Szifron", nacionalidad: "Argentino" }
        ]);

        await db.collection("peliculas").insertMany([
            { _id: 1, titulo: "Oppenheimer", fecha_estreno: "2023-07-21", director_id: 1 },
            { _id: 2, titulo: "Inception", fecha_estreno: "2010-07-16", director_id: 1 },
            { _id: 3, titulo: "Parasite", fecha_estreno: "2019-05-30", director_id: 5 }, 
            { _id: 4, titulo: "Relatos Salvajes", fecha_estreno: "2014-08-21", director_id: 6 }
        ]);

        await db.collection("reseñas").insertMany([
            { _id: 1, pelicula_id: 1, comentario: "Muy Buena", puntaje: 7 },
            { _id: 2, pelicula_id: 1, comentario: "Malisima", puntaje: 1 },
            { _id: 3, pelicula_id: 2, comentario: "Mala", puntaje: 4 },
            { _id: 4, pelicula_id: 2, comentario: "Excelente", puntaje: 10 },
            { _id: 5, pelicula_id: 2, comentario: "No la volveria a ver", puntaje: 5 },
            { _id: 6, pelicula_id: 3, comentario: "Obra maestra", puntaje: 10 },
            { _id: 7, pelicula_id: 4, comentario: "Cine argentino de calidad", puntaje: 9 }
        ]);


        // Aggregation pipelines
        const promedioPelicula = await db.collection("reseñas").aggregate([
            {
                $group: {
                    _id: "$pelicula_id",
                    promedio: {$avg: "$puntaje"},
                    totalReseñas: { $sum: 1 }
                }
            }
        ]).toArray();

        console.log("Resultados del agrupamiento:", JSON.stringify(promedioPelicula, null, 2));


        const peliculasPorFecha = await db.collection("peliculas").aggregate([
            {
                $sort: {
                    fecha_estreno: -1
                }
            }
        ]).toArray();

        console.log("Resultados del ordenamiento:", JSON.stringify(peliculasPorFecha, null, 2));


        const filtroNacionalidad = await db.collection("directores").aggregate([
            {
                $match: {
                    nacionalidad: "Britanico"
                }
            }
        ]).toArray();

        console.log("Resultados del filtro:", JSON.stringify(filtroNacionalidad, null, 2));


    } catch (e) {
        console.error("❌ Error al conectar o realizar operaciones:", e);
    } finally {
        await client.close();
        console.log("🔒 Conexión cerrada.");
    }
}

conexionAlaBase();