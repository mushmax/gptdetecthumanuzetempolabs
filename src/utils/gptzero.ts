
import { GPTZeroRequest, GPTZeroResponse } from "../types/gptzero";
import { toast } from "sonner";

const API_KEY = "70b50d8a4af04e14a53ce02596ce163a";
const API_URL = "https://api.gptzero.me/v2/predict/text";

export async function analyzeText(text: string): Promise<GPTZeroResponse | null> {
  if (!text.trim()) {
    toast.error("Please enter some text to analyze");
    return null;
  }

  const request: GPTZeroRequest = {
    document: text,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Api-Key": API_KEY,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GPTZero API error:", errorData);
      throw new Error(errorData.error || "Failed to analyze text");
    }

    const data = await response.json();
    return data as GPTZeroResponse;
  } catch (error) {
    console.error("Error analyzing text:", error);
    toast.error(error instanceof Error ? error.message : "Failed to analyze text");
    return null;
  }
}

export function getHumanReadableScore(score: number): string {
  if (score < 0.1) return "Very likely human";
  if (score < 0.3) return "Likely human";
  if (score < 0.5) return "Possibly human";
  if (score < 0.7) return "Uncertain";
  if (score < 0.9) return "Likely AI";
  return "Very likely AI";
}

export function getScoreColor(score: number): string {
  if (score < 0.3) return "text-green-600";
  if (score < 0.7) return "text-amber-500";
  return "text-red-500";
}

export function getGradientByScore(score: number): string {
  if (score < 0.3) return "from-green-400 to-emerald-500";
  if (score < 0.7) return "from-amber-400 to-amber-500";
  return "from-red-400 to-rose-500";
}
