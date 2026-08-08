import { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Download, 
  Clock, 
  FileText, 
  ExternalLink,
  Shield,
  HelpCircle,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import jsPDF from 'jspdf';
import { 
  buildDynamicRecoveryPlan, 
  type RecoveryPlan, 
  type RecoveryTask,
  type AccountNode 
} from '../services/recoveryEngine';

export function RecoveryCenter() {
  // Recovery Plan State
  const [plan, setPlan] = useState<RecoveryPlan>(() => buildDynamicRecoveryPlan('Advance-Fee Recruitment Fraud'));
  const [activeStageFilter, setActiveStageFilter] = useState<'preserve' | 'secure' | 'protect' | 'report' | 'monitor'>('secure');
  
  const [activeGuidedTask, setActiveGuidedTask] = useState<RecoveryTask | null>(null);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(1);
  
  // Side Drawer Account Node Inspector
  const [selectedDrawerAccount, setSelectedDrawerAccount] = useState<AccountNode | null>(null);

  // AI Explainability Expander Toggle
  const [showExplainability, setShowExplainability] = useState<boolean>(false);

  // Relief Transition Moment State
  const [reliefMoment, setReliefMoment] = useState<string | null>(null);

  // Smart Follow-up Question Answer State
  const [smartAnswered, setSmartAnswered] = useState<string | null>(null);

  // Toggle Task Completion & Dynamic Plan Recalculation
  const handleToggleTask = (taskId: string) => {
    setPlan(prev => {
      const updatedTasks: RecoveryTask[] = prev.tasks.map(t => {
        if (t.id === taskId) {
          const nextStatus: RecoveryTask['status'] = t.status === 'completed' ? 'pending' : 'completed';
          return { 
            ...t, 
            status: nextStatus, 
            completedBy: 'user',
            completedAt: nextStatus === 'completed' ? new Date().toLocaleTimeString() : undefined 
          };
        }
        return t;
      });

      const completedCount = updatedTasks.filter(t => t.status === 'completed').length;
      const readinessCompleted = completedCount + 3;
      const nextBestAction = updatedTasks.find(t => t.status !== 'completed') || updatedTasks[0];

      const completedTaskObj = updatedTasks.find(t => t.id === taskId);
      if (completedTaskObj && completedTaskObj.status === 'completed') {
        setReliefMoment(`${completedTaskObj.title} secured. One important recovery step has been completed.`);
        setTimeout(() => setReliefMoment(null), 5000);
      }

      return {
        ...prev,
        tasks: updatedTasks,
        readinessCompleted,
        nextBestAction
      };
    });
  };

  const handleOpenGuidedTask = (task: RecoveryTask) => {
    setActiveGuidedTask(task);
    setCurrentStepNumber(1);
  };

  const handleNextGuidedStep = () => {
    if (!activeGuidedTask) return;
    if (currentStepNumber < activeGuidedTask.steps.length) {
      setCurrentStepNumber(prev => prev + 1);
    } else {
      handleToggleTask(activeGuidedTask.id);
      setActiveGuidedTask(null);
    }
  };

  const handleSmartAnswer = (option: string) => {
    setSmartAnswered(option);
    if (option.includes('Yes')) {
      const injectedTask: RecoveryTask = {
        id: `task-inj-${Date.now()}`,
        title: 'Change exposed password immediately',
        plainLanguageReason: 'You indicated entering credentials on the suspicious link. Change that password immediately.',
        explainabilityPoints: [
          'Credential entry verified on untrusted domain.',
          'Immediate password revocation prevents session hijacking.'
        ],
        category: 'Account',
        priority: 'CRITICAL',
        estimatedTime: '~2 minutes',
        stage: 'secure',
        status: 'pending',
        steps: [
          { stepNumber: 1, instruction: 'Open password settings and create a new password.', actionLabel: 'Password Changed' }
        ]
      };
      setPlan(prev => ({
        ...prev,
        tasks: [injectedTask, ...prev.tasks],
        nextBestAction: injectedTask,
        readinessTotal: prev.readinessTotal + 1
      }));
    }
  };

  const handleGenerateCasePackage = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('CyberSaheli AI Incident Case Package', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Investigation ID: ${plan.incidentId}`, 14, 30);
    doc.text(`Incident Type: ${plan.incidentType}`, 14, 36);
    doc.text(`Recovery Readiness: ${plan.readinessCompleted} / ${plan.readinessTotal} critical actions completed`, 14, 42);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 48);

    doc.setFont('helvetica', 'bold');
    doc.text('Actions Completed:', 14, 60);
    doc.setFont('helvetica', 'normal');
    let y = 68;
    plan.tasks.filter(t => t.status === 'completed').forEach((t, idx) => {
      doc.text(`✓ ${idx + 1}. ${t.title} (Marked complete by user at ${t.completedAt || '12:42 PM'})`, 14, y);
      y += 6;
    });

    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Pending Critical Actions:', 14, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    plan.tasks.filter(t => t.status !== 'completed').forEach((t, idx) => {
      doc.text(`○ ${idx + 1}. ${t.title} (${t.priority})`, 14, y);
      y += 6;
    });

    doc.save(`CyberSaheli_Case_Package_${plan.incidentId}.pdf`);
  };

  const stageTasks = plan.tasks.filter(t => t.stage === activeStageFilter);
  const readinessPercent = Math.round((plan.readinessCompleted / plan.readinessTotal) * 100);

  return (
    <div className="min-h-screen bg-[#08090B] text-white font-sans selection:bg-[#4F8CFF] selection:text-white relative overflow-hidden pb-32">
      
      {/* 🌌 ATMOSPHERIC RADIAL ILLUMINATION BACKGROUND */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4F8CFF]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/3 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-6 pt-8 space-y-12 relative z-10">
        
        {/* 04 — MINIMAL PREMIUM HEADER */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-6">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
              Recovery Center
            </h1>
            <span className="text-xs font-mono text-[#8B909B] block">Incident recovery &bull; In progress</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#8B909B]">
            <span>{plan.incidentId}</span>
            <span className="h-1 w-1 rounded-full bg-[#4F8CFF]" />
            <span className="text-white font-medium">Protected workspace</span>
          </div>
        </div>

        {/* 05 — SPACIOUS HERO & 26 RECOVERY ORB */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Let's get you<br />back in control.
            </h2>
            <p className="text-base text-[#8B909B] leading-relaxed max-w-lg">
              CyberSaheli has organized the safest next steps based on your incident.
            </p>
          </div>

          {/* RECOVERY ORB & ELEGANT PROGRESS INDICATOR */}
          <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shrink-0">
            {/* 🔮 Recovery Orb */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/40 shadow-xl shadow-[#4F8CFF]/10">
              <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/30 blur-sm animate-pulse" />
              <ShieldCheck className="h-6 w-6 text-[#4F8CFF] absolute" />
            </div>

            <div className="space-y-2 min-w-[140px]">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-white tracking-tight">{readinessPercent}%</span>
                <span className="text-xs font-mono text-[#8B909B]">{plan.readinessCompleted} / {plan.readinessTotal}</span>
              </div>
              
              {/* Thin 3px Progress Track */}
              <div className="w-full bg-white/[0.08] h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#4F8CFF] to-[#10b981] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-[#8B909B] block">Recovery readiness</span>
            </div>
          </div>
        </div>

        {/* 17 — "RECOVERY MOMENT" RELIEF BANNER */}
        {reliefMoment && (
          <div className="p-5 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 backdrop-blur-xl text-sm text-[#10b981] font-mono flex items-center justify-between animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10b981]" />
              <span>✓ {reliefMoment}</span>
            </div>
            <button onClick={() => setReliefMoment(null)} className="p-1 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 07 — HERO FEATURE "NEXT BEST ACTION" */}
        <div className="p-8 md:p-10 rounded-[28px] bg-gradient-to-br from-white/[0.065] to-white/[0.025] backdrop-blur-[30px] border border-white/[0.09] shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <span className="text-xs font-mono text-[#EF4444] font-bold uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> NEXT BEST ACTION
            </span>
            <span className="px-3 py-1 rounded-full bg-[#EF4444]/20 text-[#EF4444] text-xs font-mono font-medium">
              {plan.nextBestAction.priority}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{plan.nextBestAction.title}</h3>
            <p className="text-sm text-[#8B909B] leading-relaxed max-w-2xl">{plan.nextBestAction.plainLanguageReason}</p>

            <div className="text-xs font-mono text-[#a78bfa] pt-1">
              ⏱ Estimated time {plan.nextBestAction.estimatedTime}
            </div>
          </div>

          {/* 14 — AI EXPLANATION EXPANDER */}
          <div className="pt-2 border-t border-white/[0.04]">
            <button
              onClick={() => setShowExplainability(!showExplainability)}
              className="text-xs font-mono text-[#4F8CFF] hover:underline flex items-center gap-1.5 focus:outline-none"
            >
              <span>Why this recommendation?</span>
              {showExplainability ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showExplainability && (
              <div className="mt-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs text-[#8B909B] font-mono animate-fade-in">
                <span className="text-white font-bold block mb-1">CyberSaheli found:</span>
                {plan.nextBestAction.explainabilityPoints.map((pt, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-[#4F8CFF]">&bull;</span>
                    <span>{pt}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* 08 — PREMIUM APPLE BUTTON */}
          <div className="pt-2">
            <button
              onClick={() => handleOpenGuidedTask(plan.nextBestAction)}
              className="h-[52px] px-[22px] rounded-[14px] bg-[#4F8CFF] text-white text-sm font-medium hover:-translate-y-[2px] active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-[#4F8CFF]/20"
            >
              <Sparkles className="h-4 w-4" /> Start Guided Recovery &rarr;
            </button>
          </div>
        </div>

        {/* 09 — RECOVERY JOURNEY LUXURY TIMELINE */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h4 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">RECOVERY JOURNEY</h4>
            <span className="text-xs font-mono text-[#8B909B]">Select Stage</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
            {[
              { stage: 'preserve', label: '✓ Preserve', icon: Lock },
              { stage: 'secure', label: '● Secure', icon: Shield },
              { stage: 'protect', label: '○ Protect', icon: ShieldCheck },
              { stage: 'report', label: '○ Report', icon: FileText },
              { stage: 'monitor', label: '○ Monitor', icon: Clock }
            ].map((stg) => (
              <button
                key={stg.stage}
                onClick={() => setActiveStageFilter(stg.stage as any)}
                className={`p-4 rounded-2xl transition-all text-center flex flex-col items-center gap-2 ${
                  activeStageFilter === stg.stage
                    ? 'bg-[#4F8CFF] text-white font-medium shadow-lg shadow-[#4F8CFF]/20'
                    : 'bg-white/[0.03] text-[#8B909B] hover:text-white border border-white/[0.06]'
                }`}
              >
                <stg.icon className="h-4 w-4 mb-0.5" />
                <span>{stg.label}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Task List */}
          <div className="space-y-3 pt-2">
            {stageTasks.length === 0 ? (
              <div className="p-5 rounded-2xl bg-white/[0.02] text-xs text-[#8B909B] font-mono text-center border border-white/[0.04]">
                No pending tasks in this stage.
              </div>
            ) : (
              stageTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    task.status === 'completed'
                      ? 'bg-white/[0.02] border-white/[0.04] opacity-70'
                      : 'bg-white/[0.03] border-white/[0.08] hover:border-[#4F8CFF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`h-5 w-5 rounded-md flex items-center justify-center transition-all ${
                        task.status === 'completed' ? 'bg-[#10b981] text-white' : 'border border-[#64748b]'
                      }`}
                    >
                      {task.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                    </button>

                    <div>
                      <h5 className={`text-sm font-medium ${task.status === 'completed' ? 'text-[#8B909B] line-through' : 'text-white'}`}>
                        {task.title}
                      </h5>
                      <p className="text-xs text-[#8B909B]">{task.plainLanguageReason}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenGuidedTask(task)}
                    className="px-4 py-2 rounded-xl bg-white/[0.06] text-white text-xs font-mono hover:bg-white/[0.1] shrink-0"
                  >
                    Guide &rarr;
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 10 — ACCOUNT SECURITY HORIZONTAL VIEW */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h4 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">ACCOUNT SECURITY</h4>
            <span className="text-xs font-mono text-[#8B909B]">Click Account for Side Drawer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            {plan.accounts.map((acc, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDrawerAccount(acc)}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#4F8CFF]/50 cursor-pointer space-y-3 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#8B909B] text-xs font-semibold uppercase">{acc.name}</span>
                  <span className={`h-2 w-2 rounded-full ${
                    acc.status === 'CRITICAL' ? 'bg-[#EF4444]' : acc.status === 'NEEDS_ATTENTION' ? 'bg-[#F59E0B]' : 'bg-[#10b981]'
                  }`} />
                </div>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
                  acc.status === 'CRITICAL' 
                    ? 'bg-[#EF4444]/20 text-[#EF4444]'
                    : acc.status === 'NEEDS_ATTENTION'
                    ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                    : 'bg-[#10b981]/20 text-[#10b981]'
                }`}>
                  {acc.status.replace('_', ' ')}
                </span>

                <p className="text-[11px] text-[#8B909B] font-sans leading-tight">{acc.riskDetail}</p>
                <span className="text-[11px] text-[#4F8CFF] block pt-1 group-hover:underline">Inspect Status &rarr;</span>
              </div>
            ))}
          </div>
        </div>

        {/* ❓ SMART RECOVERY QUESTION */}
        {plan.smartQuestion && !smartAnswered && (
          <div className="p-6 rounded-3xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 space-y-4 animate-fade-in backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4F8CFF]">
              <HelpCircle className="h-4 w-4" /> SMART RECOVERY QUESTION
            </div>
            <h4 className="text-sm font-semibold text-white">{plan.smartQuestion.question}</h4>

            <div className="flex flex-wrap gap-2 text-xs">
              {plan.smartQuestion.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSmartAnswer(opt)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] text-white hover:bg-[#4F8CFF] transition-all font-mono"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 📄 CASE PACKAGE DOWNLOAD CTA */}
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl backdrop-blur-2xl">
          <div>
            <h4 className="text-base font-semibold text-white">Generate Official Case Package</h4>
            <p className="text-xs text-[#8B909B]">Export a structured report for bank escalation or cyber crime authorities.</p>
          </div>
          <button
            onClick={handleGenerateCasePackage}
            className="px-6 py-3.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-medium hover:bg-[#3b82f6] transition-all flex items-center gap-2 shadow-xl shadow-[#4F8CFF]/20 shrink-0"
          >
            <Download className="h-4 w-4" /> Prepare Case Package (PDF)
          </button>
        </div>

      </div>

      {/* 11 — 440px PREMIUM GLASS SIDE DRAWER */}
      {selectedDrawerAccount && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[440px] bg-[#111214] border-l border-white/[0.08] p-8 space-y-8 shadow-2xl h-full overflow-y-auto font-sans text-white animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#8B909B] uppercase font-bold">ACCOUNT SECURITY DRAWER</span>
                <h3 className="text-xl font-bold text-white">{selectedDrawerAccount.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDrawerAccount(null)}
                className="p-2 rounded-xl bg-white/[0.06] text-[#8B909B] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                selectedDrawerAccount.status === 'CRITICAL' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
              }`}>
                {selectedDrawerAccount.status.replace('_', ' ')}
              </span>

              <p className="text-xs text-[#8B909B] leading-relaxed">{selectedDrawerAccount.riskDetail}</p>
            </div>

            <div className="space-y-3 font-mono text-xs border-t border-white/[0.06] pt-6">
              <span className="text-white font-semibold block mb-2 font-sans">Recommended Actions:</span>
              {selectedDrawerAccount.recommendedTasks.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#e2e8f0] font-sans">{t}</span>
                  <span className="text-[#4F8CFF] font-bold">○</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <button
                onClick={() => {
                  setSelectedDrawerAccount(null);
                  handleOpenGuidedTask(plan.nextBestAction);
                }}
                className="w-full py-3.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-semibold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20"
              >
                Begin Guided Recovery &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12 — GUIDED RECOVERY MODE FOCUS MODAL */}
      {activeGuidedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in font-sans">
          <div className="w-full max-w-xl bg-[#111214] border border-white/[0.09] rounded-3xl p-8 space-y-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono text-[#4F8CFF] font-bold uppercase">GUIDED RECOVERY MODE</span>
                <h3 className="text-lg font-semibold">{activeGuidedTask.title}</h3>
              </div>
              <button
                onClick={() => setActiveGuidedTask(null)}
                className="p-2 rounded-xl bg-white/[0.06] text-[#8B909B] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#4F8CFF] font-medium">STEP {currentStepNumber} OF {activeGuidedTask.steps.length}</span>
                <span className="text-[#8B909B]">{activeGuidedTask.category}</span>
              </div>

              <p className="text-sm font-semibold text-white leading-relaxed">
                {activeGuidedTask.steps[currentStepNumber - 1]?.instruction}
              </p>

              {activeGuidedTask.officialUrl && currentStepNumber === 1 && (
                <a
                  href={activeGuidedTask.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F8CFF]/20 text-[#4F8CFF] text-xs font-mono font-bold hover:bg-[#4F8CFF]/30"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open Official Settings &rarr;
                </a>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveGuidedTask(null)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] text-[#8B909B] text-xs font-medium hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleNextGuidedStep}
                className="px-6 py-2.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-medium hover:bg-[#3b82f6]"
              >
                {activeGuidedTask.steps[currentStepNumber - 1]?.actionLabel || 'Next Step →'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
