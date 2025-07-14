import { useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { InsertUserProfile, InsertCustomer } from "@shared/schema";

interface EmailGeneratorProps {
  userProfile: InsertUserProfile | null;
  customer: InsertCustomer | null;
  purpose: string;
  tone: string;
  length: number;
  onEmailGenerated: (email: { subject: string; body: string }) => void;
}

export default function EmailGenerator({
  userProfile,
  customer,
  purpose,
  tone,
  length,
  onEmailGenerated
}: EmailGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    if (!userProfile) {
      toast({
        title: "エラー",
        description: "本人情報を入力してください",
        variant: "destructive"
      });
      return false;
    }

    if (!customer) {
      toast({
        title: "エラー",
        description: "顧客情報を入力してください",
        variant: "destructive"
      });
      return false;
    }

    if (!purpose || !tone) {
      toast({
        title: "エラー",
        description: "メール設定を選択してください",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const generateEmail = async () => {
    if (!validateForm()) return;

    // Prompt for API key
    const apiKey = window.prompt("OpenAI API Keyを入力してください:");
    
    if (!apiKey) {
      alert("API Keyが入力されませんでした");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await apiRequest('POST', '/api/generate-email', {
        userProfile,
        customer,
        purpose,
        tone,
        length,
        apiKey
      });

      const result = await response.json();
      
      if (result.success) {
        onEmailGenerated({
          subject: result.data.subject,
          body: result.data.body
        });
        setHasGenerated(true);
        toast({
          title: "成功",
          description: "メールを生成しました"
        });
      } else {
        // Handle specific error cases
        if (result.error?.includes('401') || result.error?.includes('invalid_api_key') || result.error?.includes('Incorrect API key')) {
          toast({
            title: "エラー",
            description: "無効なAPI Keyです",
            variant: "destructive"
          });
        } else {
          toast({
            title: "エラー",
            description: result.error || 'メール生成に失敗しました',
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Email generation error:', error);
      
      // Handle network and other errors
      let errorMessage = 'メール生成に失敗しました';
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('invalid_api_key')) {
          errorMessage = "無効なAPI Keyです";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-poppins font-semibold text-foreground mb-6">AI生成</h2>
        
        <div className="space-y-4">
          <Button
            onClick={generateEmail}
            disabled={isGenerating}
            className="w-full gradient-button py-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              'メールを生成する'
            )}
          </Button>
          
          <div className="flex space-x-2">
            <Button
              onClick={generateEmail}
              disabled={isGenerating || !hasGenerated}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              再生成
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
