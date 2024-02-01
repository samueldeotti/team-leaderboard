import { Matches } from '../Interfaces/MatchesType';

const totalPoints = (wins: number, drawns: number) => (wins * 3) + (drawns * 1);

const allGames = (matches:Matches[], id: number) => matches
  .filter((match) => match.homeTeamId === id || match.awayTeamId === id).length;

const totalWins = (totalGames: Matches[], id: number) => totalGames.filter((match) => {
  if (match.homeTeamId === id) {
    return match.homeTeamGoals > match.awayTeamGoals;
  }
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
  const totalGames = allGames(matches, id);

  return {
    totalPoints: totalPoints(totalWins(matches, id), totalTies(matches)),
    totalGames,
    totalVictories: totalWins(matches, id),
    totalDraws: totalTies(matches),
    totalLosses: totalLosts(totalGames, totalWins(matches, id), totalTies(matches)),
    goalsFavor: goalsMade(matches, id),
    goalsOwn: goalsTaken(matches, id),
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
