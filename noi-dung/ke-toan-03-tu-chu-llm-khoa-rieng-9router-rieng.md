---
title: "Trợ lý kế toán của bạn đang dùng AI của ai? Ba cách tự chủ LLM trên VPS OZ Cloud — kể cả gom hết gói Gemini, ChatGPT, Claude bạn đang có"
description: "Từ sự cố lúc 12:48 ngày 07/09/2026 (bốn model cùng hết hạn mức, trợ lý im hai lượt), OZ Cloud tách khoá AI riêng cho từng máy và mở ba chế độ cho khách: dùng AI của OZ, dùng API key riêng bằng một tin nhắn Zalo, hoặc chạy 9Router riêng trên chính VPS để gom các gói thuê bao đang có. Kèm số token thật, giá thật và những việc OZ nhất định không làm."
keywords: "tự chủ LLM, API key riêng, BYOK, 9Router trên VPS, trợ lý kế toán Zalo, chi phí token AI, Gemini API key, DeepSeek, gói Doanh nghiệp OZ Cloud, OpenClaw model fallback"
date: 2026-09-07
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Trợ lý kế toán của bạn đang dùng AI của ai? Ba cách tự chủ LLM trên VPS OZ Cloud

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud. Bài viết với sự hỗ trợ của AI (theo Luật Trí tuệ nhân tạo, hiệu lực 01/03/2026).*

Hai bài trước kể [một ngày làm việc với trợ lý kế toán trên Zalo](/blog/ke-toan-01-mot-ngay-voi-tro-ly-ai-tren-zalo/) và [quy trình 5 bước giao một VPS kế toán gói Doanh nghiệp](/blog/ke-toan-02-quy-trinh-giao-vps-ke-toan-goi-doanh-nghiep/). Bài này trả lời câu hỏi mà khách kỹ tính hỏi đầu tiên: **trợ lý đó dùng AI của ai, ai trả tiền, tôi có được dùng tài khoản của tôi không, và nếu AI đó chết thì sao?**

Chúng tôi trả lời bằng chuyện thật xảy ra ngày 07/09/2026, và bằng ba chế độ khách tự chọn ngay hôm nay.

## 12:48 ngày 07/09: bốn model cùng chết, trợ lý im hai lượt

Trợ lý kế toán chạy trên OpenClaw, gọi model qua một bộ định tuyến (9Router) với chuỗi dự phòng bốn model. Lúc 12:48, nhà cung cấp của model chính báo hết hạn mức; ba model dự phòng cũng thuộc các gói có hạn mức chung, chết theo. Nhật ký ghi đúng một dòng: `All models failed (4)`. Trợ lý im hai lượt, lúc 12:48 và 12:52, rồi hệ thống canh lỗi báo về Zalo quản trị.

Sửa ngay trong ngày, và sửa cả nguyên nhân gốc:

| Việc | Trước 07/09 | Sau 07/09 |
|---|---|---|
| Khoá gọi AI | Một khoá dùng chung cho trạm điều hành và mọi VPS khách | **Mỗi VPS một khoá riêng**: hết hạn mức máy nào biết máy đó, thu hồi riêng, đếm riêng |
| Model chết | Người phải phát hiện và đổi tay | Cron 10 phút dò model bằng lệnh gọi công cụ thật; model chính chết 2 lần liên tiếp thì tự chọn 4 model còn sống, áp cho mọi VPS, báo Zalo 1 tin, tự quay về khi model ưu tiên sống lại |
| Khách muốn tự chủ | Không có đường | Ba chế độ bên dưới |

## Ba chế độ, đổi qua lại bằng một tin nhắn

| | AI của OZ (mặc định) | API key riêng của bạn | 9Router riêng trên VPS của bạn |
|---|---|---|---|
| Ai trả tiền AI | OZ, đã gồm trong gói | bạn, theo lượt dùng | bạn, theo gói thuê bao đang có |
| Bạn phải làm gì | không gì cả | 1 tin nhắn Zalo cho trợ lý | đăng nhập dashboard trên máy của bạn, nối tài khoản, 1 tin nhắn |
| OZ nhìn thấy khoá/tài khoản của bạn? | không (khoá là của OZ) | **không** — khoá nằm trên VPS của bạn | **không** — bạn tự đăng nhập, OZ không cầm |
| Khi model lỗi | OZ tự xoay | trợ lý chuyển sang model dự phòng bạn khai | 9Router chuyển gói theo Combo bạn xếp |
| Hợp với ai | đa số phòng kế toán | doanh nghiệp muốn hoá đơn AI riêng, chọn model theo ý | người đã có sẵn nhiều gói Gemini/ChatGPT/Claude/Copilot |

