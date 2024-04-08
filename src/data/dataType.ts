type Paper = {
  paperId: string;
  url: string;
  title: string;
  abstract: string | null;
  tldr: {
    model: string;
    text: string;
  };
  authors: {
    authorId: string;
    name: string;
  }[];
};

export default Paper;
