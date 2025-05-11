export default function getTweetTimeAgo(created_at: any): import("react").ReactNode {
    const now = new Date();
    const diffMs = now.getTime() - created_at.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays >= 1) {
        return `${diffDays}일 전`;
    } else if (diffHours >= 1) {
        return `${diffHours}시간 전`;
    } else {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes <= 0 ? '방금 전' : `${diffMinutes}분 전`;
    }
}