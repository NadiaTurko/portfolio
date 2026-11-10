import { githubUsername } from "../data/github";
import type { GitHubActivity, GitHubRepo } from "../types";

const CACHE_KEY = "github-activity-v4";
const FEATURED_REPOS = 4;
const DAYS_SHOWN = 548;
const PERIOD_MS = DAYS_SHOWN * 24 * 60 * 60 * 1000;

interface GitHubRepoResponse {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

interface ContributionsResponse {
  contributions: { date: string; count: number; level: number }[];
}

const isFeatured = (repo: GitHubRepoResponse): boolean =>
  !repo.fork &&
  Date.now() - new Date(repo.pushed_at).getTime() < PERIOD_MS &&
  repo.name.toLowerCase() !== githubUsername.toLowerCase() &&
  !/test/i.test(repo.name);

const toRepo = (repo: GitHubRepoResponse): GitHubRepo => ({
  name: repo.name,
  url: repo.html_url,
  language: repo.language,
  pushedAt: repo.pushed_at,
});

const readCache = (): GitHubActivity | null => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? (JSON.parse(cached) as GitHubActivity) : null;
  } catch {
    return null;
  }
};

const writeCache = (activity: GitHubActivity): void => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(activity));
  } catch {
    // Storage can be blocked; the data just gets fetched again next visit.
  }
};

const getJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
};

/** Caches per session because GitHub allows only 60 anonymous requests an hour. */
export const fetchGitHubActivity = async (): Promise<GitHubActivity> => {
  const cached = readCache();
  if (cached) return cached;

  const [repos, contributions] = await Promise.all([
    getJson<GitHubRepoResponse[]>(
      `https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=100`
    ),
    getJson<ContributionsResponse>(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=all`
    ),
  ]);

  // The API returns every year, newest first, including the rest of the current year.
  const today = new Date().toISOString().slice(0, 10);
  const days = contributions.contributions
    .filter((day) => day.date <= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-DAYS_SHOWN);

  const activity: GitHubActivity = {
    repoCount: repos.length,
    total: days.reduce((sum, day) => sum + day.count, 0),
    repos: repos.filter(isFeatured).slice(0, FEATURED_REPOS).map(toRepo),
    days,
  };

  writeCache(activity);
  return activity;
};
