import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Zap, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Lock,
  Globe
} from 'lucide-react';

interface ScenarioChoice {
  text: string;
  risk_score: number;
  is_correct: boolean;
  explanation: string;
}

interface Scenario {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  reward_xp: number;
  estimated_time: string;
  is_completed: boolean;
  situation: string;
  choices: ScenarioChoice[];
}

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  xp: number;
  unlocked: boolean;
}

interface UserDashboard {
  id: string;
  name: string;
  level: number;
  title: string;
  total_xp: number;
  xp_needed: number;
  next_level_target: number;
  streak: number;
  missions_completed: number;
  quizzes_completed: number;
  challenges_completed: number;
  badges_unlocked: number;
}

const LEVEL_TITLES_MAP: Record<number, string> = {
  1: "Beginner",
  2: "Aware",
  3: "Defender",
  4: "Digital Guardian",
  5: "Cyber Smart",
  6: "Threat Spotter",
  7: "Cyber Guardian",
  8: "Safety Strategist",
  9: "Cyber Sentinel",
  10: "CyberSaheli Champion"
};

export function LearningHub() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');

  // Live Backend / State Storage
  const [user, setUser] = useState<UserDashboard>({
    id: 'user_default',
    name: 'Anushka Jagtap',
    level: 1,
    title: 'Beginner',
    total_xp: 400,
    xp_needed: 100,
    next_level_target: 500,
    streak: 3,
    missions_completed: 1,
    quizzes_completed: 0,
    challenges_completed: 0,
    badges_unlocked: 3
  });

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<any>(null);

  // Active Interactive Mission State
  const [activeMission, setActiveMission] = useState<Scenario | null>(null);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [missionSubmitted, setMissionSubmitted] = useState<boolean>(false);
  const [missionRank, setMissionRank] = useState<'S' | 'A' | 'B' | 'C' | null>(null);

  // Daily Challenge State
  const [selectedDailyOpt, setSelectedDailyOpt] = useState<number | null>(null);
  const [dailySubmitted, setDailySubmitted] = useState<boolean>(false);

  // Floating XP Animation Banner State
  const [floatingXp, setFloatingXp] = useState<number | null>(null);

  // Fetch Live State from Python Backend (with Local Persistence Fallback)
  const fetchDashboardData = async () => {
    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:8000/api/v1/learning/dashboard');
      } catch (e) {
        res = await fetch('http://localhost:8000/api/v1/learning/dashboard');
      }
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {}
  };

  const fetchScenariosData = async () => {
    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:8000/api/v1/learning/scenarios');
      } catch (e) {
        res = await fetch('http://localhost:8000/api/v1/learning/scenarios');
      }
      const data = await res.json();
      if (data.scenarios) {
        setScenarios(data.scenarios);
      }
    } catch (err) {}
  };

  const fetchDailyChallengeData = async () => {
    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:8000/api/v1/learning/daily-challenge');
      } catch (e) {
        res = await fetch('http://localhost:8000/api/v1/learning/daily-challenge');
      }
      const data = await res.json();
      setDailyChallenge(data);
    } catch (err) {}
  };

  const fetchAchievementsData = async () => {
    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:8000/api/v1/learning/achievements');
      } catch (e) {
        res = await fetch('http://localhost:8000/api/v1/learning/achievements');
      }
      const data = await res.json();
      if (data.achievements) {
        setAchievements(data.achievements);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchDashboardData();
    fetchScenariosData();
    fetchDailyChallengeData();
    fetchAchievementsData();
  }, []);

  // Submit Mission Completion & Award Server XP
  const handleCompleteMission = async () => {
    if (!activeMission || selectedChoiceIdx === null) return;

    try {
      let res;
      try {
        res = await fetch(`http://127.0.0.1:8000/api/v1/learning/scenarios/${activeMission.id}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ choice_index: selectedChoiceIdx, time_taken_sec: 25 })
        });
      } catch (e) {
        res = await fetch(`http://localhost:8000/api/v1/learning/scenarios/${activeMission.id}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ choice_index: selectedChoiceIdx, time_taken_sec: 25 })
        });
      }

      const data = await res.json();
      setMissionSubmitted(true);
      setMissionRank(data.rank || 'S');

      if (data.xp_awarded > 0) {
        setFloatingXp(data.xp_awarded);
        setTimeout(() => setFloatingXp(null), 2500);
      }

      fetchDashboardData();
      fetchScenariosData();
      fetchAchievementsData();
    } catch (err) {}
  };

  // Submit Daily Challenge & Award Server XP
  const handleSubmitDailyChallenge = async () => {
    if (selectedDailyOpt === null) return;

    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:8000/api/v1/learning/daily-challenge/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selected_option: selectedDailyOpt })
        });
      } catch (e) {
        res = await fetch('http://localhost:8000/api/v1/learning/daily-challenge/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selected_option: selectedDailyOpt })
        });
      }

      const data = await res.json();
      setDailySubmitted(true);

      if (data.xp_gained > 0) {
        setFloatingXp(data.xp_gained);
        setTimeout(() => setFloatingXp(null), 2500);
      }

      fetchDashboardData();
      fetchDailyChallengeData();
    } catch (err) {}
  };

  const currentLevelXPProgress = Math.min(100, Math.round(((user.total_xp % 500) / 500) * 100));

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16 font-sans text-[#F5F7FA] selection:bg-[#4F8CFF] selection:text-white pb-32">
      
      {/* FLOATING XP GAIN NOTIFICATION */}
      <AnimatePresence>
        {floatingXp && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-8 right-8 z-50 px-6 py-4 rounded-2xl bg-[#4F8CFF] text-white font-mono font-bold text-sm shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <Zap className="h-5 w-5 text-yellow-300 animate-bounce" />
            <span>+{floatingXp} XP EARNED!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO & GAMIFIED USER PROGRESS HEADER */}
      <div className="p-8 sm:p-10 rounded-[36px] bg-gradient-to-r from-[#111317] via-[#171A20] to-[#0D0E14] border border-white/[0.09] space-y-8 shadow-2xl relative overflow-hidden">
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F8CFF]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.07] pb-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 text-[#4F8CFF] font-mono text-xs font-bold">
                CYBER QUEST &bull; LEVEL {user.level}
              </span>
              <span className="text-xs font-mono text-[#8B909B]">{user.title}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-mono pt-1">
              {user.name}
            </h1>
          </div>

          {/* Language Selector & Streak */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              <Globe className="h-4 w-4 text-[#4F8CFF]" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-[#111317]">EN</option>
                <option value="hi" className="bg-[#111317]">हिन्दी</option>
                <option value="mr" className="bg-[#111317]">मराठी</option>
              </select>
            </div>

            <div className="px-5 py-2.5 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center gap-2 text-xs font-mono font-bold text-[#EF4444]">
              <Flame className="h-4 w-4 text-[#EF4444] animate-pulse" />
              <span>🔥 {user.streak} DAY STREAK</span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Engine */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 font-mono">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center justify-between text-xs text-white">
              <span className="font-bold text-[#4F8CFF]">TOTAL XP: {user.total_xp} / {user.next_level_target} XP</span>
              <span className="text-[#8B909B]">{user.xp_needed} XP to Level {user.level + 1} ({LEVEL_TITLES_MAP[min(10, user.level + 1)]})</span>
            </div>

            <div className="w-full h-3.5 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/[0.08]">
              <div
                className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] rounded-full transition-all duration-500"
                style={{ width: `${currentLevelXPProgress}%` }}
              />
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">MISSIONS</span>
              <span className="text-white font-bold text-base">{user.missions_completed}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">BADGES</span>
              <span className="text-[#10b981] font-bold text-base">{user.badges_unlocked}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">MASTERY</span>
              <span className="text-[#4F8CFF] font-bold text-base">72%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S CYBER CHALLENGE (SERVER-VALIDATED DAILY DISPATCH) */}
      {dailyChallenge && (
        <div className="p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <h2 className="text-xl font-bold text-white font-mono uppercase">TODAY'S CYBER CHALLENGE</h2>
            </div>
            <span className="text-xs font-mono text-[#10b981] font-bold">+100 XP REWARD</span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-white leading-relaxed">{dailyChallenge.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {dailyChallenge.options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDailyOpt(idx)}
                  disabled={dailySubmitted}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedDailyOpt === idx
                      ? idx === dailyChallenge.correct_index
                        ? 'bg-[#10b981]/20 border-[#10b981] text-white font-bold'
                        : 'bg-[#EF4444]/20 border-[#EF4444] text-white font-bold'
                      : 'bg-white/[0.02] border-white/[0.06] text-[#8B909B] hover:text-white hover:border-[#4F8CFF]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selectedDailyOpt !== null && !dailySubmitted && (
              <button
                onClick={handleSubmitDailyChallenge}
                className="px-6 py-3 rounded-xl bg-[#4F8CFF] text-white font-mono font-bold text-xs hover:bg-[#3b82f6] shadow-lg"
              >
                Submit Answer
              </button>
            )}

            {dailySubmitted && (
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono space-y-2 animate-fade-in">
                <span className="text-[#10b981] font-bold block">✓ Challenge Completed (+100 XP)</span>
                <p className="text-[#8B909B] font-sans">{dailyChallenge.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. REAL-WORLD MISSIONS (INTERACTIVE THREAT SIMULATOR) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-mono uppercase">REAL-WORLD MISSIONS</h2>
            <p className="text-xs text-[#8B909B]">Interactive threat decision simulations. Earn XP and ranks.</p>
          </div>
          <span className="text-xs font-mono text-[#4F8CFF] font-bold">{scenarios.length} Missions Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => {
                setActiveMission(scenario);
                setSelectedChoiceIdx(null);
                setMissionSubmitted(false);
                setMissionRank(null);
              }}
              className="p-6 rounded-3xl bg-[#111317] border border-white/[0.08] hover:border-[#4F8CFF]/50 transition-all cursor-pointer space-y-4 shadow-xl group"
            >
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4F8CFF]/10 text-[#4F8CFF] font-bold">{scenario.topic}</span>
                {scenario.is_completed ? (
                  <span className="text-[#10b981] font-bold flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Solved</span>
                ) : (
                  <span className="text-[#8B909B]">{scenario.difficulty}</span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[#4F8CFF] transition-colors">{scenario.title}</h3>
                <p className="text-xs text-[#8B909B] leading-relaxed">{scenario.situation}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <span className="text-yellow-400 font-bold">+{scenario.reward_xp} XP</span>
                <span className="text-[#4F8CFF] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Start Mission <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CYBER SKILL TREE (INTERACTIVE BRANCH NODE MAP) */}
      <div className="p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white font-mono uppercase">CYBER SKILL TREE</h2>
            <p className="text-xs text-[#8B909B]">Unlock safety capabilities across 6 core protection domains.</p>
          </div>
          <span className="text-xs font-mono text-[#8B5CF6] font-bold">6 Branches</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono text-center">
          {[
            { branch: 'Personal Security', status: '✓ Unlocked', level: 'Lvl 4' },
            { branch: 'Financial Safety', status: '✓ Unlocked', level: 'Lvl 3' },
            { branch: 'Social Media', status: '✓ Unlocked', level: 'Lvl 2' },
            { branch: 'AI & Deepfakes', status: '● Active', level: 'Lvl 1' },
            { branch: 'Privacy Defense', status: '○ Locked', level: 'Lvl 0' },
            { branch: 'Emergency Response', status: '✓ Unlocked', level: 'Lvl 5' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border space-y-2 transition-all ${
                item.status.includes('Unlocked')
                  ? 'bg-white/[0.02] border-[#10b981]/40 text-white'
                  : item.status.includes('Active')
                  ? 'bg-[#111317] border-[#4F8CFF] text-white shadow-xl shadow-[#4F8CFF]/10'
                  : 'bg-white/[0.01] border-white/[0.04] text-[#8B909B]'
              }`}
            >
              <span className="text-lg font-bold block opacity-70">{item.level}</span>
              <h4 className="text-xs font-bold text-white font-sans">{item.branch}</h4>
              <span className="text-[10px] block font-bold text-[#10b981]">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ACHIEVEMENTS & BADGES SYSTEM */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-mono uppercase">BADGES &amp; ACHIEVEMENTS</h2>
            <p className="text-xs text-[#8B909B]">Milestone achievements unlocked by real safety progress.</p>
          </div>
          <span className="text-xs font-mono text-[#10b981] font-bold">{user.badges_unlocked} Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border space-y-2 font-mono text-xs transition-all ${
                ach.unlocked
                  ? 'bg-[#111317] border-[#10b981]/40 text-white shadow-xl shadow-[#10b981]/5'
                  : 'bg-white/[0.01] border-white/[0.04] text-[#8B909B] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{ach.icon}</span>
                {ach.unlocked ? (
                  <span className="text-[#10b981] font-bold">✓ UNLOCKED</span>
                ) : (
                  <Lock className="h-4 w-4 text-[#8B909B]" />
                )}
              </div>
              <h4 className="text-sm font-bold text-white font-sans pt-1">{ach.title}</h4>
              <p className="text-xs text-[#8B909B] leading-relaxed font-sans">{ach.desc}</p>
              <span className="text-yellow-400 font-bold block pt-1">+{ach.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: INTERACTIVE MISSION SIMULATOR */}
      <AnimatePresence>
        {activeMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-xl bg-[#111317] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase">{activeMission.topic}</span>
                  <h2 className="text-xl font-bold text-white">{activeMission.title}</h2>
                </div>
                <button onClick={() => setActiveMission(null)} className="p-2 rounded-xl bg-white/[0.04] text-[#8B909B] hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 font-mono text-xs">
                <span className="text-[#8B909B] uppercase font-bold block">SITUATION SIMULATION:</span>
                <p className="text-sm text-white font-sans leading-relaxed">{activeMission.situation}</p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-[#8B909B] uppercase font-bold block">WHAT DO YOU DO?</span>
                <div className="space-y-2 text-xs font-mono">
                  {activeMission.choices.map((choice, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setSelectedChoiceIdx(cIdx)}
                      disabled={missionSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left transition-all ${
                        selectedChoiceIdx === cIdx
                          ? choice.is_correct
                            ? 'bg-[#10b981]/20 border-[#10b981] text-white font-bold'
                            : 'bg-[#EF4444]/20 border-[#EF4444] text-white font-bold'
                          : 'bg-white/[0.02] border-white/[0.06] text-[#8B909B] hover:text-white hover:border-[#4F8CFF]'
                      }`}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </div>

              {selectedChoiceIdx !== null && !missionSubmitted && (
                <button
                  onClick={handleCompleteMission}
                  className="w-full py-3.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-mono font-bold hover:bg-[#3b82f6] shadow-lg"
                >
                  Submit Decision
                </button>
              )}

              {missionSubmitted && selectedChoiceIdx !== null && (
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="text-[#10b981] font-bold">MISSION COMPLETE &bull; RANK {missionRank}</span>
                    <span className="text-yellow-400 font-bold">+{activeMission.reward_xp} XP</span>
                  </div>
                  <p className="text-[#8B909B] font-sans">
                    {activeMission.choices[selectedChoiceIdx].explanation}
                  </p>
                  <button
                    onClick={() => {
                      setActiveMission(null);
                      const event = new CustomEvent('open-saheli', {
                        detail: { query: `Why is "${activeMission.choices[selectedChoiceIdx].text}" dangerous in ${activeMission.title}?` }
                      });
                      window.dispatchEvent(event);
                    }}
                    className="text-[#4F8CFF] font-bold hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    ✦ Ask Saheli why this was dangerous &rarr;
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function min(a: number, b: number): number {
  return a < b ? a : b;
}
