import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LogicModelItem {
  id: string;
  text: string;
}

interface LogicModelData {
  inputs: LogicModelItem[];
  activities: LogicModelItem[];
  outputs: LogicModelItem[];
  outcomes: LogicModelItem[];
  impacts: LogicModelItem[];
}

export const LogicModel = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [logicModel, setLogicModel] = useState<LogicModelData>({
    inputs: [
      { id: '1', text: 'Funding: $372,743 over 3 years' },
      { id: '2', text: 'Staff: Program Director, Youth Coordinator' },
      { id: '3', text: 'Partners: Local schools, community centers' }
    ],
    activities: [
      { id: '1', text: 'Weekly mentoring sessions' },
      { id: '2', text: 'Skills workshops (job readiness, life skills)' },
      { id: '3', text: 'Educational support and tutoring' }
    ],
    outputs: [
      { id: '1', text: '150 youth enrolled in program' },
      { id: '2', text: '1,200 mentoring hours delivered' },
      { id: '3', text: '48 workshops conducted' }
    ],
    outcomes: [
      { id: '1', text: '80% of participants improve academic performance' },
      { id: '2', text: '70% develop job readiness skills' },
      { id: '3', text: '60% report increased self-confidence' }
    ],
    impacts: [
      { id: '1', text: 'Reduced youth unemployment in target area' },
      { id: '2', text: 'Stronger community connections' },
      { id: '3', text: 'Improved long-term economic outcomes' }
    ]
  });

  const generateLogicModel = async () => {
    setIsGenerating(true);
    // Simulate API call to generate logic model based on grant context
    setTimeout(() => {
      const generatedModel: LogicModelData = {
        inputs: [
          { id: '1', text: 'Federal grant funding: $500,000 over 3 years' },
          { id: '2', text: 'Dedicated staff: 2 FTE program coordinators' },
          { id: '3', text: 'Community partnerships: 5 local organizations' },
          { id: '4', text: 'Facility space: Community center locations' }
        ],
        activities: [
          { id: '1', text: 'Monthly community workshops on financial literacy' },
          { id: '2', text: 'One-on-one mentoring sessions' },
          { id: '3', text: 'Quarterly community forums and networking events' },
          { id: '4', text: 'Digital resource platform development' }
        ],
        outputs: [
          { id: '1', text: '300 individuals trained in financial literacy' },
          { id: '2', text: '120 mentoring relationships established' },
          { id: '3', text: '12 community forums conducted' },
          { id: '4', text: '1 comprehensive digital platform launched' }
        ],
        outcomes: [
          { id: '1', text: '75% of participants increase their savings rate' },
          { id: '2', text: '60% of participants secure stable employment' },
          { id: '3', text: '85% report improved financial confidence' },
          { id: '4', text: '40% start or expand small businesses' }
        ],
        impacts: [
          { id: '1', text: 'Reduced community poverty rate by 15%' },
          { id: '2', text: 'Increased local economic activity and entrepreneurship' },
          { id: '3', text: 'Strengthened community resilience and social cohesion' }
        ]
      };
      setLogicModel(generatedModel);
      setIsGenerating(false);
    }, 2000);
  };

  const addItem = (column: keyof LogicModelData) => {
    const newItem: LogicModelItem = {
      id: Date.now().toString(),
      text: ''
    };
    setLogicModel(prev => ({
      ...prev,
      [column]: [...prev[column], newItem]
    }));
  };

  const updateItem = (column: keyof LogicModelData, id: string, text: string) => {
    setLogicModel(prev => ({
      ...prev,
      [column]: prev[column].map(item => 
        item.id === id ? { ...item, text } : item
      )
    }));
  };

  const deleteItem = (column: keyof LogicModelData, id: string) => {
    setLogicModel(prev => ({
      ...prev,
      [column]: prev[column].filter(item => item.id !== id)
    }));
  };

  const columns = [
    { key: 'inputs' as keyof LogicModelData, title: 'Inputs', subtitle: 'Resources & Assets', color: 'bg-blue-50 border-blue-200' },
    { key: 'activities' as keyof LogicModelData, title: 'Activities', subtitle: 'What We Do', color: 'bg-green-50 border-green-200' },
    { key: 'outputs' as keyof LogicModelData, title: 'Outputs', subtitle: 'Direct Products', color: 'bg-yellow-50 border-yellow-200' },
    { key: 'outcomes' as keyof LogicModelData, title: 'Outcomes', subtitle: 'Short-term Changes', color: 'bg-orange-50 border-orange-200' },
    { key: 'impacts' as keyof LogicModelData, title: 'Impacts', subtitle: 'Long-term Changes', color: 'bg-purple-50 border-purple-200' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Logic Model</h3>
          <p className="text-sm text-gray-600">
            Map out how your program's inputs and activities will lead to the intended outcomes and impacts.
          </p>
        </div>
        <Button 
          onClick={generateLogicModel} 
          disabled={isGenerating}
          variant="outline"
          size="sm"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Logic Model'}
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {columns.map((column, index) => (
          <React.Fragment key={column.key}>
            <Card className={`${column.color} min-h-[400px]`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-center">
                  {column.title}
                </CardTitle>
                <p className="text-xs text-gray-600 text-center">{column.subtitle}</p>
                <Button
                  onClick={() => addItem(column.key)}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {logicModel[column.key].map((item) => (
                  <div key={item.id} className="relative group">
                    <Textarea
                      value={item.text}
                      onChange={(e) => updateItem(column.key, item.id, e.target.value)}
                      placeholder={`Enter ${column.title.toLowerCase()}...`}
                      className="min-h-[60px] text-xs resize-none bg-white/80"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteItem(column.key, item.id)}
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {index < columns.length - 1 && (
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Assumptions & External Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="List key assumptions and external factors that could affect your logic model..."
            className="min-h-[80px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};
