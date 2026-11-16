// How the lessons under /learn/ are grouped and ordered: by the hub, by the
// breadcrumb and by the previous/next links of a lesson page.

/** A lesson's section is the first segment of its id; a lesson without one is a concept lesson. */
export const SECTIONS = [
  {id: 'basics', title: 'Basics', intro: 'What an RTOS is, and the ideas every other lesson builds on. Start here if real-time kernels are new to you.'},
  {id: '', title: 'Concepts', intro: 'What a real-time kernel does, on any RTOS. Each lesson runs on the kernels you can switch between.'},
  {id: 'freertos', title: 'FreeRTOS', intro: 'How FreeRTOS does it, in its own source code.'},
  {id: 'zephyr', title: 'Zephyr', intro: 'How Zephyr does it, in its own source code.'},
  {id: 'glossary', title: 'Glossary', intro: 'The terms the lessons use.'},
] as const;

/** First path segments with a meaning of their own under /learn/: not usable as a concept lesson's slug. */
export const RESERVED = ['basics', 'freertos', 'zephyr', 'playground', 'glossary', 'licenses'];

interface LessonLike {
  id: string;
  data: {title: string; order?: number};
}

export function sectionOf(id: string): (typeof SECTIONS)[number] {
  const first = id.includes('/') ? id.split('/')[0] : '';
  const section = SECTIONS.find(s => s.id === first);
  if (!section) throw new Error(`Lesson "${id}.md": there is no section "${first}" under /learn/.`);
  return section;
}

/** Section by section; inside a section by `order`, then by title (the glossary has no `order`: it is alphabetical). */
export function sortLessons<T extends LessonLike>(lessons: T[]): T[] {
  const rank = (l: T) => SECTIONS.indexOf(sectionOf(l.id));
  return [...lessons].sort((a, b) =>
    rank(a) - rank(b)
    || (a.data.order ?? Infinity) - (b.data.order ?? Infinity)
    || a.data.title.localeCompare(b.data.title));
}

/**
 * The lessons before and after `id`. The lessons are one sequence; the
 * glossary is a list of its own, so its pages only link to each other.
 */
export function neighbours<T extends LessonLike>(lessons: T[], id: string): {prev?: T; next?: T} {
  const glossary = (l: T) => sectionOf(l.id).id === 'glossary';
  const here = lessons.find(l => l.id === id);
  if (!here) return {};
  const track = sortLessons(lessons).filter(l => glossary(l) === glossary(here));
  const at = track.indexOf(here);
  return {prev: track[at - 1], next: track[at + 1]};
}
