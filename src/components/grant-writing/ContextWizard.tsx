
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Upload, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'chips' | 'file';
  question: string;
  required: boolean;
  options?: string[];
}

const questions: Question[] = [
  {
    id: 'program-elements',
    type: 'textarea',
    question: 'What are the top 3 creative elements of your program? (bullets fine)',
    required: true
  },
  {
    id: 'youth-served',
    type: 'number',
    question: 'Projected number of youth served in year 1?',
    required: true
  },
  {
    id: 'cost-breakdown',
    type: 'textarea',
    question: 'Brief cost breakdown (Personnel, Supplies, Overhead)',
    required: true
  },
  {
    id: 'target-demographics',
    type: 'chips',
    question: 'Primary target demographics (select all that apply)',
    required: true,
    options: ['Youth 13-18', 'Young Adults 18-24', 'Low-income families', 'Rural communities', 'Urban communities', 'BIPOC communities']
  },
  {
    id: 'geographic-scope',
    type: 'text',
    question: 'Geographic scope of your program (city, county, state)',
    required: true
  },
  {
    id: 'partnership-organizations',
    type: 'textarea',
    question: 'Key partner organizations (if any)',
    required: false
  }
];

export const ContextWizard = () => {
  const { grantId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / (questions.length + 1)) * 100;
  const isLastQuestion = currentStep === questions.length - 1;
  const isFileUploadStep = currentStep === questions.length;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isFileUploadStep) {
      // Save context and proceed to editor
      console.log('Context saved:', { answers, uploadedFiles });
      navigate(`/writing/${grantId}`);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/dashboard');
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (isFileUploadStep) return true;
    if (!currentQuestion.required) return true;
    const answer = answers[currentQuestion.id];
    return answer && (typeof answer === 'string' ? answer.trim() : true);
  };

  const renderQuestionInput = () => {
    const value = answers[currentQuestion.id] || '';

    switch (currentQuestion.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[120px]"
          />
        );
      
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            placeholder="Type your answer here..."
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            placeholder="Enter a number..."
          />
        );
      
      case 'chips':
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {currentQuestion.options?.map((option) => {
                const isSelected = Array.isArray(value) && value.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer ${isSelected ? 'bg-[#2C6E49]' : ''}`}
                    onClick={() => {
                      const current = Array.isArray(value) ? value : [];
                      const updated = isSelected
                        ? current.filter(v => v !== option)
                        : [...current, option];
                      handleAnswer(currentQuestion.id, updated);
                    }}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isFileUploadStep) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Step {currentStep + 1} of {questions.length + 1}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Context Documents</span>
              </CardTitle>
              <p className="text-gray-600">
                Upload supporting documents to help our AI better understand your organization and program.
                (Optional - up to 10 files, 200 MB each)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500">PDF, DOC, TXT files accepted</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => {
                    if (e.target.files) {
                      setUploadedFiles(Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block mt-4 px-4 py-2 bg-[#2C6E49] text-white rounded-lg cursor-pointer hover:bg-[#1B4332]"
                >
                  Select Files
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-[#2C6E49] hover:bg-[#1B4332]">
                  Start Writing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Step {currentStep + 1} of {questions.length + 1}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tell us about your program</CardTitle>
            <p className="text-gray-600">
              Help our AI understand your organization and program to generate better grant content.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                {currentQuestion.question}
                {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              {renderQuestionInput()}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 0 ? 'Back to Dashboard' : 'Previous'}
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-[#2C6E49] hover:bg-[#1B4332]"
              >
                {isLastQuestion ? 'Upload Documents' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
