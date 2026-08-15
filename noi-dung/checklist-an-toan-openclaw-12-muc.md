---
title: "Checklist tự kiểm OpenClaw an toàn — 12 mục 10 phút"
description: "12 mục tự kiểm nhanh trạm OpenClaw của bạn có an toàn hay không: cổng 18789, firewall, RAM, config.apply, plugin, xác thực Control UI, log phình, sao lưu. Mỗi mục có lệnh kiểm tra cụ thể."
keywords: "kiểm tra bảo mật openclaw, checklist openclaw an toàn, openclaw cổng 18789, bind 127.0.0.1, openclaw exit 137, openclaw config.apply, chống OOM openclaw"
date: 2026-08-15
tac_gia: Agent OZ Cloud
---

# Checklist tự kiểm OpenClaw an toàn — 12 mục 10 phút

Bạn self-host OpenClaw, chạy ổn định, đã vài tuần không đụng tới. Đúng lúc này mới là lúc cần kiểm tra lại — vì đa số máy bị tấn công hay chết đều là máy "để đó một thời gian". Bài này là một bảng 12 mục tự kiểm nhanh. Mỗi mục ghi rõ **cách kiểm tra bằng lệnh gì, dấu hiệu nào là nguy hiểm, và sửa ra sao.** Gõ xong hết chừng 10 phút.

Không phải mục nào cũng phải xanh tươi mới yên tâm — một số mục chỉ cần bạn **biết rõ đang ở trạng thái nào**. Mục nào đỏ thì xử lý, xử lý không được thì tắt dịch vụ chờ hỏi người có kinh nghiệm.

---

## Mục 1 — Cổng 18789 có bind ra ngoài Internet không?

**Cách kiểm tra.** Mở terminal trên VPS, gõ:

```
ss -tlnp | grep 18789
```

Nhìn cột `Local Address`. An toàn: `127.0.0.1:18789`. Nguy hiểm: `0.0.0.0:18789` hoặc `::` (bất kỳ).

**Vì sao nguy hiểm.** Cổng 18789 là giao diện điều khiển mặc định của OpenClaw. Đây chính là cổng bị quét mò hàng loạt. Tháng 02/2026 ghi nhận **40.214 instance OpenClaw phơi ra Internet** trên 28.663 IP, trong đó **12.812 cái khai thác được lệnh từ xa (RCE)**, và **549 cái đã có dấu hiệu bị xâm nhập.** Đừng để máy của bạn góp thêm vào con số đó.

**Cách sửa.** Trong cấu hình, chỉnh để dịch vụ chỉ lắng nghe trên máy:

```
openclaw config set core.control.port 18789
openclaw config set core.control.host 127.0.0.1
```

Nếu dùng docker, nhớ sửa lại cổng publish thành `127.0.0.1:18789:18789` thay vì publish ra mọi interface. Sau đó khởi động lại gateway và kiểm tra lại bằng lệnh `ss` ở trên.

## Mục 2 — Cổng này có nằm sau firewall không?

**Cách kiểm tra.** Kiểm tra firewall đang kích hoạt và xem cổng 18789 có được chặn hoặc chỉ cho phép từ IP của bạn không.

```
ufw status verbose
```

hoặc nếu dùng firewalld:

```
firewall-cmd --list-all
```

**Dấu hiệu nguy hiểm.** Firewall tắt (inactive), hoặc rule đang *allow* cổng 18789 toàn bộ. Nếu cổng nhìn ra ngoài mọi thứ thì đảo ngược nguyên tắc ngay.

**Cách sửa.** Chặn hẳn cổng này từ bên ngoài (chỉ cần `deny`, vì nếu bạn đã bind `127.0.0.1` ở mục 1 thì bên ngoài không cần truy cập trực tiếp). Nếu thật sự cần truy cập từ xa, chỉ cho phép đúng dải IP của bạn, không cho cả thế giới:

```
ufw deny 18789
```

Đây là lớp phòng thủ thứ hai sau cam kết bind nội bộ — làm đủ cả hai kẻo lỡ một chỗ.

## Mục 3 — RAM có đủ cho trạm của bạn không?

**Cách kiểm tra.**

```
free -h
```

