import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BudgetItem {
  id: string;
  category: string;
  description: string;
  year1: number;
  year2: number;
  year3: number;
  total: number;
}

export const BudgetGrid = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: '1',
      category: 'Personnel',
      description: 'Program Director (1.0 FTE)',
      year1: 75000,
      year2: 77250,
      year3: 79568,
      total: 231818
    },
    {
      id: '2',
      category: 'Personnel',
      description: 'Youth Coordinator (0.5 FTE)',
      year1: 25000,
      year2: 25750,
      year3: 26523,
      total: 77273
    },
    {
      id: '3',
      category: 'Supplies',
      description: 'Program Materials',
      year1: 5000,
      year2: 5000,
      year3: 5000,
      total: 15000
    },
    {
      id: '4',
      category: 'Administrative',
      description: 'Overhead (15%)',
      year1: 15750,
      year2: 16213,
      year3: 16689,
      total: 48652
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateBudget = async () => {
    setIsGenerating(true);
    // Simulate API call to generate budget based on grant context
    setTimeout(() => {
      const generatedItems: BudgetItem[] = [
        {
          id: Date.now().toString(),
          category: 'Personnel',
          description: 'Project Manager (1.0 FTE)',
          year1: 65000,
          year2: 66950,
          year3: 68959,
          total: 200909
        },
        {
          id: (Date.now() + 1).toString(),
          category: 'Personnel', 
          description: 'Research Assistant (0.5 FTE)',
          year1: 20000,
          year2: 20600,
          year3: 21218,
          total: 61818
        },
        {
          id: (Date.now() + 2).toString(),
          category: 'Equipment',
          description: 'Technology and Software',
          year1: 15000,
          year2: 3000,
          year3: 3000,
          total: 21000
        },
        {
          id: (Date.now() + 3).toString(),
          category: 'Travel',
          description: 'Conference and Training',
          year1: 5000,
          year2: 5000,
          year3: 5000,
          total: 15000
        },
        {
          id: (Date.now() + 4).toString(),
          category: 'Administrative',
          description: 'Indirect Costs (20%)',
          year1: 21000,
          year2: 19110,
          year3: 19635,
          total: 59745
        }
      ];
      setBudgetItems(generatedItems);
      setIsGenerating(false);
    }, 2000);
  };

  const addBudgetItem = () => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: '',
      description: '',
      year1: 0,
      year2: 0,
      year3: 0,
      total: 0
    };
    setBudgetItems([...budgetItems, newItem]);
  };

  const updateBudgetItem = (id: string, field: keyof BudgetItem, value: string | number) => {
    setBudgetItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'year1' || field === 'year2' || field === 'year3') {
            updated.total = updated.year1 + updated.year2 + updated.year3;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems(items => items.filter(item => item.id !== id));
  };

  const getTotalByYear = (year: 'year1' | 'year2' | 'year3') => {
    return budgetItems.reduce((sum, item) => sum + item[year], 0);
  };

  const getGrandTotal = () => {
    return budgetItems.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Budget</h3>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={generateBudget} 
            disabled={isGenerating}
            variant="outline"
            size="sm"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Budget'}
          </Button>
          <Button onClick={addBudgetItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Line Item
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-[120px]">Year 1</TableHead>
                <TableHead className="text-right w-[120px]">Year 2</TableHead>
                <TableHead className="text-right w-[120px]">Year 3</TableHead>
                <TableHead className="text-right w-[120px]">Total</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.category}
                      onChange={(e) => updateBudgetItem(item.id, 'category', e.target.value)}
                      placeholder="Category"
                      className="border-0 p-0 h-auto"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) => updateBudgetItem(item.id, 'description', e.target.value)}
                      placeholder="Description"
                      className="border-0 p-0 h-auto"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={item.year1}
                      onChange={(e) => updateBudgetItem(item.id, 'year1', Number(e.target.value))}
                      className="border-0 p-0 h-auto text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={item.year2}
                      onChange={(e) => updateBudgetItem(item.id, 'year2', Number(e.target.value))}
                      className="border-0 p-0 h-auto text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={item.year3}
                      onChange={(e) => updateBudgetItem(item.id, 'year3', Number(e.target.value))}
                      className="border-0 p-0 h-auto text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBudgetItem(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-semibold">
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">${getTotalByYear('year1').toLocaleString()}</TableCell>
                <TableCell className="text-right">${getTotalByYear('year2').toLocaleString()}</TableCell>
                <TableCell className="text-right">${getTotalByYear('year3').toLocaleString()}</TableCell>
                <TableCell className="text-right">${getGrandTotal().toLocaleString()}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Calculator className="w-4 h-4 mr-2" />
            Budget Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Total Project Cost</div>
              <div className="text-2xl font-bold text-green-600">${getGrandTotal().toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium">Administrative Percentage</div>
              <div className="text-lg">
                {getGrandTotal() > 0 ? ((budgetItems.filter(item => item.category === 'Administrative').reduce((sum, item) => sum + item.total, 0) / getGrandTotal()) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
