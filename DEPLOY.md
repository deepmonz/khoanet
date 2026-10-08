# Deploy khoa.net lên VPS (chung với hoamera.com và mocan.shop)

khoa.net chạy trên cùng VPS và theo đúng cách đang dùng cho mocan.shop:

```
/home/mera/      hoamera.com  — tạo network "hoamera"      (frontend, backend, mongodb)
/home/mocan/     mocan.shop   — dùng chung network "hoamera" (frontend-mocan, backend-mocan)
/home/khoanet/   khoa.net     — dùng chung network "hoamera" (khoanet-web)          ← mới
/home/nginx/     nginx + certbot dùng chung, mỗi site 1 file trong conf.d/
```

Không cần sửa `docker-compose.yml` của nginx và không cần restart nginx: hoamera.com và mocan.shop không bị gián đoạn.

## 1. Trỏ tên miền
Vào trang quản lý DNS của khoa.net và tạo 2 bản ghi:

| Loại | Tên | Giá trị |
|---|---|---|
| A | `@` | IP của VPS (cùng IP với hoamera.com) |
| A | `www` | IP của VPS |

⚠️ **Không sửa hay xoá các bản ghi MX/TXT**, nếu không email hr@khoa.net sẽ ngừng nhận thư.

Kiểm tra cho tới khi cả hai lệnh trả về IP của VPS:
```bash
dig +short khoa.net
dig +short www.khoa.net
```

## 2. Code trên GitHub
Repo: https://github.com/deepmonz/khoanet. Mỗi lần sửa xong, push lên từ `D:\Code\khoa.net`:
```bash
git add . && git commit -m "..." && git push
```

## 3. Build và chạy trên VPS
```bash
git clone https://github.com/deepmonz/khoanet.git /home/khoanet
cd /home/khoanet
docker compose up -d --build          # lần đầu mất khoảng 2–5 phút

# Kiểm tra
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3100/            # phải là 200
docker network inspect hoamera --format '{{range .Containers}}{{.Name}} {{end}}'
# danh sách phải có: khoanet-web, nginx, frontend-mocan, ...
```
- Nếu repo để private, lúc clone/pull GitHub sẽ hỏi username + Personal Access Token (giống lúc clone hoamera).
- Build Next.js tốn RAM. Nếu bị `Killed`, xem phần xử lý sự cố.

## 4. Gắn tên miền và SSL (chạy 1 lần)
```bash
bash /home/khoanet/deploy/nginx/init-ssl.sh
```
Script tự làm các việc sau:
1. Thêm config HTTP tạm cho khoa.net rồi reload nginx.
2. Lấy chứng chỉ SSL từ Let's Encrypt.
3. Cài config HTTPS đầy đủ vào `/home/nginx/conf.d/khoa.net.conf`, rồi reload nginx.

Mỗi lần reload, script đều chạy `nginx -t` trước. Nếu có lỗi, script gỡ config khoa.net ra, nên nginx của hoamera và mocan không bao giờ bị nạp config hỏng.

Chứng chỉ khoa.net tự gia hạn cùng các site khác: certbot của `/home/nginx` kiểm tra mỗi 12 giờ, nginx nạp lại mỗi 6 giờ.

## 5. Kiểm tra
```bash
curl -I https://khoa.net             # HTTP/2 200
curl -I http://khoa.net              # 301 → https://khoa.net/
curl -I https://www.khoa.net         # 301 → https://khoa.net/
curl -I https://hoamera.com          # hai site cũ vẫn bình thường
curl -I https://mocan.shop
```

## 6. Cập nhật website về sau
- Trên Windows:
  ```bash
  git add . && git commit -m "Update" && git push
  ```
- Trên VPS (chỉ rebuild khoa.net, không ảnh hưởng hai site kia):
  ```bash
  cd /home/khoanet && bash deploy/update.sh
  ```

Nếu sửa `deploy/nginx/conf.d/khoa.net.conf`, chạy lại `bash /home/khoanet/deploy/nginx/init-ssl.sh`. Script thấy đã có chứng chỉ thì bỏ qua bước lấy chứng chỉ, chỉ copy config mới và reload.

## Xử lý sự cố
| Triệu chứng | Kiểm tra |
|---|---|
| Build dừng, báo `Killed` (thiếu RAM) | Thêm swap: `sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile` |
| `network hoamera declared as external, but could not be found` | Stack hoamera.com chưa chạy: `cd /home/mera && docker compose up -d` |
| `502 Bad Gateway` trên khoa.net | `docker ps`: `khoanet-web` có đang chạy không, và có nằm trong `docker network inspect hoamera` không |
| Lấy chứng chỉ SSL thất bại | DNS chưa trỏ đúng (`dig +short khoa.net`), hoặc cổng 80 bị chặn |
| Cổng 3100 đã bị dùng | Đổi `127.0.0.1:3100` trong `docker-compose.yml` sang cổng khác |
| Cần xem log | `docker logs -f khoanet-web` · `cd /home/nginx && docker compose logs -f nginx` |
