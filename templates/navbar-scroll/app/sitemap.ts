interface SitemapEntry {
    url: string;
    lastModified: Date;
    changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly' | 'always';
    priority: number;
}

export default function sitemap(): SitemapEntry[] {
    return [
        {
            url: 'https://www.capitalcitystaging.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
