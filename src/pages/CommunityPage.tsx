import React, { useState } from 'react';
import {
  Share2,
  Trophy,
  Users,
  Target,
  Sparkles,
  Heart,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Medal,
} from 'lucide-react';
import {
  COMMUNITY_CHALLENGES,
  LEADERBOARD_MEMBERS,
  COMMUNITY_POSTS,
  ENVIRONMENTAL_AWARENESS_TIPS,
  CleanAirChallenge,
  CommunityPost,
} from '../data/challenges';
import { useFamilyProfile } from '../context/FamilyProfileContext';

export const CommunityPage: React.FC = () => {
  const { profile } = useFamilyProfile();

  const [challenges, setChallenges] = useState<CleanAirChallenge[]>(COMMUNITY_CHALLENGES);
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);

  const toggleJoinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const joinedState = !ch.joined;
          return {
            ...ch,
            joined: joinedState,
            participantsCount: joinedState ? ch.participantsCount + 1 : ch.participantsCount - 1,
          };
        }
        return ch;
      })
    );
  };

  const toggleCheer = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            userCheered: !p.userCheered,
            cheersCount: p.userCheered ? p.cheersCount - 1 : p.cheersCount + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Collective Clean-Air Movement</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            BreatheWise Community Hub
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            Smog is an airshed problem that transcends individual walls. Join neighborhood challenges,
            compete on clean-transit leaderboards, and support community smog reduction in {profile.city}.
          </p>
        </div>
      </div>

      {/* Community Goal Progress Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              City-Wide Winter Target: Avoid 25,000 kg CO2e
            </h3>
            <p className="text-xs text-slate-500">
              Across 4,400+ participating households in {profile.city}
            </p>
          </div>
        </div>

        <div className="w-full md:w-72 flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Community Achievement</span>
            <span className="text-emerald-700">18,450 kg (74%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full w-3/4" />
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Challenges & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Clean-Air Challenges (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span>Active Clean-Air Challenges</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {challenges.filter((c) => c.joined).length} Joined
            </span>
          </div>

          <div className="space-y-4">
            {challenges.map((ch) => (
              <div
                key={ch.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {ch.badgeAward}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{ch.duration}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">{ch.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleJoinChallenge(ch.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shrink-0 ${
                      ch.joined
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {ch.joined ? 'Joined ✓' : 'Join Challenge'}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{ch.description}</p>

                {/* Progress */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
                    <span>
                      <strong className="text-slate-800">{ch.participantsCount}</strong> community members
                    </span>
                    <span>{ch.progressPercent}% Goal Reached</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${ch.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neighborhood Leaderboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Medal className="w-4 h-4 text-amber-500" />
              <span>Clean Air Champions</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">Weekly Points</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm divide-y divide-slate-100">
            {LEADERBOARD_MEMBERS.map((member) => (
              <div key={member.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      member.rank === 1
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : member.rank === 2
                        ? 'bg-slate-200 text-slate-800'
                        : member.rank === 3
                        ? 'bg-orange-100 text-orange-800'
                        : 'text-slate-500'
                    }`}
                  >
                    #{member.rank}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{member.name}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">{member.neighborhood}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-700 block">
                    {member.points.toLocaleString()} pts
                  </span>
                  <span className="text-[10px] text-slate-400">-{member.co2SavedKg} kg CO2</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Activity Cards (Cheers Feed) */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-teal-600" />
          <span>Community Clean-Air Feed</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center ${post.avatarBg}`}
                    >
                      {post.author.slice(0, 1)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{post.author}</span>
                      <span className="text-[10px] text-slate-400">
                        {post.neighborhood} • {post.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    -{post.co2Saved}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-3">"{post.actionTaken}"</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                <span className="text-slate-400 text-[11px]">Clean air action verified</span>
                <button
                  onClick={() => toggleCheer(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    post.userCheered
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.userCheered ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{post.cheersCount} Cheers</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Awareness Tips */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Environmental Science & Smog Awareness</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENVIRONMENTAL_AWARENESS_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-700 mb-1">
                  <span>{tip.tag}</span>
                  <span className="text-slate-400">{tip.readTime}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-800 mb-1">{tip.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.summary}</p>
              </div>

              <span className="mt-3 pt-2 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <span>Scientific insight</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

