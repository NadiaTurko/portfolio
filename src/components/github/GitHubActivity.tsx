import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./github.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import { githubProfileUrl, githubUsername } from "../../data/github";
import { fetchGitHubActivity } from "../../services/githubService";
import type { GitHubActivity as Activity, GitHubDay } from "../../types";

const DAYS_IN_WEEK = 7;
const PLACEHOLDER_DAYS = Array.from({ length: 548 }, (_, index) => ({
  date: `placeholder-${index}`,
  count: 0,
  level: 0,
}));
const PLACEHOLDER_REPOS = [0, 1, 2, 3];

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const formatPushedAt = (isoDate: string): string => {
  const days = Math.round((new Date(isoDate).getTime() - Date.now()) / 86400000);
  if (days > -30) return relativeTime.format(days, "day");
  if (days > -365) return relativeTime.format(Math.round(days / 30), "month");
  return relativeTime.format(Math.round(days / 365), "year");
};

const periodFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const formatDate = (date: string): string =>
  periodFormat.format(new Date(`${date}T00:00:00`));

interface ContributionGraphProps {
  days: GitHubDay[];
  loaded: boolean;
}

const ContributionGraph = ({ days, loaded }: ContributionGraphProps) => {
  const firstWeekday = loaded ? new Date(`${days[0].date}T00:00:00`).getDay() : 0;
  const period = loaded
    ? `${formatDate(days[0].date)} – ${formatDate(days[days.length - 1].date)}`
    : "";

  return (
    <div className="github__year">
      <p className="github__period">{period || "\u00a0"}</p>
      <div className="github__graph" role="img" aria-label={`GitHub contributions ${period}`.trim()}>
        {days.map((day, index) => (
          <span
            key={day.date}
            className={`github__day github__day--${day.level}`}
            title={
              loaded
                ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                : undefined
            }
            style={
              {
                "--week": Math.floor((index + firstWeekday) / DAYS_IN_WEEK),
                gridRowStart: index === 0 ? firstWeekday + 1 : undefined,
              } as CSSProperties
            }
          ></span>
        ))}
      </div>
    </div>
  );
};

const GitHubActivity = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetchGitHubActivity()
      .then((result) => {
        if (!cancelled) setActivity(result);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // On narrow screens the graph scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (activity && scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, [activity]);

  // A portfolio shouldn't show a broken block when GitHub is unavailable.
  if (failed) return null;

  const days = activity?.days ?? PLACEHOLDER_DAYS;

  return (
    <section className="github section" id="github">
      <SectionHeader title="GitHub" subtitle="Live activity" />

      <div className="github__container container">
        <Reveal delay={100}>
          <div className="github__panel">
            <div className="github__header">
              <a
                href={githubProfileUrl}
                className="github__profile"
                target="_blank"
                rel="noreferrer"
              >
                <i className="uil uil-github-alt"></i>@{githubUsername}
              </a>
              {activity && (
                <span className="github__count">
                  {activity.total.toLocaleString("en-US")} contributions in the last 18 months ·{" "}
                  {activity.repoCount} public repositories
                </span>
              )}
            </div>

            <div ref={scrollerRef} className="github__scroller">
              <ContributionGraph days={days} loaded={!!activity} />
            </div>

            <div className="github__legend" aria-hidden="true">
              Less
              {[0, 1, 2, 3, 4].map((level) => (
                <span key={level} className={`github__day github__day--${level}`}></span>
              ))}
              More
            </div>
          </div>
        </Reveal>

        <div className="github__repos">
          {activity
            ? activity.repos.map((repo, index) => (
                <Reveal key={repo.name} delay={index * 80}>
                  <a
                    href={repo.url}
                    className="github__repo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="github__repo-name">{repo.name}</span>
                    <i className="bx bx-right-top-arrow-circle github__repo-arrow"></i>
                    <span className="github__repo-meta">
                      {repo.language && (
                        <span className="github__repo-language">{repo.language}</span>
                      )}
                      <span>{formatPushedAt(repo.pushedAt)}</span>
                    </span>
                  </a>
                </Reveal>
              ))
            : PLACEHOLDER_REPOS.map((key) => (
                <span key={key} className="github__repo github__repo--placeholder"></span>
              ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
