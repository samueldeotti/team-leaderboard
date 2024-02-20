import { Matches } from '../Interfaces/Match/MatchesType';

const totalPoints = (wins: number, drawns: number) => (wins * 3) + (drawns * 1);

const allGames = (matches:Matches[]) => matches.length;

const totalWins = (totalGames: Matches[], id: number) => totalGames.filter((match) => {
  if (match.homeTeamId === id) return match.homeTeamGoals > match.awayTeamGoals;
  return match.awayTeamGoals > match.homeTeamGoals;
}).length;

const totalTies = (totalGames: Matches[]) => totalGames
  .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;

const totalLosts = (games: number, wins: number, drawns: number) => games - (wins + drawns);

const goalsMade = (matches: Matches[], id: number) =>
  matches.reduce((acc, match) => (match.homeTeamId === id
    ? acc + match.homeTeamGoals : acc + match.awayTeamGoals), 0);

const goalsTaken = (matches: Matches[], id: number) =>
  matches.reduce((acc, match) => (match.homeTeamId === id
    ? acc + match.awayTeamGoals : acc + match.homeTeamGoals), 0);

const getAllInfo = (matches: Matches[], id: number) => {
  const totalGames = allGames(matches);
  const wins = totalWins(matches, id);
  const ties = totalTies(matches);

  return {
    totalPoints: totalPoints(wins, ties),
    totalGames,
    totalVictories: wins,
    totalDraws: ties,
    totalLosses: totalLosts(totalGames, wins, ties),
    goalsFavor: goalsMade(matches, id),
    goalsOwn: goalsTaken(matches, id),
    goalsBalance: goalsMade(matches, id) - goalsTaken(matches, id),
    efficiency: ((totalPoints(wins, ties) / (totalGames * 3)) * 100).toFixed(2),
  };
};

export {
  totalPoints,
  allGames,
  totalWins,
  totalTies,
  totalLosts,
  goalsMade,
  goalsTaken,
  getAllInfo,
};
