# 📋 Guia Rápido de Commits

> Consulta rápida baseada no hook `commit-msg` com Conventional Commits + Emoji automático.

---

## 📐 Formato do commit

```
<emoji> <tipo>(<escopo>)!: <descrição curta>

[corpo opcional]

[rodapé opcional]
```

- **emoji** → adicionado automaticamente pelo hook
- **escopo** → opcional, indica a área afetada (ex: `auth`, `dashboard`)
- **`!`** → opcional, indica breaking change (quebra de compatibilidade)
- **descrição** → máx. 72 caracteres, minúsculo, sem ponto final

---

## 🗂️ Tipos e emojis

| Tipo        | Emoji | Quando usar                                      |
|-------------|-------|--------------------------------------------------|
| `feat`      | ✨    | Novo recurso ou funcionalidade                   |
| `fix`       | 🐛    | Correção de bug                                  |
| `docs`      | 📚    | Mudanças na documentação                         |
| `test`      | 🧪    | Criar, alterar ou remover testes                 |
| `build`     | 📦    | Build, dependências, package.json                |
| `perf`      | ⚡    | Melhoria de performance                          |
| `style`     | 👌    | Formatação, lint, semicolons (sem lógica nova)   |
| `refactor`  | ♻️    | Refatoração sem alterar funcionalidade           |
| `chore`     | 🔧    | Tarefas de config, .gitignore, scripts           |
| `ci`        | 🧱    | CI/CD, Dockerfile, pipelines                     |
| `raw`       | 🗃️    | Dados, arquivos de configuração, parâmetros      |
| `cleanup`   | 🧹    | Remover código comentado, variáveis não usadas   |
| `remove`    | 🗑️    | Deletar arquivos ou funcionalidades obsoletas    |
| `init`      | 🎉    | Commit inicial do projeto                        |

---

## ✅ Exemplos válidos

```bash
# Básico
git commit -m "feat: adicionar tela de login"
git commit -m "fix: corrigir cálculo de frete"
git commit -m "docs: atualizar README com instruções de instalação"
git commit -m "init: commit inicial"

# Com escopo (área afetada)
git commit -m "fix(auth): corrigir expiração de token JWT"
git commit -m "feat(dashboard): adicionar gráfico de vendas mensais"
git commit -m "style(header): ajustar espaçamento do menu"

# Breaking change (! após o tipo ou escopo)
git commit -m "refactor!: remover suporte ao endpoint /v1"
git commit -m "feat(api)!: alterar formato de resposta para JSON:API"

# Com corpo e rodapé (para commits mais detalhados)
git commit -m "fix: corrigir cálculo de desconto no carrinho

O percentual estava sendo aplicado duas vezes para usuários premium.
Impacto: todos os checkouts desde 2024-01-10.

Closes #87
Reviewed-by: Ana Paula"
```

---

## ❌ Exemplos inválidos (hook vai bloquear)

```bash
git commit -m "ajustes"                   # sem tipo
git commit -m "Feat: nova tela"           # tipo com maiúscula
git commit -m "fix - erro no login"       # sem dois-pontos
git commit -m "update stuff"              # sem tipo reconhecido
git commit -m "feat:sem espaço"           # falta espaço após :
```

---

## ⚠️ Avisos do hook (não bloqueiam)

| Situação                             | Recomendação                        |
|--------------------------------------|-------------------------------------|
| Primeira linha com mais de 72 chars  | Encurte o título, detalhe no corpo  |
| Descrição começa com maiúscula       | Use letras minúsculas               |
| Descrição termina com ponto final    | Remova o ponto                      |

---

## 🔄 Anatomia completa de um bom commit

```
feat(pagamento): adicionar suporte a PIX            ← título (máx 72 chars)
                                                     ← linha em branco obrigatória
Implementado novo fluxo de pagamento via PIX         ← corpo (o quê e por quê)
utilizando a API do Banco Central. O timeout
foi definido em 30s conforme documentação.
                                                     ← linha em branco
Closes #134                                          ← rodapé (referências)
Reviewed-by: Carlos Henrique
Co-authored-by: Maria Silva <maria@email.com>
```

