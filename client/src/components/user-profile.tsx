import { useState, useEffect } from "react";
import { Edit2, Save, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { InsertUserProfile } from "@shared/schema";

interface UserProfileProps {
  onProfileChange: (profile: InsertUserProfile | null) => void;
}

export default function UserProfile({ onProfileChange }: UserProfileProps) {
  const [profile, setProfile] = useLocalStorage<InsertUserProfile | null>('userProfile', null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<InsertUserProfile>({
    name: '',
    company: '',
    position: '',
    email: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      onProfileChange(profile);
    } else {
      onProfileChange(null);
    }
  }, [profile, onProfileChange]);

  const handleEdit = () => {
    if (profile) {
      setFormData(profile);
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validation
    if (!formData.name || !formData.company || !formData.email) {
      toast({
        title: "エラー",
        description: "必須項目を入力してください",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "エラー", 
        description: "有効なメールアドレスを入力してください",
        variant: "destructive"
      });
      return;
    }

    setProfile(formData);
    setIsEditing(false);
    toast({
      title: "成功",
      description: "保存されました"
    });
  };

  const handleChange = (field: keyof InsertUserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
          <h2 className="text-lg font-poppins font-semibold text-foreground">本人情報</h2>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="text-primary hover:bg-blue-50 min-w-[72px]"
            >
              <Edit2 className="w-4 h-4 mr-1.5" />
              編集
            </Button>
            <Button 
              onClick={handleSave}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white min-w-[72px]"
              style={{ backgroundColor: '#3B82F6' }}
            >
              <Save className="w-4 h-4 mr-1.5" />
              保存
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-muted-foreground mb-2 block">お名前</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="田中 太郎"
              className={!isEditing ? 'bg-muted' : ''}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="company" className="text-sm font-medium text-muted-foreground mb-2 block">会社名</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="株式会社サンプル"
              className={!isEditing ? 'bg-muted' : ''}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="position" className="text-sm font-medium text-muted-foreground mb-2 block">役職</Label>
            <Input
              id="position"
              value={formData.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="営業部長"
              className={!isEditing ? 'bg-muted' : ''}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-muted-foreground mb-2 block">連絡先</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="tanaka@sample.co.jp"
              className={!isEditing ? 'bg-muted' : ''}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
