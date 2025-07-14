import { useState } from "react";
import { Mail, User, History, Settings } from "lucide-react";
import UserProfile from "@/components/user-profile";
import CustomerForm from "@/components/customer-form";
import EmailSettings from "@/components/email-settings";
import EmailGenerator from "@/components/email-generator";
import EmailOutput from "@/components/email-output";
import GenerationHistory from "@/components/generation-history";
import { InsertUserProfile, InsertCustomer } from "@shared/schema";

export default function Home() {
  const [userProfile, setUserProfile] = useState<InsertUserProfile | null>(null);
  const [customer, setCustomer] = useState<InsertCustomer | null>(null);
  const [purpose, setPurpose] = useState<'initial' | 'followup' | 'proposal' | 'meeting' | ''>('');
  const [tone, setTone] = useState<'formal' | 'friendly' | 'casual' | ''>('');
  const [length, setLength] = useState<150 | 300 | 500>(300);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleEmailGenerated = (email: { subject: string; body: string }) => {
    setGeneratedEmail(email);
    setRefreshHistory(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-poppins font-semibold text-foreground">EmailCraft AI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">ダッシュボード</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">履歴</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">設定</a>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Profile & Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            <UserProfile onProfileChange={setUserProfile} />
            <CustomerForm onCustomerChange={setCustomer} />
            <EmailSettings
              purpose={purpose}
              tone={tone}
              length={length}
              onPurposeChange={setPurpose}
              onToneChange={setTone}
              onLengthChange={setLength}
            />
          </div>

          {/* Right Column - Generation & Output */}
          <div className="space-y-6">
            <EmailGenerator
              userProfile={userProfile}
              customer={customer}
              purpose={purpose}
              tone={tone}
              length={length}
              onEmailGenerated={handleEmailGenerated}
            />
            <EmailOutput generatedEmail={generatedEmail} maxLength={length} />
            <GenerationHistory key={refreshHistory} onEmailSelect={setGeneratedEmail} />
          </div>
        </div>
      </main>
    </div>
  );
}
