<header>

  # Guia de Contribuição
  
  Obrigado por querer contribuir com o projeto.

</header>

---

## 1. Código de Conduta

Por favor, leia nosso [Código de Conduta](./CODE_OF_CONDUCT.md) antes de contribuir para este projeto. A adesão ao código é obrigatória para todos os colaboradores.

---

## 2. Como falar de um Problema ou sugestão.

Se encontrar um bug ou tiver uma ideia para uma nova funcionalidade, siga estas etapas:

1. Verifique se já existe uma issue aberta.
2. Caso não encontre, abra uma nova issue.
3. No título, use uma descrição breve, e no corpo, inclua:
   - **Descrição do problema/sugestão**
   - **Passos para reproduzir (no caso de bugs)**
   - **Versão do projeto (ex.: 0.1.0)**

Use o template de issues.

---

## 3. Contribuindo com Código

### 3.1. Requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org)
- [Git](https://git-scm.com) (obviamente)
- [json-server](https://github.com/typicode/json-server)

```bash
npm i -g json-server
```


### 3.2. Configuração do Projeto

1. Clone o repositório:

  ```bash
  git clone https://github.com/seu_usuario/seu_repositorio.git
  ```
  
2. Instale as dependências:

  ```bash
  npm i
  ```

3. Inicie a api

  ```bash
  npm run fake-api
  ```

4. Inicie o projeto

  ```bash
  npm run dev
  ```

### 3.3 Como enviar suas mudanças

1. crie uma branche nova a partir da main ou da branche da pessoa que você está ajudando, ex: pagina-orcamento

```bash
git checkout -b nome-da-branche
```

2. faça as alterações do codigo
3. faça o commit na branch ex: "fix: breve descrição da correção"
4. abra um pull request para mesclar com a main se for uma correção critica ou uma feature completa.

---

## 4. Versionamento Semântico

segue o padrão: `MAIOR.MENOR.CORREÇÃO`. mais informações: [Wiki - Versionamento](https://github.com/NickSilva71/PROJETO_ORGANIZA/wiki#versionamento-por-tags)

### Resumo

- Isso só server para a `main`, não use `tag`em outras branches
- Quando terminar uma feature nova, ex: pagina. adicione `tag`: `x.2.0`
- Quando fizer uma alteração pequena, ex: atualização da pagina ou bug. adicione `tag`: `x.y.1`
- **NÃO** lance a `1.0.0`

---

## 5. Padrões de Código

## 5.1. Convenção de Commits

Recomendo seguir o padrão Conventional Commits.

Não é obrigatorio usar os tipos, mas eu gostaria se pudesse.

fonte em inglês: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), [Conventional Commits github](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#scopes)

ex: `feat: adiciona funcionalidade de autenticação`

Use sempre o imperativo no presente e sem ponto final: "Isso faz tal coisa"

### Tipos

- feat: Adiciona ou remove uma funcionalidade.
- fix: Corrige um bug.
- docs: Atualiza ou cria documentação.
- style: Ajustes que não afetam a lógica do código (espaços, vírgulas, etc.).
- refactor: Melhoria no código sem adicionar funcionalidade ou corrigir bugs.
  - perf: Melhora a performance do código.
- build: coisas tipo: build tool, ci pipeline, dependências, versão do projeto, ... 
- chore: Outras tarefas, como atualização de dependências.

---

<footer>

  ### Dicas Importantes
  
  - **Seja claro e direto:** Inclua apenas as informações necessárias.
  - **Organize:** Use seções e subtítulos para facilitar a leitura.
  - **Facilite para todo mundo:** Evite pressupor que todos conhecem as ferramentas e processos.

  Agradecemos suas atenção em ler tudo isso
</footer>
