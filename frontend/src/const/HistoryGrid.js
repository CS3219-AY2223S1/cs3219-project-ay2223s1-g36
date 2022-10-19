// TODO: move this to const once table structure is confirmed with YB
export const qnHistoryCols = [
  { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'qnTitle',
    headerName: 'Question Title',
    flex: 3
  },
  { field: 'diffLevel', headerName: 'Difficulty Level', flex: 1 },
  { field: 'language', headerName: 'Language', flex: 1 },
  {
    field: 'userMatch',
    headerName: 'Match',
    flex: 1,
    valueFormatter: (params) => {
      return params.value != null ? `@${params.value}` : '';
    }
  },
  { field: 'dateAttempt', headerName: 'Date of Attempt', flex: 1 }
];

export const rows = [
  {
    id: 1,
    qid: 1,
    qnTitle: 'Roman to Integer',
    diffLevel: 1,
    language: 'Python',
    userMatch: 'xoxo'
  },
  {
    id: 2,
    qid: 4,
    qnTitle: 'Merge Two Sorted Lists',
    diffLevel: 1,
    language: 'Python',
    userMatch: 'yuan'
  },
  { id: 3, qid: 57, qnTitle: 'Nim Game', diffLevel: 1, language: 'Python', userMatch: 'yuan' },
  {
    id: 4,
    qid: 109,
    qnTitle: 'Subtree of Another Tree',
    diffLevel: 1,
    language: 'C',
    userMatch: 'new'
  },
  {
    id: 5,
    qid: 1368,
    qnTitle: 'Count Lattice Points Inside a Circle',
    diffLevel: 2,
    language: 'Python',
    userMatch: 'hello'
  },
  { id: 6, qid: 1655, qnTitle: 'Jump Game IV', diffLevel: 3, language: 'C++', userMatch: 'cookie' },
  {
    id: 7,
    qid: 1733,
    qnTitle: 'Building Boxes',
    diffLevel: 3,
    language: 'Javascript',
    userMatch: 'kiwi'
  },
  {
    id: 8,
    qid: 557,
    qnTitle: 'Binary Search Tree Iterator',
    diffLevel: 2,
    language: 'Javascript',
    userMatch: 'zoey'
  },
  {
    id: 9,
    qid: 202,
    qnTitle: 'Divisor Game',
    diffLevel: 1,
    language: 'C#',
    userMatch: '__someuser__'
  },
  {
    id: 10,
    qid: 1017,
    qnTitle: 'Print Words Vertically',
    diffLevel: 2,
    language: 'Python',
    userMatch: 'xoxo'
  },
  {
    id: 11,
    qid: 1491,
    qnTitle: 'Patching Array',
    diffLevel: 3,
    language: 'Javascript',
    userMatch: 'cookie'
  }
];