Trợ lý chỉ nhận các lệnh này qua **tin nhắn riêng** của chủ nhân (người đã nhập mã chủ nhân khi nhận máy). Nhắn trong nhóm không có tác dụng — cố ý như vậy để khoá không lọt vào nhật ký nhóm.

## Chế độ 2: API key riêng — một dòng, trợ lý tự kiểm rồi mới áp

Bạn lấy API key ở nhà cung cấp mình chọn, rồi nhắn riêng cho trợ lý:

```
llm gemini gemini-2.5-flash AIzaSy…
llm deepseek deepseek-chat sk-…
llm openrouter google/gemini-2.5-flash,deepseek/deepseek-chat <khoá OpenRouter>
llm tuy-chinh https://api.nha-cung-cap.com/v1 ten-model sk-…
```

Nhà cung cấp hỗ trợ sẵn: Gemini, OpenAI, DeepSeek, OpenRouter, Zhipu (GLM), Qwen, Moonshot (Kimi), Groq, xAI, Anthropic, và bất kỳ dịch vụ nào theo chuẩn OpenAI qua `llm tuy-chinh`. Nhiều model cách nhau dấu phẩy: model đầu là chính, các model sau là dự phòng.

Trợ lý làm gì trong 30–60 giây sau đó, đúng thứ tự:

1. Gọi thử nhà cung cấp bằng một câu ngắn với chính khoá bạn đưa. Khoá sai, hết tiền, sai tên model — dừng ở đây, báo lý do.
2. Ghi cấu hình mới vào máy của bạn, khởi động lại bộ não.
3. Hỏi trợ lý một câu thật. Trả lời được mới tính là xong.
4. Bất kỳ bước nào hỏng: **tự quay về cấu hình cũ**, không có phút nào trợ lý bị bỏ mặc với cấu hình lỗi.

Chúng tôi thử cả ba đường trên máy thử nghiệm trước khi mở cho khách: khoá sai bị nhà cung cấp trả 401 và trợ lý lùi sạch; khoá đúng chạy qua đủ ba bước; `llm oz` quay về AI của OZ bình thường.

Ba lệnh còn lại: `llm` (đang dùng gì, đã tốn bao nhiêu), `llm oz` (về AI của OZ), và nhắn lại `llm ...` bất cứ lúc nào để đổi khoá hay model.

Khoá lưu trong một tệp chỉ chủ máy đọc được trên VPS của bạn, không đi qua bộ não AI, không ghi vào nhật ký, và trợ lý nhắc bạn xoá tin nhắn ngay sau khi nạp. Khi bạn dùng khoá riêng, OZ ngừng tự đổi model trên máy đó — đó là máy của bạn.

## Tốn bao nhiêu? Số đo thật ba ngày đầu

Lệnh `llm` đếm từ nhật ký của chính OpenClaw trên máy. VPS kế toán đầu tiên, từ 05/09 đến 07/09/2026 (ba ngày, gồm cả các lượt thử nghiệm của đội kỹ thuật): **106 lượt gọi, 785.000 token vào, 38.000 token ra**; 93 lượt là agent kế toán, 13 lượt là agent soạn thảo.

Nhân với bảng giá công khai đội đã khảo sát ngày 18/08/2026 (USD cho 1 triệu token, lấy từ trang giá công khai của từng nhà cung cấp; giá có thể đã đổi, hãy kiểm lại trước khi quyết):

| Nếu bạn dùng khoá riêng với | Giá vào / ra | Ba ngày đó tốn | Ước tính một tháng cùng nhịp |
|---|---|---|---|
| Gemini 2.5 Flash-Lite | 0,10 / 0,40 | ≈ 0,09 USD | ≈ 1 USD |
| DeepSeek v4-flash | 0,22 / 0,66 | ≈ 0,20 USD | ≈ 2 USD |
| GLM-5.2 (tầng mạnh) | 1,40 / 4,40 | ≈ 1,27 USD | ≈ 13 USD |

Ước tính tháng là nhân thẳng nhịp ba ngày đầu, chưa có khách dùng thật, chỉ để bạn thấy thứ tự độ lớn. Điểm cần nhớ: với việc kế toán thường ngày, tiền AI nhỏ hơn nhiều so với tiền máy; chỗ đáng lo không phải giá mà là **hạn mức** — và đó chính là lý do có chế độ 3.

## Chế độ 3: 9Router riêng trên VPS của bạn — gom các gói bạn đang có

