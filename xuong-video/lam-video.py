#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Xuong video OZ Cloud — bien mot file kich ban JSON thanh video huong dan.
Dung: ./venv/bin/python lam-video.py kich-ban/<slug>.json
Ra:   thanh-pham/<slug>/doc.mp4 (TikTok 1080x1920), ngang.mp4 (YouTube 1920x1080),
      phu-de.srt, mo-ta.txt

Kich ban JSON:
{
  "slug": "openclaw-bot-khong-tra-loi",
  "tieu_de": "Bot OpenClaw online ma khong tra loi",
  "mo_ta_youtube": "...",
  "hashtag": ["#openclaw", "#aiagent", "#vps"],
  "canh": [
    {"loai": "tieu-de", "chu": "Bot online\\nma khong tra loi?", "doc": "Loi thoai canh nay"},
    {"loai": "y",       "chu": "Mention gating bat mac dinh", "doc": "..."},
    {"loai": "lenh",    "chu": "openclaw config set channels.telegram.mentionPolicy off", "doc": "..."},
    {"loai": "ket",     "chu": "Con ket? Nhan cho tui", "doc": "..."}
  ]
}
loai: tieu-de | y | lenh | ket
"""
import asyncio, json, os, shutil, subprocess, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

GOC = Path(__file__).resolve().parent
TAM = GOC / "tam"
RA = GOC / "thanh-pham"
GIONG = os.environ.get("OZ_GIONG", "vi-VN-NamMinhNeural")   # doi sang vi-VN-HoaiMyNeural neu muon giong nu

MAU = {
    "nen": (11, 15, 20), "nen2": (21, 29, 39), "vien": (36, 48, 64),
    "chu": (232, 238, 246), "chu2": (150, 165, 184), "chu3": (107, 123, 144),
    "nhan": (55, 213, 168), "xanh": (90, 169, 247), "vang": (245, 181, 68),
}

def font(ten, co):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if ten == "dam"
              else "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf" if ten == "mono"
              else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",):
        if Path(p).exists():
            return ImageFont.truetype(p, co)
    return ImageFont.load_default()

def ngat(ve, chu, ft, rong):
    """Ngat dong theo be rong thuc te."""
    dong, hien = [], ""
    for tu in chu.split():
        thu = (hien + " " + tu).strip()
        if ve.textlength(thu, font=ft) <= rong or not hien:
            hien = thu
        else:
            dong.append(hien); hien = tu
    if hien: dong.append(hien)
    return dong

def khung(canh, W, H, chi_so, tong):
    img = Image.new("RGB", (W, H), MAU["nen"])
    d = ImageDraw.Draw(img)
    doc_khung = H > W
    le = int(W * 0.08)
    rong = W - le * 2

    # nen gradient nhe phia tren
    for y in range(int(H * 0.42)):
        t = 1 - y / (H * 0.42)
        d.line([(0, y), (W, y)], fill=(
            int(MAU["nen"][0] + 12 * t), int(MAU["nen"][1] + 26 * t), int(MAU["nen"][2] + 20 * t)))

    # thanh tien do
    d.rectangle([0, 0, W, 6], fill=MAU["vien"])
    d.rectangle([0, 0, int(W * (chi_so + 1) / tong), 6], fill=MAU["nhan"])

    # thuong hieu
    fb = font("dam", int(W * 0.028))
    o = int(W * 0.055)
    d.rounded_rectangle([le, int(H * 0.045), le + o, int(H * 0.045) + o], radius=int(o * 0.28), fill=MAU["nhan"])
    d.text((le + o * 0.5, int(H * 0.045) + o * 0.5), "OZ", font=font("dam", int(o * 0.42)),
           fill=MAU["nen"], anchor="mm")
    d.text((le + o + int(W * 0.02), int(H * 0.045) + o * 0.5), "OZ Cloud", font=fb, fill=MAU["chu"], anchor="lm")

    loai = canh.get("loai", "y")
    chu = canh.get("chu", "")
    y = int(H * (0.30 if doc_khung else 0.26))

    if loai == "tieu-de":
        ft = font("dam", int(W * (0.085 if doc_khung else 0.055)))
        dong = []
        for phan in chu.split("\n"):
            dong += ngat(d, phan, ft, rong)
        cao = len(dong) * ft.size * 1.22
        y = int((H - cao) / 2 - H * 0.06)
        for t in dong:
            d.text((le, y), t, font=ft, fill=MAU["chu"]); y += int(ft.size * 1.22)
        d.rectangle([le, y + int(H * 0.02), le + int(W * 0.18), y + int(H * 0.02) + 8], fill=MAU["nhan"])

    elif loai == "lenh":
        ft = font("mono", int(W * (0.033 if doc_khung else 0.022)))
        dong = ngat(d, chu, ft, rong - int(W * 0.08))
        cao = len(dong) * ft.size * 1.45 + int(H * 0.05)
        hop_y = int((H - cao) / 2 - H * 0.05)
        d.rounded_rectangle([le, hop_y, W - le, hop_y + cao], radius=20, fill=(14, 22, 32), outline=MAU["vien"], width=2)
        for i, m in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
            d.ellipse([le + int(W * 0.035) + i * int(W * 0.032), hop_y + int(H * 0.014),
                       le + int(W * 0.035) + i * int(W * 0.032) + int(W * 0.016),
                       hop_y + int(H * 0.014) + int(W * 0.016)], fill=m)
        yy = hop_y + int(H * 0.045)
        for t in dong:
            d.text((le + int(W * 0.04), yy), t, font=ft, fill=(159, 232, 205)); yy += int(ft.size * 1.45)

    elif loai == "ket":
        ft = font("dam", int(W * (0.062 if doc_khung else 0.042)))
        dong = ngat(d, chu, ft, rong)
        cao = len(dong) * ft.size * 1.25
        y = int((H - cao) / 2 - H * 0.05)
        for t in dong:
            d.text((W / 2, y), t, font=ft, fill=MAU["chu"], anchor="ma"); y += int(ft.size * 1.25)
        fp = font("dam", int(W * 0.032))
        nut = "ozcloud-web.vercel.app"
        w = d.textlength(nut, font=fp) + int(W * 0.09)
        d.rounded_rectangle([(W - w) / 2, y + int(H * 0.03), (W + w) / 2, y + int(H * 0.03) + int(W * 0.085)],
                            radius=int(W * 0.02), fill=MAU["nhan"])
        d.text((W / 2, y + int(H * 0.03) + int(W * 0.0425)), nut, font=fp, fill=(6, 35, 26), anchor="mm")

    else:  # y
        ft = font("dam", int(W * (0.058 if doc_khung else 0.04)))
        dong = []
        for phan in chu.split("\n"):
            dong += ngat(d, phan, ft, rong)
        cao = len(dong) * ft.size * 1.3
        y = int((H - cao) / 2 - H * 0.06)
        d.rectangle([le - int(W * 0.025), y, le - int(W * 0.025) + 7, y + int(cao)], fill=MAU["nhan"])
        for t in dong:
            d.text((le, y), t, font=ft, fill=MAU["chu"]); y += int(ft.size * 1.3)

    # phu de duoi
    loi = canh.get("doc", "")
    if loi:
        fc = font("thuong", int(W * (0.033 if doc_khung else 0.021)))
        dong = ngat(d, loi, fc, rong)[-3:]
        cao = len(dong) * fc.size * 1.35 + int(H * 0.03)
        hy = int(H * (0.80 if doc_khung else 0.78))
        d.rounded_rectangle([le, hy, W - le, hy + cao], radius=16, fill=MAU["nen2"], outline=MAU["vien"], width=1)
        yy = hy + int(H * 0.015)
        for t in dong:
            d.text((le + int(W * 0.03), yy), t, font=fc, fill=MAU["chu2"]); yy += int(fc.size * 1.35)
    return img


async def noi(text, ra):
    import edge_tts
    await edge_tts.Communicate(text, GIONG, rate="+8%").save(str(ra))

def dai(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=nw=1:nk=1", str(f)], capture_output=True, text=True)
    return float(r.stdout.strip() or 3.0)

def srt_gio(s):
    h, s = divmod(s, 3600); m, s = divmod(s, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int((s%1)*1000):03d}"

def lam(kb_path):
    kb = json.loads(Path(kb_path).read_text(encoding="utf-8"))
    slug = kb["slug"]
    tam = TAM / slug; ra = RA / slug
    shutil.rmtree(tam, ignore_errors=True); tam.mkdir(parents=True); ra.mkdir(parents=True, exist_ok=True)
    canh = kb["canh"]; n = len(canh)

    print(f"[1/4] Thu am {n} cảnh bằng giọng {GIONG} ...")
    thoi = []
    for i, c in enumerate(canh):
        mp3 = tam / f"{i:02d}.mp3"
        asyncio.run(noi(c.get("doc") or c.get("chu", ""), mp3))
        t = dai(mp3) + 0.45
        thoi.append(t)
        print(f"    cảnh {i+1}/{n}: {t:.1f}s")

    print("[2/4] Vẽ khung hình ...")
    for kieu, W, H in (("doc", 1080, 1920), ("ngang", 1920, 1080)):
        for i, c in enumerate(canh):
            khung(c, W, H, i, n).save(tam / f"{kieu}-{i:02d}.png")

    print("[3/4] Ghép video ...")
    for kieu in ("doc", "ngang"):
        phan = []
        for i in range(n):
            out = tam / f"{kieu}-{i:02d}.mp4"
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-i", str(tam / f"{kieu}-{i:02d}.png"),
                            "-i", str(tam / f"{i:02d}.mp3"), "-c:v", "libx264", "-tune", "stillimage",
                            "-c:a", "aac", "-b:a", "160k", "-pix_fmt", "yuv420p", "-r", "30",
                            "-t", f"{thoi[i]:.2f}", "-shortest", str(out)], check=True)
            phan.append(out)
        ds = tam / f"ds-{kieu}.txt"
        ds.write_text("".join(f"file '{p}'\n" for p in phan), encoding="utf-8")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(ds),
                        "-c", "copy", str(ra / f"{kieu}.mp4")], check=True)
        print(f"    ✓ {kieu}.mp4")

    print("[4/4] Phụ đề + mô tả ...")
    t = 0.0; srt = []
    for i, c in enumerate(canh):
        srt.append(f"{i+1}\n{srt_gio(t)} --> {srt_gio(t+thoi[i])}\n{c.get('doc') or c.get('chu','')}\n")
        t += thoi[i]
    (ra / "phu-de.srt").write_text("\n".join(srt), encoding="utf-8")

    ht = " ".join(kb.get("hashtag", []))
    (ra / "mo-ta.txt").write_text(
        f"{kb['tieu_de']}\n\n{kb.get('mo_ta_youtube','')}\n\n"
        f"Bài viết đầy đủ và bảng giá VPS chạy agent: ozcloud-web.vercel.app\n\n{ht}\n",
        encoding="utf-8")
    (ra / "trang-thai.json").write_text(json.dumps({
        "slug": slug, "tieu_de": kb["tieu_de"], "do_dai_giay": round(t, 1),
        "da_dang_tiktok": False, "da_dang_youtube": False,
        "ghi_chu": "Chờ cắm tài khoản TikTok/YouTube để agent tự đăng."
    }, ensure_ascii=False, indent=2), encoding="utf-8")

    shutil.rmtree(tam, ignore_errors=True)
    print(f"XONG: {ra}  (dài {t:.1f}s)")
    return ra

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Dùng: lam-video.py kich-ban/<slug>.json"); sys.exit(1)
    lam(sys.argv[1])
