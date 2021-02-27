# NLW4 - Trilha Node.js
Api feita durante o evento Next Level Week 04 da Rocketseat de 22/02/2021 - 28/02/2021. A api foi desenvolvida utilizando Node.js com Express.
A api consiste no cálculo do NPS(Net Promoter Score) para calcular a satisfação e fidelidade dos usuários por meio de pesquisas. As pesquisas são enviadas por e-mail aos usuários cadastrados. A resposta do usuário é registrada no banco de dados SQLite para o cálculo de NPS.
Também foram desenvolvidos testes com Jest e validação de dados com Yup. O envio de e-mail é feito através do nodeMailer com Ethereal. As tabelas do banco de dados SQLite foram configuradas por meio de TypeORM.

# E-mail
<p align="center">
  <p><img align="center" src=".github/NLW 4 Email.png" alt="E-mail" width="800" border="0"></p>
</p>

# NPS
<p align="center">
  <p><img align="center" src=".github/NLW 4 NPS.png" alt="NPS" width="800" border="0"></p>
</p>

# Funcionalidades
 - Cadastro de usuários e pesquisas
 - Envio de pesquisas por e-mail
 - Cálculo do NPS a partir das respostas

# Principais Tecnologias
 - [Node.js](https://nodejs.org/en/)
 - [Express](https://expressjs.com/en/starter/installing.html)
 - [TypeORM](https://typeorm.io/#/)
 - [SQLite](https://www.sqlite.org/index.html)
 - [Jest](https://jestjs.io/)
 - [nodeMailer](https://nodemailer.com/about/)
 - [Ethereal](https://ethereal.email/)
 - [Yup](https://github.com/jquense/yup)