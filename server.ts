import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/images", express.static(path.join(process.cwd(), "images")));

// Initialize Gemini client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or is placeholder. AI features will run in offline/simulation mode.");
}

const DB_PATH = path.join(process.cwd(), "server", "data.json");

// Ensure db directory and file exist
function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    // If somehow deleted, recreate
    fs.writeFileSync(DB_PATH, JSON.stringify({ content: {}, messages: [] }), "utf8");
  }
}

function readDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database:", err);
    return { content: {}, messages: [] };
  }
}

function writeDb(data: any) {
  ensureDb();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// API ROUTES

// 1. Get CMS content
app.get("/api/content", (req, res) => {
  const db = readDb();
  res.json(db.content);
});

// 2. Update CMS content (Secured by simple password)
app.post("/api/content/update", (req, res) => {
  const { password, section, data } = req.body;
  if (password !== "bretema2026") {
    return res.status(401).json({ error: "Contraseña de administrador incorrecta" });
  }

  const db = readDb();
  if (!db.content) db.content = {};
  
  db.content[section] = data;
  writeDb(db);
  
  res.json({ success: true, message: `Sección ${section} actualizada correctamente` });
});

// 3. Admin Authentication Login
app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (password === "bretema2026") {
    res.json({ success: true, token: "admin-token-bretema" });
  } else {
    res.status(401).json({ error: "Contraseña incorrecta. Inténtalo de nuevo." });
  }
});

// 4. Submit contact form and generate Gemini Auto-reply
app.post("/api/contact", async (req, res) => {
  const { name, email, message, planSelected } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nombre, email y mensaje son campos obligatorios" });
  }

  const db = readDb();
  if (!db.messages) db.messages = [];

  const newMessageId = generateId();
  const timestamp = new Date().toISOString();

  let autoReplyText = "";

  if (ai) {
    try {
      const prompt = `
        Genera una respuesta automática por correo electrónico personalizada, cordial, cercana y sumamente profesional para un cliente de Bretema Studio.
        Bretema Studio es un estudio boutique gallego de diseño web premium y por suscripción.
        
        Datos del cliente:
        - Nombre: ${name}
        - Email: ${email}
        - Mensaje original enviado por el cliente: "${message}"
        - Plan seleccionado/interés: ${planSelected || "Ninguno en particular"}
        
        Instrucciones de redacción:
        - Escribe en español en primera persona del plural ("nosotros" como equipo de Bretema).
        - El tono debe ser cálido, minimalista y profesional, evocando tranquilidad e innovación.
        - Haz una referencia específica y natural a lo que el cliente pregunta o comenta en su mensaje, demostrando que ya hemos leído su consulta con atención.
        - Explica que el equipo está analizando su caso y le escribirá personalmente en menos de 24 horas para agendar una sesión de descubrimiento.
        - Estructura el correo de manera clara y estética, con un saludo cálido, párrafos ordenados y firma formal como "El equipo de Bretema Studio".
        - No incluyas marcadores de posición (como [Tu Nombre]). Genera un correo completo que parezca 100% real y listo para enviar.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      autoReplyText = response.text || "";
    } catch (error) {
      console.error("Error generating Gemini auto-reply:", error);
      autoReplyText = `¡Hola, ${name}! Muchas gracias por ponerte en contacto con Bretema Studio. Hemos recibido tu mensaje con éxito. Un miembro de nuestro equipo lo revisará en detalle y se pondrá en contacto contigo en las próximas horas para coordinar una sesión de asesoramiento gratuito. ¡Que tengas un excelente día!`;
    }
  } else {
    // Simulated auto-reply if Gemini is offline
    autoReplyText = `¡Hola, ${name}! Gracias por contactar con Bretema Studio. Hemos recibido tu consulta sobre el plan ${planSelected || "web"}. Nuestro equipo ya se encuentra revisando tu mensaje: "${message.substring(0, 50)}...". Nos pondremos en contacto directo contigo a través de ${email} en un plazo máximo de 24 horas laborables para agendar nuestra primera reunión de descubrimiento. ¡Un saludo afectuoso desde la costa gallega!`;
  }

  const savedMessage = {
    id: newMessageId,
    name,
    email,
    message,
    planSelected,
    timestamp,
    automatedReply: autoReplyText,
    manualReplies: []
  };

  db.messages.unshift(savedMessage);
  writeDb(db);

  res.json({ 
    success: true, 
    message: "Formulario enviado con éxito", 
    data: savedMessage 
  });
});

// 5. Get all email logs/messages
app.get("/api/emails", (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

// 6. Draft an email reply with Gemini support (AI email drafting)
app.post("/api/emails/draft", async (req, res) => {
  const { originalMessage, adminNote } = req.body;

  if (!originalMessage) {
    return res.status(400).json({ error: "Falta el mensaje original" });
  }

  if (ai) {
    try {
      const prompt = `
        Eres el redactor senior de Bretema Studio. Redacta una respuesta de correo de seguimiento elegante y persuasiva en español, basada en la consulta de un cliente y las indicaciones breves del administrador.
        
        Mensaje original del cliente:
        - Nombre: ${originalMessage.name}
        - Email: ${originalMessage.email}
        - Mensaje original: "${originalMessage.message}"
        - Plan seleccionado: ${originalMessage.planSelected || "No seleccionado"}
        
        Indicaciones o notas del Administrador (lo que debemos responder):
        "${adminNote || "Responder de forma cordial saludando y ofreciendo una reunión."}"
        
        Directrices:
        - Tono: Profesional, boutique, atento, impecable, evocando confianza y alta calidad.
        - Incorpora plenamente las notas del administrador con naturalidad y fluidez.
        - Haz que la redacción sea pulida, persuasiva y orientada a la acción.
        - No uses marcadores de posición. Firma como "El equipo de Bretema Studio".
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ draft: response.text || "" });
    } catch (error) {
      console.error("Error drafting reply with Gemini:", error);
      res.status(500).json({ error: "Error al redactar el correo con IA" });
    }
  } else {
    // Simple mock draft
    const fallbackDraft = `Estimado/a ${originalMessage.name},\n\nMuchas gracias por su paciencia. En relación con su mensaje sobre el plan ${originalMessage.planSelected || "web"}, nos complace contactarle para comentarle lo siguiente:\n\n${adminNote || "Estamos disponibles para realizar una llamada técnica cuando mejor le convenga."}\n\nQuedamos a su entera disposición para cualquier aclaración técnica.\n\nAtentamente,\nEl equipo de Bretema Studio`;
    res.json({ draft: fallbackDraft });
  }
});

