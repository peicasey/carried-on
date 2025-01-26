"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, Sparkles } from "lucide-react";
import { analyzeList } from "@/app/(list)/actions";

const test = `{
    "total": 25,
    "valid": 21,
    "items": [
        {
            "item_name": "Propane Canisters",
            "isValid": false,
            "desc": "Cannot fly due to TSA restrictions on compressed gas cylinders."
        },
        {
            "item_name": "Microfiber Towel",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Portable Camping Stove",
            "isValid": false,
            "desc": "Cannot fly with fuel; stove is allowed if clean of residue."
        },
        {
            "item_name": "Kettle",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Duffel Bag",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Power Bank",
            "isValid": true,
            "desc": "Allowed if under 100Wh and carried in carry-on luggage."
        },
        {
            "item_name": "Daypack",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Coleman Stove",
            "isValid": false,
            "desc": "Cannot fly with fuel; stove is allowed if clean of residue."
        },
        {
            "item_name": "Aeropress Coffee Maker",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Hydro Flask Bottle",
            "isValid": true,
            "desc": "Allowed if empty."
        },
        {
            "item_name": "Travel Alarm Clock",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Black Diamond Headlamp",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Flashlight",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Clothes (Shirts, Pants, Socks)",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Waterproof Notebook",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Silicone Food Containers",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Reusable Utensils",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Travel Toiletries",
            "isValid": true,
            "desc": "Allowed if liquids are under 3.4oz and packed in a quart-sized bag."
        },
        {
            "item_name": "Carabiners",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Small Multi-tool",
            "isValid": false,
            "desc": "Cannot fly due to blade or sharp component restrictions."
        },
        {
            "item_name": "Camping Lantern",
            "isValid": true,
            "desc": "Allowed if battery-powered and batteries are carried on."
        },
        {
            "item_name": "Travel Organizer Case",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Clothing Compression Bag",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "The North Face Backpack",
            "isValid": true,
            "desc": "Allowed on flights."
        },
        {
            "item_name": "Marker Pen",
            "isValid": true,
            "desc": "Allowed on flights."
        }
    ]
}`;

interface Props {
  analysis: string | null;
  setAnalysis: any;
}

export function ItemList({ analysis, setAnalysis }: Props) {
  const [list, setList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
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
        // CHANGE ONCE API WORKING AGAIN; TODO
        // const result = await analyzeList(list);
        // setAnalysis(result);
        setAnalysis(test); // <-- CHANGE THIS TO result
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

      {/* {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Analysis Result:</h3>
          <p>{analysis}</p>
        </div>
      )} */}
    </div>
  );
}
