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
            text-align: center;
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
          .progress-container {
            margin-top: 20px;
          }
          .progress {
            width: 100%;
            height: 20px;
            background-color: #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
          }
          .progress-bar {
            height: 100%;
            background-color: #4CAF50;
            width: 70%; 
            text-align: center;
            line-height: 20px;
            color: white;
            font-weight: bold;
            border-radius: 10px;
          }

          .progress-bar-99{
            width: 99%; 
          }
          .progress-bar-10{
            width: 10%; 
          }
          .progress-bar-30{
            width: 30%; 
          }
          .progress-bar-80{
            width: 80%; 
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
          <p style="font-size:1.25em;" >Documentação completa disponível em <a href="/docs">/docs</a>.</p>


          <div class="progress-container">
          <p><strong>Percentual de desenvolvimento:</strong></p>
            <label>Cadastro de Produtores:</label>
            <div class="progress"  style="margin:5px 0">
              <div class="progress-bar progress-bar-99">99%</div>
            </div>
            
            <label>Gestão de Propriedades:</label>
            <div class="progress"  style="margin:5px 0">
              <div class="progress-bar progress-bar-99">99%</div>
            </div>
            <label>Registro de Safras e Culturas:</label>
            <div class="progress"  style="margin:5px 0">
              <div class="progress-bar progress-bar-99">99%</div>
            </div>
            <label>Dashboard:</label>
            <div class="progress"  style="margin:5px 0">
              <div class="progress-bar progress-bar-10">10%</div>
            </div>
            <label>Tests Unitários e Integrados:</label>
            <div class="progress"  style="margin:5px 0">
              <div class="progress-bar progress-bar-30">30%</div>
            </div>
            <label>OpenAPI - Swagger:</label>
            <div class="progress"  style="margin:5px 0">
              <div class="progress-bar progress-bar-80">30%</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    return info;
  }
}
