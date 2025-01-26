"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { CheckCircle, DotIcon, XCircle } from "lucide-react";

interface Item {
  item_name: string;
  isValid: boolean;
  desc: string;
}

interface JsonData {
  total: number;
  valid: number;
  items: Item[];
}

export default function FancyList({ jsonString }: { jsonString: string }) {
  const [data, setData] = useState<JsonData | null>(null);

  useState(() => {
    try {
      const parsedData = JSON.parse(jsonString);
      setData(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  if (!data) {
    return <div>Error parsing JSON data</div>;
  }

  const chartData = [
    { name: "Valid", value: data.valid },
    { name: "Invalid", value: data.total - data.valid },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="pt-4">
        <div className="mb-8 ">
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-emerald-500 mr-2"></div>
              <span>Valid: {data.valid}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span>Invalid: {data.total - data.valid}</span>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {data.items.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex gap-2 justify-start">
                  <DotIcon color={item.isValid ? "#67dd8d" : "#d9635a"} />
                  {item.item_name}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  {item.isValid ? (
                    <CheckCircle className="text-emerald-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                  <span>{item.isValid ? "Valid" : "Invalid"}</span>
                </div>
                <p className="mt-2">{item.desc}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
