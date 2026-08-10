import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

interface Props {
  children: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[CyberSaheli ErrorBoundary] Uncaught error in ${this.props.moduleName || 'module'}:`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto my-12 p-8 md:p-10 rounded-3xl bg-[#12141c] border border-[#ef4444]/40 space-y-6 shadow-2xl text-white">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <div className="p-3 rounded-2xl bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-sans">
                {this.props.moduleName || 'Module'} Encountered an Unexpected Error
              </h2>
              <span className="text-xs font-mono text-[#94a3b8]">
                Your other CyberSaheli AI features remain fully functional.
              </span>
            </div>
          </div>

          <p className="text-xs text-[#cbd5e1] leading-relaxed">
            A runtime exception occurred while rendering this workspace:
          </p>

          <div className="p-4 rounded-2xl bg-[#0a0b0e] border border-white/[0.06] font-mono text-xs text-[#ef4444] overflow-x-auto">
            {this.state.error?.message || 'Unknown render exception'}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={this.handleRetry}
              className="px-5 py-3 rounded-2xl bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#6d28d9] transition-all flex items-center gap-2 shadow-lg shadow-[#7c3aed]/20"
            >
              <RefreshCw className="h-4 w-4" /> Retry Workspace
            </button>

            <a
              href="/app"
              className="px-5 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white text-xs font-bold hover:bg-white/[0.1] transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4 text-[#4f8cff]" /> Return to Dashboard
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
