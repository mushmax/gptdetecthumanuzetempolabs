
export interface GPTZeroRequest {
  document: string;
  version?: string;
}

export interface GPTZeroResponse {
  documents: DocumentResult[];
  error?: string;
}

export interface DocumentResult {
  completely_generated_prob: number;
  average_generated_prob: number;
  overall_burstiness: number;
  paragraphs: ParagraphResult[];
}

export interface ParagraphResult {
  generated_prob: number;
  burstiness: number;
  text: string;
}
