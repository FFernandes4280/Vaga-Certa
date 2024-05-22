// import express, { Request, Response } from 'express';
// import fs from 'fs';
// import cors from 'cors';
// import * as yup from 'yup';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import path from 'path';


// const app = express(); // cria uma instância do Express

// const DEFAULT_DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";

// // utilização da biblioteca yup para validação dos campos
// const criarUsuario = yup.object().shape({
//   nome: yup.string().required(),
//   email: yup.string().email().required(),
//   senha: yup.string().min(4).required(),
//   senha2: yup
//     .string()
//     .oneOf([yup.ref("senha"), null], "As senhas não correspondem")
//     .required(),
//   telefone: yup
//     .string()
//     .matches(/^\d{11}$/, "O telefone deve conter exatamente 11 dígitos")
//     .required(),
// });

// // (middleware) extração dos dados de Forms vindos de uma requisição POST
// app.use(express.json()); 
// app.use(cors()); 
// app.use(express.urlencoded({ extended: true })); 

// //rota para autenticação de usuário (POST)
// app.post("/login", async (req: Request, res: Response) => {
//   // extrai email e senha do corpo da requisição
//   const { email, senha } = req.body;
//   const caminho = path.join(__dirname, ".", "database", "dados-usuarios.json");
//   const data = JSON.parse(fs.readFileSync(caminho, { encoding: "utf8", flag: "r" }));

//   let usuario = false;
//   let correto = false;

//   // itera sobre os usuários para verificar autenticação
//   for (const user of data) {
//     if (user.email === email) {
//       usuario = true;
//       const senhaValida = await bcrypt.compare(senha, user.senha);
//       if (senhaValida) {
//         correto = true;
//         // gera e retorna um token JWT se a autenticação for bem-sucedida
//         const token = jwt.sign(user, process.env.TOKEN!);
//         return res.json({ token: token });
//       }
//     }
//   }

//   // mensagens de erro se o usuário não existir ou a senha estiver incorreta
//   if (!usuario) {
//     return res.status(409).send(`Usuario com email ${email} não existe. Considere criar uma conta!.`);
//   }
//   if (!correto) {
//     return res.status(409).send("Usuario ou senhas incorretas.");
//   }
// });

// // rota para criar usuário (POST)
// app.post("/criarUsuario", async (req: Request, res: Response) => {
//   const caminho = path.join(__dirname, ".", "database", "dados-usuarios.json");
//   const data = JSON.parse(fs.readFileSync(caminho, { encoding: "utf8", flag: "r" }));
//   const { nome, email, senha, senha2, telefone } = req.body;

//   // verifica se o email já está em uso
//   for (let user of data)
//     if (user.email === email)
//       return res.status(409).send(`Usuario com email  ${email} ja existe`);

//   try {
//     // valida os dados utilizando yup e armazena no banco de dados
//     criarUsuario.validateSync({
//       nome,
//       email,
//       senha,
//       senha2,
//       telefone,
//     });

//     // gera uma senha criptografada
//     const salt = await bcrypt.genSalt(10);
//     const senhaCrypto = await bcrypt.hash(senha, salt);

//     // cria um novo usuário e o adiciona ao banco de dados
//     const novoUser = {
//       id: data.length + 1,
//       nome: nome,
//       email: email,
//       senha: senhaCrypto,
//       telefone: telefone,
//     };
//     data.push(novoUser);
//     fs.writeFileSync(caminho, JSON.stringify(data, null, 2));
//     return res.send("Tudo certo, usuario criado com sucesso.");
//   } catch (error) {
//     // tratamento de erros
//     return res.status(409).send(error.message);
//   }
// });

// // rota para atualizar dados do usuário (POST)  
// app.post("/atualizarDados", async (req: Request, res: Response) => {
//   const caminho = path.join(__dirname, ".", "database", "dados-usuarios.json");
//   const data = JSON.parse(fs.readFileSync(caminho, { encoding: "utf8", flag: "r" }));

//   const { emailAntigo, email, senhaAntiga, senha, senha2, telefone} = req.body;
//   const usuario = data.find((user: any) => user.email == emailAntigo);
//   if (!usuario) {
//     return res.status(404).send(`Usuário com email ${emailAntigo} não encontrado.`);
//   }

//   // verifica se o email já está em uso
//   for (let user of data)
//   if (user.email === email)
//     return res.status(409).send(`Usuario com email  ${email} ja existe`);

//   const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
//   if (!senhaCorreta) {
//     return res.status(401).send('Senha antiga incorreta. A atualização não é permitida.');
//   }

//   // atualização correta dos valores
//   const nome = usuario.nome;
//   const novoEmail = email === "" ? usuario.email : email;
//   const novaSenha = senha === "" ? senhaAntiga : senha;
//   const novaSenha2 = senha2 === "" ? senhaAntiga : senha2;
//   const novoTelefone = telefone === "" ? usuario.telefone : telefone;

//   try {
//     criarUsuario.validateSync({
//       nome,
//       email: novoEmail,
//       senha: novaSenha,
//       senha2: novaSenha2,
//       telefone: novoTelefone,
//     });

//     // atualiza apenas os campos que não são nulos ou vazios
//     usuario.email = novoEmail;
//     usuario.senha = novaSenha;
//     usuario.telefone = novoTelefone;

//     // recriptografa a senha se uma nova senha for fornecida
//     if (novaSenha) {
//       const salt = await bcrypt.genSalt(10);
//       usuario.senha = await bcrypt.hash(novaSenha, salt);
//     }

//     // escrever os dados atualizados no arquivo
//     fs.writeFileSync(caminho, JSON.stringify(data, null, 2));

//     return res.status(200).send("Dados do usuário atualizados com sucesso.");
//   } catch (error) {
//     return res.status(409).send(error.message);
//   }
// });

// app.listen(3000, () => {
//     console.log("Servidor na porta 3000");
//   });
  
//   // middleware para verificar a presença e validade do token JWT
//   function verificaToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const authorized = authHeader && !authHeader.split(" ")[1];
  
//     if (!authorized) {
//       console.log("ACESSO NEGADO: authHeader: ", authHeader);
//       return res.status(401).send("Acesso negado");
//     }
  
//     jwt.verify(authHeader, process.env.TOKEN, (err, user) => {
//       if (err) return res.status(403).send("Token Inválido/Expirado");
//       req.user = user;
//       next();
//     });
//   }