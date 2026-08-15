// Bo sinh trang tinh OZ Cloud.
// Agent: viet .md vao noi-dung/, cap nhat du-lieu/van-hanh.json, chay `node build.mjs`, git push. Vercel tu deploy.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import matter from 'gray-matter';

const GOC = path.dirname(fileURLToPath(import.meta.url));
const RA = path.join(GOC, 'public');
const SITE = process.env.SITE_URL || 'https://ozcloud-web.vercel.app';
const CSS = fs.readFileSync(path.join(GOC, 'mau', 'style.css'), 'utf8');
const VH = JSON.parse(fs.readFileSync(path.join(GOC, 'du-lieu', 'van-hanh.json'), 'utf8'));

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const ngay = s => { const d = new Date(s); return isNaN(d) ? String(s) : `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; };

function vo({ title, description, body, canonical = '/', lop = '' }) {
  return `<!DOCTYPE html>
<html lang="vi"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website"><meta property="og:locale" content="vi_VN">
<link rel="canonical" href="${SITE}${canonical}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head><body class="${lop}">
<div class="banner">🤖 <b>Công ty này đang được vận hành bởi AI.</b> Bài viết, bảng giá và báo cáo trên site đều do agent tự sản xuất — <a href="/ai-van-hanh/">xem trực tiếp</a>.</div>
<nav><div class="wrap nav">
  <a class="logo" href="/"><span>OZ</span> OZ Cloud</a>
  <div class="nav-links"><a href="/#bang-gia">Bảng giá</a><a href="/blog/">Blog</a><a href="/ai-van-hanh/">AI vận hành</a></div>
  <a href="/#dang-ky" class="btn btn-p">Đăng ký sớm</a>
</div></nav>
${body}
<footer><div class="wrap f-row">
  <div><div class="logo" style="font-size:16px"><span style="width:26px;height:26px;font-size:13px">OZ</span> OZ Cloud</div>
    <div style="margin-top:8px">VPS &amp; chỗ chạy AI Agent · Việt Nam</div></div>
  <div style="text-align:right"><div>ceo@ngantin.vn</div>
    <div style="margin-top:8px;color:var(--tx3)">Trang do agent tự dựng · cập nhật ${ngay(VH.cap_nhat)}</div></div>
</div></footer></body></html>`;
}

function ghi(rel, html) {
  const p = path.join(RA, rel, 'index.html');
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  console.log('  ✓ /' + rel);
}

const thuMuc = path.join(GOC, 'noi-dung');
fs.mkdirSync(thuMuc, { recursive: true });
fs.mkdirSync(RA, { recursive: true });
const bai = fs.readdirSync(thuMuc).filter(f => f.endsWith('.md')).map(f => {
  const g = matter(fs.readFileSync(path.join(thuMuc, f), 'utf8'));
  return {
    slug: f.replace(/\.md$/, ''),
    title: g.data.title || f.replace(/\.md$/, '').replace(/-/g, ' '),
    description: g.data.description || '',
    ngay_dang: g.data.date || g.data.ngay || VH.cap_nhat,
    tacGia: g.data.tac_gia || g.data.author || 'Agent OZ Cloud',
    html: marked.parse(g.content),
  };
}).sort((a, b) => String(b.ngay_dang).localeCompare(String(a.ngay_dang)));
console.log(`Bài viết: ${bai.length}`);

const goi = VH.bang_gia || [];
const theGoi = goi.map(g => `
  <div class="plan${g.noi_bat ? ' hot' : ''}">${g.noi_bat ? '<div class="pin">CHỦ LỰC CHO AI AGENT</div>' : ''}
    <h3>${esc(g.ten)}</h3>
    <div class="price">${esc(g.gia_thang)}<small>đ/tháng</small></div>
    <div class="p6">6 tháng: ${esc(g.gia_6thang)}đ</div>
    <ul class="specs"><li><b>${esc(g.vcpu)}</b> vCPU</li><li><b>${esc(g.ram)}</b> RAM</li><li><b>${esc(g.disk)}</b> SSD enterprise</li><li>${esc(g.ghi_chu)}</li></ul>
    <a href="#dang-ky" class="btn ${g.noi_bat ? 'btn-p' : 'btn-g'}">Chọn gói</a>
  </div>`).join('');

const the = b => `
  <a class="post-card" href="/blog/${b.slug}/">
    <div class="post-date">${ngay(b.ngay_dang)}</div>
    <div class="post-title">${esc(b.title)}</div>
    <p>${esc(b.description)}</p></a>`;

ghi('', vo({
  title: 'OZ Cloud — VPS Việt Nam cho người chạy AI Agent',
  description: 'VPS đặt tại Việt Nam trên Dell R730xd + Proxmox. Chỗ chạy OpenClaw đúng chuẩn. Thanh toán VNĐ, hỗ trợ tiếng Việt. Từ 49.000đ/tháng.',
  body: `
<header><div class="wrap">
  <div class="h-tag">● Máy chủ đặt tại Việt Nam — ping nội địa dưới 20ms</div>
  <h1>Chỗ cho agent<br><em>của bạn sống</em></h1>
  <p class="lead">Chúng tôi không bán VPS cài sẵn OpenClaw rồi để bạn tự bơi. Chúng tôi bán chỗ chạy agent — do người đang nuôi một đội agent thật 24/7 vận hành. Toàn bộ công ty này đang được chính đội AI đó điều hành.</p>
  <div class="h-cta"><a href="/dat-mua/" class="btn btn-p">Đặt trước, khoá giá 12 tháng</a><a href="/ai-van-hanh/" class="btn btn-g">Xem AI đang vận hành</a></div>
  <div class="h-stats">
    <div class="stat"><b>${esc(VH.so_agent ?? 3)}</b><small>Agent chạy 24/7 tại trạm của chúng tôi</small></div>
    <div class="stat"><b>${esc(bai.length)}</b><small>Bài viết do agent tự sản xuất</small></div>
    <div class="stat"><b>99,5%</b><small>SLA cam kết, có bồi thường</small></div>
    <div class="stat"><b>7 ngày</b><small>Hoàn tiền không hỏi lý do</small></div>
  </div>
</div></header>

<section id="bang-gia"><div class="wrap">
  <div class="s-head"><h2>Bảng giá</h2><p>Mua 6 tháng giảm 10%. Gói nào chạy được OpenClaw thì chúng tôi nói thẳng — gói nào không, cũng nói thẳng.</p></div>
  <div class="grid">${theGoi}</div>
  <p style="margin-top:22px"><a href="/dat-mua/" class="btn btn-p">Đặt trước — giảm 20%, khoá giá 12 tháng</a></p>
  <div class="warn-box"><b>Nói thật về gói 49k:</b> 1GB RAM <b>không đủ chạy OpenClaw</b> — tài liệu chính thức ghi rõ 1GB sẽ bị OOM-kill (exit code 137), tối thiểu 2GB và 4GB mới thoải mái. Gói 49k dành cho người học Linux hoặc chạy web nhỏ. Muốn chạy agent thì lấy Pro 4GB.</div>
</div></section>

<section><div class="wrap">
  <div class="s-head"><h2>Vì sao lại là chúng tôi</h2></div>
  <div class="feat">
    <div class="f"><div class="ic">🤖</div><h3>Chúng tôi tự sống bằng nó</h3><p>Trạm agent của chúng tôi chạy OpenClaw, Hermes và opencode 24/7 — có điều phối việc, canh gác 15 phút một lần, sao lưu mỗi đêm. Trang bạn đang đọc do chính đội đó dựng ra.</p></div>
    <div class="f"><div class="ic">🖥️</div><h3>Máy thật, của chúng tôi</h3><p>Dell PowerEdge R730xd, Proxmox VE + Ceph nhân bản 3 bản. Không phải VPS bán lại. Khách ở gần có thể hẹn ghé xem máy.</p></div>
    <div class="f"><div class="ic">🛡️</div><h3>Cấu hình an toàn từ đầu</h3><p>Cổng gateway không phơi ra Internet, firewall riêng từng máy, chặn SMTP mặc định. Chúng tôi biết hàng chục nghìn instance OpenClaw ngoài kia đang mở toang — máy của bạn sẽ không nằm trong số đó.</p></div>
  </div>
</div></section>

${bai.length ? `<section><div class="wrap">
  <div class="s-head"><h2>Bài mới nhất</h2><p>Agent viết, tự xuất bản, không qua tay người.</p></div>
  <div class="posts">${bai.slice(0,3).map(the).join('')}</div>
  <p style="margin-top:20px"><a href="/blog/" class="btn btn-g">Xem tất cả bài viết</a></p>
</div></section>` : ''}

<section id="dang-ky"><div class="wrap"><div class="cta">
  <h2>Đăng ký sớm — khoá giá 12 tháng</h2>
  <p>Cụm máy đang được lắp đặt. Để lại liên hệ, chúng tôi báo ngay khi mở bán và giữ nguyên mức giá này cho bạn trong 12 tháng đầu.</p>
  <form class="form" action="https://formsubmit.co/${esc(VH.email_nhan_lead || 'ceo@ngantin.vn')}" method="POST">
    <input type="hidden" name="_subject" value="OZ Cloud - dang ky som">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="text" name="ho_ten" placeholder="Tên của bạn" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="text" name="zalo" placeholder="Số Zalo (không bắt buộc)">
    <select name="goi_quan_tam"><option value="">Gói bạn quan tâm</option>
      ${goi.map(g => `<option value="${esc(g.ten)}">${esc(g.ten)} — ${esc(g.gia_thang)}đ</option>`).join('')}
    </select>
    <button type="submit" class="btn btn-p">Gửi đăng ký</button>
  </form>
  <p class="src" style="margin-top:14px">Chúng tôi chỉ dùng thông tin này để báo bạn khi mở bán. Không spam, không bán dữ liệu.</p>
</div></div></section>`,
}));

ghi('blog', vo({
  title: 'Blog — OZ Cloud',
  description: 'Hướng dẫn tự host OpenClaw, nối Zalo, cấu hình an toàn, tối ưu chi phí API. Do agent viết và tự xuất bản.',
  canonical: '/blog/',
  body: `<section><div class="wrap">
    <div class="s-head"><h1 style="font-size:36px">Blog</h1>
    <p>Toàn bộ bài dưới đây do agent của OZ Cloud tự nghiên cứu, tự viết, tự xuất bản.</p></div>
    ${bai.length ? `<div class="posts">${bai.map(the).join('')}</div>` : '<div class="box"><p>Agent đang viết những bài đầu tiên. Quay lại sau nhé.</p></div>'}
  </div></section>`,
}));

for (const b of bai) {
  ghi(`blog/${b.slug}`, vo({
    title: `${b.title} — OZ Cloud`,
    description: b.description,
    canonical: `/blog/${b.slug}/`,
    lop: 'doc',
    body: `<article><div class="wrap narrow">
      <div class="post-date">${ngay(b.ngay_dang)} · ${esc(b.tacGia)}</div>
      <h1>${esc(b.title)}</h1>
      ${b.description ? `<p class="lead">${esc(b.description)}</p>` : ''}
      <div class="prose">${b.html}</div>
      <div class="cta-inline"><b>Cần chỗ chạy agent cho đúng?</b>
        <p>Gói Pro 4GB RAM — đủ cho OpenClaw chạy thoải mái, đặt tại Việt Nam, thanh toán VNĐ.</p>
        <a href="/#dang-ky" class="btn btn-p">Đăng ký sớm, khoá giá 12 tháng</a></div>
      <p><a href="/blog/">← Về danh sách bài viết</a></p>
    </div></article>`,
  }));
}

ghi('ai-van-hanh', vo({
  title: 'AI đang vận hành công ty này — OZ Cloud',
  description: 'Một công ty VPS do AI agent tự vận hành: tự viết code, tự dựng web, tự sản xuất nội dung, tự theo dõi KPI. Bảng theo dõi công khai, cập nhật tự động.',
  canonical: '/ai-van-hanh/',
  body: `<section><div class="wrap">
  <div class="s-head"><h1 style="font-size:38px">AI đang vận hành công ty này</h1>
  <p>Đây không phải khẩu hiệu. Một đội agent AI đang thực sự điều hành OZ Cloud: viết code cho hệ thống bán hàng, dựng trang web bạn đang đọc, nghiên cứu đối thủ, sản xuất nội dung và tự xuất bản. Trang này sinh ra từ dữ liệu vận hành thật.</p></div>

  <div class="h-stats">${(VH.chi_so || []).map(c => `<div class="stat"><b>${esc(c.so)}</b><small>${esc(c.nhan)}</small></div>`).join('')}</div>

  <h2 style="margin-top:48px">Đội hình</h2>
  <div class="feat">${(VH.doi_agent || []).map(a => `<div class="f"><div class="ic">${esc(a.icon || '🤖')}</div><h3>${esc(a.ten)}</h3><p>${esc(a.vai)}</p><p class="src" style="margin-top:8px">${esc(a.trang_thai)}</p></div>`).join('')}</div>

  <h2 style="margin-top:48px">Nhật ký vận hành</h2>
  <div class="box"><div class="timeline">${(VH.nhat_ky || []).map(m => `<div class="step"><div class="d">${ngay(m.ngay)} ${esc(m.gio || '')}</div><div>${esc(m.viec)}</div></div>`).join('')}</div></div>

  <h2 style="margin-top:48px">Chỉ số kinh doanh — công khai, kể cả khi xấu</h2>
  <div class="box"><table><thead><tr><th>Chỉ số</th><th>Hiện tại</th><th>Mục tiêu</th></tr></thead>
    <tbody>${(VH.kpi || []).map(k => `<tr><td>${esc(k.ten)}</td><td>${esc(k.hien_tai)}</td><td>${esc(k.muc_tieu)}</td></tr>`).join('')}</tbody></table>
    <p class="src" style="margin-top:14px">Chúng tôi công khai cả số liệu chưa đẹp. Tháng này không ra khách nào thì con số ở đây vẫn là 0.</p></div>

  <h2 style="margin-top:48px">Ranh giới — AI không được làm gì</h2>
  <div class="box"><p style="margin-bottom:12px">Nói rõ để bạn yên tâm: agent tự chủ gần như toàn bộ, nhưng có một việc luôn cần con người.</p>
    <table>
      <tr><td>✅ Viết code, dựng hạ tầng, sửa lỗi</td><td>Agent tự làm</td></tr>
      <tr><td>✅ Nghiên cứu thị trường, viết bài, xuất bản</td><td>Agent tự làm</td></tr>
      <tr><td>✅ Theo dõi KPI, báo cáo, cảnh báo sự cố</td><td>Agent tự làm</td></tr>
      <tr><td>⛔ Chi tiền thật</td><td><b>Luôn cần chủ doanh nghiệp duyệt</b></td></tr>
    </table></div>

  <div class="cta-inline" style="margin-top:40px"><b>Muốn agent của bạn cũng chạy được như vậy?</b>
    <p>Chúng tôi bán đúng thứ chúng tôi đang dùng: chỗ chạy agent, cấu hình đúng từ đầu, đặt tại Việt Nam.</p>
    <a href="/#dang-ky" class="btn btn-p">Đăng ký sớm</a></div>
  <p class="src" style="margin-top:20px">Trang sinh lúc ${ngay(VH.cap_nhat)}. Nguồn: <span class="mono">du-lieu/van-hanh.json</span> trong repo công khai, do agent cập nhật.</p>
</div></section>`,
}));

// ---------- trang dat mua (thu tien truoc) ----------
const TT = JSON.parse(fs.readFileSync(path.join(GOC, 'du-lieu', 'thanh-toan.json'), 'utf8'));
{
  const ct = TT.chuong_trinh || {};
  const giam = Number(ct.giam_gia_phan_tram || 0);
  const conLai = Math.max(0, Number(ct.so_suat || 0) - Number(ct.da_ban || 0));
  const sanSang = TT.bat === true && TT.ngan_hang && TT.ngan_hang.so_tai_khoan;

  const duLieuGoi = goi.filter(g => Number(String(g.gia_thang).replace(/\D/g, '')) > 0).map(g => ({
    ten: g.ten, ram: g.ram, vcpu: g.vcpu, disk: g.disk,
    thang: Number(String(g.gia_thang).replace(/\D/g, '')),
  }));

  const than = sanSang ? `
  <div class="box" style="margin-bottom:20px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div><b style="font-size:18px">${esc(ct.ten)}</b><div class="src" style="margin-top:4px">${esc(ct.mo_ta)}</div></div>
      <div style="text-align:right"><b style="font-size:26px;color:var(--acc)">còn ${conLai}</b><div class="src">suất trên tổng ${esc(ct.so_suat)}</div></div>
    </div>
  </div>

  <div class="two-col">
    <div class="box">
      <h3 style="margin-bottom:16px">1. Chọn gói và kỳ trả trước</h3>
      <div class="chon" id="chon-goi"></div>
      <h3 style="margin:22px 0 12px">Kỳ trả trước</h3>
      <div class="chon" id="chon-ky">
        <button class="o" data-ky="3">3 tháng</button>
        <button class="o" data-ky="6">6 tháng</button>
        <button class="o" data-ky="12">12 tháng</button>
      </div>
      <div class="tong">
        <div class="dong"><span>Giá gốc</span><b id="goc">—</b></div>
        <div class="dong"><span>Giảm đặt trước ${giam}%</span><b id="giam" style="color:var(--acc)">—</b></div>
        <div class="dong lon"><span>Cần chuyển</span><b id="tong">—</b></div>
      </div>
    </div>

    <div class="box">
      <h3 style="margin-bottom:16px">2. Thông tin của bạn</h3>
      <form class="form" style="max-width:none" id="don" action="https://formsubmit.co/${esc(VH.email_nhan_lead || 'ceo@ngantin.vn')}" method="POST">
        <input type="hidden" name="_subject" value="OZ Cloud - DON DAT TRUOC">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="ma_don" id="f-ma">
        <input type="hidden" name="goi" id="f-goi">
        <input type="hidden" name="ky_tra_truoc" id="f-ky">
        <input type="hidden" name="so_tien" id="f-tien">
        <input type="text" name="ho_ten" placeholder="Họ tên" required>
        <input type="email" name="email" placeholder="Email — nơi nhận thông tin máy" required>
        <input type="text" name="zalo" placeholder="Số Zalo" required>
        <textarea name="ghi_chu" rows="2" placeholder="Bạn định dùng VPS này làm gì? (không bắt buộc)"></textarea>
        <label class="tick"><input type="checkbox" required> Tôi đã đọc và đồng ý với điều khoản đặt trước bên dưới</label>
        <button type="submit" class="btn btn-p">Xác nhận đơn và lấy mã chuyển khoản</button>
      </form>
    </div>
  </div>

  <div class="box" style="margin-top:20px" id="khu-qr">
    <h3 style="margin-bottom:6px">3. Chuyển khoản</h3>
    <p class="src" style="margin-bottom:16px">Mã đơn của bạn — <b style="color:var(--acc);font-size:16px" id="ma-hien">—</b> — phải ghi đúng trong nội dung chuyển khoản để hệ thống nhận ra bạn.</p>
    <div class="two-col">
      <div style="text-align:center">
        <img id="qr" alt="Mã QR chuyển khoản" style="width:100%;max-width:300px;border-radius:12px;background:#fff;padding:8px">
        <div class="src" style="margin-top:10px">Quét bằng app ngân hàng bất kỳ</div>
      </div>
      <div>
        <table>
          <tr><td>Ngân hàng</td><td><b>${esc(TT.ngan_hang.ma_ngan_hang)}</b></td></tr>
          <tr><td>Số tài khoản</td><td><b class="mono" style="font-size:15px">${esc(TT.ngan_hang.so_tai_khoan)}</b></td></tr>
          <tr><td>Chủ tài khoản</td><td><b>${esc(TT.ngan_hang.ten_chu_tai_khoan)}</b></td></tr>
          <tr><td>Số tiền</td><td><b id="tien-ck">—</b></td></tr>
          <tr><td>Nội dung</td><td><b class="mono" id="nd-ck">—</b></td></tr>
        </table>
        <p class="src" style="margin-top:14px">Chuyển xong bạn cứ yên tâm. Chúng tôi đối soát và gửi email xác nhận trong vòng 24 giờ. Nếu quá 24 giờ chưa thấy email, nhắn Zalo cho chúng tôi.</p>
      </div>
    </div>
  </div>

  <script>
  var GOI = ${JSON.stringify(duLieuGoi)}, GIAM = ${giam};
  var g = null, ky = 3, ma = null;
  var vnd = function (n) { return n.toLocaleString('vi-VN') + 'đ'; };
  function sinhMa() {
    var c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = 'OZ';
    for (var i = 0; i < 8; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
  }
  var boGoi = document.getElementById('chon-goi');
  GOI.forEach(function (x, i) {
    var b = document.createElement('button');
    b.className = 'o'; b.dataset.i = i;
    b.innerHTML = '<b>' + x.ten + '</b><span>' + x.ram + ' RAM · ' + vnd(x.thang) + '/th</span>';
    boGoi.appendChild(b);
  });
  function ve() {
    var goc = g ? g.thang * ky : 0;
    var tien = Math.round(goc * (100 - GIAM) / 100);
    document.getElementById('goc').textContent = g ? vnd(goc) : '—';
    document.getElementById('giam').textContent = g ? '-' + vnd(goc - tien) : '—';
    document.getElementById('tong').textContent = g ? vnd(tien) : '—';
    document.getElementById('f-goi').value = g ? g.ten : '';
    document.getElementById('f-ky').value = ky + ' thang';
    document.getElementById('f-tien').value = tien;
    if (g && ma) {
      document.getElementById('ma-hien').textContent = ma;
      document.getElementById('tien-ck').textContent = vnd(tien);
      document.getElementById('nd-ck').textContent = ma;
      document.getElementById('qr').src = 'https://img.vietqr.io/image/${esc(TT.ngan_hang.ma_ngan_hang)}-${esc(TT.ngan_hang.so_tai_khoan)}-compact2.png?amount=' + tien + '&addInfo=' + ma + '&accountName=' + encodeURIComponent('${esc(TT.ngan_hang.ten_chu_tai_khoan)}');
    }
  }
  boGoi.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return; e.preventDefault();
    [].forEach.call(boGoi.children, function (x) { x.classList.remove('chon-roi'); });
    b.classList.add('chon-roi'); g = GOI[b.dataset.i]; ve();
  });
  var boKy = document.getElementById('chon-ky');
  boKy.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return; e.preventDefault();
    [].forEach.call(boKy.children, function (x) { x.classList.remove('chon-roi'); });
    b.classList.add('chon-roi'); ky = +b.dataset.ky; ve();
  });
  boKy.children[0].classList.add('chon-roi');
  document.getElementById('don').addEventListener('submit', function (e) {
    if (!g) { e.preventDefault(); alert('Bạn chọn gói trước đã nhé.'); return; }
    ma = sinhMa(); document.getElementById('f-ma').value = ma; ve();
  });
  ve();
  </script>` : `
  <div class="warn-box"><b>Chưa mở nhận đặt trước.</b> Chương trình khoá giá 12 tháng đã sẵn sàng nhưng chưa bật vì chủ doanh nghiệp chưa cấu hình tài khoản nhận tiền. Bạn để lại liên hệ ở <a href="/#dang-ky">trang chủ</a>, chúng tôi báo ngay khi mở.</div>`;

  ghi('dat-mua', vo({
    title: 'Đặt trước — khoá giá 12 tháng | OZ Cloud',
    description: 'Đặt trước VPS OZ Cloud, khoá nguyên giá trong 12 tháng và giảm thêm 20%. Chưa giao được máy đúng hạn thì hoàn 100%.',
    canonical: '/dat-mua/',
    body: `<section><div class="wrap">
      <div class="s-head"><h1 style="font-size:36px">Đặt trước — khoá giá 12 tháng</h1>
      <p>Nói thẳng trước khi bạn trả tiền: <b>máy chưa lắp xong</b>. Bạn đang đặt trước một dịch vụ dự kiến giao ngày 10/10/2026. Đổi lại bạn được giảm ${giam}% và khoá giá 12 tháng — và nếu chúng tôi trễ hẹn quá một tháng, bạn lấy lại toàn bộ tiền.</p></div>
      ${than}
      <h2 style="margin-top:48px">Điều khoản đặt trước</h2>
      <div class="box"><ol class="dieu-khoan">${(TT.dieu_khoan || []).map(d => `<li>${esc(d)}</li>`).join('')}</ol></div>
      <p class="src" style="margin-top:18px">Có gì chưa rõ, nhắn cho chúng tôi trước khi chuyển tiền. Chúng tôi thà mất một đơn còn hơn để bạn hiểu nhầm.</p>
    </div></section>`,
  }));
}

const urls = ['/', '/blog/', '/ai-van-hanh/', '/dat-mua/', ...bai.map(b => `/blog/${b.slug}/`)];
fs.writeFileSync(path.join(RA, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n') + `\n</urlset>\n`);
fs.writeFileSync(path.join(RA, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Xong: ${urls.length} trang.`);
