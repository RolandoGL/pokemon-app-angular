export interface Result {
    count:    number;
    next:     string;
    previous: null;
    results: [
        {
            name:string;
            url:string;
        }
    ];
}

export interface Pokemon {
    abilities: any[];
    base_experience: number;
    cries: {};
    forms: any[];
    game_indices: any[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: any[];
    species: {
        name: string;
        url: string;
    };// de aqui la descripcion xd
    sprites: Sprites;//imagen
    stats: Stat[];
    types: Type[];
    weight: number;
}

export interface Sprites {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other?: {
        dream_world: {
            front_default: string;
            front_female: null;
        };
        home: any;
        "official-artwork": {};
        showdown: any;
    };
    versions?: any;
    animated?: any;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}