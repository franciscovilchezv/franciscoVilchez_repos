export interface IDiskPersistance {
  persistData(data: string): Promise<string>;
}
