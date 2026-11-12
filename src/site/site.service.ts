import { findMember, listReviews, listTeam } from "./demo";
import { buildReviewSummary, pickReviews } from "./site.utils";

export function getTeam() {
  return listTeam();
}

export function getHome() {
  const team = listTeam();
  const reviews = listReviews();
  const names = new Map(team.map((member) => [member.id, member.name]));
  return {
    team,
    summary: buildReviewSummary(reviews),
    reviews: pickReviews(reviews, names, 8),
  };
}

export function getProfile(id: string) {
  const member = findMember(id);
  if (!member) return null;
  const own = listReviews().filter((review) => review.professionalId === id);
  return {
    member,
    summary: buildReviewSummary(own),
    reviews: pickReviews(own, new Map(), 6),
    others: listTeam()
      .filter((item) => item.id !== id)
      .slice(0, 3),
  };
}
