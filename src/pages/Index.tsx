
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, User, Building, Target, FileText, Search, Upload, X, Plus, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: 'Account', icon: User, title: 'Account Basics' },
  { id: 1, label: 'Org', icon: Building, title: 'Organization Snapshot' },
  { id: 2, label: 'Mission', icon: Target, title: 'Mission & Programs' },
  { id: 3, label: 'Focus', icon: Search, title: 'Focus Areas' },
  { id: 4, label: 'Docs', icon: FileText, title: 'Document Intake' },
];

const FOCUS_AREAS = [
  'Education', 'Health', 'Food Security', 'Environment', 'Youth', 
  'Women & Girls', 'Arts & Culture', 'Economic Development', 
  'Disability Inclusion', 'Other'
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    // Account data
    email: '',
    password: '',
    confirmPassword: '',
    authMethod: 'email',
    // Org data
    legalName: '',
    taxStatus: '',
    ein: '',
    city: '',
    staffSize: '',
    // Mission data
    missionStatement: '',
    programs: [],
    // Focus areas
    focusAreas: [],
    // Documents
    uploadedFiles: []
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [programData, setProgramData] = useState([]);

  // Calculate password strength
  const evaluatePasswordStrength = (password: string) => {
    if (!password) return '';
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return 'Very Weak';
    if (score < 3) return 'Weak';
    if (score < 4) return 'Fair - add a symbol for strength';
    if (score < 5) return 'Good';
    return 'Strong';
  };

  // Validate current step
  useEffect(() => {
    let valid = false;
    let progressValue = 5;
    
    switch(currentStep) {
      case 0:
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const isPasswordValid = formData.password.length >= 6;
        const doPasswordsMatch = formData.password === formData.confirmPassword;
        valid = isEmailValid && isPasswordValid && doPasswordsMatch;
        progressValue = valid ? 20 : Math.max(5, (isEmailValid ? 10 : 0) + (isPasswordValid ? 5 : 0));
        break;
      case 1:
        valid = formData.legalName && formData.taxStatus && formData.city && formData.staffSize;
        progressValue = 40;
        break;
      case 2:
        valid = formData.missionStatement.length > 50;
        progressValue = 60;
        break;
      case 3:
        valid = formData.focusAreas.length > 0;
        progressValue = 75;
        break;
      case 4:
        valid = true; // Document upload is optional
        progressValue = 90;
        break;
    }
    
    setIsValid(valid);
    if (valid || currentStep > 0) {
      setProgress(progressValue);
    }
    setPasswordStrength(evaluatePasswordStrength(formData.password));
  }, [formData, currentStep]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isValid || currentStep > 0) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    setFormData(prev => ({ ...prev, authMethod: provider }));
    setTimeout(() => {
      setCurrentStep(1);
    }, 1000);
  };

  const addProgram = () => {
    const newProgram = {
      id: Date.now(),
      name: '',
      focusArea: '',
      budget: '',
      targetPopulation: '',
      outcome: ''
    };
    setProgramData([...programData, newProgram]);
  };

  const updateProgram = (id: number, field: string, value: string) => {
    setProgramData(prev => prev.map(program => 
      program.id === id ? { ...program, [field]: value } : program
    ));
  };

  const removeProgram = (id: number) => {
    setProgramData(prev => prev.filter(program => program.id !== id));
  };

  const toggleFocusArea = (area: string) => {
    const current = formData.focusAreas;
    if (current.includes(area)) {
      handleInputChange('focusAreas', current.filter(a => a !== area));
    } else {
      handleInputChange('focusAreas', [...current, area]);
    }
  };

  const StepTracker = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const Icon = step.icon;
        
        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                isCompleted
                  ? "bg-[#2C6E49] border-[#2C6E49] text-white"
                  : isCurrent
                  ? "bg-[#4C956C] border-[#4C956C] text-white"
                  : "bg-white border-gray-300 text-gray-400"
              )}
            >
              {isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={cn(
                "ml-2 text-sm font-medium transition-colors duration-300",
                isCompleted || isCurrent ? "text-[#1B4332]" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-4 transition-colors duration-300",
                  isCompleted ? "bg-[#2C6E49]" : "bg-gray-300"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const AccountBasicsScreen = () => (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-[#1B4332]">Create Your Account</CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            Five quick steps—about six minutes—and Fundsprout starts finding grants.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SSO Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
              onClick={() => handleSSOLogin('google')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  G
                </div>
                <span>Continue with Google</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
              onClick={() => handleSSOLogin('microsoft')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                <span>Continue with Microsoft</span>
              </div>
            </Button>
          </div>

          <div className="relative">
            <Separator className="my-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-3 text-sm text-gray-500">or</span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#1B4332]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@organization.org"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 h-12"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-[#1B4332]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-1 h-12"
              />
              {formData.password && (
                <p className={cn(
                  "text-xs mt-1",
                  passwordStrength.includes('Strong') ? "text-[#2C6E49]" :
                  passwordStrength.includes('Good') ? "text-[#4C956C]" :
                  passwordStrength.includes('Fair') ? "text-yellow-600" :
                  "text-red-600"
                )}>
                  {passwordStrength}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#1B4332]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="mt-1 h-12"
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Passwords don't match</p>
              )}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!isValid}
            className={cn(
              "w-full h-12 text-white font-medium transition-all duration-300",
              isValid
                ? "bg-[#2C6E49] hover:bg-[#1B4332] shadow-lg hover:shadow-xl"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            Continue to Organization Details
          </Button>

          <div className="text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Skip for now
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const OrganizationScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-[#1B4332]">Organization Snapshot</CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            These basics drive compliance and geo-filtered grants.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="legalName" className="text-sm font-medium text-[#1B4332]">
              Legal Organization Name
            </Label>
            <Input
              id="legalName"
              placeholder="Enter your organization's legal name"
              value={formData.legalName}
              onChange={(e) => handleInputChange('legalName', e.target.value)}
              className="mt-1 h-12"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#1B4332]">Tax Status</Label>
            <RadioGroup
              value={formData.taxStatus}
              onValueChange={(value) => handleInputChange('taxStatus', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="501c3" id="501c3" />
                <Label htmlFor="501c3">501(c)(3)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fiscally-sponsored" id="fiscally-sponsored" />
                <Label htmlFor="fiscally-sponsored">Fiscally-sponsored</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="social-enterprise" id="social-enterprise" />
                <Label htmlFor="social-enterprise">For-profit social enterprise</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.taxStatus === '501c3' && (
            <div>
              <Label htmlFor="ein" className="text-sm font-medium text-[#1B4332]">
                EIN (Employer Identification Number)
              </Label>
              <Input
                id="ein"
                placeholder="XX-XXXXXXX"
                value={formData.ein}
                onChange={(e) => handleInputChange('ein', e.target.value)}
                className="mt-1 h-12"
              />
              <p className="text-xs text-gray-500 mt-1">
                <button className="text-[#2C6E49] hover:underline">No EIN yet?</button>
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="city" className="text-sm font-medium text-[#1B4332]">
              Headquarters City/State
            </Label>
            <Input
              id="city"
              placeholder="Search city and state"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="mt-1 h-12"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#1B4332]">Staff Size</Label>
            <RadioGroup
              value={formData.staffSize}
              onValueChange={(value) => handleInputChange('staffSize', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-5" id="1-5" />
                <Label htmlFor="1-5">1-5</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6-15" id="6-15" />
                <Label htmlFor="6-15">6-15</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="16-50" id="16-50" />
                <Label htmlFor="16-50">16-50</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="51+" id="51+" />
                <Label htmlFor="51+">51+</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-[#2C6E49] hover:bg-[#1B4332] text-white"
            >
              Continue to Mission & Programs
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MissionScreen = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-[#1B4332]">Mission & Smart Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mission Statement Section */}
          <div>
            <Label className="text-lg font-semibold text-[#1B4332]">Mission Statement</Label>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mt-4">
              {['write', 'paste', 'draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors",
                    activeTab === tab
                      ? "text-[#2C6E49] border-[#2C6E49]"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  )}
                >
                  {tab === 'draft' ? 'Draft from website' : tab}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div className="mt-4">
              <textarea
                placeholder={
                  activeTab === 'paste' 
                    ? "Paste your existing mission statement here..."
                    : activeTab === 'write'
                    ? "Write your mission statement..."
                    : "We'll draft a mission statement from your website..."
                }
                value={formData.missionStatement}
                onChange={(e) => handleInputChange('missionStatement', e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{formData.missionStatement.length} characters</span>
                <span>Grade level: {formData.missionStatement.length > 50 ? '8' : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <div>
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold text-[#1B4332]">Programs</Label>
              <Button
                onClick={addProgram}
                variant="outline"
                className="text-[#2C6E49] border-[#2C6E49] hover:bg-[#D8F3DC]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Program
              </Button>
            </div>

            {programData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No programs added yet. Click "Add Program" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                {programData.map((program) => (
                  <div key={program.id} className="grid grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg">
                    <Input
                      placeholder="Program Name ⭐"
                      value={program.name}
                      onChange={(e) => updateProgram(program.id, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Focus Area (optional)"
                      value={program.focusArea}
                      onChange={(e) => updateProgram(program.id, 'focusArea', e.target.value)}
                    />
                    <Input
                      placeholder="Annual Budget USD (optional)"
                      value={program.budget}
                      onChange={(e) => updateProgram(program.id, 'budget', e.target.value)}
                    />
                    <Input
                      placeholder="Target Population (optional)"
                      value={program.targetPopulation}
                      onChange={(e) => updateProgram(program.id, 'targetPopulation', e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Key Outcome (optional)"
                        value={program.outcome}
                        onChange={(e) => updateProgram(program.id, 'outcome', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeProgram(program.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-[#2C6E49] hover:bg-[#1B4332] text-white"
            >
              Continue to Focus Areas
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const FocusAreasScreen = () => {
    const primaryCount = formData.focusAreas.slice(0, 3).length;
    
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-[#1B4332]">Focus Areas</CardTitle>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-[#2C6E49] font-medium">
                Primary selected: {primaryCount} / 3
              </div>
              <div className="text-xs text-gray-500">
                These guide our matching engine.
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FOCUS_AREAS.map((area) => {
                const isSelected = formData.focusAreas.includes(area);
                const isPrimary = formData.focusAreas.indexOf(area) < 3;
                
                return (
                  <button
                    key={area}
                    onClick={() => toggleFocusArea(area)}
                    className={cn(
                      "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                      isSelected
                        ? isPrimary
                          ? "bg-[#2C6E49] border-[#2C6E49] text-white"
                          : "bg-[#D8F3DC] border-[#4C956C] text-[#1B4332]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-[#4C956C] hover:bg-[#D8F3DC]/50"
                    )}
                  >
                    {area}
                    {isSelected && isPrimary && (
                      <span className="ml-2 text-xs">★</span>
                    )}
                  </button>
                );
              })}
            </div>

            {formData.focusAreas.length > 3 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  We'll prioritise the first three selected areas for grant matching.
                </p>
              </div>
            )}

            <div className="flex space-x-4">
              <Button
                onClick={handleNext}
                disabled={formData.focusAreas.length === 0}
                className="flex-1 h-12 bg-[#2C6E49] hover:bg-[#1B4332] text-white disabled:bg-gray-300"
              >
                Continue to Document Intake
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip for now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const DocumentScreen = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-[#1B4332]">Document Intake</CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            Drop in any files that tell your story.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Zone */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#4C956C] transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#1B4332] mb-2">
              Drag and drop files here
            </h3>
            <p className="text-gray-500 mb-4">or</p>
            <Button
              variant="outline"
              className="text-[#2C6E49] border-[#2C6E49] hover:bg-[#D8F3DC]"
            >
              Choose Files
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Personal IDs auto-redacted for security • 250 MB max/file • 5 GB free
            </p>
          </div>

          {/* File Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Previous Grant Materials', icon: '📁', count: 0 },
              { name: 'Impact & Reports', icon: '📊', count: 0 },
              { name: 'Financials', icon: '📈', count: 0 },
              { name: 'Org Profile & Governance', icon: '🗂️', count: 0 },
              { name: 'Compliance & Legal', icon: '🏷️', count: 0 },
              { name: 'Catch-All', icon: '📥', count: 0 },
            ].map((category) => (
              <div key={category.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-[#1B4332] text-sm mb-1">{category.name}</h4>
                <p className="text-xs text-gray-500">{category.count} files</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => {
                setCurrentStep(5);
                setProgress(100);
              }}
              className="flex-1 h-12 bg-[#2C6E49] hover:bg-[#1B4332] text-white"
            >
              Complete Setup
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep(5);
                setProgress(100);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RecapScreen = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1B4332] mb-2">All Set—Here's What We Captured</h2>
        <p className="text-gray-600">Review your information before we start finding grants</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {[
            { title: 'Organization Basics', completed: formData.legalName && formData.taxStatus },
            { title: 'Mission Statement', completed: formData.missionStatement.length > 0 },
            { title: `Programs (${programData.length})`, completed: programData.length > 0 },
            { title: 'Focus Areas', completed: formData.focusAreas.length > 0 },
            { title: 'Documents (0)', completed: false },
          ].map((item) => (
            <Card key={item.title} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    item.completed ? "bg-[#2C6E49] text-white" : "bg-gray-300 text-gray-500"
                  )}>
                    {item.completed ? <Check className="w-4 h-4" /> : "—"}
                  </div>
                  <span className="font-medium text-[#1B4332]">{item.title}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[#2C6E49]">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-[#1B4332] mb-3">Boost Fundsprout Later</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>Connect Guidestar</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💾</span>
                <span>Connect Google Drive</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💰</span>
                <span>Connect QuickBooks</span>
              </div>
            </div>
            <Button variant="ghost" className="text-[#2C6E49] text-sm mt-2 p-0">
              Do later →
            </Button>
          </Card>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button className="h-14 px-8 text-lg bg-[#2C6E49] hover:bg-[#1B4332] text-white">
          Find My Grants →
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#D8F3DC]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/d9ffd477-781b-4371-ad2d-2fb1168fc369.png" 
                alt="Fundsprout"
                className="h-8 w-auto"
              />
            </div>
            <div className="text-sm text-gray-600">
              Setup Progress: {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <Progress 
            value={progress} 
            className="h-2 bg-gray-200"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {currentStep < 5 && <StepTracker />}
        
        <div className="mt-12">
          {currentStep === 0 && <AccountBasicsScreen />}
          {currentStep === 1 && <OrganizationScreen />}
          {currentStep === 2 && <MissionScreen />}
          {currentStep === 3 && <FocusAreasScreen />}
          {currentStep === 4 && <DocumentScreen />}
          {currentStep === 5 && <RecapScreen />}
        </div>
      </div>
    </div>
  );
};

export default Index;
