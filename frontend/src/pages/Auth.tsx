import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, User, Building, ArrowRight, Users, AlertCircle } from 'lucide-react';
import { authApi } from '../services/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<'citizen' | 'admin'>('citizen');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await authApi.login({ email, password });
      } else {
        response = await authApi.register({
          email,
          password,
          full_name: fullName.trim(),
          role,
          department: department.trim(),
        });
      }

      const { access_token, user } = response.data;

      // Store auth state
      localStorage.setItem('govflow_auth', 'true');
      localStorage.setItem('govflow_token', access_token);
      localStorage.setItem('govflow_role', user.role);
      localStorage.setItem('govflow_user_profile', JSON.stringify({
        fullName: user.full_name,
        email: user.email,
        department: user.department,
        role: user.role,
      }));

      navigate('/');
    } catch (err: any) {
      const detail = err?.response?.data?.detail || 'Something went wrong. Please try again.';
      setError(detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl absolute -top-40 -right-20"></div>
        <div className="w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-3xl absolute -bottom-40 -left-20"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          GovFlow
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 font-medium">
          National Budget Flow & Intelligence Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">

          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-slate-800">
              {isLogin ? 'Sign in to your account' : 'Create an account'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {isLogin
                ? 'Enter your credentials to access the dashboard'
                : 'Register to monitor budget flows or report anomalies'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {isLogin ? 'I am signing in as' : 'I am registering as'}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('citizen')}
                  className={`py-2.5 px-4 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${role === 'citizen'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <Users className="w-4 h-4" />
                  Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2.5 px-4 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${role === 'admin'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  Gov Admin
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                      placeholder="e.g. Rajesh Kumar"
                    />
                  </div>
                </div>

                {role === 'admin' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department / Ministry</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-slate-400" />
                      </div>
                      <select
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm bg-slate-50 focus:bg-white transition-colors text-slate-700"
                      >
                        <option value="">Select Department</option>
                        <option value="Ministry of Finance">Ministry of Finance</option>
                        <option value="Ministry of Health & Family Welfare">Ministry of Health</option>
                        <option value="Ministry of Road Transport & Highways">Ministry of Road Transport</option>
                        <option value="State Government Official">State Government Official</option>
                        <option value="Municipal Corporation">Municipal Corporation</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {isLogin || role === 'citizen' ? 'Email Address' : 'Official Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                  placeholder={role === 'admin' ? "name@gov.in" : "name@example.com"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {isLogin ? 'New to GovFlow?' : 'Already registered?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLogin ? 'Create an account' : 'Sign in to existing account'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          Secure Government Portal • Citizen & Authorized Personnel Access
        </p>
      </div>
    </div>
  );
}