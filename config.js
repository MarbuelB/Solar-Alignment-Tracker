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
                { name: "East", azimuth: 90.00 },
				{ name: "South", azimuth: 180.00 },
                { name: "West", azimuth: 270.00 }
            ]
        },
        "arc": {
            name: "Arc de Triomphe, Paris",
            lat: 48.8737866,
            lng: 2.2950245,
            targets: [
                { name: "Av des Champs-Élysées", azimuth: 115.89 },
				{ name: "Av Kléber", azimuth: 205.54 },
                { name: "Av Foch", azimuth: 260.75 }
            ]
        },
        "times": {
            name: "Times Square, New York",
            lat: 40.7579558,
            lng: -73.9855492,
            targets: [
                { name: "W 45th St.", azimuth: 119.12 },
				{ name: "7th Ave", azimuth: 208.83 }
            ]
        },
        "bos": {
            name: "Logan International Airport, Boston",
            lat: 42.3598735,
            lng: -71.0038419,
            targets: [
                { name: "15R", azimuth: 135.27 },
				{ name: "22L", azimuth: 199.68 },
                { name: "27", azimuth: 256.54 }
            ]
        }
    }
};