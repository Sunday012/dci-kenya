import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

type StatsCardProps = {
    label: string;
    value: number;
    color: string;
    onClick?: () => void;
}

export const StatsCard = ({ label, value, color, onClick } : StatsCardProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer shadow-none border-none rounded-xl bg-[#F3F4F4]" onClick={onClick}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h2 className="text-2xl font-bold">
            <span className={`text-${color}-500`}>•</span> {value}
          </h2>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </CardContent>
  </Card>
);