Nhiều chủ doanh nghiệp đã trả tiền cho Gemini, ChatGPT Plus, Claude Pro, GitHub Copilot, có khi cả ba. Câu hỏi hợp lý: "sao không cho trợ lý xài luôn?". Đó chính là việc 9Router làm — phần mềm mã nguồn mở gom nhiều tài khoản/thuê bao thành một điểm gọi duy nhất, tự chuyển gói khi một gói hết hạn mức. Trạm điều hành của OZ Cloud chạy nó từ tháng 8 ([bài xưởng cắm token](/blog/9router-01-xuong-cam-token-tren-vps/)).

Từ 07/09, OZ cài 9Router **riêng trên VPS của bạn** khi bạn yêu cầu. Quy trình:

| Bước | Ai làm | Việc |
|---|---|---|
| 1 | OZ | Cài 9Router như một dịch vụ trên máy của bạn; dashboard tại địa chỉ máy, cổng 20128; mật khẩu lần đầu sinh ngẫu nhiên, trợ lý nhắn riêng cho chủ nhân |
| 2 | Bạn | Đăng nhập, vào Settings đổi mật khẩu |
| 3 | Bạn | Providers → Connect: đăng nhập từng tài khoản của bạn (Codex, Claude Code, Copilot, Kiro miễn phí), hoặc dán API key Gemini/nhà cung cấp khác |
| 4 | Bạn | Combos → Create: xếp thứ tự rẻ/nhanh trước, mạnh sau, ví dụ `gemini-flash → cx/gpt-5.5 → kr/claude-sonnet-4.5` |
| 5 | Bạn | API Keys → Create Key, rồi nhắn trợ lý: `llm 9router <tên combo> <khoá>` |
| 6 | Trợ lý | Gọi thử, áp, hỏi thật, báo XONG — y hệt chế độ 2 |

Từ đó mọi lượt AI của trợ lý đi qua 9Router trên chính máy bạn; xem thống kê ở dashboard 9Router hoặc nhắn `llm`.

Hai điều nói thẳng trước khi bạn chọn chế độ này:

- **Điều khoản.** Gói Gemini/ChatGPT Plus/Claude Pro là gói cá nhân, mua để dùng trong ứng dụng chính thức. Dùng chúng qua bộ định tuyến cho một trợ lý công ty là việc bạn phải tự đọc điều khoản gói mình mua và tự chịu trách nhiệm với tài khoản. OZ hỗ trợ kỹ thuật, không khuyến khích, và ghi rõ điều này trong hợp đồng. Muốn an toàn tuyệt đối: chế độ 2 với API key.
- **Chúng tôi mới kiểm được một nửa.** Trên máy thử nghiệm ngày 07/09: cài dịch vụ, đăng nhập, tạo khoá, liệt kê model đều chạy. Phần đăng nhập OAuth của Codex và Claude Code từ máy tính của khách (trình duyệt trả về `localhost:1455`) chưa thử với tài khoản thật; Kiro và Copilot dùng mã thiết bị nên không vướng. Khi kiểm xong sẽ cập nhật ngay tại bài này.

## Những việc OZ nhất định không làm

- Không nhận mật khẩu Google, ChatGPT hay Claude của bạn để "đăng nhập hộ". Trợ lý chỉ nhận API key hoặc khoá 9Router, và chỉ trong tin nhắn riêng của chủ nhân.
- Không giữ bản sao khoá của bạn ở trạm điều hành. Khoá chỉ có trên VPS của bạn; xoá máy là hết.
- Không chuyển VPS sang Windows để AI "tự bấm chuột" vào Gmail hay Drive của bạn. Email và Drive được nối bằng cách khác, chỉ đọc, sẽ có bài riêng.
- Không hứa hạn mức vô hạn. Khi cả chuỗi model chết, trợ lý báo lỗi rõ ràng thay vì im lặng — và hệ thống canh lỗi báo về OZ trong vòng 10 phút.

## Đang triển khai, chưa mở

Ba việc đã có trên máy thử nghiệm nhưng chưa bàn giao cho khách: mở bảng điều khiển OpenClaw (cổng 18789) cho khách xem phiên chat và cấu hình; cổng quản trị OZ Cloud gom mọi máy vào một trang; và hạn mức cứng theo tháng cho từng máy. Cái nào xong sẽ ghi vào [nhật ký vận hành](/ai-van-hanh/).

## Bắt đầu

Gói Doanh nghiệp (12 vCPU · 32 GB RAM · 400 GB SSD, 999.000 đ/tháng) đã gồm AI của OZ; hai chế độ còn lại nằm trong gói — OZ chỉ hỗ trợ kỹ thuật, tiền AI bạn trả thẳng cho nhà cung cấp bạn chọn. Xem [bảng giá](/#bang-gia) hoặc [chọn gói](/chon-goi/). Nhận máy xong, nhắn `llm` cho trợ lý là thấy ngay máy mình đang dùng AI nào.
