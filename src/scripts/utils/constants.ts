const colorPalettes: Record<string, string> = {
    'drifting-away': 'https://coolors.co/516760-252d29-c5fbdc-69c9ab-1b4b3c',
    'sunny-days': 'https://coolors.co/fdc500-ffd500-00296b-003f88-00509d',
    'violet-beauregarde': 'https://coolors.co/9b5de5-8b008b-89cff0-6050dc-00009c',
    'ocean-spray': 'https://coolors.co/5c6f68-8aa39b-95d9c3-a4f9c8-a7fff6',
    'pastel-dream': 'https://coolors.co/palette/2c6e49-4c956c-fefee3-ffc9b9-d68c45',
    'retro-wave': 'https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4',
    'heating-up': 'https://coolors.co/palette/8c2f39-b23a48-fcb9b2-fed0bb-461220',
    'cool-blue': 'https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8',
};

const svgIcons: Record<string, string> = {
    'amoeba-circle': '530663/protein',
    'rocket-cloud': '530455/cloud-acceleration',
    'dolphin-splash': '530107/ocean',
    'drink-time': '530355/soda-water',
    'bikini-daydream:': '530608/swimsuit',
    'icicle-drips': '532058/icicles',
    'calc-nerd': '530644/calculator',
    'analyze-charts': '530450/page-analysis',
};

const colorOrderChoices = [
    {
        name: 'primary, primary_dark, secondary, secondary_light, secondary_dark',
        value: ['primary', 'primary_dark', 'secondary', 'secondary_light', 'secondary_dark'],
    },
    {
        name: 'primary, secondary, primary_dark, secondary_light, secondary_dark',
        value: ['primary', 'secondary', 'primary_dark', 'secondary_light', 'secondary_dark'],
    },
    {
        name: 'secondary, primary, primary_dark, secondary_light, secondary_dark',
        value: ['secondary', 'primary', 'primary_dark', 'secondary_light', 'secondary_dark'],
    },
    {
        name: 'secondary, primary, secondary_light, primary_dark, secondary_dark',
        value: ['secondary', 'primary', 'secondary_light', 'primary_dark', 'secondary_dark'],
    },
    {
        name: 'primary_dark, primary, secondary_light, secondary, secondary_dark',
        value: ['primary_dark', 'primary', 'secondary_light', 'secondary', 'secondary_dark'],
    },
    {
        name: 'primary_dark, secondary_light, primary, secondary, secondary_dark',
        value: ['primary_dark', 'secondary_light', 'primary', 'secondary', 'secondary_dark'],
    },
    {
        name: 'secondary_light, primary, primary_dark, secondary, secondary_dark',
        value: ['secondary_light', 'primary', 'primary_dark', 'secondary', 'secondary_dark'],
    },
    {
        name: 'secondary_light, primary_dark, primary, secondary, secondary_dark',
        value: ['secondary_light', 'primary_dark', 'primary', 'secondary', 'secondary_dark'],
    },
];

export { colorPalettes, svgIcons, colorOrderChoices };
