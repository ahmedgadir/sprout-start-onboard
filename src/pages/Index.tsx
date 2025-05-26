
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, User, Building, Target, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: 'Account', icon: User, title: 'Account Basics' },
  { id: 1, label: 'Org', icon: Building, title: 'Organization Snapshot' },
  { id: 2, label: 'Mission', icon: Target, title: 'Mission & Programs' },
  { id: 3, label: 'Focus', icon: Search, title: 'Focus Areas' },
  { id: 4, label: 'Docs', icon: FileText, title: 'Document Intake' },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    authMethod: 'email' // 'email', 'google', 'microsoft'
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isValid, setIsValid] = useState(false);

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

  // Validate form
  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    const doPasswordsMatch = formData.password === formData.confirmPassword;
    
    setIsValid(isEmailValid && isPasswordValid && doPasswordsMatch);
    setPasswordStrength(evaluatePasswordStrength(formData.password));
    
    // Update progress based on form completion
    if (isEmailValid && isPasswordValid && doPasswordsMatch) {
      setProgress(20);
    } else if (isEmailValid && isPasswordValid) {
      setProgress(15);
    } else if (isEmailValid) {
      setProgress(10);
    } else {
      setProgress(5);
    }
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isValid) {
      setCurrentStep(1);
      setProgress(40);
    }
  };

  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    setFormData(prev => ({ ...prev, authMethod: provider }));
    // Simulate SSO success
    setTimeout(() => {
      setCurrentStep(1);
      setProgress(40);
    }, 1000);
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
                  ? "bg-green-500 border-green-500 text-white"
                  : isCurrent
                  ? "bg-blue-500 border-blue-500 text-white"
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
                isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-4 transition-colors duration-300",
                  isCompleted ? "bg-green-500" : "bg-gray-300"
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
          <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
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
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
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
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                  passwordStrength.includes('Strong') ? "text-green-600" :
                  passwordStrength.includes('Good') ? "text-blue-600" :
                  passwordStrength.includes('Fair') ? "text-yellow-600" :
                  "text-red-600"
                )}>
                  {passwordStrength}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
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
                ? "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Fundsprout</h1>
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
        <StepTracker />
        
        <div className="mt-12">
          {currentStep === 0 && <AccountBasicsScreen />}
          {currentStep > 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {STEPS[currentStep]?.title || 'Coming Soon'}
              </h2>
              <p className="text-gray-600 mt-2">
                This screen will be implemented next. Current progress: {Math.round(progress)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