// 7. Send a manual reply (simulated sending, logs in DB)
app.post("/api/emails/reply", (req, res) => {
  const { messageId, body } = req.body;

  if (!messageId || !body) {
    return res.status(400).json({ error: "Faltan datos obligatorios (messageId o cuerpo del correo)" });
  }

  const db = readDb();
  const messageIndex = db.messages?.findIndex((m: any) => m.id === messageId);

  if (messageIndex === -1 || messageIndex === undefined) {
    return res.status(404).json({ error: "Mensaje original no encontrado" });
  }

  const newReply = {
    id: generateId(),
    body,
    timestamp: new Date().toISOString(),
    sender: "admin" as const
  };

  db.messages[messageIndex].manualReplies.push(newReply);
  writeDb(db);

  res.json({ success: true, reply: newReply });
});

// 8. Delete an email thread
app.post("/api/emails/delete", (req, res) => {
  const { messageId } = req.body;
  if (!messageId) {
    return res.status(400).json({ error: "Falta el ID del mensaje" });
  }

  const db = readDb();
  const initialLength = db.messages?.length || 0;
  db.messages = db.messages?.filter((m: any) => m.id !== messageId) || [];

  if (db.messages.length === initialLength) {
    return res.status(404).json({ error: "Mensaje no encontrado" });
  }

  writeDb(db);
  res.json({ success: true, message: "Mensaje eliminado del registro" });
});

