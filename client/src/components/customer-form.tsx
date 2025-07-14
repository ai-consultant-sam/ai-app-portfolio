import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEPARTMENTS_BY_INDUSTRY, INDUSTRY_OPTIONS } from "@/lib/constants";
import { InsertCustomer } from "@shared/schema";

interface CustomerFormProps {
  onCustomerChange: (customer: InsertCustomer | null) => void;
}

export default function CustomerForm({ onCustomerChange }: CustomerFormProps) {
  const [formData, setFormData] = useState<InsertCustomer>({
    company: '',
    contactName: '',
    industry: '',
    department: ''
  });

  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

  useEffect(() => {
    const isValid = formData.company && formData.contactName && formData.industry;
    onCustomerChange(isValid ? formData : null);
  }, [formData, onCustomerChange]);

  const handleChange = (field: keyof InsertCustomer, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update departments when industry changes
    if (field === 'industry') {
      const industry = value as keyof typeof DEPARTMENTS_BY_INDUSTRY;
      setAvailableDepartments(DEPARTMENTS_BY_INDUSTRY[industry] || []);
      setFormData(prev => ({
        ...prev,
        department: '' // Reset department when industry changes
      }));
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-poppins font-semibold text-foreground mb-6">顧客情報</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerCompany" className="text-sm font-medium text-muted-foreground mb-2 block">会社名</Label>
              <Input
                id="customerCompany"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="株式会社ターゲット企業"
              />
            </div>
            <div>
              <Label htmlFor="customerName" className="text-sm font-medium text-muted-foreground mb-2 block">担当者名</Label>
              <Input
                id="customerName"
                value={formData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
                placeholder="山田 花子"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry" className="text-sm font-medium text-muted-foreground mb-2 block">業種</Label>
              <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="業種を選択" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department" className="text-sm font-medium text-muted-foreground mb-2 block">部署</Label>
              <Select 
                value={formData.department || ''} 
                onValueChange={(value) => handleChange('department', value)}
                disabled={!formData.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.industry ? "部署を選択" : "まず業種を選択してください"} />
                </SelectTrigger>
                <SelectContent>
                  {availableDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
