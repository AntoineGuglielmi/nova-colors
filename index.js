const colors = {
  "bleu-base": "#2153F9",
  "bleu-base-fonce": "#223D99",
  "bleu-base-clair": "#92AAF8",
  "menthe": "#A3F9C1",
  "bleu-roi": "#4B72E9",
  "corail": "#E85F3C",
  "lagon": "#19C7D4",
  "safran": "#F2B84A",
  "indigo": "#6D3FE0",
  "pistache": "#91E26B",
  "framboise": "#D43A7F",
  "foret": "#2F8A4C",
  "citron-vert": "#C9E134",
  "pervenche": "#7A5DF2",
  "rose-fluo": "#F45B92",
  "azur": "#3DB1E7",
  "miel": "#E1A24F",
  "tilleul": "#5C9A32",
  "mauve": "#B84FE2",
  "jade": "#28D6A1",
  "mandarine": "#F06C21",
  "violet-electrique": "#9B3FDD",
  "menthe-claire": "#74E592",
  "turquoise": "#2AC6B9",
  "brique": "#C14A32"
};

function labelColor(hex) {
  // --- 1. HEX -> RGB ---
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // --- 2. RGB -> HSL ---
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  const H = Math.round(h);
  const L = Math.round(l * 100);

  // --- 3. ZONES DE LUMINOSITÉ (identiques au Sass) ---
  let luminanceZone;
  if (L < 35) luminanceZone = "Foncée";
  else if (L < 70) luminanceZone = "Moyenne";
  else luminanceZone = "Claire";

  // --- 4. ZONES DE TEMPÉRATURE (identiques au Sass) ---
  let temperatureZone;
  if (H >= 30 && H <= 110) temperatureZone = "Chaude";
  else if (H >= 200 && H <= 300) temperatureZone = "Froide";
  else temperatureZone = "Tempérée";

  return {
    hex,
    h: H,
    s: Math.round(s * 100),
    l: L,
    luminanceZone,
    temperatureZone
  };
}

const Palette = ({ name }) => {
  const bB = (name === "bleu-base");
  const hexa = colors[name];
  const labels = labelColor(hexa);
  const tS = [
    'base',
    'l1',
    'l2',
    'l3'
  ];
  return <div className={`palette palette--${name} ${bB && 'no-gap'}`}>
    <h3 className="palette__title">{name}</h3>
    <div className="palette__labels">
      <p>{labels.luminanceZone}</p>
      <p>-</p>
      <p>{labels.temperatureZone}</p>
    </div>
    {bB && (
      <div className="group">
        {tS.map(name => {
          return <div key={name} className={`swatch swatch--B${name}`}></div>
        })}
      </div>
    )}
    <div className="group">
        {tS.map(name => {
          return <div key={name} className={`swatch swatch--${name}`}></div>
        })}
    </div>
  </div>
};

const App = () => (
  <div className="palettes-container">
    {Object.keys(colors).map(name => <Palette key={name} name={name} />)}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
