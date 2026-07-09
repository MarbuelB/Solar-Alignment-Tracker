# Solar Alignment Tracker

A lightweight, zero-backend web application for tracking, calculating, and forecasting the exact local times when the sun intersects specific, user-defined compass azimuth paths. 

Originally built to calculate solar geometry, this tool has been completely generalized into a universal **Solar Alignment Tracker (SAT)**. It is designed to be highly portable and perfectly optimized for embedding seamlessly into corporate intranets or Confluence wikis using iFrames.

---

## 🚀 Key Features

* **Instant Client-Side Calculations:** No heavy multi-core server processing required. Uses a high-performance linear interpolation algorithm that solves daily solar crossings in milliseconds directly in the browser.
* **Dynamic URL Param Routing:** Control layout variations, date ranges, and targeted locations entirely via URL query strings—perfect for creating customized embedded widgets.
* **Three Context-Aware UI Styles:**
  * **full:** Interactive desktop dashboard featuring controls, full calendar tables, and a real-time horizon orientation radar.
  * **simple:** Stripped-down embed optimized for inline wiki blocks, rendering only the location name and a clean data table with clear headers.
  * **table:** Extreme minimalist mode showing *only* the calculated times. Automatically hides the date index column if the timeframe is locked to a single day.
* **Interactive Live/Manual Radar:** Features a 3D-projected compass radar showing the sun's position relative to your defined azimuth markers. Includes dual "Local Time" and "Destination Time" inputs that automatically calculate timezone offsets, alongside a "Live Tracking" toggle.
* **Seamless Host Styling:** Embed views feature transparent backgrounds and an agnostic system font stack, allowing the parent website's natural layout and design palette to bleed through automatically.
* **Data Export:** Generate and download a complete `.csv` dataset of all calculated solar transit times directly from the dashboard.
* **Offline & Intranet Friendly:** Uses a decoupled architecture (`config.js`) that safely bypasses browser security (CORS) blocks, making it safe to run in heavily secured enterprise networks or even completely offline.

---

## ☀️ Understanding Transit Durations (± time)

When viewing the solar transit tables or the live radar, you will see times formatted with a duration offset (e.g., `15:42:10 ± 01:10`). 

Because the sun is not a single infinitesimal point, it takes time for the entire sun disk to cross an alignment. The apparent angular diameter of the sun from Earth is effectively a constant **0.533 degrees**.

To optimize performance and accuracy, the application uses three distinct calculation layers:

**1. Horizontal Custom Headings (Complex Math, calculated once per day)**
For your custom compass headings (e.g., aligning with a building), the application uses an intensive simulation to map the sun's trajectory across the sky minute-by-minute. It calculates exactly when the dead-center of the sun crosses your specific azimuth line (the primary timestamp). It then calculates the time difference for the leading edge of the sun to first touch that line (`Heading Azimuth ± 0.2665°`). This is appended as the symmetrical **± duration**, telling you exactly how many minutes and seconds it takes for the 0.533° sun disk to slide *horizontally* across your compass alignment.

**2. Vertical Sunrise / Sunset (Simple Math, calculated once per day)**
For Sunrise and Sunset, the application bypasses the horizontal simulation and asks the `SunCalc` library directly for the exact time the top edge of the sun touches the horizon (`-0.833°` elevation, accounting for atmospheric refraction) and when the bottom edge fully clears the horizon (`-0.3°` elevation). The primary timestamp shown on the radar is the true geometric center between those two points, and the **± duration** tells you the exact number of minutes the sun spends *vertically* rising over or sinking below the horizon line.

**3. Real-Time Radar Position (Simple Math, updated every second)**
The physical position of the yellow sun dot on the compass and the exact Azimuth/Elevation text readouts at the bottom of the widget are updated in real-time every second using a lightweight, direct `SunCalc` calculation for the exact current millisecond.

*(Note: In the CSV data export, durations are formatted as `15:42:10 (01:10)` to keep spreadsheet processing simple and clean).*

---

## 📂 File Structure

