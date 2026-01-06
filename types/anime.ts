type AnimeImageFormat = {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
};

type AnimeImages = {
	jpg: AnimeImageFormat;
	webp?: AnimeImageFormat;
};

export type Anime = {
	mal_id: number;
	title: string;
	images: AnimeImages;
	genres: { name: string }[];
	score: number;
	year: number;
	season: string;
	rank: number;
	episodes: number;
};
