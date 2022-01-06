export interface IsbnBook {
    book: {
        publisher: string;
        language: string;
        image: string;
        synopsys: string;
        title_long: string;
        edition: string;
        dimensions: string;
        pages: number;
        date_published: Date;
        authors: string[];
        title: string;
        isbn13: string;
        msrp: string;
        binding: string;
        isbn: string;
    }
}
