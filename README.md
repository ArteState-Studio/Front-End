🎨 ## ArteState Studio - Aplicativo Mobile

ArteState Studio é um aplicativo mobile feito em React Native que apresenta um acervo cultural focado em arte popular, tradições e histórias locais, com destaque para temas regionais e jumentos como símbolo cultural. O app oferece navegação simples entre diferentes categorias de arte e possibilita o usuário aprender mais sobre a cultura popular brasileira.

🚀 ## Tecnologias utilizadas

- React Native (Expo)  
- React Navigation  
- CSS  
- Axios (para comunicação com o back-End)  
- SVG para ícones
- API: [Art Institute of Chicago API](https://api.artic.edu/docs/)

✨ ## Integração com API Chicago

O app consome dados de uma API (API Chicago) que oferece informações detalhadas sobre obras de arte, peças folclóricas e histórias relacionadas. Isso permite atualizar o conteúdo de forma dinâmica e expandir o acervo facilmente.

📁 ## Estrutura Do Projeto

```
FRONT-END/
├── src/
│ ├── assets/ # Recursos estáticos como imagens e ícones
│ ├── navigation/
│ │ └── NavegadorPrincipal.js # Navegador principal da aplicação
│ ├── pages/ 
│ │ ├── PaginaGaleria.js # Tela da galeria
│ │ ├── PaginaInicial.js # Tela inicial do app
│ │ ├── TelaAdicionarDetalhes.js # Tela para adicionar detalhes
│ │ └── TelaEditarDetalhes.js # Tela para editar detalhes
│ └── services/
│ ├── api.js # Configuração da API
│ └── galeriaService.js # Serviços relacionados à galeria
├── App.js
├── app.json 
├── eas.json 
└── package.json 
```

🧪 ## Siga os passos abaixo para executar o aplicativo no seu ambiente local:

1. Clone o repositório:

```bash
git clone https://github.com/ArteState-Studio/Front-End.git
cd Front-End
```
2.Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o projeto com Expo:
```bash
npx expo start
```

4.Use o aplicativo Expo Go no seu celular para escanear o QR Code exibido no terminal ou no navegador para rodar o app no dispositivo físico. Ou utilize um emulador Android/iOS.


📝 ## Licença

Este aplicativo foi criado para fins **educacionais e de estudo**.  
O código pode ser usado livremente para aprendizado e projetos pessoais, mas não deve ser utilizado para fins comerciais sem autorização prévia do autor.

---

> _"Uma galeria para explorar. Um espaço para sentir. O importante é viver a arte."_ 🎨
