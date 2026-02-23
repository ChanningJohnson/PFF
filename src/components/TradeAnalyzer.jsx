import React, { useState } from 'react';
import { Plus, X, TrendingUp, TrendingDown } from 'lucide-react';

// ─── Player Database ──────────────────────────────────────────────────────────
const playerDatabase = {
  // Quarterbacks
  'Patrick Mahomes':   { pos: 'QB',  proj: 285, bye: 10, tier: 'Elite' },
  'Jalen Hurts':       { pos: 'QB',  proj: 275, bye: 14, tier: 'Elite' },
  'Josh Allen':        { pos: 'QB',  proj: 270, bye: 9,  tier: 'Elite' },
  'Lamar Jackson':     { pos: 'QB',  proj: 260, bye: 11, tier: 'Excellent' },
  'Joe Burrow':        { pos: 'QB',  proj: 248, bye: 12, tier: 'Excellent' },
  'Dak Prescott':      { pos: 'QB',  proj: 240, bye: 7,  tier: 'Great' },

  // Wide Receivers
  'Tyreek Hill':       { pos: 'WR',  proj: 178, bye: 6,  tier: 'Elite' },
  'Justin Jefferson':  { pos: 'WR',  proj: 172, bye: 13, tier: 'Elite' },
  "Ja'Marr Chase":     { pos: 'WR',  proj: 165, bye: 12, tier: 'Excellent' },
  'Stefon Diggs':      { pos: 'WR',  proj: 168, bye: 14, tier: 'Excellent' },
  'CeeDee Lamb':       { pos: 'WR',  proj: 162, bye: 7,  tier: 'Excellent' },
  'Davante Adams':     { pos: 'WR',  proj: 155, bye: 13, tier: 'Great' },
  'A.J. Brown':        { pos: 'WR',  proj: 152, bye: 14, tier: 'Great' },
  'Deebo Samuel':      { pos: 'WR',  proj: 140, bye: 9,  tier: 'Great' },
  'Amon-Ra St. Brown': { pos: 'WR',  proj: 138, bye: 15, tier: 'Great' },

  // Running Backs
  'Christian McCaffrey': { pos: 'RB', proj: 289, bye: 7,  tier: 'Elite' },
  'Josh Jacobs':          { pos: 'RB', proj: 198, bye: 10, tier: 'Excellent' },
  'Derrick Henry':        { pos: 'RB', proj: 195, bye: 11, tier: 'Excellent' },
  'Saquon Barkley':       { pos: 'RB', proj: 189, bye: 9,  tier: 'Excellent' },
  'Breece Hall':          { pos: 'RB', proj: 172, bye: 8,  tier: 'Great' },
  'Travis Etienne':       { pos: 'RB', proj: 168, bye: 12, tier: 'Great' },
  'Tony Pollard':         { pos: 'RB', proj: 155, bye: 7,  tier: 'Great' },
  'Rhamondre Stevenson':  { pos: 'RB', proj: 148, bye: 14, tier: 'Solid' },

  // Tight Ends
  'Travis Kelce':  { pos: 'TE', proj: 156, bye: 10, tier: 'Elite' },
  'Mark Andrews':  { pos: 'TE', proj: 142, bye: 11, tier: 'Excellent' },
  'T.J. Hockenson':{ pos: 'TE', proj: 130, bye: 13, tier: 'Great' },
  'Sam LaPorta':   { pos: 'TE', proj: 118, bye: 15, tier: 'Great' },
  'Dalton Kincaid':{ pos: 'TE', proj: 112, bye: 9,  tier: 'Solid' },

  // Defenses
  'San Francisco': { pos: 'DEF', proj: 118, bye: 9,  tier: 'Excellent' },
  'Buffalo':       { pos: 'DEF', proj: 112, bye: 9,  tier: 'Excellent' },
  'Baltimore':     { pos: 'DEF', proj: 108, bye: 11, tier: 'Great' },
  'Dallas':        { pos: 'DEF', proj: 104, bye: 7,  tier: 'Great' },
  'New England':   { pos: 'DEF', proj: 96,  bye: 14, tier: 'Solid' },
};

// ─── Tier Badge ───────────────────────────────────────────────────────────────
const tierColors = {
  Elite:     'bg-yellow-500 text-yellow-900',
  Excellent: 'bg-blue-500 text-white',
  Great:     'bg-green-500 text-white',
  Solid:     'bg-slate-500 text-white',
};

