import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, RefreshCw, Shield, Mail, Lock, UserPlus } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

// Valid credentials for demonstration
const VALID_CREDENTIALS = {
  email: 'demo@seeksikkim.com',
  password: 'sikkim123'
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<'auth' | 'captcha'>('auth');
  const [error, setError] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserCaptchaInput('');
  };

  useEffect(() => {
    if (step === 'captcha') {
      generateCaptcha();
    }
  }, [step]);

  const handleAuth = async () => {
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mode === 'login') {
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        setStep('captcha');
      } else {
        setError('Invalid email or password. Use demo@seeksikkim.com / sikkim123');
      }
    } else {
      // Signup validation
      if (!fullName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else if (password.length < 6) {
        setError('Password must be at least 6 characters long');
      } else {
        // Simulate successful signup
        setStep('captcha');
      }
    }
    setIsLoading(false);
  };

  const handleCaptchaVerification = async () => {
    setError('');
    setIsLoading(true);

    // Simulate captcha verification delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (userCaptchaInput.toUpperCase() === captchaCode) {
      // Store login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginTime', new Date().toISOString());
      onLogin();
      onClose();
    } else {
      setError('Invalid captcha. Please try again.');
      generateCaptcha();
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step === 'auth') {
        handleAuth();
      } else {
        handleCaptchaVerification();
      }
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setError('');
    setStep('auth');
    setUserCaptchaInput('');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 border-2 border-blue-200 rounded-full flex items-center justify-center">
              <img 
                src="/icon.png" 
                alt="Seek Sikkim" 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === 'login' ? 'Welcome Back' : 'Join Seek Sikkim'}
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            {mode === 'login' 
              ? 'Please log in to explore sacred monasteries' 
              : 'Create an account to start your spiritual journey'
            }
          </p>
        </DialogHeader>

        {step === 'auth' && (
          <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={mode === 'login' ? 'default' : 'ghost'}
                onClick={() => setMode('login')}
                className="flex-1 text-sm"
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                variant={mode === 'signup' ? 'default' : 'ghost'}
                onClick={() => setMode('signup')}
                className="flex-1 text-sm"
                disabled={isLoading}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>

            {/* Full Name Field (only for signup) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm Password Field (only for signup) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {mode === 'login' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">Demo Credentials:</p>
                    <p>Email: demo@seeksikkim.com</p>
                    <p>Password: sikkim123</p>
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={handleAuth} 
              className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
              disabled={isLoading || !email || !password || (mode === 'signup' && (!fullName || !confirmPassword))}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Log In
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        )}

        {step === 'captcha' && (
          <div className="space-y-4">
            <div className="text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-green-700">Security Verification</h3>
              <p className="text-sm text-muted-foreground">
                Please complete the captcha to continue
              </p>
            </div>

            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Label className="text-sm font-medium">Enter the code shown below:</Label>
                  
                  {/* Captcha Display */}
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-lg p-4 font-mono text-2xl font-bold tracking-widest text-center select-none">
                    <div className="relative">
                      <span 
                        className="text-blue-700"
                        style={{
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          transform: 'rotate(-2deg)',
                          display: 'inline-block'
                        }}
                      >
                        {captchaCode}
                      </span>
                      {/* Add some noise lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                          <line x1="10" y1="15" x2="90" y2="25" stroke="#999" strokeWidth="1" opacity="0.3"/>
                          <line x1="20" y1="30" x2="80" y2="10" stroke="#999" strokeWidth="1" opacity="0.3"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter captcha code"
                      value={userCaptchaInput}
                      onChange={(e) => setUserCaptchaInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-center font-mono tracking-widest uppercase"
                      maxLength={5}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateCaptcha}
                      className="shrink-0"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStep('auth');
                  resetForm();
                }}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleCaptchaVerification}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isLoading || userCaptchaInput.length !== 5}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>
            </div>

            <div className="text-xs text-center text-muted-foreground bg-green-50 p-2 rounded">
              💡 This is a demonstration captcha. Enter the exact code shown above.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;