* **index.html** — Main Application Engine & JavaScript Logic
* **style.css** — Core Layout & Component Styling Sheets
* **config.js** — Global Locations & Target Azimuth Configuration
* **libs/** — Locally bundled third-party libraries (`suncalc.min.js` and `tz.js`)

---

## 🛠️ Configuration Guide (config.js)

To add new geographical points or custom tracking markers, edit the global configuration file. You do not need to alter the main application source code.

window.SOLAR_CONFIG = {
    precisionMinutes: 1, 
    defaultLocationId: "biozentrum", 
    locations: {
        "biozentrum": {
            name: "Biozentrum, Basel",
            lat: 47.564292,
            lng: 7.580731,
            headings: [
                { name: "SE", azimuth: 139.046 },
                { name: "SW", azimuth: 229.046 }
            ]
        },
        "greenwich": {
            name: "Royal Observatory, Greenwich",
            lat: 51.477928,
            lng: -0.001545,
            headings: [
                { name: "East", azimuth: 90.000 },
				{ name: "South", azimuth: 180.000 },
                { name: "West", azimuth: 270.000 }
            ]
        }
    }
};

---

## 🔗 URL Query Parameters

Customize individual instances of the application on the fly using standard browser query strings.

> [!TIP]
> **Use the "Create URL" Generator!**
> Instead of writing these out manually, you can click the **Create URL** button directly in the application dashboard. This will open a visual configuration panel allowing you to select your UI style, date range, theme, and brand color, then automatically generate and copy the correct embed URL for your currently selected location or custom coordinates.

| Parameter | Expected Values | Description | Default |
| :--- | :--- | :--- | :--- |
| style | `simple`, `table`, `radar` | Alters UI visibility for embedding. `simple` hides the header and actions. `table` strips all layout components except the data grid itself. `radar` shows only the compass graphic and its metrics. | `full` (All UI) |
| location | string (id) | Automatically loads a pre-configured profile. | `biozentrum` |
| name | string | Custom location name to display when using custom lat/lng coordinates. | `Custom Location` |
| lat | float | Custom latitude. Automatically builds a "Custom" profile on the fly if used with lng and headings. | None |
| lng | float | Custom longitude. | None |
| headings | string (CSV of angles) | Comma-separated list of heading azimuths. Supports `Name:Angle` format (e.g., `Azim1:139.0, 229.5`) for custom locations. | None |
| datetime | YYYY-MM-DDTHH:MM | Freezes the visual radar graphic at this specific local date and time instead of using live tracking. | Live |
| update | int (seconds) | Overrides the refresh rate for the live tracking radar graphic. | 1 |
| from | YYYY-MM-DD | The start date boundary for the transit alignment table calculations. | Today |
| to | YYYY-MM-DD | The end date boundary for the calculations. | Today (Single Day) |
| bgcolor | HEX Code or "transparent" | Sets a custom background color, or explicitly forces the background to be transparent. | Inherited |
| color | HEX Code (e.g., FF5733) | Explicitly forces all data text elements to match a custom hexadecimal brand color. | Inherited |

### Query Examples:
* Full Application Dashboard: https://marbuelb.github.io/Solar-Alignment-Tracker/?location=biozentrum
* Confluence Block (Minimalist Grid for Today): https://marbuelb.github.io/Solar-Alignment-Tracker/?style=table&location=biozentrum
* Visual Radar Only (Frozen in Time): https://marbuelb.github.io/Solar-Alignment-Tracker/?style=radar&location=biozentrum&datetime=2026-07-08T18:45
* Custom Multi-Day Dark-Styled Table: https://marbuelb.github.io/Solar-Alignment-Tracker/?style=simple&location=greenwich&from=2026-06-01&to=2026-06-07&color=f7fafc&bgcolor=1a202c
* Dynamic Custom Location (with transparent background): https://marbuelb.github.io/Solar-Alignment-Tracker/?lat=47.5&lng=7.5&headings=139.5,229.0&bgcolor=transparent

---

## 📋 Confluence wiki Integration

Because the application logic runs entirely client-side inside the browser, it works beautifully around strict enterprise security constraints.

1. Deploy the directory (index.html, style.css, config.js) to any internal static web server or shared network folder that can serve basic web links.
2. Open your heading Confluence page in **Edit Mode**.
3. Use the **HTML Macro** (type `/html` or insert it from the macro menu).
4. Inside the macro block, write a standard HTML iframe tag pointing to your generated URL.
   * Example: `<iframe src="https://marbuelb.github.io/Solar-Alignment-Tracker/?style=simple&location=biozentrum" width="100%" height="200" frameborder="0"></iframe>`
5. Adjust the **height** property to comfortably fit your chosen style view (e.g., `200` for simple lists, `350` for radar graphics, or `650` for the full dashboard), and hit publish.

---

## 🛠️ Third-Party Dependencies

* **SunCalc:** Used to calculate raw astronomical azimuth and elevation vectors.
* **tz-lookup:** Used to map raw GPS coordinates to IANA Timezone strings natively within the browser.

Both libraries have been bundled locally inside the `libs/` directory. This ensures the application is completely decoupled from the open internet and will function offline or behind strict corporate firewalls indefinitely.

All subsequent crossing evaluations, interpolations, UI mechanics, and projection radars are built completely from scratch using vanilla, uncompiled JavaScript.