function TierBadge({ tier }) {
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${tierColors[tier] || 'bg-slate-600 text-white'}`}>
      {tier}
    </span>
  );
}

// ─── Player Card ──────────────────────────────────────────────────────────────
function PlayerCard({ name, score, onRemove }) {
  const player = playerDatabase[name];
  return (
    <div className="flex justify-between items-center bg-slate-700 hover:bg-slate-600 transition-colors p-3 rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-white font-semibold text-sm">{name}</p>
          <TierBadge tier={player.tier} />
        </div>
        <p className="text-slate-400 text-xs">
          {player.pos} &nbsp;·&nbsp; Proj: <span className="text-slate-200">{score.toFixed(1)}</span> pts &nbsp;·&nbsp; Bye: Wk {player.bye}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="ml-3 text-slate-500 hover:text-red-400 transition-colors"
        aria-label={`Remove ${name}`}
      >
        <X size={18} />
      </button>
    </div>
  );
}

// ─── Suggestion Bar ───────────────────────────────────────────────────────────
function SuggestionBar({ suggestions, team1Total, team2Total }) {
  const diff = Math.abs(team1Total - team2Total);
  const fair  = diff < 10 && team1Total > 0 && team2Total > 0;

  if (team1Total === 0 || team2Total === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6 text-slate-400 text-sm">
        Add players to both sides to see the trade analysis…
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 mb-6 border ${fair ? 'bg-green-900/60 border-green-700' : 'bg-yellow-900/60 border-yellow-700'}`}>
      <p className="text-white font-semibold text-base mb-1">
        {fair
          ? '✓ Fair Trade — both teams get comparable value'
          : team1Total > team2Total
            ? `⚠ Team 1 advantage by ${diff.toFixed(0)} pts — Team 2 is getting the better deal`
            : `⚠ Team 2 advantage by ${diff.toFixed(0)} pts — Team 1 is getting the better deal`}
      </p>
      {suggestions.map((s, i) => (
        <p key={i} className="text-slate-200 text-xs mt-1">• {s}</p>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TradeAnalyzer() {
  const [scoringType, setScoringType]   = useState('ppr');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [inputTeam1, setInputTeam1]     = useState('');
  const [inputTeam2, setInputTeam2]     = useState('');
  const [errorTeam1, setErrorTeam1]     = useState('');
  const [errorTeam2, setErrorTeam2]     = useState('');

  // ── Scoring multiplier ────────────────────────────────────────────────────
  const multiplier = scoringType === 'ppr' ? 1 : scoringType === 'half-ppr' ? 0.85 : 0.70;

  const scoreOf = (name) => (playerDatabase[name]?.proj ?? 0) * multiplier;

  const totalOf  = (players) => players.reduce((s, p) => s + scoreOf(p), 0);

  const team1Total = totalOf(team1Players);
  const team2Total = totalOf(team2Players);
  const difference = team1Total - team2Total;

  // ── Add / Remove ──────────────────────────────────────────────────────────
  const addPlayer = (team, raw) => {
    const setErr   = team === 1 ? setErrorTeam1 : setErrorTeam2;
    const players  = team === 1 ? team1Players  : team2Players;
    const setPlayers = team === 1 ? setTeam1Players : setTeam2Players;
    const setInput = team === 1 ? setInputTeam1 : setInputTeam2;

    const found = Object.keys(playerDatabase).find(
      (n) => n.toLowerCase() === raw.trim().toLowerCase()
    );

    if (!found) {
      setErr('Player not found — check the available list below.');
      return;
    }
    if (players.includes(found)) {
      setErr(`${found} is already in this trade.`);
      return;
    }

    setErr('');
    setPlayers([...players, found]);
    setInput('');
  };

  const removePlayer = (team, idx) => {
    if (team === 1) setTeam1Players(team1Players.filter((_, i) => i !== idx));
    else             setTeam2Players(team2Players.filter((_, i) => i !== idx));
  };

  // ── Positional breakdown ──────────────────────────────────────────────────
  const positionalBreakdown = (players) => {
    const counts = {};
    players.forEach((p) => {
      const pos = playerDatabase[p].pos;
      counts[pos] = (counts[pos] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([pos, n]) => `${pos}×${n}`)
      .join('  ');
  };

  // ── Bye-week conflicts ────────────────────────────────────────────────────
  const byeConflicts = (players) => {
    const byes = players.map((p) => playerDatabase[p].bye);
    const seen = new Set();
    const dupes = new Set();
    byes.forEach((b) => (seen.has(b) ? dupes.add(b) : seen.add(b)));
    return [...dupes];
  };

  // ── Smart suggestions ─────────────────────────────────────────────────────
  const getSuggestions = () => {
    const tips = [];
    if (team1Total === 0 || team2Total === 0) return tips;

    if (Math.abs(difference) > 20) {
      const loser = difference > 0 ? 'Team 2' : 'Team 1';
      tips.push(`${loser} could add a mid-tier WR or RB to even the value.`);
    }

    const t1Bye = byeConflicts(team1Players);
    const t2Bye = byeConflicts(team2Players);
    if (t1Bye.length) tips.push(`Team 1 has bye-week stacks on week(s): ${t1Bye.join(', ')}.`);
    if (t2Bye.length) tips.push(`Team 2 has bye-week stacks on week(s): ${t2Bye.join(', ')}.`);

    if (!tips.length) tips.push('Trade structure looks balanced!');
    return tips;
  };

  // ── Shared player input component ─────────────────────────────────────────
  const PlayerInput = ({ team }) => {
    const isTeam1  = team === 1;
    const input    = isTeam1 ? inputTeam1   : inputTeam2;
    const setInput = isTeam1 ? setInputTeam1 : setInputTeam2;
    const error    = isTeam1 ? errorTeam1   : errorTeam2;
    const accent   = isTeam1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700';

    return (
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); (isTeam1 ? setErrorTeam1 : setErrorTeam2)(''); }}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer(team, input)}
            placeholder="Type a player name…"
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 placeholder-slate-500 text-sm focus:outline-none focus:border-slate-400"
            list="playerList"
          />
          <button
            onClick={() => addPlayer(team, input)}
            className={`${accent} text-white px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors`}
          >
            <Plus size={16} /> Add
          </button>
        </div>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      {/* Global datalist */}
      <datalist id="playerList">
        {Object.keys(playerDatabase).map((n) => <option key={n} value={n} />)}
      </datalist>

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Trade Analyzer
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Evaluate fantasy trades and get smart recommendations</p>
        </div>

        {/* ── Scoring Format ── */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700 flex flex-wrap items-center gap-6">
          <span className="text-white font-semibold text-sm">Scoring Format</span>
          {[
            { value: 'ppr',      label: 'PPR' },
            { value: 'half-ppr', label: 'Half-PPR' },
            { value: 'standard', label: 'Standard' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={value}
                checked={scoringType === value}
                onChange={() => setScoringType(value)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-white text-sm">{label}</span>
            </label>
          ))}
        </div>

        {/* ── Suggestion Bar ── */}
        <SuggestionBar
          suggestions={getSuggestions()}
          team1Total={team1Total}
          team2Total={team2Total}
        />

        {/* ── Trade Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Team 1 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-blue-400 mb-5">Team 1 Gives</h2>
            <PlayerInput team={1} />
            <div className="space-y-2 min-h-[60px] mb-4">
              {team1Players.length === 0
                ? <p className="text-slate-600 text-sm italic">No players added yet</p>
                : team1Players.map((p, i) => (
                    <PlayerCard
                      key={p + i}
                      name={p}
                      score={scoreOf(p)}
                      onRemove={() => removePlayer(1, i)}
                    />
                  ))
              }
            </div>
            {team1Players.length > 0 && (
              <div className="bg-blue-950 border border-blue-800 rounded-lg p-4 mt-2">
                <p className="text-slate-400 text-xs mb-1 font-mono">{positionalBreakdown(team1Players)}</p>
                <p className="text-blue-300 text-2xl font-bold">{team1Total.toFixed(1)} pts</p>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-red-400 mb-5">Team 2 Gets</h2>
            <PlayerInput team={2} />
            <div className="space-y-2 min-h-[60px] mb-4">
              {team2Players.length === 0
                ? <p className="text-slate-600 text-sm italic">No players added yet</p>
                : team2Players.map((p, i) => (
                    <PlayerCard
                      key={p + i}
                      name={p}
                      score={scoreOf(p)}
                      onRemove={() => removePlayer(2, i)}
                    />
                  ))
              }
            </div>
            {team2Players.length > 0 && (
              <div className="bg-red-950 border border-red-800 rounded-lg p-4 mt-2">
                <p className="text-slate-400 text-xs mb-1 font-mono">{positionalBreakdown(team2Players)}</p>
                <p className="text-red-300 text-2xl font-bold">{team2Total.toFixed(1)} pts</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Comparison Bar ── */}
        {team1Total > 0 && team2Total > 0 && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
            <h3 className="text-white font-bold text-lg mb-4">Trade Breakdown</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-xs mb-2">Team 1 Value</p>
                <p className={`text-2xl font-bold ${team1Total >= team2Total ? 'text-blue-400' : 'text-slate-300'}`}>
                  {team1Total.toFixed(1)}
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-xs mb-2">Difference</p>
                <p className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                  Math.abs(difference) < 10
                    ? 'text-green-400'
                    : difference > 0
                      ? 'text-blue-400'
                      : 'text-red-400'
                }`}>
                  {difference >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  {Math.abs(difference).toFixed(1)}
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-xs mb-2">Team 2 Value</p>
                <p className={`text-2xl font-bold ${team2Total >= team1Total ? 'text-red-400' : 'text-slate-300'}`}>
                  {team2Total.toFixed(1)}
                </p>
              </div>
            </div>

            {/* Simple value bar */}
            <div className="mt-4">
              <div className="flex rounded-full overflow-hidden h-3 bg-slate-700">
                <div
                  className="bg-blue-500 transition-all duration-500"
                  style={{ width: `${(team1Total / (team1Total + team2Total)) * 100}%` }}
                />
                <div className="bg-red-500 flex-1" />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Team 1</span>
                <span>Team 2</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Available Players ── */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-bold text-base mb-3">Available Players</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(playerDatabase).map(([name, data]) => (
              <span
                key={name}
                className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full border border-slate-600"
              >
                {name} <span className="text-slate-500">({data.pos})</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
