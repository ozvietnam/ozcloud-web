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
  <div class="h-tag">● Họ bán máy chủ. Chúng tôi làm agent.</div>
  <h1>Chỗ cho agent<br><em>của bạn sống</em></h1>
  <p class="lead">Máy chủ đặt tại Việt Nam, ping nội địa dưới 20ms. Nhưng cái bạn thật sự cần không phải cái máy — mà là người hiểu agent của bạn đang chạy gì. Chúng tôi không bán VPS cài sẵn OpenClaw rồi để bạn tự bơi. Chúng tôi bán chỗ chạy agent — do người đang nuôi một đội agent thật 24/7 vận hành. Toàn bộ công ty này đang được chính đội AI đó điều hành.</p>
  <div class="h-cta"><a href="/dat-mua/" class="btn btn-p">Đặt trước, khoá giá 12 tháng</a><a href="/phuong-an/" class="btn btn-g">Việc của tôi làm thế nào?</a></div>
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
  <div class="warn-box"><b>Nói thật về gói 49k:</b> 1GB RAM <b>không đủ chạy OpenClaw</b> — tài liệu chính thức ghi rõ 1GB sẽ bị OOM-kill (exit code 137), tối thiểu 2GB và 4GB mới thoải mái. Gói 49k dành cho người học Linux hoặc chạy web nhỏ. Muốn chạy agent thì lấy Pro 4GB. <a href="/chon-goi/" style="color:var(--acc)">Chưa chắc mình cần gì? Trả lời 4 câu →</a></div>
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

