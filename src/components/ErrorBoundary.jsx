import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 rounded-2xl border border-red-200 dark:border-red-800 m-4 font-cairo">
          <h2 className="text-xl font-bold mb-2">عذراً، حدث خطأ أثناء عرض هذا الجزء</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 max-w-md font-mono bg-white/60 dark:bg-black/30 p-2 rounded">
            {this.state.error?.message || 'خطأ غير معروف'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-bold shadow-md transition cursor-pointer"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
