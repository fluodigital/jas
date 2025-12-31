import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Replace with actual authentication logic
    // For now, just check for demo credentials
    if (email === 'admin@jassoni.com' && password === 'admin123') {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin@jassoni.com / admin123 for demo.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo className="h-12 mx-auto mb-4" color="#EEFF00" />
          <h1 className="text-2xl text-white mb-2">Admin Panel</h1>
          <p className="text-sm text-white/60">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <div className="bg-black border border-white/10 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-md">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                  placeholder="admin@jassoni.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#EEFF00] text-black font-medium rounded-md hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-md">
            <p className="text-xs text-white/60 mb-2">Demo Credentials:</p>
            <p className="text-xs text-white/80 font-mono">Email: admin@jassoni.com</p>
            <p className="text-xs text-white/80 font-mono">Password: admin123</p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-white/60 hover:text-[#EEFF00] transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
