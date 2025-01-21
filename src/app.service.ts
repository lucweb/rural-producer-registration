import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  init(): string {
    const info = `
      <!DOCTYPE html>
      <html lang="br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API de Gerenciamento</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333;
            text-align: center;
          }
          .container {
            text-align: left;
            max-width: 600px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #4CAF50;
            text-align:center;
          }
          p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin-bottom: 0.5rem;
          }
          a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>API de Gerenciamento de Produtores Rurais</h1>
          <p><b>Bem-vindo à API!</b></p> 
          <p>Aqui estão algumas informações sobre os serviços disponíveis:</p>
          <ul>
            <li><strong>Cadastro de Produtores:</strong> Permite registrar, editar e excluir produtores rurais.</li>
            <li><strong>Gestão de Propriedades:</strong> Registre propriedades com informações detalhadas como área total, área agricultável, e vegetação.</li>
            <li><strong>Registro de Safras e Culturas:</strong> Adicione múltiplas safras e culturas por propriedade.</li>
            <li><strong>Dashboard:</strong> Obtenha relatórios consolidados com gráficos de uso do solo, culturas plantadas e dados por estado.</li>
          </ul>
          <p>Documentação completa disponível em <a href="/docs">/docs</a>.</p>
        </div>
      </body>
      </html>
    `;
    return info;
  }
}
