// Global Configuration Profiles for the Solar Alignment Tracker
// Define custom targets. The app dynamically builds tables and visuals for these.

window.SOLAR_CONFIG = {
	precisionMinutes: 1, // Calculate by interpolation of the sun's position every 1 minute (Decimal numbers like 0.5 are allowed!)
    defaultLocationId: "biozentrum",
    locations: {
        "biozentrum": {
            name: "Biozentrum, Basel",
            lat: 47.564292,
            lng: 7.580731,
            targets: [
                { name: "SE", azimuth: 139.046 },
                { name: "SW", azimuth: 229.046 },
            ]
        },
        "greenwich": {
            name: "Royal Observatory, Greenwich",
            lat: 51.477928,
            lng: -0.001545,
            targets: [
                { name: "East", azimuth: 90.000 },
				{ name: "South", azimuth: 180.000 },
                { name: "West", azimuth: 270.000 }
            ]
        }
    }
};