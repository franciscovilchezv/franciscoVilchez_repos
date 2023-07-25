export enum REPOSITORY_STATE {
  'ENABLE' = 'E',
  'DISABLE' = 'D',
  'ARCHIVED' = 'A',
}

export const TRIBE_REPOSITORY_STATE: {
  [key in REPOSITORY_STATE]?: string;
} = {
  E: 'Habilitado',
  A: 'Archivado',
  D: 'Deshabilitado',
};
