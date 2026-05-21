### Iniciando projeto:

1. Pra iniciar o projeto react com todas as pastas:
```
npm create vite@latest . -- --template react-ts
```

2.Instalando as dependecias do projeto
```
npm install
```

3.executar localmente
```
npm run dev
```

4. deployar no github pages
```
git push origin main
```

optional:
```
nvm use
```


### Configurações:

Para configurar o githubpages deploy é necessário:

- criar `.github/workflows/static.yml` para ter a action de deploy no github pages
- o arquivo é específico para cada stack, pesquise o seu
- vá nas configurações do repo github/pages e habilite com deploy via actions (e não via branch)