**Dấu hiệu nguy hiểm.** Tổng RAM 1 GB, hoặc RAM trống dần về 0 mỗi khi OpenClaw chạy vài tiếng. Triệu chứng kinh điển của thiếu RAM là process bị hệ điều hành giết — bạn thấy tiến trình OpenClaw chết đột ngột.

**Cách sửa.** Lỗi thiếu RAM của OpenClaw có mã rất nhận diện được. Xem core dump / log:

```
docker inspect <container> --format '{{.State.OOMKilled}}'
```

Nếu ra `true`, hoặc trong nhật ký gặp **exit code 137**, là máy đã OOM (Out Of Memory) — hết ram, bị giết. Docs chính thức ghi rõ: **1 GB chắc chắn OOM, 2 GB là tối thiểu cho một agent nhẹ, 4 GB mới thoải mái.** Không có cách chỉnh cấu hình nào cứu nếu RAM thật sự chỉ có 1 GB — phải nâng máy. Mức chuẩn nhất cho self-host ổn định là **4 GB**; gói máy chủ VPS nội địa tầm này thường rơi vào **169.000 đồng/tháng**.

## Mục 4 — Bạn có đang dùng `config.apply` không?

**Cách kiểm tra.** Nhìn lại cách bạn đã sửa config từ trước tới nay, và kiểm tra xem file config hiện tại còn nguyên những gì bạn cấu hình trước đó không:

```
openclaw config get
```

**Dấu hiệu nguy hiểm.** Bạn thường chỉnh bằng cách dán cả file config mới rồi `config.apply`. Nguy cơ: `config.apply` thay thế **toàn bộ** cấu hình — cái gì không có trong file mới sẽ bị xoá, có thể làm mất kênh Zalo, mất model, mất kết nối. Nhiều trạm bị "mất sạch" chỉ vì một lần apply nhầm.

**Cách sửa.** Bỏ thói quen `config.apply` khi chỉ muốn đổi một vài mục. Dùng lệnh sửa từng trường, an toàn hơn nhiều:

```
openclaw config set core.channels.zalo.enabled true
```

Nếu cần thay đổi nhỏ, tìm trong config những khả năng "patch" chỉ phần cần sửa thay vì đè cả file. Nguyên tắc: **đổi cụ thể bằng `config set`, đừng apply cả file.**

## Mục 5 — Plugin và skill bạn cài đang đến từ đâu?

**Cách kiểm tra.** Liệt kê plugin đang bật:

```
openclaw plugins list
```

**Dấu hiệu nguy hiểm.** Cài plugin / skill bừa từ những nguồn không rõ, không đọc mã nguồn, cài theo lời giới thiệu trên mạng. Plugin và skill chạy với quyền trong trạm của bạn — một plugin độc có thể đọc file, lấy token, hoặc gửi dữ liệu đi chỗ khác.

**Cách sửa.** Quy tắc: chỉ cài plugin/skill từ nơi bạn kiểm soát được, đọc qua mã nguồn trước khi cài, và chỉ giữ lại những gì bạn thật sự dùng. Bỏ những plugin không rõ gốc gác:

```
openclaw plugins remove <tên_plugin>
```

Cẩn trọng tương tự với việc dán nội dung từ Internet rồi để bot xử lý sinh lệnh — đây là cách kẻ xấu nhét lệnh vào qua đường trước tin nhắn. Giữ nguyên tắc "không tin nội dung bên ngoài".

## Mục 6 — Xác thực Control UI đã bật chưa?

**Cách kiểm tra.** Xem cấu hình xác thực của giao diện điều khiển:

```
openclaw config get core.control.auth
```

hoặc tìm dòng `auth: none` trong file config.

**Dấu hiệu nguy hiểm.** Control UI cho phép đăng nhập không cần mật khẩu. Nếu cổng này hở ra ngoài (mục 1, 2 đỏ) thì ai vào được trạm của bạn là làm được mọi thứ.

**Cách sửa.** Bật xác thực bằng tài khoản mật khẩu (đừng dùng mật khẩu mặc định):

```
openclaw config set core.control.auth password
```

Đồng thời đặt mật khẩu mạnh, và phải đảm bảo mục 1, 2 xanh trong lúc này. Xác thực chỉ có ý nghĩa khi cổng không phơi ra ngoài.

## Mục 7 — Log và session file có phình không?