// 9. SEO Audit Tool with Gemini AI
app.post("/api/seo/analyze", async (req, res) => {
  const { section, title, description, keywords, headings, bodyText } = req.body;

  if (ai) {
    try {
      const prompt = `
        Realiza un análisis de auditoría SEO técnico y de redacción en español para la página "${section}" de Bretema Studio.
        
        Metadatos y contenido provistos:
        - Título SEO actual (Meta Title): "${title || ""}"
        - Descripción SEO actual (Meta Description): "${description || ""}"
        - Palabras Clave Objetivo (Keywords): "${keywords || ""}"
        - Estructura de Encabezados (H1, H2, H3): "${headings || ""}"
        - Contenido del cuerpo de la página (extracto): "${bodyText || ""}"
        
        Instrucciones:
        Genera una auditoría en formato JSON estructurado que evalúe y califique de forma realista esta información. El JSON debe cumplir EXACTAMENTE con la siguiente estructura (no agregues texto fuera del JSON):
        {
          "score": 85, // número entre 0 y 100 indicando la salud SEO global
          "titleAnalysis": "Análisis específico del meta título...",
          "descriptionAnalysis": "Análisis específico de la meta descripción...",
          "keywordDensity": [
            { "word": "diseño web", "count": 4, "densityPercent": 2.5 }
          ], // calcula o estima densidad de palabras clave provistas en el cuerpo de texto
          "structureAnalysis": "Análisis sobre la jerarquía de etiquetas H1, H2, H3 y la optimización de imágenes...",
          "passes": [
            "El título tiene una longitud ideal (entre 50-60 caracteres).",
            "La descripción incluye llamadas a la acción directas."
          ], // array de strings con los puntos aprobados
          "improvements": [
            "Añadir la palabra clave 'Galicia' en el título para mejorar el SEO local.",
            "Asegurarse de que exista una única etiqueta H1 en el código."
          ] // array de strings con mejoras sugeridas y directrices concretas
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "SEO Health Score from 0 to 100" },
              titleAnalysis: { type: Type.STRING, description: "Detailed review of the title" },
              descriptionAnalysis: { type: Type.STRING, description: "Detailed review of the description" },
              keywordDensity: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    count: { type: Type.INTEGER },
                    densityPercent: { type: Type.NUMBER }
                  },
                  required: ["word", "count", "densityPercent"]
                }
              },
              structureAnalysis: { type: Type.STRING, description: "Review of HTML headings hierarchy" },
              passes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              improvements: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["score", "titleAnalysis", "descriptionAnalysis", "keywordDensity", "structureAnalysis", "passes", "improvements"]
          }
        }
      });

      const auditData = JSON.parse(response.text || "{}");
      res.json(auditData);
    } catch (error) {
      console.error("Error running Gemini SEO analysis:", error);
      res.status(500).json({ error: "Error de servidor al realizar la auditoría SEO con IA" });
    }
  } else {
    // Simulation mode when Gemini is not connected
    const mockDensity = (keywords || "")
      .split(",")
      .map((k: string) => k.trim())
      .filter(Boolean)
      .map((k: string, i: number) => ({
        word: k,
        count: 3 + i,
        densityPercent: +(1.2 + i * 0.4).toFixed(1)
      }));

    const mockResponse = {
      score: 74,
      titleAnalysis: `El título tiene una longitud de ${title?.length || 0} caracteres. Es recomendable que esté entre 50 y 60 caracteres e integre de forma natural palabras clave al principio del mismo.`,
      descriptionAnalysis: "La descripción actual abarca bien el enfoque costero y de suscripción, pero podría incorporar palabras de acción directa como 'Descubre' o 'Consigue tu web hoy'.",
      keywordDensity: mockDensity.length > 0 ? mockDensity : [
        { word: "diseño web", count: 5, densityPercent: 2.1 },
        { word: "suscripción", count: 3, densityPercent: 1.3 }
      ],
      structureAnalysis: "Estructura correcta detectada (H1 principal, H2s de sección, H3s de detalle). Es crucial que todas las imágenes tengan textos descriptivos (alt tags) para indexar en Google Imágenes.",
      passes: [
        "Uso correcto de palabras clave en el extracto del cuerpo de la página.",
        "Meta descripción optimizada en longitud y tono premium.",
        "Jerarquía lógica de encabezados para facilitar la lectura del bot."
      ],
      improvements: [
        "Incluir la palabra clave principal al inicio de la etiqueta de título.",
        "Aumentar el número de enlaces internos entre secciones de portafolio y precios.",
        "Optimizar el tamaño de las imágenes usando formatos modernos como WebP y añadir etiquetas descriptivas ALT."
      ]
    };
    res.json(mockResponse);
  }
});

// VITE MIDDLEWARE SETUP

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Fatal error starting Express + Vite server:", err);
});
