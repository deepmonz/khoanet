#!/usr/bin/env bash
# Lấy cert Let's Encrypt lần đầu cho khoa.net và gắn site vào nginx dùng chung.
# Chạy một lần trên VPS (nginx tại /home/nginx/ phải đang chạy):
#
#   bash /home/khoanet/deploy/nginx/init-ssl.sh
#
# An toàn cho hoamera.com / mocan.shop: luôn chạy `nginx -t` trước khi reload,
# và gỡ config khoa.net nếu có bước nào lỗi — nginx không bao giờ bị nạp config hỏng.

set -euo pipefail

DOMAIN="khoa.net"
EMAIL="hr@khoa.net"
NGINX_DIR="/home/nginx"
SRC_CONF="$(cd "$(dirname "$0")" && pwd)/conf.d/${DOMAIN}.conf"
DST_CONF="${NGINX_DIR}/conf.d/${DOMAIN}.conf"

cd "${NGINX_DIR}"

reload_nginx() {
  docker compose exec -T nginx nginx -t && docker compose exec -T nginx nginx -s reload
}

rollback() {
  echo "!! Lỗi — gỡ config ${DOMAIN} và reload nginx về trạng thái cũ."
  rm -f "${DST_CONF}"
  reload_nginx || true
}
trap rollback ERR

if [ ! -f "./certbot/conf/live/${DOMAIN}/fullchain.pem" ]; then
  echo "==> Bước 1: config tạm chỉ có HTTP để Let's Encrypt xác minh tên miền..."
  cat > "${DST_CONF}" <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 404; }
}
EOF
  reload_nginx

  echo "==> Bước 2: lấy cert thật từ Let's Encrypt..."
  docker compose run --rm --entrypoint certbot certbot certonly \
    --webroot --webroot-path=/var/www/certbot \
    --email "${EMAIL}" --agree-tos --no-eff-email \
    -d "${DOMAIN}" -d "www.${DOMAIN}"
else
  echo "==> Đã có cert cho ${DOMAIN}, bỏ qua bước lấy cert."
fi

echo "==> Bước 3: cài config đầy đủ (HTTPS) và reload nginx..."
cp "${SRC_CONF}" "${DST_CONF}"
reload_nginx

trap - ERR
echo "==> Xong: https://${DOMAIN} — certbot của stack nginx tự renew cùng các site khác."
