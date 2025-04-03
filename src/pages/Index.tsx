
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextAnalyzer from "@/components/TextAnalyzer";
import AIHumanizer from "@/components/AIHumanizer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <main className="flex-1 flex flex-col items-center py-6 px-4 md:px-8">
        <div className="w-full max-w-screen-xl flex flex-col items-center">
          <Header />
          
          <div className="w-full my-8 md:my-12">
            <Tabs defaultValue="detector" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-6">
                <TabsTrigger value="detector">AI Detector</TabsTrigger>
                <TabsTrigger value="humanizer">AI Humanizer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="detector" className="animate-fade-in">
                <TextAnalyzer />
              </TabsContent>
              
              <TabsContent value="humanizer" className="animate-fade-in">
                <AIHumanizer />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="w-full max-w-4xl mx-auto mt-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                title="Fast Analysis" 
                description="Our system provides rapid analysis of text to determine if it was created by AI."
                icon="⚡"
              />
              <FeatureCard 
                title="Paragraph Detection" 
                description="Review AI probability scores for individual paragraphs within your content."
                icon="📊"
              />
              <FeatureCard 
                title="AI Humanizer" 
                description="Transform AI-generated text into human-like content with adjustable settings."
                icon="🔍"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer className="mt-auto" />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="glass p-6 rounded-xl border border-white/20 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
