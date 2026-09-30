"""Renderuje logo (512), ikony (48, 180, .ico) i obrazek podglądu linku og.png (1200x630) z HTML.
Uruchom ponownie po zmianie logo lub hasła: python scripts/grafiki.py (wymaga Playwright + Pillow)."""
import base64, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
NM = ROOT / "node_modules"
def font(rel):
    return "data:font/woff2;base64," + base64.b64encode((NM / rel).read_bytes()).decode()
MARK = (PUB / "favicon.svg").read_text(encoding="utf-8")
CSS = f"""
@font-face {{ font-family: F; src: url({font('@fontsource-variable/figtree/files/figtree-latin-ext-wght-normal.woff2')}) format('woff2'); font-weight: 300 900; unicode-range: U+0100-02BA,U+0300-036F; }}
@font-face {{ font-family: F; src: url({font('@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2')}) format('woff2'); font-weight: 300 900; }}
@font-face {{ font-family: S; font-style: italic; src: url({font('@fontsource/instrument-serif/files/instrument-serif-latin-ext-400-italic.woff2')}) format('woff2'); unicode-range: U+0100-02BA; }}
@font-face {{ font-family: S; font-style: italic; src: url({font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}) format('woff2'); }}
* {{ margin: 0; box-sizing: border-box; }} body {{ font-family: F; }}
"""
OG = f"""<html><head><style>{CSS}
body {{ width: 1200px; height: 630px; background: #faf8f3; position: relative; overflow: hidden; color: #16131f; }}
.logo {{ position: absolute; left: 80px; top: 72px; display: flex; align-items: center; gap: 16px; font-weight: 700; font-size: 38px; letter-spacing: -0.02em; }}
.logo svg {{ width: 60px; height: 60px; }}
h1 {{ position: absolute; left: 80px; top: 190px; width: 700px; font-size: 76px; line-height: 1.02; letter-spacing: -0.045em; font-weight: 700; }}
h1 em {{ font-family: S; font-weight: 400; color: #5b3fe8; letter-spacing: -0.02em; }}
p {{ position: absolute; left: 80px; bottom: 72px; font-size: 28px; color: #4f4b62; font-weight: 500; }}
.card {{ position: absolute; border-radius: 36px; }}
</style></head><body>
<div class="card" style="right:-60px;top:70px;width:380px;height:220px;background:#efe9ff"></div>
<div class="card" style="right:170px;top:320px;width:240px;height:190px;background:#e2f5ea"></div>
<div class="card" style="right:-40px;top:330px;width:190px;height:260px;background:#e3efff"></div>
<div class="card" style="right:250px;top:110px;width:96px;height:96px;background:#ffd84d;border-radius:28px"></div>
<div class="logo">{MARK}<span>mastalex</span></div>
<h1>Tworzymy strony internetowe dla firm. <em>Najpierw bezpłatny projekt.</em></h1>
<p>Projekt w 3 dni · cała Polska · mastalex.pl</p>
</body></html>"""

def mark_page(size, rounded=True):
    svg = MARK if rounded else MARK.replace('rx="9"', 'rx="0"')
    return f"<html><head><style>*{{margin:0}} body{{width:{size}px;height:{size}px;background:transparent}} svg{{width:{size}px;height:{size}px;display:block}}</style></head><body>{svg}</body></html>"

with sync_playwright() as p:
    b = p.chromium.launch()
    def shot(html, w, h, out):
        pg = b.new_page(viewport={"width": w, "height": h})
        pg.set_content(html); pg.wait_for_timeout(400)
        pg.screenshot(path=str(out), omit_background=True); pg.close()
    shot(OG, 1200, 630, PUB / "og.png")
    shot(mark_page(512), 512, 512, PUB / "logo.png")
    shot(mark_page(48), 48, 48, PUB / "favicon-48.png")
    shot(mark_page(180, rounded=False), 180, 180, PUB / "apple-touch-icon.png")
    b.close()
Image.open(PUB / "favicon-48.png").save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
og = Image.open(PUB / "og.png").convert("RGB"); og.save(PUB / "og.png", optimize=True)
for f in ["og.png", "logo.png", "favicon-48.png", "apple-touch-icon.png", "favicon.ico"]:
    print(f, (PUB / f).stat().st_size, Image.open(PUB / f).size)
