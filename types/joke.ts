export type JokeType =
  | 'general'
  | 'programming'
  | 'knock-knock';

export interface Joke {
  id: number;
  type: JokeType;
  setup: string;
  punchline: string;
}
