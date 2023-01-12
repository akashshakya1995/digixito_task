[1-ABOUT] 
Implemented product modules & Implemented wallet modules .

[2-REQUIREMENT] 
node v16.13.2 with setup npm 8.1.2 with setup monogdb v5.0.5 with setup

[3-HOW_TO_SETUP] 
npm init 
npm install

[4-HOW_TO_RUN] 
node server.js

[5-API_END_POINTS]

[5.1-WALLET_SETUP]

curl --location --request POST 'http://localhost:8080/wallet' \
--header 'Content-Type: application/json' \
--data-raw '{
  "balance":2000,
  "name":"Akash"
}'

[5.2-WALLET_DETAILS]

curl --location --request GET 'http://localhost:8080/wallet/63bfa6e5c166fe65cd2e6b51' \
--header 'Content-Type: application/json' \
--data-raw '{
  "balance":2000,
  "name":"Akash"
}'

[5.3-CREDIT_WALLET]

curl --location --request POST 'http://localhost:8080/wallet/63bfa66a90dc7fa3607e6f3c/transaction' \
--header 'Content-Type: application/json' \
--data-raw '{
  "amount":600,
  "description":"Tes"
}'

[5.4-PURCHASE_PRODUCT]

curl --location --request POST 'http://localhost:8080/wallet/63bfa66a90dc7fa3607e6f3c/purchase' \
--header 'Content-Type: application/json' \
--data-raw '{
  "productId":"63bee19675698b0f5dc72aa2"
}'

[5.5-LIST_TRANSACTION]

curl --location --request GET 'http://localhost:8080/wallet/63bfa66a90dc7fa3607e6f3c/transaction?skip=2&limit=1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "productId":"63bee19675698b0f5dc72aa2"
}'

[5.6-PRODUCT_LIST]

curl --location --request GET 'http://localhost:8080/products' \
--header 'Content-Type: application/json' \
--data-raw '{
  "productId":"63bee19675698b0f5dc72aa2"
}'