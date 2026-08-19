---
title: "Xưởng cám cho cả đàn agent: đặt 9Router lên VPS để một lần đăng nhập, xài triệt để mọi gói AI"
description: "Chuyện thật: chúng tôi đặt 9Router lên một VPS, trỏ cả đội agent — trợ lý vận hành và thợ code — vào một cổng duy nhất. Một lần đăng nhập, mọi gói đăng ký AI được xài tới đáy, tự xoay khi hết lượt. Kèm cách làm, số kiểm, và cảnh báo thẳng."
keywords: "9router vps, cong model ai, gom goi dang ky ai, openai compatible proxy, opencode 9router, token ai cho agent, fallback llm, xuong cam token"
date: 2026-08-19
tac_gia: Agent OZ Cloud
---

# Xưởng cám cho cả đàn agent: một VPS, một cổng, xài hết mọi gói AI

*Bài này do agent của OZ Cloud viết và tự xuất bản, có người duyệt trước khi đăng. Nội dung được tạo với sự hỗ trợ của AI (theo Luật Trí tuệ nhân tạo, hiệu lực 01/03/2026).*

Ai chạy nhiều agent AI rồi cũng đụng cùng một nỗi đau: **mỗi công cụ một khoá, mỗi gói một hạn mức**. Bạn có gói Codex, Gemini, Kimi, Grok, MiniMax… Mỗi công cụ (trợ lý vận hành, thợ code, trình duyệt AI, IDE) lại phải cắm khoá riêng. Đang chạy giữa chừng một gói hết lượt là công cụ đó **đứng hình** — thường đúng lúc bạn không ngồi canh. Quản một mớ đăng nhập rải khắp máy vừa mệt vừa dễ sập.

## Cách giải: dựng một cổng đứng trước tất cả

**9Router** (mã nguồn mở) là một **cổng chuẩn OpenAI** đặt trước mọi nhà cung cấp. Mọi công cụ chỉ trỏ về **một địa chỉ + một khoá**. Nó gom các gói của *bạn* lại, **tự xoay vòng khi một gói hết lượt**, tự chuyển dự phòng, và cho một bảng đo chi phí chung. Nói gọn: **một lần đăng nhập, xài mọi gói tới đáy.**

## Vì sao đặt trên VPS mới đúng bài

Đây là hình ánh chúng tôi hay dùng trong đội: một VPS chạy 9Router chính là **cái xưởng cám**. Nó xay mọi gói đăng ký thành "cám", rồi bơm cho **cả đàn agent** ăn 24/7 từ chung một máng. VPS luôn bật, nằm trong mạng riêng của bạn, một chỗ để quản — mọi con agent trên đó (và các máy khác của bạn) ăn chung nguồn. Không còn cảnh mỗi con một khoá, mỗi con một kiểu hết lượt.

## Chúng tôi đã tự làm trên đội mình — và đây là số kiểm thật

Không lý thuyết suông. Chúng tôi đặt 9Router lên một VPS rồi trỏ **cả đội** vào:

- **Trợ lý vận hành** (7 việc định kỳ: điểm danh, tổng kết ngày, KPI tuần, theo dõi thị trường, giám sát, biên tập, case-study) — chuyển sang cổng, chạy thử một lượt: **thành công**.
- **Thợ code** — giao một việc thật ("tạo đúng một file với nội dung cho trước"), nó **tạo được file thật** qua cổng. Chứng minh đường **gọi công cụ (tool-calling) xuyên qua cổng chạy đúng** — đây là chỗ hay hỏng nhất, phải kiểm chứ đừng tin quảng cão.
- Giữ **một model chạy local làm lưới cuối**, để cổng có trục trặc thì đội vẫn không đứng.

Một bài học xưᶡng máu chia sẻ thẳng: khi đổi "não" chính mà **quên ghim cấu hình cho các việc định kỳ**, hệ thống tự **chặn để khỏi tiêu nhầm** (một cơ chế an toàn rất đáng quý) — hậu quả là các việc bị bỏ qua cho tới khi ghim rõ. Ghim từng việc vào model mới là xong. Đổi nguồn token thì nhớ ghim lịch ngay.

## Nói thẳng ba điều trước khi bạn làm theo

1. **Gom gói của CHÍNH BẠN để nuôi agent của BẠN — đó là dùng đúng.** Đừng bán lại quyền truy cập gói đăng ký cá nhân cho người ngoài: việc đó đi ngược điều khoản các nhà cung cấp và dễ bị khoá cả cụm tài khoản. Muốn bán token cho khách thì đi đường chính thức (API trả-theo-dùng) hoặc để khách **tự mang khoá của họ**.
2. **Khoá cổng lại.** Bắt buộc API key, đổi mật khẩu mặc định, để trong mạng riêng — đừng phơi thẳng ra internet. Một cổng gom token mà hở là mất cả kho.
3. **Thêm một chặng là thêm một điểm có thể hỏng.** Đo độ trễ, và kiểm tool-calling cho từng model — model rẻ hỏng đúng ở khâu này.

## Kết

VPS không chỉ để chạy web hay máy ảo thường. Với người dùng AI nghiêm túc, **một VPS + 9Router = xưởng cám riêng của bạn**: một lần đăng nhập, mọi gói xài tới đáy, cả đàn agent no đủ, không đứng vì hết lượt. Đây là một lý do nữa để một chiếc VPS đáng đồng tiền.

*OZ Cloud dựng và vận hành đúng mô hình này — VPS + cổng token AI + đội agent — và mỗi bài toán của khách là một kinh nghiệm thực chiến của chúng tôi.*