**Cách kiểm tra.** Xem dung lượng thư mục dữ liệu của OpenClaw:

```
du -sh ~/.openclaw
```

rồi xem chi tiết hơn:

```
du -sh ~/.openclaw/* | sort -h
```

**Dấu hiệu nguy hiểm.** Thư mục phình to theo thời gian, log, session, file chat mọc không kiểm soát. Về lâu, ổ đầy làm OpenClaw chết không rõ lý do, lại rất khó đoán vì không phải lỗi RAM.

**Cách sửa.** Thiết lập giới hạn xoay vòng cho log và dọn dẹp session cũ định kỳ. Kiểm tra config có cấu hình `maxSize` / giữ session trong bao lâu không và đặt giá trị hợp lý. Hãy để dịch vụ tự dọn hơn là chờ tới khi ổ đầy mới xử.

## Mục 8 — Config có được sao lưu không?

**Cách kiểm tra.** Xem thư mục cấu hình và kiểm tra có bản sao lưu nào không:

```
ls ~/.openclaw/config*   # hoặc thư mục config của bạn
```

và kiểm tra nơi lưu sao lưu:

```
crontab -l | grep -i backup
```

**Dấu hiệu nguy hiểm.** Bạn chưa có bản sao nào, hoặc bản sao nằm *trên cùng máy chủ đó* — máy chết thì mất luôn. Config là thứ bạn mất nhiều thời gian nhất để tinh chỉnh, mất là làm lại từ đầu.

**Cách sửa.** Sao lưu file config ra một nơi khác máy, đặt lịch chạy mỗi đêm bằng cron. Một câu lệnh gần như làm trọn việc:

```
0 3 * * * tar czf /nơi/khác/openclaw-config-$(date +%F).tgz ~/.openclaw
```

Thay `/nơi/khác` bằng một ổ xa hoặc storage ngoài. Giữ vài bản gần nhất rồi xoá bản cũ, đừng để cũ nhầm vài tháng vô ích.

## Mục 9 — Bot online mà không trả lời: đúng nguyên nhân hay đang chờ?

**Cách kiểm tra.** Nếu bot không phản hồi, xem trạng thái kênh và phiên:

```
openclaw gateway status
```

**Dấu hiệu nguy hiểm.** Vội vàng kết luận "hỏng" rồi xào cấu hình. Than phiền "bot online không trả lời" là câu hỏi số một trong docs — đa phần **không phải hỏng.**

**Cách sửa.** Kiểm tra hai thứ trước khi đụng vào gì:
- **Mention gating** thường bật mặc định: trong nhóm chat, **phải @ tên bot** nó mới trả lời. Gửi thử có @ chưa?
- **Tin nhắn riêng (DM)**: người gửi có thể đang bị chặn chờ *duyệt pairing*. Vào danh sách chờ duyệt người gửi, hoặc thêm họ vào allowlist theo đúng cách của kênh.

Xử lý đúng hai điểm này máy hết "chết" ngay. Đừng xoá config để dựng lại — rủi ro mất mát như mục 4.

## Mục 10 — Có lệnh nào đang tranh giành / loop kết nối không?

**Cách kiểm tra.** Xem có nhiều service cùng quản con bot không, và đếm số lần kết nối trong log gần đây:

```
systemctl list-units | grep -i openclaw
```

và:

```
journalctl --since "1 hour ago" | grep -ci "reconnect\|connection"
```

**Dấu hiệu nguy hiểm.** Có hơn một service/systemd cũng đang điều khiển cùng một truy cập, hoặc số lần “reconnect” tăng vọt trong một khoảng ngắn.

**Cách sửa.** Chỉ một thứ quản lý phiên, những cái khác phải tắt. **Vòng lặp reconnect liên tục có thể khiến tài khoản bị giới hạn**: một ca thật ghi nhận 2 systemd service tranh nhau tạo hơn **3.500 chu kỳ kết nối trong ~3 giờ**, dẫn tới tài khoản bị chặn tạm **48–72 giờ**. Tắt service thừa, và nếu bạn thấy loop đang leo thang thì ngắt hẳn rồi mới cấu hình lại cho sạch.

## Mục 11 — Gateway có bị crash-loop không?

**Cách kiểm tra.** Xem trạng thái và số lần khởi động lại của gateway:

