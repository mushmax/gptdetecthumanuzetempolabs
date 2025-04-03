import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { humanizeText, checkStatus, HumanizeResponse, HumanizeOptions } from "@/utils/undetectableAi";
import { FileText, Loader2, ArrowRight, Upload, XCircle, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AIHumanizer: React.FC = () => {
  const [text, setText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("input");
  const [options, setOptions] = useState<HumanizeOptions>({
    readability: "University",
    purpose: "General Writing",
    strength: "Balanced",
    model: "v2",
  });
  const [copied, setCopied] = useState(false);
  const [textStats, setTextStats] = useState({ chars: 0, min: 50, max: 15000 });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setTextStats({ ...textStats, chars: newText.length });
    if (humanizedText) setHumanizedText("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain" && 
        !file.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") && 
        !file.type.includes("application/msword") &&
        !file.type.includes("application/pdf") &&
        !file.type.includes("text/markdown")) {
      toast.error("Please upload a text file (.txt, .docx, .doc, .pdf, .md)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB");
      return;
    }

    setFileName(file.name);
    
    try {
      if (file.type === "text/plain" || file.type.includes("text/markdown")) {
        const text = await file.text();
        setText(text);
        setTextStats({ ...textStats, chars: text.length });
        if (humanizedText) setHumanizedText("");
      } else {
        toast.info("In a production app, we would extract text from this document type");
        setText("Sample text extracted from " + file.name);
        setTextStats({ ...textStats, chars: 0 });
      }
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to read file");
    }
  };

  const handleClearFile = () => {
    setFileName(null);
    setText("");
    setTextStats({ ...textStats, chars: 0 });
    if (humanizedText) setHumanizedText("");
  };

  const handleHumanize = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to humanize");
      return;
    }

    if (text.length < textStats.min) {
      toast.error(`Text must be at least ${textStats.min} characters`);
      return;
    }

    if (text.length > textStats.max) {
      toast.error(`Text cannot exceed ${textStats.max} characters`);
      return;
    }

    setLoading(true);
    setHumanizedText("");
    setStatusMessage("Submitting text...");
    
    try {
      const submitResponse = await humanizeText(text, options);
      
      // Get document ID from either field (id or document_id)
      const docId = submitResponse.document_id || submitResponse.id;
      
      if (docId) {
        setDocumentId(docId);
        setStatusMessage("Processing text...");
        toast.success("Text submitted successfully, processing...");
        
        // Use a generous number of attempts and longer interval
        const maxAttempts = 60;  // Increased from 40
        const pollInterval = 10000;  // Increased from 8000
        let attempts = 0;
        
        const pollStatus = async () => {
          if (attempts >= maxAttempts) {
            setLoading(false);
            setStatusMessage(null);
            toast.error("Failed to humanize text after multiple attempts");
            return;
          }

          if (!docId) return;
          
          try {
            attempts++;
            console.log(`Checking status for document ${docId}, attempt ${attempts}/${maxAttempts}`);
            
            const statusResponse = await checkStatus(docId);
            console.log(`Status response details:`, JSON.stringify(statusResponse));
            
            // If we have humanized text, we're done
            if (statusResponse.humanized_text) {
              setHumanizedText(statusResponse.humanized_text);
              setLoading(false);
              setStatusMessage(null);
              setActiveTab("result");
              toast.success("Text humanized successfully!");
              return;
            }
            
            // Handle different status values
            const status = statusResponse.status?.toLowerCase();
            
            if (status === "completed" && !statusResponse.humanized_text) {
              setLoading(false);
              setStatusMessage(null);
              toast.error("Text was processed but no humanized text was returned");
              return;
            } else if (status === "error" || statusResponse.error) {
              setLoading(false);
              setStatusMessage(null);
              toast.error("Failed to process text: " + (statusResponse.message || statusResponse.error || "Unknown error"));
              return;
            } else if (status === "processing" || !status || status === "unknown") {
              // Still processing, update status and continue polling
              setStatusMessage(`Processing text... (Attempt ${attempts}/${maxAttempts})`);
              setTimeout(pollStatus, pollInterval);
              return;
            } else {
              console.log(`Unknown status: ${status}, continuing to poll`);
              setStatusMessage(`Status: ${status || "checking"} (Attempt ${attempts}/${maxAttempts})`);
              setTimeout(pollStatus, pollInterval);
            }
          } catch (error) {
            console.error("Status check failed:", error);
            
            if (attempts >= maxAttempts) {
              setLoading(false);
              setStatusMessage(null);
              toast.error("Failed to humanize text after multiple attempts");
            } else {
              console.log(`Retrying status check, attempt ${attempts + 1}/${maxAttempts}`);
              setStatusMessage(`Error checking status, retrying... (Attempt ${attempts}/${maxAttempts})`);
              setTimeout(pollStatus, pollInterval);
            }
          }
        };
        
        // Start polling with a short initial delay
        setTimeout(pollStatus, 3000);
      } else {
        setLoading(false);
        setStatusMessage(null);
        toast.error(submitResponse.error || "Failed to submit text for humanizing");
      }
    } catch (error) {
      console.error("Error humanizing text:", error);
      setLoading(false);
      setStatusMessage(null);
      toast.error("Failed to humanize text");
    }
  };

  const handleCopyToClipboard = () => {
    if (!humanizedText) return;
    
    navigator.clipboard.writeText(humanizedText)
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  useEffect(() => {
    return () => {
      // Cleanup function
    };
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto glass backdrop-blur-md border border-white/20">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="input" className="text-sm">Input Text</TabsTrigger>
            <TabsTrigger value="result" className="text-sm" disabled={!humanizedText}>
              Humanized Result
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6 animate-fade-in">
            {statusMessage && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="text-input" className="text-sm font-medium">
                  Enter AI-generated text to humanize
                </label>
                <span className={cn(
                  "text-xs", 
                  textStats.chars < textStats.min && textStats.chars > 0 ? "text-red-500" : "",
                  textStats.chars > textStats.max ? "text-red-500" : ""
                )}>
                  {textStats.chars}/{textStats.max} characters
                </span>
              </div>
              <Textarea
                id="text-input"
                placeholder={`Paste or type AI-generated content to humanize... (min ${textStats.min} characters)`}
                className="min-h-[200px] resize-y bg-white/50 backdrop-blur-sm input-focus"
                value={text}
                onChange={handleTextChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="readability-select" className="text-sm font-medium">
                  Readability Level
                </Label>
                <Select
                  value={options.readability}
                  onValueChange={(value: any) => setOptions({ ...options, readability: value })}
                >
                  <SelectTrigger id="readability-select">
                    <SelectValue placeholder="Select a readability level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="University">University</SelectItem>
                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                    <SelectItem value="Journalist">Journalist</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Sets the complexity and sophistication level of the output text.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose-select" className="text-sm font-medium">
                  Content Purpose
                </Label>
                <Select
                  value={options.purpose}
                  onValueChange={(value: any) => setOptions({ ...options, purpose: value })}
                >
                  <SelectTrigger id="purpose-select">
                    <SelectValue placeholder="Select content purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Writing">General Writing</SelectItem>
                    <SelectItem value="Essay">Essay</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Marketing Material">Marketing Material</SelectItem>
                    <SelectItem value="Story">Story</SelectItem>
                    <SelectItem value="Cover Letter">Cover Letter</SelectItem>
                    <SelectItem value="Report">Report</SelectItem>
                    <SelectItem value="Business Material">Business Material</SelectItem>
                    <SelectItem value="Legal Material">Legal Material</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Optimizes the text for your specific use case.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strength-select" className="text-sm font-medium">
                  Humanization Strength
                </Label>
                <Select
                  value={options.strength}
                  onValueChange={(value: any) => setOptions({ ...options, strength: value })}
                >
                  <SelectTrigger id="strength-select">
                    <SelectValue placeholder="Select humanization strength" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quality">Quality</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                    <SelectItem value="More Human">More Human</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Controls how aggressively the text is humanized. More human may change meaning.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model-select" className="text-sm font-medium">
                  AI Model
                </Label>
                <Select
                  value={options.model || "v2"}
                  onValueChange={(value: any) => setOptions({ ...options, model: value })}
                >
                  <SelectTrigger id="model-select">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v2">v2 (Standard)</SelectItem>
                    <SelectItem value="v11">v11 (Advanced)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The AI model version used for humanization.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload-humanizer"
                    className="sr-only"
                    onChange={handleFileUpload}
                    accept=".txt,.docx,.doc,.pdf,.md"
                  />
                  <label
                    htmlFor="file-upload-humanizer"
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
                onClick={handleHumanize} 
                className="group px-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                disabled={loading || !text.trim() || textStats.chars < textStats.min || textStats.chars > textStats.max}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Humanize Text
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="animate-fade-in">
            {humanizedText ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Humanized Result</h2>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleCopyToClipboard}
                      className="text-sm flex gap-1.5"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("input")}
                      className="text-sm"
                    >
                      Back to Input
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-md bg-white/50 backdrop-blur-sm border border-white/20 min-h-[200px]">
                  <p className="whitespace-pre-wrap">{humanizedText}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results to display. Please humanize some text first.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIHumanizer;
