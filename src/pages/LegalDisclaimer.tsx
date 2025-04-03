
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ScrollArea } from "@/components/ui/scroll-area";

const LegalDisclaimer: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <main className="flex-1 flex flex-col items-center py-6 px-4 md:px-8">
        <div className="w-full max-w-screen-xl flex flex-col items-center">
          <Header />
          
          <div className="w-full max-w-4xl mx-auto my-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">LEGAL DISCLAIMER FOR FAZEGPT.COM</h1>
            <p className="text-muted-foreground mb-6">Effective Date: March 25, 2025</p>
            
            <ScrollArea className="h-[70vh] pr-4">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. ACCEPTANCE OF TERMS</h2>
                  <p>
                    By accessing or using FAZEGPT.com (the "Website" or "Service"), owned and operated by GIGADRIVE TECHNOLOGIES LLC ("Company," "We," "Us," or "Our"), you acknowledge that you have read, understood, and agreed to be bound by the Terms of Use and Privacy Policy, which may be updated from time to time.
                  </p>
                  <p className="mt-2">
                    If you do not agree with any part of this disclaimer, DO NOT use the Website or any of its services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. GENERAL DISCLAIMER</h2>
                  <h3 className="text-lg font-medium mb-2">2.1. For Informational and General Assistance Purposes Only</h3>
                  <p>
                    The content and services provided on FAZEGPT.com are for informational and general assistance purposes only. They do not constitute legal, financial, professional, or otherwise regulated advice. This includes the AI-based content analysis, AI content detection, and humanization functionalities available on the Website.
                  </p>
                  <p className="mt-2">
                    While we strive for accuracy, reliability, and effectiveness of our AI-based tools, we make no guarantees regarding the accuracy, completeness, reliability, or applicability of any content generated, detected, or modified by the Website.
                  </p>
                  <p className="mt-2">
                    Users are solely responsible for verifying the accuracy, legality, and appropriateness of any AI-generated content.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. NO LEGAL OR PROFESSIONAL ADVICE</h2>
                  <p>
                    Nothing on FAZEGPT.com should be construed as legal, business, or professional advice.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Using our AI-based tools does not create any attorney-client, professional-client, or consultant-client relationship between you and the Company.</li>
                    <li>If you require legal advice, consult a qualified attorney before relying on AI-generated or modified content.</li>
                    <li>The Company is not liable for any consequences arising from reliance on AI-generated or humanized content.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. INTELLECTUAL PROPERTY & COPYRIGHT POLICY</h2>
                  <h3 className="text-lg font-medium mb-2">4.1. Intellectual Property Rights</h3>
                  <p>
                    All content, tools, software, user interface designs, trademarks, and other intellectual property elements on FAZEGPT.com are the exclusive property of GIGADRIVE TECHNOLOGIES LLC or third-party licensors.
                  </p>
                  <p className="mt-2">
                    You may not reproduce, distribute, sell, or commercially exploit any part of our Website or AI-generated content without our explicit written permission.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2 mt-4">4.2. User-Submitted Content and AI-Processed Outputs</h3>
                  <p>
                    Users retain ownership over the original content submitted for AI evaluation, alteration, or reformatting. However, by using FAZEGPT.com, you grant the Company a limited, non-exclusive, royalty-free license to process and display the content only for service-related functions.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2 mt-4">4.3. Copyright Infringement Notice (DMCA Compliance)</h3>
                  <p>
                    We comply with the Digital Millennium Copyright Act (DMCA) and respect the intellectual property rights of others. If you believe that any content on FAZEGPT.com infringes your copyright, please send a DMCA takedown notice to:
                  </p>
                  <p className="mt-2">
                    📧 Email: support@gigadrive.com
                    <br />
                    📍 Mailing Address: GIGADRIVE TECHNOLOGIES LLC, 700 Highlander Blvd, #505, Arlington, TX 76105
                  </p>
                  <p className="mt-2">
                    Your notice must include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Identification of the copyrighted work(s) allegedly infringed</li>
                    <li>Identification of the material on our Website claimed to be infringing</li>
                    <li>Your contact information (name, email, and phone number)</li>
                    <li>A statement that you have a good faith belief that the use of the material is unauthorized</li>
                    <li>A sworn statement under penalty of perjury that your notice is accurate</li>
                  </ul>
                  <p className="mt-2">
                    Misrepresenting a copyright claim may subject you to legal liability for damages, penalties, and attorney's fees.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. NO GUARANTEE OF UNDETECTABILITY</h2>
                  <h3 className="text-lg font-medium mb-2">5.1. AI Content Detection Disclaimer</h3>
                  <p>
                    While our Website provides AI-humanization and AI content detection functionalities, we do not guarantee the foolproof accuracy of these features. AI detection algorithms vary across platforms and evolve over time.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Content modified, humanized, or rewritten by our tool may still be identifiable as AI-generated depending on the detection tools used by search engines, publishers, or institutions.</li>
                    <li>Users assume the risk when using our Service for any academic, commercial, legal, or other regulated purposes.</li>
                    <li>Before submitting AI-humanized content anywhere, verify compliance with applicable institutional, academic, or legal policies.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. LIMITATION OF LIABILITY</h2>
                  <p className="uppercase font-medium">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                  <p className="mt-2">
                    FAZEGPT.com, GIGADRIVE TECHNOLOGIES LLC, and our affiliates, directors, officers, employees, or agents SHALL NOT be liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Any losses or damages arising from reliance on AI-generated or AI-humanized content.</li>
                    <li>Any errors, omissions, inaccuracies, or misinterpretations in the AI-processed content.</li>
                    <li>Any loss of data, profits, or business opportunities due to the use or performance of the Website.</li>
                    <li>Any decision-making based on AI content evaluation or revisions.</li>
                  </ul>
                  <p className="mt-2">
                    <strong>LIMITATION OF DAMAGES:</strong> Our total liability under any claim related to FAZEGPT.com shall not exceed $50 USD.
                  </p>
                  <p className="mt-2">
                    <strong>ASSUMPTION OF RISK:</strong> Users assume full responsibility for verifying the accuracy, legal compliance, and ethical appropriateness of AI-generated or modified content.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. THIRD-PARTY DISCLAIMER</h2>
                  <h3 className="text-lg font-medium mb-2">7.1. Linked Websites and Advertisements</h3>
                  <p>
                    FAZEGPT.com may display third-party links, advertisements, or embedded content.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>We do not endorse or assume responsibility for any content, policies, or services from third-party websites.</li>
                    <li>Clicking on third-party links is at your own risk, and their respective policies apply.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. REFUND & SUBSCRIPTION POLICY</h2>
                  <p>
                    <strong>Subscription Refunds:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Full refunds are available within 4 hours of purchase.</li>
                    <li>For yearly subscriptions, full refunds are available within 6.5 hours of purchase.</li>
                  </ul>
                  <p className="mt-2">
                    <strong>Non-Refundable Items:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>API credits/balances CANNOT be refunded.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. GOVERNING LAW & LEGAL JURISDICTION</h2>
                  <p>
                    These Terms and Disclaimers shall be governed by and interpreted in accordance with the laws of the State of Texas, USA. Any disputes must be resolved through binding arbitration (see Section 10).
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">10. ARBITRATION & DISPUTE RESOLUTION</h2>
                  <h3 className="text-lg font-medium mb-2">10.1. Mandatory Arbitration Clause</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Any legal disputes between you and the Company shall only be resolved through binding arbitration, rather than in court.</li>
                    <li>Arbitration shall occur in Arlington, Texas, USA, under the rules of the American Arbitration Association (AAA).</li>
                    <li><strong>Jury Trial Waiver:</strong> You waive any right to a trial by jury.</li>
                    <li><strong>Class Action Waiver:</strong> All claims must proceed individually; class actions are waived.</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium mb-2 mt-4">10.2. Exceptions to Arbitration</h3>
                  <p>
                    The following claims MAY be brought to court:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Copyright, trademark, and patent infringement claims.</li>
                    <li>Claims for emergency injunctive relief.</li>
                  </ul>
                  <p className="mt-2">
                    Disputes not subject to arbitration must be filed in courts located within Tarrant County, Texas, USA.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">11. MODIFICATIONS & CHANGES TO TERMS</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We reserve the right to modify this Legal Disclaimer without prior notice.</li>
                    <li>Continued use of the Website after updates constitutes acceptance of changes.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">12. CONTACT INFORMATION</h2>
                  <p>
                    For legal inquiries or concerns, contact us at:
                  </p>
                  <p className="mt-2">
                    📍 Company Name: GIGADRIVE TECHNOLOGIES LLC
                    <br />
                    📧 Email: support@gigadrive.com
                    <br />
                    📬 Mailing Address: 700 Highlander Blvd, #505, Arlington, TX 76105
                  </p>
                </section>
                
                <p className="italic mt-6">
                  This Legal Disclaimer is binding as of the Effective Date listed above. By using FAZEGPT.com, you acknowledge and accept these terms.
                </p>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
      
      <Footer className="mt-auto" />
    </div>
  );
};

export default LegalDisclaimer;
