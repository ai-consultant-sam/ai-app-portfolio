import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmailGeneration } from "@shared/schema";

interface GenerationHistoryProps {
  onEmailSelect: (email: { subject: string; body: string }) => void;
}

export default function GenerationHistory({ onEmailSelect }: GenerationHistoryProps) {
  const { data: history, isLoading } = useQuery<{ success: boolean; data: EmailGeneration[] }>({
    queryKey: ['/api/email-history'],
    queryFn: async () => {
      const response = await fetch('/api/email-history?limit=5');
      return response.json();
    }
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleItemClick = (item: EmailGeneration) => {
    onEmailSelect({
      subject: item.subject,
      body: item.body
    });
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-poppins font-semibold text-foreground">生成履歴</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            すべて表示
          </Button>
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              読み込み中...
            </div>
          ) : !history?.success || !history.data || history.data.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              まだメールが生成されていません
            </div>
          ) : (
            history.data.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
              >
                <div className="text-sm font-medium text-foreground truncate">
                  {item.subject}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.customerCompany} - {formatDate(item.createdAt!)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
