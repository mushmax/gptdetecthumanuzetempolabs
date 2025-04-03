
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeText } from "@/utils/gptzero";
import { DocumentResult } from "@/types/gptzero";
import ResultCard from "./ResultCard";
import { FileText, Loader2, ArrowRight, Upload, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<DocumentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (result) setResult(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (file.type !== "text/plain" && 
        !file.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") && 
        !file.type.includes("application/msword") &&
        !file.type.includes("application/pdf") &&
        !file.type.includes("text/markdown")) {
      toast.error("Please upload a text file (.txt, .docx, .doc, .pdf, .md)");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB");
      return;
    }

    setFileName(file.name);
    
    try {
      // For this implementation, we're just reading text files
      // In a real app, you would add handlers for .docx, .pdf etc.
      if (file.type === "text/plain" || file.type.includes("text/markdown")) {
        const text = await file.text();
        setText(text);
        if (result) setResult(null);
      } else {
        // For non-text files, show a message that in a real app we'd handle this
        toast.info("In a production app, we would extract text from this document type");
        setText("Sample text extracted from " + file.name);
      }
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to read file");
    }
  };

  const handleClearFile = () => {
    setFileName(null);
    setText("");
    if (result) setResult(null);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeText(text);
      if (response && response.documents && response.documents.length > 0) {
        setResult(response.documents[0]);
        if (activeTab === "input") {
          setActiveTab("result");
        }
      }
    } catch (error) {
      console.error("Error analyzing text:", error);
      toast.error("Failed to analyze text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto glass backdrop-blur-md border border-white/20">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="input" className="text-sm">Input Text</TabsTrigger>
            <TabsTrigger value="result" className="text-sm" disabled={!result}>
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="text-input" className="text-sm font-medium">
                Enter text to analyze
              </label>
              <Textarea
                id="text-input"
                placeholder="Paste or type content to analyze for AI detection..."
                className="min-h-[200px] resize-y bg-white/50 backdrop-blur-sm input-focus"
                value={text}
                onChange={handleTextChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    onChange={handleFileUpload}
                    accept=".txt,.docx,.doc,.pdf,.md"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="text-sm font-medium">Upload file</span>
                  </label>
                </div>
                
                {fileName && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground px-3 py-1.5 bg-secondary/50 rounded-full">
                    <FileText className="h-3 w-3" />
                    <span className="truncate max-w-[150px]">{fileName}</span>
                    <button onClick={handleClearFile} className="text-muted-foreground hover:text-foreground">
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleAnalyze} 
                className="group px-5 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-300"
                disabled={loading || !text.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Text
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="animate-fade-in">
            {result ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Analysis Results</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("input")}
                    className="text-sm"
                  >
                    Back to Input
                  </Button>
                </div>
                <ResultCard result={result} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results to display. Please analyze some text first.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TextAnalyzer;