---

## 🛠️ Instalação do hook

```bash
# Copiar para o repositório
cp commit-msg .git/hooks/commit-msg

# Dar permissão de execução
chmod +x .git/hooks/commit-msg

# Testar com um commit
git add .
git commit -m "feat: meu primeiro commit validado"
```

> O hook adiciona o emoji automaticamente — você **não precisa** digitá-lo.
> Se quiser adicionar manualmente, o hook respeita e não duplica.

---

## 📦 Ferramentas que geram CHANGELOG.md automaticamente

Essas ferramentas leem seu histórico de commits e geram versões e changelogs sem esforço manual — por isso Conventional Commits é tão importante.

---

### 1. `standard-version` — simples, local, sem CI

A mais fácil para começar. Roda localmente e cria tag + CHANGELOG em um comando.

```bash
npm install --save-dev standard-version

# Adicionar no package.json:
# "scripts": { "release": "standard-version" }

npm run release          # detecta versão automaticamente
npm run release -- --minor     # força minor (1.1.0)
npm run release -- --patch     # força patch (1.0.1)
npm run release -- --major     # força major (2.0.0)
```

**Gera automaticamente:**
- Tag Git (ex: `v1.2.0`)
- `CHANGELOG.md` com todos os `feat`, `fix` e breaking changes
- Bump de versão no `package.json`

> ⚠️ Projeto em modo manutenção. Alternativa moderna: `release-please` ou `changelogen`.

---

### 2. `semantic-release` — automação completa via CI

A ferramenta mais poderosa. Roda no CI (GitHub Actions, GitLab CI) e faz tudo automaticamente ao dar push na `main`.

```bash
npm install --save-dev semantic-release

# Plugins comuns:
npm install --save-dev \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/github
```

**Configuração mínima** (`.releaserc.json`):
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github"
  ]
}
```

**O que faz sozinho:**
- Analisa os commits desde a última release
- Define a versão (major/minor/patch) com base nos tipos
- Gera `CHANGELOG.md`
- Cria release no GitHub com notas
- Publica no npm (se configurado)

**Regra de versão:**
| Commit             | Versão gerada |
|--------------------|---------------|
| `fix:`             | patch → 1.0.1 |
| `feat:`            | minor → 1.1.0 |
| `feat!:` / `BREAKING CHANGE:` | major → 2.0.0 |

---

### 3. `changelogen` — moderno, rápido, zero config

Alternativa moderna ao `standard-version`, feita pelo time do Nuxt/Vite.

```bash
npx changelogen --release   # gera CHANGELOG + bump de versão
npx changelogen --push      # faz push da tag automaticamente
```

Funciona com qualquer linguagem, não exige `package.json`.

---

### 4. `release-please` (Google) — via GitHub Actions

Cria automaticamente um **Pull Request de release** a cada push na `main`. Você aprova o PR quando quiser publicar.

```yaml
# .github/workflows/release-please.yml
name: Release Please
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          release-type: node
```

**Fluxo:**
1. Você faz commits normais na `main`
2. A action abre/atualiza um PR chamado "Release v1.x.x"
3. O PR mostra o `CHANGELOG.md` gerado
4. Você aprova → ela cria a tag e a release

---

### Comparativo rápido

| Ferramenta         | Complexidade | Roda onde  | Ideal para                    |
|--------------------|-------------|------------|-------------------------------|
| `standard-version` | ⭐ Baixa    | Local      | Projetos pessoais, início     |
| `changelogen`      | ⭐ Baixa    | Local / CI | Qualquer linguagem            |
| `release-please`   | ⭐⭐ Média  | GitHub CI  | Times, controle de aprovação  |
| `semantic-release` | ⭐⭐⭐ Alta | CI/CD      | Projetos sérios, automação total |

---

*Guia gerado com base no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br)*
