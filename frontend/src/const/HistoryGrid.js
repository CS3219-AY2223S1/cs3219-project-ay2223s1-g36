import { formatDate } from '../utils/history';

export const qnHistoryCols = [
  { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'ques_title',
    headerName: 'Question Title',
    flex: 3
  },
  { field: 'difficulty', headerName: 'Difficulty Level', flex: 2 },
  { field: 'language', headerName: 'Language', flex: 2 },
  {
    field: 'partner',
    headerName: 'Match',
    flex: 2,
    valueFormatter: (params) => {
      return params.value != null ? `@${params.value}` : '';
    }
  },
  {
    field: 'createdAt',
    headerName: 'Date of Attempt',
    flex: 3,
    valueFormatter: (params) => {
      return params.value != null ? `${formatDate(params.value)}` : '';
    }
  }
];
