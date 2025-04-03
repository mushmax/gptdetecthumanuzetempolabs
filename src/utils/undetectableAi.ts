
import { toast } from "sonner";

const API_KEY = "0ef643d3-900b-4ad1-b2c3-5dec693a0438";
const SUBMIT_URL = "https://humanize.undetectable.ai/submit";
const STATUS_URL = "https://humanize.undetectable.ai/status"; // Reverting to using the status endpoint

export interface HumanizeResponse {
  document_id?: string;
  id?: string;
  success?: boolean;
  message?: string;
  status?: string;
  humanized_text?: string;
  error?: string;
  result?: {
    humanized_text?: string;
  };
}

export interface HumanizeOptions {
  readability: "High School" | "University" | "Doctorate" | "Journalist" | "Marketing";
  purpose: "General Writing" | "Essay" | "Article" | "Marketing Material" | "Story" | "Cover Letter" | "Report" | "Business Material" | "Legal Material";
  strength: "Quality" | "Balanced" | "More Human";
  model?: "v2" | "v11";
}

export async function humanizeText(text: string, options: HumanizeOptions): Promise<HumanizeResponse> {
  if (!text.trim() || text.length < 50) {
    toast.error("Please enter at least 50 characters to humanize");
    return { success: false, error: "Text too short (minimum 50 characters)" };
  }

  if (text.length > 15000) {
    toast.error("Text exceeds maximum length of 15,000 characters");
    return { success: false, error: "Text too long (maximum 15,000 characters)" };
  }

  try {
    console.log("Sending request to Undetectable AI with options:", options);
    
    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY
      },
      body: JSON.stringify({
        content: text,
        readability: options.readability,
        purpose: options.purpose,
        strength: options.strength,
        model: options.model || "v2"
      })
    });

    const data = await response.json();
    console.log("Submit response:", data);
    
    if (!response.ok) {
      console.error("Undetectable AI API error:", data);
      throw new Error(data.message || "Failed to submit text for humanizing");
    }

    return data;
  } catch (error) {
    console.error("Error humanizing text:", error);
    toast.error(error instanceof Error ? error.message : "Failed to humanize text");
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function checkStatus(documentId: string): Promise<HumanizeResponse> {
  try {
    // Using the proper format for status endpoint with the document ID as a path parameter
    const url = `${STATUS_URL}/${documentId}`;
    console.log(`Checking status for document ID: ${documentId} using URL: ${url}`);
    
    const response = await fetch(url, {
      method: "GET", // Using GET for the status endpoint
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Status check HTTP error: ${response.status}`, errorText);
      
      return { 
        success: false,
        status: "error",
        error: `API returned ${response.status}: ${errorText}`
      };
    }

    const data = await response.json();
    console.log("Status response:", data);

    // Normalize the response to our expected format
    // The API might return humanized_text directly or inside a result object
    const normalizedResponse: HumanizeResponse = {
      ...data,
      success: true,
      status: data.status || (data.result?.humanized_text ? "completed" : "processing"),
      humanized_text: data.humanized_text || data.result?.humanized_text
    };

    return normalizedResponse;
  } catch (error) {
    console.error("Error checking status:", error);
    return { 
      success: false, 
      status: "error", 
      error: error instanceof Error ? error.message : "Status check failed" 
    };
  }
}
