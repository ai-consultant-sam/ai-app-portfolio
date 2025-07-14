export const DEPARTMENTS_BY_INDUSTRY = {
  manufacturing: ['営業部', '製造部', '品質管理部', '購買部', '技術部', '総務部'],
  retail: ['営業部', '商品企画部', 'マーケティング部', '店舗運営部', '物流部', '総務部'],
  service: ['営業部', 'カスタマーサービス部', '企画部', '人事部', '財務部', '総務部'],
  it: ['営業部', '開発部', 'システム部', 'マーケティング部', '人事部', '経営企画部'],
  healthcare: ['事務部', '医療情報部', '総務部', '経営企画部', '人事部', '財務部'],
  finance: ['営業部', '商品企画部', 'リスク管理部', 'システム部', '人事部', '経営企画部'],
  education: ['事務部', '企画部', 'システム部', '総務部', '人事部', '財務部'],
  'real-estate': ['営業部', '企画開発部', '管理部', '総務部', '財務部', '人事部']
} as const;

export const INDUSTRY_OPTIONS = [
  { value: 'manufacturing', label: '製造業' },
  { value: 'retail', label: '小売業' },
  { value: 'service', label: 'サービス業' },
  { value: 'it', label: 'IT業界' },
  { value: 'healthcare', label: '医療' },
  { value: 'finance', label: '金融' },
  { value: 'education', label: '教育' },
  { value: 'real-estate', label: '不動産' }
] as const;

export const PURPOSE_OPTIONS = [
  { value: 'initial', label: '初回アプローチ' },
  { value: 'followup', label: 'フォローアップ' },
  { value: 'proposal', label: '提案書送付' },
  { value: 'meeting', label: '商談依頼' }
] as const;

export const TONE_OPTIONS = [
  { value: 'formal', label: 'フォーマル' },
  { value: 'friendly', label: 'フレンドリー' },
  { value: 'casual', label: 'カジュアル' }
] as const;

export const LENGTH_OPTIONS = [
  { value: 150, label: '短文 (150字)' },
  { value: 300, label: '標準 (300字)' },
  { value: 500, label: '詳細 (500字)' }
] as const;
