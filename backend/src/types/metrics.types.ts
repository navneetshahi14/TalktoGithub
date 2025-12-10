export interface WeeklyCommitPoint {
    weekStart: string;
    totalCommits: number;
}

export  interface WeeklyCodeFreqPoint {
    weekStart: string;
    additions: number;
    deletions: number;
}

export interface TopContributor {
    login: string;
    avatarUrl: string | null;
}