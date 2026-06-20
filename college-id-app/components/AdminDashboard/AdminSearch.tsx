'use client';

interface AdminSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AdminSearch({ value, onChange }: AdminSearchProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Search Applications</label>
      <input
        type="text"
        placeholder="Search by name, roll number, or application ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
