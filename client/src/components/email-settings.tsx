import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PURPOSE_OPTIONS, TONE_OPTIONS, LENGTH_OPTIONS } from "@/lib/constants";

interface EmailSettingsProps {
  purpose: string;
  tone: string;
  length: number;
  onPurposeChange: (purpose: 'initial' | 'followup' | 'proposal' | 'meeting' | '') => void;
  onToneChange: (tone: 'formal' | 'friendly' | 'casual' | '') => void;
  onLengthChange: (length: 150 | 300 | 500) => void;
}

export default function EmailSettings({
  purpose,
  tone,
  length,
  onPurposeChange,
  onToneChange,
  onLengthChange
}: EmailSettingsProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-poppins font-semibold text-foreground mb-6">メール設定</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">メール目的</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PURPOSE_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onPurposeChange(option.value as any)}
                  className={`option-button ${purpose === option.value ? 'option-button-selected' : ''}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">トーン</label>
            <div className="grid grid-cols-3 gap-2">
              {TONE_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onToneChange(option.value as any)}
                  className={`option-button ${tone === option.value ? 'option-button-selected' : ''}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">文字数</label>
            <div className="grid grid-cols-3 gap-2">
              {LENGTH_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onLengthChange(option.value as any)}
                  className={`option-button ${length === option.value ? 'option-button-selected' : ''}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
