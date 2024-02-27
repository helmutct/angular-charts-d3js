TO-DO:
Adicionar um alerta na tela de alertas:
-Este prestador participou de algumas fraudes no passado

# Zero Risk MVP

## Arquitetura
Dados inseridos web/ api: Java/ PSQL
O java chama o python que retorna validações ML
Outro Java insere no Neo4j, e depois retorna validações
O Java inicial guarda todas as valições

-Angular Front
-Java PSQL
-Java Neo4j
-Python Modelos ML
-Autenticação dos sonhos: Um SSO Oauth2 para todos os front end
Se um serviço chama um outro serviço, e este outro não é protegido para frontend clients, então é só dar foward no token, os clients podem usar o mesmo token
Se um serviço chama um outro serviço, e este outro é protegido para frontend clients, então o serviço de origem precisa fazer login Oauth2 como se fosse um Client e repassar esse outro token
Fonte: https://stackoverflow.com/questions/45146544/oauth2-flow-from-resource-server-to-another

## Ports
### Killing process to free a port in Windows
`netstat -a -n -o | find "4200"`
(last column will be the process code)
`taskkill -f /pid process_number`

## Deploy Documentation

### Login to upload or download a container from the hub
`docker login cadarncontainerrepository.azurecr.io -u cadarncontainerrepository -p =PIW+/g6RIyUyD1PaRO+Kppk91RecpCA`

### Upload
`docker push cadarncontainerrepository.azurecr.io/zeroriskmvpweb:1.0`

### Download
`docker pull cadarncontainerrepository.azurecr.io/zeroriskmvpweb:1.0`

### Run app from container
- Build and run container, on workspace folder exec the command --> `docker-compose up -d zeroriskmvpweb`

## Deploy Documentation

### Build image and run container
- On sindiofertas-admin folder: `docker build -t cadarncontainerrepository.azurecr.io/zeroriskmvpweb:1.0 .`
- On workspace folder exec the command --> `docker-compose up -d zeroriskmvpweb`
- Server URL: http://cadarn001.brazilsouth.cloudapp.azure.com:9002

### Deploy (full step by step)
docker build -t cadarncontainerrepository.azurecr.io/zeroriskmvpweb:1.0 .
docker-compose up -d zeroriskmvpweb
localhost:9011
docker push cadarncontainerrepository.azurecr.io/zeroriskmvpweb:1.0
docker pull cadarncontainerrepository.azurecr.io/zeroriskmvpweb:1.0
docker-compose up -d zeroriskmvpweb
http://cadarn001.brazilsouth.cloudapp.azure.com:9002
