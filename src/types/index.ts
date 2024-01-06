interface Screenshot {
    id: number;
    image: string;
}

export type Game = {
	id: number
	title: string
	thumbnail: string
	short_description: string
	description: string
	game_url: string
	genre: string
	platform: string
	publisher: string
	developer: string
	release_date: string
	freetogame_profile_url: string
	screenshots: Screenshot[]
	minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    }
}