// ---------- trang chon goi (cong cu tu van truoc ban hang) ----------
{
  const duLieuGoi = goi.map(g => ({
    ten: g.ten, ram: Number(String(g.ram).replace(/\D/g, '')), vcpu: Number(g.vcpu),
    disk: g.disk, thang: Number(String(g.gia_thang).replace(/\D/g, '')), ghi_chu: g.ghi_chu,
  }));

  ghi('chon-goi', vo({
    title: 'Chọn gói VPS cho agent của bạn — công cụ tư vấn | OZ Cloud',
    description: 'Trả lời 4 câu, biết ngay cần bao nhiêu RAM để chạy OpenClaw, gói nào hợp và tốn khoảng bao nhiêu tiền gọi mô hình mỗi tháng.',
    canonical: '/chon-goi/',
    body: `<section><div class="wrap">
  <div class="s-head"><h1 style="font-size:36px">Chọn gói cho đúng ngay từ đầu</h1>
  <p>Phần lớn người mới chọn sai ở cùng một chỗ: lấy gói rẻ nhất rồi máy chết lúc nửa đêm. Trả lời 4 câu, chúng tôi nói thẳng bạn cần gì — kể cả khi câu trả lời là "gói rẻ nhất của chúng tôi không hợp với bạn".</p></div>

  <div class="two-col">
    <div class="box">
      <h3 style="margin-bottom:14px">1. Bạn định cho agent làm việc gì?</h3>
      <div class="chon" id="c-viec">
        <button class="o" data-ram="2" data-api="1"><b>Học thử, nghịch cho biết</b><span>Chưa chạy thật</span></button>
        <button class="o" data-ram="4" data-api="2"><b>Trả khách Zalo, Facebook</b><span>Bot trực tin nhắn</span></button>
        <button class="o" data-ram="4" data-api="2"><b>Tóm tắt, soạn báo cáo</b><span>Đọc mail, đọc file, viết lại</span></button>
        <button class="o" data-ram="8" data-api="3"><b>Tự động hoá nội bộ nhiều bước</b><span>Nối nhiều hệ thống, chạy quy trình</span></button>
        <button class="o" data-ram="8" data-api="4"><b>Chạy liên tục 24/7 không nghỉ</b><span>Theo dõi, cảnh báo, giao dịch</span></button>
      </div>

      <h3 style="margin:22px 0 12px">2. Mỗi ngày agent phải xử lý bao nhiêu lượt?</h3>
      <div class="chon" id="c-luot">
        <button class="o" data-ram="0" data-api="1"><b>Dưới 20</b><span>Cá nhân, thử nghiệm</span></button>
        <button class="o" data-ram="0" data-api="2"><b>20 đến 100</b><span>Shop nhỏ</span></button>
        <button class="o" data-ram="2" data-api="3"><b>100 đến 500</b><span>Shop đông khách</span></button>
        <button class="o" data-ram="4" data-api="5"><b>Trên 500</b><span>Doanh nghiệp</span></button>
      </div>

      <h3 style="margin:22px 0 12px">3. Có muốn chạy mô hình ngay trên máy không?</h3>
      <div class="chon" id="c-model">
        <button class="o" data-ram="0" data-api="0"><b>Không, dùng dịch vụ ngoài</b><span>Rẻ hơn, dễ hơn</span></button>
        <button class="o" data-ram="12" data-api="-2"><b>Có, muốn tự chủ dữ liệu</b><span>Cần rất nhiều bộ nhớ</span></button>
      </div>

      <h3 style="margin:22px 0 12px">4. Có cần agent tự mở trình duyệt không?</h3>
      <div class="chon" id="c-browser">
        <button class="o" data-ram="0" data-api="0"><b>Không cần</b><span>Chỉ nhắn tin, đọc file</span></button>
        <button class="o" data-ram="2" data-api="0"><b>Có cần</b><span>Tự vào web lấy dữ liệu</span></button>
      </div>
    </div>

    <div class="box" id="ket-qua">
      <h3 style="margin-bottom:14px">Kết quả</h3>
      <div id="chua"><p style="color:var(--tx2);font-size:15px">Trả lời cả 4 câu bên trái, kết quả hiện ở đây.</p></div>
      <div id="hien" style="display:none">
        <div class="tong" style="margin-top:0;border-top:none;padding-top:0">
          <div class="dong"><span>Bộ nhớ RAM tối thiểu bạn cần</span><b id="r-ram">—</b></div>
          <div class="dong"><span>Gói phù hợp</span><b id="r-goi" style="color:var(--acc)">—</b></div>
          <div class="dong"><span>Tiền thuê máy</span><b id="r-tien">—</b></div>
          <div class="dong"><span>Tiền gọi mô hình, ước tính</span><b id="r-api">—</b></div>
          <div class="dong lon"><span>Tổng mỗi tháng, ước tính</span><b id="r-tong">—</b></div>
        </div>
        <div id="r-vi-sao" style="margin-top:18px;font-size:14.5px;color:var(--tx2)"></div>
        <div id="r-canh-bao"></div>
        <p style="margin-top:20px"><a href="/dat-mua/" class="btn btn-p">Đặt trước gói này, khoá giá 12 tháng</a></p>
        <p style="margin-top:10px"><a href="/#dang-ky" class="btn btn-g">Chưa chắc, để lại liên hệ tư vấn</a></p>
      </div>
    </div>
  </div>

  <h2 style="margin-top:48px">Vì sao chúng tôi hỏi về bộ nhớ trước tiên</h2>
  <div class="box">
    <p style="color:var(--tx2);font-size:15px;margin-bottom:14px">Tài liệu chính thức của OpenClaw ghi rõ: máy <b>1 GB bộ nhớ sẽ bị hệ thống tắt tiến trình</b> khi dựng, báo mã lỗi 137. Mức tối thiểu là 2 GB, và 4 GB mới gọi là thoải mái.</p>
    <table>
      <tr><th>Bộ nhớ</th><th>Chạy được không</th><th>Thực tế</th></tr>
      <tr><td>1 GB</td><td style="color:var(--tx3)">Không</td><td>Chết giữa chừng, tưởng hỏng máy mà thật ra thiếu bộ nhớ</td></tr>
      <tr><td>2 GB</td><td>Vừa đủ</td><td>Một agent nhẹ, ít việc, không chạy trình duyệt</td></tr>
      <tr><td><b>4 GB</b></td><td><b>Thoải mái</b></td><td>Mức tài liệu chính thức gọi là dư dùng cho một trạm</td></tr>
      <tr><td>8 GB trở lên</td><td>Rộng rãi</td><td>Nhiều agent cùng lúc, có trình duyệt tự động</td></tr>
      <tr><td>16 GB trở lên</td><td>Rộng rãi</td><td>Bắt đầu chạy được mô hình ngay trên máy</td></tr>
    </table>
    <p class="src" style="margin-top:14px">Nguồn: tài liệu cài đặt và phần hỏi đáp chính thức của OpenClaw. Chúng tôi không tự đặt ra con số này — và cũng không giấu nó đi để bán gói rẻ.</p>
  </div>

  <h2 style="margin-top:48px">Về tiền gọi mô hình</h2>
  <div class="box">
    <p style="color:var(--tx2);font-size:15px">Đây là khoản nhiều người bỏ sót. Tiền thuê máy chỉ là một phần — agent còn tốn tiền mỗi lần gọi mô hình ngôn ngữ, và khoản đó trả cho bên khác chứ không trả cho chúng tôi.</p>
    <p style="color:var(--tx2);font-size:15px;margin-top:12px">Người dùng Việt Nam từng báo cáo tốn <b>100 đến 500 đô một tháng</b> khi dùng mô hình đắt nhất cho mọi việc, và giảm còn <b>20 đến 50 đô</b> sau khi định tuyến lại: việc nhẹ dùng mô hình rẻ, việc nặng mới dùng mô hình mạnh.</p>
    <div class="warn-box" style="margin-top:16px"><b>Con số trên trang này là ước tính thô</b> để bạn hình dung, không phải báo giá. Chi phí thật phụ thuộc bạn chọn mô hình nào và cấu hình ra sao. Chúng tôi có hướng dẫn giảm khoản này trong blog, và sẵn sàng cấu hình giúp khi bạn thành khách.</div>
  </div>

  <script>
  var GOI = ${JSON.stringify(duLieuGoi)};
  var chon = { viec: null, luot: null, model: null, browser: null };
  var vnd = function (n) { return n.toLocaleString('vi-VN') + 'đ'; };

  function gan(id, khoa) {
    var bo = document.getElementById(id);
    bo.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; e.preventDefault();
      [].forEach.call(bo.children, function (x) { x.classList.remove('chon-roi'); });
      b.classList.add('chon-roi');
      chon[khoa] = { ram: +b.dataset.ram, api: +b.dataset.api };
      tinh();
    });
  }
  gan('c-viec', 'viec'); gan('c-luot', 'luot'); gan('c-model', 'model'); gan('c-browser', 'browser');

  function tinh() {
    if (!chon.viec || !chon.luot || !chon.model || !chon.browser) return;
    var ram = Math.max(chon.viec.ram, 2) + chon.luot.ram + chon.model.ram + chon.browser.ram;
    var diem = chon.viec.api + chon.luot.api + chon.model.api;

    var g = GOI.filter(function (x) { return x.ram >= ram; })
               .sort(function (a, b) { return a.ram - b.ram; })[0] || GOI[GOI.length - 1];

    var apiThap, apiCao;
    if (diem <= 2) { apiThap = 0; apiCao = 300000; }
    else if (diem <= 4) { apiThap = 250000; apiCao = 800000; }
    else if (diem <= 7) { apiThap = 600000; apiCao = 2000000; }
    else { apiThap = 1500000; apiCao = 5000000; }
    if (chon.model.ram > 0) { apiThap = 0; apiCao = 200000; }

    document.getElementById('chua').style.display = 'none';
    document.getElementById('hien').style.display = 'block';
    document.getElementById('r-ram').textContent = ram + ' GB';
    document.getElementById('r-goi').textContent = g.ten + ' — ' + g.ram + ' GB';
    document.getElementById('r-tien').textContent = vnd(g.thang) + '/tháng';
    document.getElementById('r-api').textContent = apiThap === 0 && apiCao <= 300000
      ? 'gần như không đáng kể' : vnd(apiThap) + ' – ' + vnd(apiCao);
    document.getElementById('r-tong').textContent = vnd(g.thang + apiThap) + ' – ' + vnd(g.thang + apiCao);

    var viSao = '<b>Vì sao ra con số này:</b><br>· Việc bạn chọn cần nền tối thiểu ' + Math.max(chon.viec.ram, 2) + ' GB.';
    if (chon.luot.ram) viSao += '<br>· Lượng việc mỗi ngày cộng thêm ' + chon.luot.ram + ' GB.';
    if (chon.model.ram) viSao += '<br>· Chạy mô hình ngay trên máy cộng thêm ' + chon.model.ram + ' GB — đây là khoản nặng nhất, bù lại gần như không tốn tiền gọi mô hình bên ngoài.';
    if (chon.browser.ram) viSao += '<br>· Trình duyệt tự động cộng thêm ' + chon.browser.ram + ' GB.';
    document.getElementById('r-vi-sao').innerHTML = viSao;

    var cb = '';
    if (ram > 4 && g.ram < ram) cb = '<div class="warn-box" style="margin-top:16px"><b>Nhu cầu của bạn vượt gói lớn nhất chúng tôi bán sẵn.</b> Để lại liên hệ, chúng tôi báo giá riêng thay vì ép bạn vào gói không đủ.</div>';
    else if (ram <= 2) cb = '<div class="warn-box" style="margin-top:16px"><b>Nói thật:</b> nhu cầu của bạn nhẹ tới mức máy 2 GB là đủ. Đừng mua gói to hơn cần thiết — lúc nào đông việc hơn thì nâng, chúng tôi tính lại theo ngày còn lại.</div>';
    else if (chon.model.ram > 0) cb = '<div class="warn-box" style="margin-top:16px"><b>Lưu ý về chạy mô hình tại chỗ:</b> tiết kiệm được tiền gọi mô hình, nhưng mô hình chạy trên máy ảo chậm hơn và kém thông minh hơn dịch vụ ngoài. Nếu chưa từng thử, nên bắt đầu bằng dịch vụ ngoài rồi chuyển sau.</div>';
    document.getElementById('r-canh-bao').innerHTML = cb;
  }
  </script>
</div></section>`,
  }));
}

