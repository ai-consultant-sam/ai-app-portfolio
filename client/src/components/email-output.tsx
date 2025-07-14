import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EmailOutputProps {
  generatedEmail: { subject: string; body: string } | null;
  maxLength: number;
}

export default function EmailOutput({ generatedEmail, maxLength }: EmailOutputProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const currentLength = generatedEmail?.body?.length || 0;

  const copyToClipboard = async () => {
    if (!generatedEmail) return;

    const fullEmail = `件名: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    
    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      toast({
        title: "成功",
        description: "クリップボードにコピーしました"
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "エラー",
        description: "コピーに失敗しました",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-poppins font-semibold text-foreground">生成されたメール</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{currentLength} / {maxLength}文字</span>
            <Button
              onClick={copyToClipboard}
              disabled={!generatedEmail}
              variant="outline"
              size="sm"
              className="text-success hover:bg-green-50"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1.5" />
              ) : (
                <Copy className="w-4 h-4 mr-1.5" />
              )}
              {copied ? 'コピー済み' : 'コピー'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="emailSubject" className="text-sm font-medium text-muted-foreground mb-2 block">件名</Label>
            <Input
              id="emailSubject"
              value={generatedEmail?.subject || ''}
              placeholder="AIが生成した件名がここに表示されます"
              className="bg-muted"
              readOnly
            />
          </div>
          
          <div>
            <Label htmlFor="emailBody" className="text-sm font-medium text-muted-foreground mb-2 block">本文</Label>
            <Textarea
              id="emailBody"
              value={generatedEmail?.body || ''}
              placeholder="AIが生成したメール本文がここに表示されます..."
              className="bg-muted resize-none"
              rows={12}
              readOnly
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
