import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useApp } from '../../context/AppContext';

type AuthMode = 'signin' | 'signup';

interface SignInForm {
  email: string;
  password: string;
}

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const { login, register: registerUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const { register: registerSignIn, handleSubmit: handleSignInSubmit, formState: { errors: signInErrors } } = useForm<SignInForm>();
  const { register: registerSignUp, handleSubmit: handleSignUpSubmit, formState: { errors: signUpErrors }, watch } = useForm<SignUpForm>();

  const from = (location.state as any)?.from?.pathname || '/account';

  const onSignIn = (data: SignInForm) => {
    login(data.email, data.password);
    toast.success('Signed in successfully');
    navigate(from);
  };

  const onSignUp = (data: SignUpForm) => {
    registerUser(data.email, data.password, data.fullName);
    toast.success('Account created successfully');
    navigate(from);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl lg:text-4xl mb-2 uppercase tracking-wider">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h1>
          <p className="text-white/60">
            {mode === 'signin' ? 'Welcome back' : 'Join us today'}
          </p>
        </div>

        <div className="bg-white/5 p-8 border border-white/10">
          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Continue with Apple
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/50 text-white/60">Or continue with email</span>
            </div>
          </div>

          {/* Sign In Form */}
          {mode === 'signin' && (
            <form onSubmit={handleSignInSubmit(onSignIn)} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  {...registerSignIn('email', { required: 'Email is required' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {signInErrors.email && <p className="text-xs text-red-400 mt-1">{signInErrors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  {...registerSignIn('password', { required: 'Password is required' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {signInErrors.password && <p className="text-xs text-red-400 mt-1">{signInErrors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Full Name</label>
                <input
                  {...registerSignUp('fullName', { required: 'Name is required' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {signUpErrors.fullName && <p className="text-xs text-red-400 mt-1">{signUpErrors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  {...registerSignUp('email', { required: 'Email is required' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {signUpErrors.email && <p className="text-xs text-red-400 mt-1">{signUpErrors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  {...registerSignUp('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {signUpErrors.password && <p className="text-xs text-red-400 mt-1">{signUpErrors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Confirm Password</label>
                <input
                  type="password"
                  {...registerSignUp('confirmPassword', {
                    required: 'Please confirm password',
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return 'Passwords do not match';
                      }
                    },
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {signUpErrors.confirmPassword && <p className="text-xs text-red-400 mt-1">{signUpErrors.confirmPassword.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
              >
                Create Account
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            {mode === 'signin' ? (
              <p className="text-white/60">
                Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-[#EEFF00] hover:underline">
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-white/60">
                Already have an account?{' '}
                <button onClick={() => setMode('signin')} className="text-[#EEFF00] hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}