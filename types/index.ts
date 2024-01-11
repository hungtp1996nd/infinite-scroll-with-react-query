type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type InfoCharacters = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
};

type ResultsCharacter = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

type ResponseCharacters = {
  info: InfoCharacters;
  results: ResultsCharacter[];
};
