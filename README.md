# Pam-2

Aplicativo mobile (React Native com Expo) com operações de **CRUD** (Create, Read, Update, Delete) consumindo uma API simples baseada em um arquivo `db.json`.

O repositório está organizado em duas partes:

- **`meuCrudApp/`**: aplicativo mobile (Expo).
- **`Backend/`**: recursos para expor o `db.json` (base de dados fake) e uso de túnel (localtunnel) para acesso externo.

---

## Descrição do projeto

Este projeto foi desenvolvido para praticar a criação de um app mobile que realiza um CRUD de pessoas (ex.: `firstName`, `lastName`, `email`, `phone`), consumindo dados a partir de uma API simples baseada em `db.json`.

## Video Do Projeto em Funcionamento

LINK: https://drive.google.com/file/d/1nCZw-EacW8FsvdXUlDIwxdBB8W_YL6ON/view?usp=sharing
---

## Tecnologias utilizadas

### Mobile (`meuCrudApp`)
- **React Native**
- **Expo**
- **React Navigation** (`@react-navigation/native` e `@react-navigation/stack`)
- **dotenv** (para variáveis de ambiente)

### Backend (`Backend`)
- **localtunnel** (para expor a API local para a internet, útil para testar no celular)
- Arquivo **`db.json`** como “banco” de dados

> Observação: o `Backend` contém `db.json` e dependências; normalmente esse tipo de backend é usado com algo como *json-server* (ou serviço similar) apontando para o `db.json`.

---

## Como configurar o ambiente

### Pré-requisitos
Instale as ferramentas abaixo:

- **Node.js** (recomendado: versão LTS)
- **npm** (vem com o Node) ou **yarn**
- **Expo CLI** (opcional, mas recomendado)
- Para rodar no celular:
  - App **Expo Go** (Android/iOS), ou
  - Emulador Android / Simulador iOS

---

## Instalação

### 1) Clonar o repositório
```bash
git clone https://github.com/HttpsKenzoaoki/Pam-2.git
cd Pam-2
```

### 2) Instalar dependências do Mobile
```bash
cd meuCrudApp
npm install
```

### 3) Instalar dependências do Backend
Em outro terminal:

```bash
cd Backend
npm install
```

---

## Execução

## 1) Subir o backend (API)

Como o backend usa um `db.json`, você precisa garantir que existe um serviço rodando que exponha esse JSON como API.

### Opção A (recomendada): usar json-server (se você tiver instalado)
Se você já usa `json-server`, dentro da pasta `Backend`:

```bash
npx json-server --watch db.json --port 3000
```

Isso normalmente cria endpoints como:
- `GET /people`
- `POST /people`
- `PUT/PATCH /people/:id`
- `DELETE /people/:id`

### (Opcional) Expor a API com localtunnel
Ainda dentro de `Backend/`, com a API rodando na porta 3000:

```bash
npx localtunnel --port 3000
```

Ele vai gerar uma URL pública (ex.: `https://xxxxx.loca.lt`) que você pode usar no app para acessar o backend pelo celular.

> Dica: se você estiver testando no emulador/mesma rede, talvez não precise de túnel. Mas em muitos cenários no celular, o túnel ajuda bastante.

---

## 2) Rodar o aplicativo (Expo)

Em outro terminal, dentro de `meuCrudApp/`:

```bash
npx start expo --tunnel
```

## Explicação da solução (Como o problema foi resolvido)

A solução foi implementada separando responsabilidades:

1. **Persistência (simulada) dos dados**
   - Os registros ficam no arquivo `Backend/db.json`, no array `people`.
   - Um servidor simples (ex.: `json-server`) expõe esse arquivo como uma API REST.

2. **Aplicativo mobile**
   - O app (Expo/React Native) consome a API para:
     - **Listar** pessoas
     - **Cadastrar** nova pessoa
     - **Editar** dados
     - **Remover** registros
   - A navegação entre telas é feita com **React Navigation**.

3. **Acesso do celular ao backend**
   - Quando necessário, o **localtunnel** expõe a API local para uma URL pública, facilitando testes em dispositivos físicos.

---

## Observações importantes

- Se o app depender de uma **URL de API** configurável, recomendo colocar a URL em um arquivo `.env` dentro de `meuCrudApp/` (por exemplo `API_URL=https://...`) e carregar com `dotenv`.
- Caso você esteja usando Android Emulator, o host da máquina pode ser acessado via `10.0.2.2` (dependendo do cenário). Em dispositivo físico na mesma rede, use o IP local do seu PC.

---

## Estrutura do repositório (resumo)

- `README.md` (este arquivo)
- `Backend/`
  - `db.json`
  - `package.json`
- `meuCrudApp/`
  - `package.json`
  - `App.js`
  - `src/` (telas/serviços/estilos do app)

---

## Licença

Projeto para fins educacionais.