```
systemctl status openclaw-gateway
```

hoặc:

```
systemctl show openclaw-gateway | grep NRestarts
```

**Dấu hiệu nguy hiểm.** `NRestarts` cao, hoặc lúc chạy lúc tắt liên tục. Đây có thể là "split-brain": bản nhị phân cũ dùng chung với config mới, hoặc config hỏng sau lần sửa.

**Cách sửa.** Dừng hẳn, kiểm tra lỗi cụ thể trong log:

```
journalctl -u openclaw-gateway -n 50
```

Nếu lỗi do config, khôi phục bản sao lưu (mục 8) thay vì sửa chay. Đảm bảo bản cài đặt và phiên bản config là một cặp khớp nhau, đừng để lẫn bản cũ mới.

## Mục 12 — Token và mật khẩu có bị lộ không, và chữ ký ngày kiểm tra?

**Cách kiểm tra.** Tìm token/key trong những nơi dễ lộ:

```
grep -r "token\|api_key\|secret" ~/.openclaw --include="*.json" --include="*.yaml"
```

và kiểm tra xem mình từng dán token vào chat hoặc commit vào kho mã công khai chưa.

**Dấu hiệu nguy hiểm.** Token nằm trong file commit lên GitHub công khai, trong ảnh chụp màn hình, hoặc gửi trong chat. Một khi token lộ ra rồi là coi như thay đổi — không xoá là xong.

**Cách sửa.** Thay (rotate) token nếu nghi ngờ lộ, không xoá file là đủ. Không commit token lên kho mã, dùng biến môi trường hoặc file cấu hình không đẩy ra ngoài. Cuối cùng, **ghi ngày kiểm tra** vào cuối checklist kèm tên người. Số liệu bảo mật và phiên bản thay đổi liên tục — lần sau bạn mở lại biết ngay tài liệu này còn mới bằng lần nào.

---

## Tóm tắt nhanh

| # | Mục | Lệnh chính | Mức |
|---|-----|-----------|-----|
| 1 | Bind cổng 18789 | `ss -tlnp \| grep 18789` | Phải xanh |
| 2 | Firewall cổng | `ufw status verbose` | Phải xanh |
| 3 | RAM đủ | `free -h` + `docker inspect ... OOMKilled` | Phải xanh |
| 4 | Không lạm dụng config.apply | `openclaw config get` | Thói quen đúng |
| 5 | Nguồn plugin/skill | `openclaw plugins list` | Kiểm soát |
| 6 | Xác thực Control UI | `openclaw config get core.control.auth` | Phải bật |
| 7 | Log/session không phình | `du -sh ~/.openclaw` | Theo dõi |
| 8 | Sao lưu config mỗi đêm | `crontab -l` | Phải có |
| 9 | Bot không trả lời đúng gốc | `openclaw gateway status` | Đúng nguyên nhân |
| 10 | Không loop/tranh kết nối | `systemctl list-units` | Tắt service thừa |
| 11 | Gateway không crash-loop | `systemctl status openclaw-gateway` | Ổn định |
| 12 | Token/mật khẩu không lộ | `grep -r "token" ~/.openclaw` | Không lộ |

**Trạm của tôi kiểm tra ngày:** ___ / ___ / 2026 · **Người kiểm tra:** ___________

Muốn bản in được để tải về kèm ô tick đánh dấu từng mục, xem trang HTML của checklist này trong cùng bộ nội dung.

---

*Nguồn: Kế hoạch marketing OZ Cloud (MARKETING_OPENCLAW.md, 15/08/2026) — số liệu an toàn 40.214 instance / 28.663 IP / 12.812 RCE / 549 bị xâm nhập (SecurityScorecard, 09/02/2026); mức RAM 2/4 GB và lỗi OOM exit 137; cảnh báo config.apply, plugin/skill, mention gating, crash-loop split-brain, vòng lặp reconnect 3.500 chu kỳ gây giới hạn tài khoản 48–72 giờ; nguồn GitHub openclaw/openclaw; Kế hoạch kinh doanh (BUSINESS_PLAN.md, 13/08/2026) — gói Pro 4 GB 169.000đ. Lệnh kiểm tra theo docs.openclaw.ai. Bản nháp do Anh Thắng duyệt trước khi đăng công khai.*
