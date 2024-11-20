# Scraper de Músicas Mais Tocadas no Spotify e Envio de E-mail

Este projeto realiza o **scraping** das 100 músicas mais tocadas no **Spotify** de 2024 a partir de uma página da Wikipédia e envia um e-mail com essas informações usando o **Nodemailer**. O e-mail é enviado através de uma conta do Gmail, configurada com variáveis de ambiente para segurança.

---

### 🚀 Funcionalidades

- **Scraper de Músicas:** Coleta as 100 músicas mais tocadas no Spotify de 2024 com seus respectivos artistas e número de streamings.
- **Envio de E-mail:** Envia as informações coletadas em um e-mail para o destinatário configurado.
  
---

## 📦 Requisitos

Antes de executar o projeto, você precisa de:

- **Node.js** (v14 ou superior)
- **Conta do Gmail** para envio de e-mail (com App Password habilitado)
- **Variáveis de Ambiente** (detalhadas abaixo)

---

## 🛠 Instalação

### 1. Clone o repositório

Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/scraper-musicas-spotify.git
```

### 2. Instale as dependências

Na pasta do projeto, instale as dependências necessárias:

```bash
cd scraper-musicas-spotify
npm install
```

---

## ⚙️ Configuração do E-mail

1. Crie um arquivo `.env` na raiz do projeto.
2. Defina as variáveis de ambiente para configurar o envio do e-mail:

```ini
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=seu-app-password
```

**Importante:** Caso ainda não tenha configurado o **App Password** do Gmail, siga [este link](https://myaccount.google.com/apppasswords) para criar uma senha específica para o app.

---

## 📄 Como Usar

1. **Execute o Scraper:**
   - O scraper irá buscar as 100 músicas mais tocadas no Spotify de 2024 e enviar essas informações no corpo do e-mail.

```bash
node app.js
```

2. **Conteúdo do E-mail:**
   - O e-mail será enviado para o destinatário configurado no código (`geraldoj8@gmail.com` por padrão).

---

## 🛠 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript no backend
- **Cheerio** - Biblioteca para parsing de HTML (Web Scraping)
- **Nodemailer** - Biblioteca para envio de e-mails
- **Dotenv** - Carregamento de variáveis de ambiente

---

## 🚨 Problemas Comuns

### 1. Erro de Conexão com o Gmail

Se ocorrer um erro de conexão com o Gmail, certifique-se de:

- Habilitar a **verificação em duas etapas** no seu Google Account.
- Criar e usar uma **App Password** para a conta do Gmail.

### 2. Cheerio não está funcionando

Caso o Cheerio não consiga encontrar os dados corretamente, verifique:

- Se a página da Wikipédia mudou o formato HTML.
- Se o seletor CSS usado no código está correto.

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você quiser melhorar ou adicionar algo ao projeto, siga estes passos:

1. Faça um **fork** deste repositório.
2. Crie uma **branch** para a sua feature (`git checkout -b minha-nova-feature`).
3. Faça **commit** com suas alterações (`git commit -am 'Adiciona minha nova feature'`).
4. Envie para o **branch principal** (`git push origin minha-nova-feature`).
5. Abra um **pull request**.

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- Agradecemos ao time do [Cheerio](https://cheerio.js.org/) e [Nodemailer](https://nodemailer.com/) pelas excelentes bibliotecas.
- O conteúdo da página foi retirado da [Wikipédia](https://pt.wikipedia.org/wiki/Lista_das_m%C3%BAsicas_mais_tocadas_no_Spotify).

---

```
