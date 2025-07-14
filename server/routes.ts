import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailGenerationRequestSchema, insertEmailGenerationSchema } from "@shared/schema";
import { generateSalesEmail } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate email endpoint
  app.post("/api/generate-email", async (req, res) => {
    try {
      // Validate the request body including apiKey
      const { apiKey, ...requestData } = req.body;
      
      if (!apiKey || typeof apiKey !== 'string') {
        return res.status(400).json({
          success: false,
          error: "API Keyが必要です"
        });
      }
      
      const validatedRequest = emailGenerationRequestSchema.parse(requestData);
      
      // Generate email using OpenAI with API key
      const generatedEmail = await generateSalesEmail({ ...validatedRequest, apiKey });
      
      // Save to storage
      const emailGeneration = await storage.createEmailGeneration({
        subject: generatedEmail.subject,
        body: generatedEmail.body,
        customerCompany: validatedRequest.customer.company,
        customerName: validatedRequest.customer.contactName,
        purpose: validatedRequest.purpose,
        tone: validatedRequest.tone,
        length: validatedRequest.length,
      });
      
      res.json({
        success: true,
        data: {
          id: emailGeneration.id,
          subject: generatedEmail.subject,
          body: generatedEmail.body,
          createdAt: emailGeneration.createdAt,
        }
      });
    } catch (error) {
      console.error("Email generation error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "メール生成に失敗しました"
      });
    }
  });

  // Get generation history
  app.get("/api/email-history", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const history = await storage.getEmailGenerations(limit);
      
      res.json({
        success: true,
        data: history
      });
    } catch (error) {
      console.error("History fetch error:", error);
      res.status(500).json({
        success: false,
        error: "履歴の取得に失敗しました"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
