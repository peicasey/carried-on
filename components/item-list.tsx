"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, Sparkles } from "lucide-react";
import { analyzeList } from "@/app/(list)/actions";

export function ItemList() {
  const [list, setList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = () => {
    if (newItem.trim() !== "") {
      setList([...list, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setNewItem(list[index]);
  };

  const saveEdit = () => {
    if (editIndex !== null && newItem.trim() !== "") {
      const newList = [...list];
      newList[editIndex] = newItem.trim();
      setList(newList);
      setEditIndex(null);
      setNewItem("");
    }
  };

  const handleAnalyze = async () => {
    if (list) {
      setIsLoading(true);
      try {
        const result = await analyzeList(list);
        setAnalysis(result);
      } catch (error) {
        console.error("Error analyzing list:", error);
        setAnalysis("An error occurred while analyzing the image.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex mb-4">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new item"
          className="flex-grow mr-2"
        />
        {editIndex === null ? (
          <Button onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        ) : (
          <Button onClick={saveEdit}>
            <Edit2 className="w-4 h-4 mr-2" />
            Save
          </Button>
        )}
      </div>
      <ul className="space-y-2 mb-4">
        {list.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span>{item}</span>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startEdit(index)}
                className="mr-2"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Button
        onClick={handleAnalyze}
        disabled={list.length == 0 || isLoading}
        size="lg"
        className=""
      >
        <Sparkles /> {isLoading ? "Analyzing..." : "Analyze List"}
      </Button>

      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Analysis Result:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}
