import React, { useEffect, useMemo, useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api, { playersAPI } from '../../services/api';

const VotePlayers = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [weekResults, setWeekResults] = useState([]);
  const [monthResults, setMonthResults] = useState([]);
  const [myWeekVote, setMyWeekVote] = useState(null);
  const [myMonthVote, setMyMonthVote] = useState(null);
  const [error, setError] = useState('');
  const [selectedWeekPlayerId, setSelectedWeekPlayerId] = useState('');
  const [selectedMonthPlayerId, setSelectedMonthPlayerId] = useState('');
  
  const playerOptions = useMemo(() => {
    // use results as option list, fallback empty
    const merge = (a, b) => {
      const map = new Map();
      [...a, ...b].forEach((p) => map.set(p.id, p));
      return [...map.values()];
    };
    return merge(weekResults || [], monthResults || []);
  }, [weekResults, monthResults]);

  const load = async () => {
    try {
      setLoading(true);
      setError('');

      const [weekRes, monthRes, myWeekRes, myMonthRes] = await Promise.all([
        api.get('/votes/results?type=week'),
        api.get('/votes/results?type=month'),
        api.get('/votes/my?type=week'),
        api.get('/votes/my?type=month'),
      ]);

      // Week leader + leaderboard
      setWeekResults(weekRes.data?.players || []);

      // Month: based on who the fans voted for during the week
      // Our backend currently stores votes separately for week/month,
      // but for UI intent we still show month results.
      // If you later want strict "month from week votes" logic, it should be done server-side.
      setMonthResults(monthRes.data?.players || []);

      setMyWeekVote(myWeekRes.data?.player_id ?? null);
      setMyMonthVote(myMonthRes.data?.player_id ?? null);

      // default selection
      const weekDefault = myWeekRes.data?.player_id ?? (weekRes.data?.players?.[0]?.id ?? '');
      const monthDefault = myMonthRes.data?.player_id ?? (monthRes.data?.players?.[0]?.id ?? '');
      setSelectedWeekPlayerId(String(weekDefault));
      setSelectedMonthPlayerId(String(monthDefault));
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to load voting');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const castVote = async (type) => {
    setError('');
    try {
      // Fan votes among all players.
      // For Player of the Week: vote_type = 'week'
      // For Player of the Month: vote_type = 'month'
      const player_id = type === 'week' ? selectedWeekPlayerId : selectedMonthPlayerId;
      if (!player_id) {
        setError('Select a player');
        return;
      }

      await api.post('/votes', { player_id, type });
      await load();
    } catch (e) {
      // backend returns 409 if already voted
      setError(e?.response?.data?.message || e.message || 'Failed to vote');
    }
  };

  const renderTop = (title, results, type, myVotedId, selectedId, onChange) => {
    const period = results?.period;

    const top = results?.[0];

    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-accent mr-2" />
            <h2 className="text-xl font-heading font-bold text-white">{title}</h2>
          </div>
          <div className="text-gray-400 text-sm">
            {type === 'week' ? 'This week' : 'This month'}
          </div>
        </div>

        <div className="mb-4">
          {top ? (
            <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg border border-gray-800">
              <div>
                <p className="text-gray-400 text-sm">Current leader</p>
                <p className="text-white font-bold">
                  {top.name} <span className="text-gray-500">(#{top.jersey_number})</span>
                </p>
                <p className="text-gray-400 text-sm mt-1">{top.vote_count} votes</p>
              </div>
              <button
                className="btn-outline flex items-center"
                onClick={() => {
                  onChange(String(top.id));
                }}
              >
                Vote leader <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ) : (
            <p className="text-gray-400">No players found.</p>
          )}
        </div>

        <label className="block text-gray-400 text-sm mb-2">Choose a player</label>
        <select
          className="w-full bg-surface-light border border-gray-700 rounded-lg p-3 text-white mb-4"
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          disabled={!!myVotedId}
        >
          {playerOptions.map((p) => (
            <option key={p.id} value={String(p.id)} className="bg-gray-900">
              {p.name} - #{p.jersey_number} ({p.position})
            </option>
          ))}
        </select>

        {myVotedId ? (
          <div className="text-center text-gray-400 text-sm">
            You already voted for this {type}.
          </div>
        ) : (
          <button className="btn-accent w-full" onClick={() => castVote(type)} disabled={loading}>
            Vote Now
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Fan Voting
          </h1>
          <p className="text-gray-300 mt-2">
            Vote for the <span className="text-accent font-bold">Player of the Week</span> and <span className="text-accent font-bold">Player of the Month</span>.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="card p-8 text-center text-gray-400">Loading voting...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderTop(
                'Player of the Week',
                weekResults,
                'week',
                myWeekVote,
                selectedWeekPlayerId,
                setSelectedWeekPlayerId
              )}
              {renderTop(
                'Player of the Month',
                monthResults,
                'month',
                myMonthVote,
                selectedMonthPlayerId,
                setSelectedMonthPlayerId
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VotePlayers;