// ---------- trang phuong an trien khai ----------
const PA = JSON.parse(fs.readFileSync(path.join(GOC, 'du-lieu', 'phuong-an.json'), 'utf8'));
{
  const the = (p) => `
  <article class="pa" id="pa-${esc(p.ma)}">
    <div class="pa-dau">
      <div>
        <div class="pa-nghe">${esc(p.nghe)}</div>
        <h3>${esc(p.ten)}</h3>
        <p class="pa-dau-noi">“${esc(p.noi_dau)}”</p>
      </div>
      <div class="pa-kho" title="Độ khó triển khai">${'●'.repeat(p.do_kho)}${'○'.repeat(3 - p.do_kho)}<span>${p.do_kho === 1 ? 'dễ' : p.do_kho === 2 ? 'vừa' : 'khó'}</span></div>
    </div>

    <div class="pa-luoi">
      <div class="pa-o"><span class="pa-nhan">1 · Máy nào</span>
        <b>${esc(p.vps.goi)} — ${esc(p.vps.ram)}</b>
        <p>${esc(p.vps.vi_sao)}</p></div>

      <div class="pa-o"><span class="pa-nhan">2 · Agent nào</span>
        <b>${esc(p.agent.chinh)}</b>
        <p>${esc(p.agent.vi_sao)}${p.agent.them ? ' — ' + esc(p.agent.them) : ''}</p></div>

      <div class="pa-o"><span class="pa-nhan">3 · Mô hình nào</span>
        <b>${esc(p.mo_hinh.chinh)}</b>
        <p>Dự phòng: ${esc(p.mo_hinh.du_phong)}. ${esc(p.mo_hinh.vi_sao)}${p.mo_hinh.luu_y ? ' <i>' + esc(p.mo_hinh.luu_y) + '</i>' : ''}</p></div>

      <div class="pa-o"><span class="pa-nhan">4 · Nối vào đâu</span>
        <b>${p.ket_noi.map(esc).join(' · ')}</b>
        <p>Đây là chỗ quyết định agent có tới được khách hay không.</p></div>

      <div class="pa-o pa-rong"><span class="pa-nhan">5 · Giao việc ra sao</span>
        <b>${esc(p.giao_viec.kieu)}</b>
        <p>${esc(p.giao_viec.cach)}</p></div>
    </div>

    <div class="pa-chan">
      <div><span>Dựng xong trong</span><b>${esc(p.thoi_gian_dung)}</b></div>
      <div><span>Tiền máy</span><b>${esc(p.chi_phi.may)}</b></div>
      <div><span>Tiền gọi mô hình</span><b>${esc(p.chi_phi.mo_hinh)}</b></div>
    </div>

    <div class="pa-canh-bao"><b>Chúng tôi nói trước:</b> ${esc(p.canh_bao)}</div>
  </article>`;

  ghi('phuong-an', vo({
    title: 'Phương án triển khai agent theo từng nghề | OZ Cloud',
    description: 'Bạn nói công việc, chúng tôi trả lời đủ 5 câu: máy nào, agent nào, mô hình nào, nối vào đâu, giao việc ra sao. Sáu phương án cho sáu nghề, kèm chi phí và cảnh báo.',
    canonical: '/phuong-an/',
    body: `<section><div class="wrap">
  <div class="s-head"><h1 style="font-size:36px">Bạn nói công việc — chúng tôi đưa bản thiết kế</h1>
  <p>Mua máy chủ xong rồi ngồi nhìn nó là chuyện rất thường. Cái khó không phải cái máy, mà là năm câu hỏi phía sau: <b>máy nào · agent nào · mô hình nào · nối vào đâu · giao việc ra sao</b>. Dưới đây là câu trả lời sẵn cho sáu nghề — kèm cả chỗ dễ hỏng, để bạn biết trước khi trả tiền.</p></div>

  <div class="box" style="margin-bottom:26px">
    ${(PA.luu_y_chung || []).map(x => `<p style="font-size:14.5px;color:var(--tx2);margin-bottom:9px">· ${esc(x)}</p>`).join('')}
  </div>

  ${(PA.phuong_an || []).map(the).join('')}

  <div class="cta-inline" style="margin-top:40px">
    <b>Việc của bạn không nằm trong sáu phương án trên?</b>
    <p>Kể cho chúng tôi nghe bạn đang mất thời gian vào việc gì mỗi ngày. Chúng tôi trả lời đủ năm câu cho đúng việc của bạn — miễn phí, kể cả khi kết luận là bạn chưa cần thuê máy.</p>
    <a href="/#dang-ky" class="btn btn-p">Kể việc của bạn</a>
    <a href="/chon-goi/" class="btn btn-g" style="margin-left:8px">Hoặc tự tính cấu hình</a>
  </div>

  <p class="src" style="margin-top:22px">Sáu phương án này là cách chúng tôi làm thật, không phải bài giới thiệu. Chính công ty này đang chạy bằng hàng đợi việc và bản giao việc như mô tả ở phương án số 6 — bạn xem nhật ký ở <a href="/ai-van-hanh/" style="color:var(--acc)">trang AI vận hành</a>.</p>
</div></section>`,
  }));
}

const urls = ['/', '/blog/', '/ai-van-hanh/', '/dat-mua/', '/chon-goi/', '/phuong-an/', ...bai.map(b => `/blog/${b.slug}/`)];
fs.writeFileSync(path.join(RA, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n') + `\n</urlset>\n`);
fs.writeFileSync(path.join(RA, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Xong: ${urls.length} trang.`);
