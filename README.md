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
            targets: [
                { name: "SE", azimuth: 139.046 },
                { name: "SW", azimuth: 229.046 }
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

---

## 🔗 URL Query Parameters

Customize individual instances of the application on the fly using standard browser query strings.

> [!TIP]
> **Use the "Create URL" Generator!**
> Instead of writing these out manually, you can click the **Create URL** button directly in the application dashboard. This will open a visual configuration panel allowing you to select your UI style, date range, theme, and brand color, then automatically generate and copy the correct embed URL for your currently selected location or custom coordinates.

| Parameter | Expected Values | Description | Default |
| :--- | :--- | :--- | :--- |
| style | `simple`, `table`, `radar` | Alters UI visibility for embedding. `simple` hides the header and actions. `table` strips all layout components except the data grid itself. `radar` shows only the compass graphic and its metrics. | `full` (All UI) |
| location | string (id) | Automatically loads a pre-configured profile. | `basel` |
| lat | float | Custom latitude. Automatically builds a "Custom" profile on the fly if used with lng and targets. | None |
| lng | float | Custom longitude. | None |
| targets | string (CSV of angles) | Comma-separated list of target azimuths. Supports `Name:Angle` format (e.g., `Azim1:139.0, 229.5`) for custom locations. | None |
| datetime | YYYY-MM-DDTHH:MM | Freezes the visual radar graphic at this specific local date and time instead of using live tracking. | Live |
| update | int (seconds) | Overrides the refresh rate for the live tracking radar graphic (e.g., `update=1` for 1-second real-time tracking). | 30 |
| from | YYYY-MM-DD | The start date boundary for the transit alignment table calculations. | Today |
| to | YYYY-MM-DD | The end date boundary for the calculations. | Today (Single Day) |
| bgcolor | HEX Code or "transparent" | Sets a custom background color, or explicitly forces the background to be transparent. | Inherited |
| color | HEX Code (e.g., FF5733) | Explicitly forces all data text elements to match a custom hexadecimal brand color. | Inherited |

### Query Examples:
* Full Application Dashboard: https://marbuelb.github.io/Solar-Alignment-Tracker/?location=biozentrum
* Confluence Block (Minimalist Grid for Today): https://marbuelb.github.io/Solar-Alignment-Tracker/?style=table&location=biozentrum
* Visual Radar Only (Frozen in Time): https://marbuelb.github.io/Solar-Alignment-Tracker/?style=radar&location=biozentrum&datetime=2026-07-08T18:45
* Custom Multi-Day Dark-Styled Table: https://marbuelb.github.io/Solar-Alignment-Tracker/?style=simple&location=greenwich&from=2026-06-01&to=2026-06-07&color=f7fafc&bgcolor=1a202c
* Dynamic Custom Location (with transparent background): https://marbuelb.github.io/Solar-Alignment-Tracker/?lat=47.5&lng=7.5&targets=139.5,229.0&bgcolor=transparent

---

## 📋 Confluence wiki Integration

Because the application logic runs entirely client-side inside the browser, it works beautifully around strict enterprise security constraints.

1. Deploy the directory (index.html, style.css, config.js) to any internal static web server or shared network folder that can serve basic web links.
2. Open your target Confluence page in **Edit Mode**.
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